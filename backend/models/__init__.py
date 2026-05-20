from __future__ import annotations

from pydantic import BaseModel, Field, field_validator, model_validator

from utils.eco_labels import ECO_LABEL_ORDER, merge_and_order_labels
from utils.sdg_tags import normalize_sdg_tags


class ProductScrape(BaseModel):
    """Structured output from `services.scraper.scrape_product`."""

    title: str = ""
    description: str = ""
    price: str = ""
    brand: str = ""
    category: str = ""


class ProductAlternative(BaseModel):
    """A concrete swap suggestion with rationale (not a generic search hint)."""

    product_type: str = Field(
        ...,
        min_length=3,
        max_length=240,
        description="Specific product form, material, or item class (e.g. 'Fair Trade organic cotton crewneck tee')",
    )
    why_better: str = Field(
        ...,
        min_length=15,
        max_length=900,
        description="Why this option beats the original on sustainability or impact",
    )
    price_range: str = Field(
        default="",
        max_length=180,
        description="Optional indicative price band (currency-agnostic), e.g. '$35–$55' or 'similar to original'",
    )


class AnalyzeRequest(BaseModel):
    product_url: str = Field(
        default="",
        description="Product page URL (optional if image_base64 is sent)",
    )
    image_base64: str | None = Field(
        default=None,
        description="Base64-encoded image (optionally data:image/...;base64,... prefix)",
    )

    @field_validator("product_url")
    @classmethod
    def normalize_product_url(cls, v: str) -> str:
        u = v.strip()
        if not u:
            return ""
        if not u.startswith(("http://", "https://")):
            u = "https://" + u
        return u

    @model_validator(mode="after")
    def require_url_or_image(self) -> AnalyzeRequest:
        has_url = bool(self.product_url.strip())
        has_img = bool((self.image_base64 or "").strip())
        if not has_url and not has_img:
            raise ValueError("Provide product_url and/or image_base64.")
        if has_url and len(self.product_url.strip()) < 4 and not has_img:
            raise ValueError("product_url must be at least 4 characters, or send an image.")
        return self


class AnalyzeResponse(BaseModel):
    eco_score: int = Field(..., ge=0, le=100)
    carbon_kg: float = Field(..., ge=0, le=100_000, description="Estimated kg CO2e (order-of-magnitude)")
    labels: list[str] = Field(
        default_factory=list,
        description="Subset of: eco_friendly, recyclable, biodegradable, high_plastic",
    )
    summary: str
    hidden_impact: str
    alternatives: list[ProductAlternative] = Field(default_factory=list)
    sdg_tags: list[str] = Field(
        default_factory=list,
        description='UN SDG labels, e.g. ["SDG 12", "SDG 13"]',
    )
    sdg_explanation: str = Field(
        default="",
        max_length=1200,
        description="Brief mapping of product impact to the selected SDGs",
    )

    @field_validator("labels")
    @classmethod
    def normalize_labels(cls, v: list[str]) -> list[str]:
        return merge_and_order_labels([x for x in v if x in set(ECO_LABEL_ORDER)])

    @field_validator("sdg_tags", mode="before")
    @classmethod
    def normalize_sdgs(cls, v: object) -> list[str]:
        if v is None:
            return []
        if isinstance(v, list):
            return normalize_sdg_tags([str(x) for x in v])
        return []

    @field_validator("alternatives")
    @classmethod
    def max_three_alternatives(cls, v: list[ProductAlternative]) -> list[ProductAlternative]:
        return v[:3]

    @field_validator("sdg_explanation")
    @classmethod
    def strip_sdg_explanation(cls, v: str) -> str:
        s = (v or "").strip()
        return s[:1200]

