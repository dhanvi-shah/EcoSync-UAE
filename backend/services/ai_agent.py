from __future__ import annotations

from pathlib import Path
from typing import Any, Literal, TypedDict

from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import END, StateGraph
from pydantic import BaseModel, Field, ValidationError

from config import get_settings
from models import AnalyzeResponse, ProductAlternative
from prompts.alternatives_agent import (
    SYSTEM_PROMPT as ALTS_SYSTEM,
    USER_TEMPLATE as ALTS_USER,
)
from prompts.impact_agent import (
    SYSTEM_PROMPT as IMPACT_SYSTEM,
    USER_TEMPLATE as IMPACT_USER,
)
from prompts.sdg_agent import SYSTEM_PROMPT as SDG_SYSTEM, USER_TEMPLATE as SDG_USER
from prompts.sustainability_agent import (
    SYSTEM_PROMPT as SUST_SYSTEM,
    USER_TEMPLATE as SUST_USER,
)
from utils.eco_labels import detect_eco_labels_from_text, merge_and_order_labels
from utils.eco_scoring import compute_combined_eco_score
from utils.sdg_tags import normalize_sdg_tags

_BACKEND_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(_BACKEND_ROOT / ".env")


class SustainabilityAgentOutput(BaseModel):
    eco_score: int = Field(ge=0, le=100)
    summary: str


class ImpactAgentOutput(BaseModel):
    hidden_impact: str
    carbon_kg: float = Field(ge=0, le=100_000)
    labels: list[str] = Field(default_factory=list)


class AlternativesOutput(BaseModel):
    alternatives: list[ProductAlternative] = Field(min_length=1, max_length=6)


class SDGAgentOutput(BaseModel):
    sdg_tags: list[str] = Field(default_factory=list, max_length=8)
    sdg_explanation: str = Field(..., min_length=10, max_length=600)


class AgentState(TypedDict):
    url: str
    title: str
    description: str
    price: str
    brand: str
    category: str
    vision_product_type: str
    material_guess: str
    eco_score: int
    summary: str
    hidden_impact: str
    alternatives: list[dict[str, Any]]
    carbon_kg: float
    labels: list[str]
    sdg_tags: list[str]
    sdg_explanation: str
    error: str


def _vision_user_block(state: AgentState) -> str:
    pt = (state.get("vision_product_type") or "").strip()
    mg = (state.get("material_guess") or "").strip()
    if not pt and not mg:
        return ""
    lines = ["", "From product image analysis:"]
    if pt:
        lines.append(f"Inferred product type: {pt}")
    if mg:
        lines.append(f"Material guess: {mg}")
    return "\n".join(lines)


def _fallback_alternative(category: str, slot: int) -> dict[str, str]:
    cat = (category or "").strip() or "this product type"
    variants: tuple[dict[str, str], ...] = (
        {
            "product_type": f"Refurbished or open-box equivalent ({cat})",
            "why_better": "Extends useful life of existing goods, avoiding new manufacturing, mining, and packaging emissions while often including warranty coverage.",
            "price_range": "Often 15–40% below new retail",
        },
        {
            "product_type": f"Repair or professional refurbishment service for {cat}",
            "why_better": "Restores function without replacing the whole unit, cutting embodied carbon and landfill waste compared with buying new.",
            "price_range": "Typically a fraction of replacement cost",
        },
        {
            "product_type": f"Second-hand marketplace listing in the same {cat} segment",
            "why_better": "Reuses an existing item already produced; highest impact reduction comes from avoiding another production cycle for the same need.",
            "price_range": "Wide range; often well below MSRP",
        },
    )
    return variants[slot % len(variants)]


def _normalize_alternatives(
    raw: list[Any],
    category: str,
) -> list[dict[str, str]]:
    parsed: list[ProductAlternative] = []
    for item in raw:
        if isinstance(item, ProductAlternative):
            parsed.append(item)
            continue
        if isinstance(item, dict):
            try:
                parsed.append(ProductAlternative.model_validate(item))
            except ValidationError:
                continue
    out: list[dict[str, str]] = []
    for p in parsed[:3]:
        out.append(
            {
                "product_type": p.product_type.strip(),
                "why_better": p.why_better.strip(),
                "price_range": (p.price_range or "").strip(),
            }
        )
    slot = 0
    while len(out) < 3:
        out.append(_fallback_alternative(category, slot))
        slot += 1
    return out[:3]


def _make_llm(api_key: str, model: str, temperature: float = 0.3) -> ChatOpenAI:
    return ChatOpenAI(
        api_key=api_key,
        model=model,
        temperature=temperature,
    )


