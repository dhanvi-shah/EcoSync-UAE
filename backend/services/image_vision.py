from __future__ import annotations

import base64
import re
from typing import Final

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field

from config import get_settings
from prompts.vision_image import SYSTEM_PROMPT, USER_TEXT

_MAX_B64_CHARS: Final[int] = 12_000_000  # ~9MB binary as base64


class VisionExtractOutput(BaseModel):
    product_type: str = Field(..., min_length=2, max_length=220)
    material_guess: str = Field(..., min_length=2, max_length=600)


def _strip_data_url_prefix(raw: str) -> tuple[str, str]:
    """
    Return (mime_subtype, base64_payload) e.g. ('jpeg', '...').
    If no data URL, assume jpeg for mime.
    """
    s = raw.strip().replace("\n", "").replace("\r", "")
    if len(s) > _MAX_B64_CHARS:
        raise ValueError("Image payload is too large (max ~9MB).")

    if s.startswith("data:"):
        m = re.match(
            r"data:image/([^;]+);base64,(.+)",
            s,
            re.DOTALL | re.IGNORECASE,
        )
        if not m:
            raise ValueError("Invalid data URL: expected data:image/...;base64,...")
        mime = m.group(1).strip().lower()
        b64_payload = m.group(2).strip()
        return mime, b64_payload

    return "jpeg", s


def extract_product_from_image_base64(image_base64: str) -> dict[str, str]:
    """
    OpenAI vision: infer product_type and material_guess from an image (base64 or data URL).
    """
    settings = get_settings()
    if not settings.openai_api_key:
        raise ValueError("OPENAI_API_KEY is not configured.")

    mime, b64_payload = _strip_data_url_prefix(image_base64)
    try:
        raw = base64.b64decode(b64_payload, validate=False)
    except Exception as e:
        raise ValueError("Invalid base64 image data.") from e
    if len(raw) > 10 * 1024 * 1024:
        raise ValueError("Decoded image exceeds 10MB.")

    data_url = f"data:image/{mime};base64,{b64_payload}"

    llm = ChatOpenAI(
        api_key=settings.openai_api_key,
        model=settings.openai_vision_model,
        temperature=0.2,
    )
    structured = llm.with_structured_output(VisionExtractOutput)

    try:
        result: VisionExtractOutput = structured.invoke(
            [
                SystemMessage(content=SYSTEM_PROMPT),
                HumanMessage(
                    content=[
                        {"type": "text", "text": USER_TEXT},
                        {
                            "type": "image_url",
                            "image_url": {"url": data_url},
                        },
                    ]
                ),
            ]
        )
    except Exception as e:
        raise ValueError(f"Image analysis failed: {e}") from e

    return {
        "vision_product_type": result.product_type.strip(),
        "material_guess": result.material_guess.strip(),
    }
