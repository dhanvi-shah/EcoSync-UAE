from __future__ import annotations

import re

# Blend weights: AI judgment + deterministic signals (must sum to 1.0 for clarity).
_WEIGHT_AI = 0.55
_WEIGHT_RULE = 0.45

# Rule model: neutral midpoint, then penalties / bonuses (each clamped).
_RULE_NEUTRAL = 50
_PLASTIC_HIT = 10
_PLASTIC_CAP = 40
_REUSABLE_HIT = 9
_REUSABLE_CAP = 27
_ORGANIC_HIT = 9
_ORGANIC_CAP = 27

_PLASTIC_FREE = re.compile(
    r"plastic[-\s]?free|no\s+plastic|zero\s+plastic|without\s+plastic|bpa[-\s]?free",
    re.IGNORECASE,
)

# Plastic-heavy / fossil-based synthetics (substring match on lowercased text).
_PLASTIC_TERMS: tuple[str, ...] = (
    "plastic",
    "polyester",
    "polypropylene",
    "polystyrene",
    "polyethylene",
    "polyurethane",
    "pvc",
    "acrylic",
    "nylon",
    "microplastic",
    "microfibre",
    "microfiber",
    "synthetic leather",
    "pleather",
    "vinyl",
    "polycarbonate",
    "abs plastic",
)

_REUSABLE_TERMS: tuple[str, ...] = (
    "reusable",
    "refillable",
    "refill",
    "durable",
    "long-lasting",
    "long lasting",
    "stainless steel",
    "glass container",
    "metal tin",
    "lifetime warranty",
    "washable",
)

_ORGANIC_TERMS: tuple[str, ...] = (
    "organic",
    "organic cotton",
    "gots",
    "oeko-tex",
    "oeko tex",
    "hemp",
    "linen",
    "wool",
    "cork",
    "bamboo",
    "tencel",
    "lyocell",
    "natural rubber",
    "fsc certified",
    "fsc-certified",
)


def _count_hits(text_lower: str, terms: tuple[str, ...]) -> int:
    return sum(1 for term in terms if term in text_lower)


def compute_rule_based_score(text: str) -> int:
    """
    Deterministic 0–100 score from product copy (plastic / reusable / organic signals).
    """
    raw = text.strip()
    if not raw:
        return _RULE_NEUTRAL

    t = raw.lower()
    plastic_hits = _count_hits(t, _PLASTIC_TERMS)
    plastic_penalty = min(_PLASTIC_CAP, plastic_hits * _PLASTIC_HIT)

    if _PLASTIC_FREE.search(raw):
        plastic_penalty = int(plastic_penalty * 0.25)

    reusable_hits = _count_hits(t, _REUSABLE_TERMS)
    reusable_bonus = min(_REUSABLE_CAP, reusable_hits * _REUSABLE_HIT)

    organic_hits = _count_hits(t, _ORGANIC_TERMS)
    organic_bonus = min(_ORGANIC_CAP, organic_hits * _ORGANIC_HIT)

    score = _RULE_NEUTRAL - plastic_penalty + reusable_bonus + organic_bonus
    return max(0, min(100, score))


def compute_combined_eco_score(
    ai_score: int,
    *,
    title: str,
    description: str,
    summary: str,
    hidden_impact: str,
    brand: str = "",
    category: str = "",
    vision_product_type: str = "",
    material_guess: str = "",
) -> int:
    """
    Blend model-estimated score with rule-based score; return normalized 0–100.
    """
    ai_clamped = max(0, min(100, int(ai_score)))
    corpus = "\n".join(
        part
        for part in (
            title,
            description,
            summary,
            hidden_impact,
            brand,
            category,
            vision_product_type,
            material_guess,
        )
        if part and part.strip()
    )
    rule_score = compute_rule_based_score(corpus)
    blended = _WEIGHT_AI * ai_clamped + _WEIGHT_RULE * rule_score
    return max(0, min(100, int(round(blended))))