def _sustainability_agent_node(state: AgentState) -> dict[str, Any]:
    """Agent 1: eco score + summary."""
    settings = get_settings()
    if not settings.openai_api_key:
        return {"error": "OPENAI_API_KEY is not configured."}

    llm = _make_llm(settings.openai_api_key, settings.openai_model)
    structured = llm.with_structured_output(SustainabilityAgentOutput)

    user_content = SUST_USER.format(
        url=state["url"],
        title=state["title"],
        description=state["description"],
        price=state.get("price", ""),
        brand=state.get("brand", ""),
        category=state.get("category", ""),
        vision_block=_vision_user_block(state),
    )

    try:
        result: SustainabilityAgentOutput = structured.invoke(
            [
                SystemMessage(content=SUST_SYSTEM),
                HumanMessage(content=user_content),
            ]
        )
    except Exception as e:
        return {"error": f"Sustainability agent failed: {e}"}

    return {
        "eco_score": result.eco_score,
        "summary": result.summary.strip(),
        "error": "",
    }


def _impact_agent_node(state: AgentState) -> dict[str, Any]:
    """Agent 2: hidden impact + carbon (kg CO2e) + eco labels (merged with rule-based detection)."""
    if state.get("error"):
        return {}

    settings = get_settings()
    llm = _make_llm(settings.openai_api_key, settings.openai_model)
    structured = llm.with_structured_output(ImpactAgentOutput)

    user_content = IMPACT_USER.format(
        url=state["url"],
        title=state["title"],
        description=state["description"],
        summary=state["summary"],
        price=state.get("price", ""),
        brand=state.get("brand", ""),
        category=state.get("category", ""),
        vision_block=_vision_user_block(state),
    )

    try:
        result: ImpactAgentOutput = structured.invoke(
            [
                SystemMessage(content=IMPACT_SYSTEM),
                HumanMessage(content=user_content),
            ]
        )
    except Exception as e:
        return {"error": f"Impact agent failed: {e}"}

    hi = result.hidden_impact.strip()
    corpus = "\n".join(
        p
        for p in (
            state["title"],
            state["description"],
            state["summary"],
            hi,
            state.get("category", ""),
            state.get("brand", ""),
            state.get("vision_product_type", ""),
            state.get("material_guess", ""),
        )
        if p and str(p).strip()
    )
    rule_labels = detect_eco_labels_from_text(corpus)
    merged_labels = merge_and_order_labels(rule_labels + result.labels)

    carbon = float(result.carbon_kg)
    if carbon > 100_000:
        carbon = 100_000.0

    return {
        "hidden_impact": hi,
        "carbon_kg": carbon,
        "labels": merged_labels,
        "error": "",
    }


def _alternatives_agent_node(state: AgentState) -> dict[str, Any]:
    """Agent 3: structured better options."""
    if state.get("error"):
        return {}

    settings = get_settings()
    llm = _make_llm(settings.openai_api_key, settings.openai_model, temperature=0.38)
    structured = llm.with_structured_output(AlternativesOutput)

    user_content = ALTS_USER.format(
        url=state["url"],
        title=state["title"],
        description=state["description"],
        eco_score=state["eco_score"],
        summary=state["summary"],
        hidden_impact=state["hidden_impact"],
        price=state.get("price", ""),
        brand=state.get("brand", ""),
        category=state.get("category", ""),
        vision_block=_vision_user_block(state),
    )

    try:
        result: AlternativesOutput = structured.invoke(
            [
                SystemMessage(content=ALTS_SYSTEM),
                HumanMessage(content=user_content),
            ]
        )
    except Exception as e:
        return {"error": f"Alternatives agent failed: {e}"}

    return {
        "alternatives": [p.model_dump() for p in result.alternatives],
        "error": "",
    }


def _sdg_agent_node(state: AgentState) -> dict[str, Any]:
    """Map product impact to UN Sustainable Development Goals (structured tags + short rationale)."""
    if state.get("error"):
        return {}

    settings = get_settings()
    if not settings.openai_api_key:
        return {"error": "OPENAI_API_KEY is not configured."}

    llm = _make_llm(settings.openai_api_key, settings.openai_model, temperature=0.25)
    structured = llm.with_structured_output(SDGAgentOutput)

    labels_joined = ", ".join(state.get("labels") or []) or "(none)"

    user_content = SDG_USER.format(
        url=state["url"],
        title=state["title"],
        brand=state.get("brand", "") or "—",
        category=state.get("category", "") or "—",
        description=state["description"] or "—",
        summary=state["summary"],
        hidden_impact=state["hidden_impact"],
        carbon_kg=state["carbon_kg"],
        labels=labels_joined,
        vision_block=_vision_user_block(state),
    )

    try:
        result: SDGAgentOutput = structured.invoke(
            [
                SystemMessage(content=SDG_SYSTEM),
                HumanMessage(content=user_content),
            ]
        )
    except Exception as e:
        return {"error": f"SDG mapping failed: {e}"}

    tags = normalize_sdg_tags(result.sdg_tags)
    expl = result.sdg_explanation.strip()
    return {
        "sdg_tags": tags,
        "sdg_explanation": expl,
        "error": "",
    }


def _finalize_response_node(state: AgentState) -> dict[str, Any]:
    """Combine rule-based eco score blend + normalized alternatives into final response fields."""
    if state.get("error"):
        return {}
    alts = _normalize_alternatives(
        state.get("alternatives") or [],
        state.get("category", ""),
    )
    final_score = compute_combined_eco_score(
        state["eco_score"],
        title=state["title"],
        description=state["description"],
        summary=state["summary"],
        hidden_impact=state["hidden_impact"],
        brand=state.get("brand", ""),
        category=state.get("category", ""),
        vision_product_type=state.get("vision_product_type", ""),
        material_guess=state.get("material_guess", ""),
    )
    return {"eco_score": final_score, "alternatives": alts}


def _route_after_sustainability(
    state: AgentState,
) -> Literal["impact_agent", "end"]:
    return "end" if state.get("error") else "impact_agent"


def _route_after_impact(
    state: AgentState,
) -> Literal["alternatives_agent", "end"]:
    return "end" if state.get("error") else "alternatives_agent"


def _route_after_alternatives(
    state: AgentState,
) -> Literal["sdg_agent", "end"]:
    return "end" if state.get("error") else "sdg_agent"


def _route_after_sdg(
    state: AgentState,
) -> Literal["finalize_response", "end"]:
    return "end" if state.get("error") else "finalize_response"


def _build_graph():
    graph = StateGraph(AgentState)
    graph.add_node("sustainability_agent", _sustainability_agent_node)
    graph.add_node("impact_agent", _impact_agent_node)
    graph.add_node("alternatives_agent", _alternatives_agent_node)
    graph.add_node("sdg_agent", _sdg_agent_node)
    graph.add_node("finalize_response", _finalize_response_node)

    graph.set_entry_point("sustainability_agent")
    graph.add_conditional_edges(
        "sustainability_agent",
        _route_after_sustainability,
        {"impact_agent": "impact_agent", "end": END},
    )
    graph.add_conditional_edges(
        "impact_agent",
        _route_after_impact,
        {"alternatives_agent": "alternatives_agent", "end": END},
    )
    graph.add_conditional_edges(
        "alternatives_agent",
        _route_after_alternatives,
        {"sdg_agent": "sdg_agent", "end": END},
    )
    graph.add_conditional_edges(
        "sdg_agent",
        _route_after_sdg,
        {"finalize_response": "finalize_response", "end": END},
    )
    graph.add_edge("finalize_response", END)
    return graph.compile()


_graph = _build_graph()


def run_sustainability_analysis(scraped: dict[str, Any]) -> AnalyzeResponse:
    """
    LangGraph pipeline:
      sustainability_agent → impact_agent → alternatives_agent → sdg_agent → finalize_response
    Finalize blends AI eco_score with rule-based signals and normalizes alternatives.
    """
    initial: AgentState = {
        "url": scraped.get("url", ""),
        "title": scraped.get("title", ""),
        "description": scraped.get("description", ""),
        "price": scraped.get("price", ""),
        "brand": scraped.get("brand", ""),
        "category": scraped.get("category", ""),
        "vision_product_type": scraped.get("vision_product_type", ""),
        "material_guess": scraped.get("material_guess", ""),
        "eco_score": 0,
        "summary": "",
        "hidden_impact": "",
        "alternatives": [],
        "carbon_kg": 0.0,
        "labels": [],
        "sdg_tags": [],
        "sdg_explanation": "",
        "error": "",
    }

    final = _graph.invoke(initial)

    err = final.get("error") or ""
    if err:
        raise RuntimeError(err)

    payload = {
        "eco_score": final["eco_score"],
        "carbon_kg": final["carbon_kg"],
        "labels": final["labels"],
        "summary": final["summary"],
        "hidden_impact": final["hidden_impact"],
        "alternatives": final["alternatives"],
        "sdg_tags": final.get("sdg_tags") or [],
        "sdg_explanation": (final.get("sdg_explanation") or "").strip(),
    }
    try:
        return AnalyzeResponse.model_validate(payload)
    except ValidationError as e:
        raise RuntimeError(f"Invalid model output: {e}") from e
