from __future__ import annotations

# Canonical order for API responses
ECO_LABEL_ORDER: tuple[str, ...] = (
    "eco_friendly",
    "recyclable",
    "biodegradable",
    "high_plastic",
)

_ALLOWED = set(ECO_LABEL_ORDER)


def detect_eco_labels_from_text(text: str) -> list[str]:
    """
    Heuristic keyword detection from page + analysis text (no LLM).
    """
    if not text or not text.strip():
        return []
    t = text.lower()
    found: list[str] = []

    if any(
        k in t
        for k in (
            "eco-friendly",
            "eco friendly",
            "sustainable",
            "carbon neutral",
            "climate neutral",
            "b-corp",
            "bcorp",
            "green certified",
            "environmentally friendly",
        )
    ):
        found.append("eco_friendly")

    if any(
        k in t
        for k in (
            "recyclable",
            "recycle",
            "recycled content",
            "widely recycled",
            "recycling",
        )
    ):
        found.append("recyclable")

    if any(
        k in t
        for k in (
            "biodegradable",
            "compostable",
            "bio-based",
            "biobased",
        )
    ):
        found.append("biodegradable")

    if any(
        k in t
        for k in (
            "plastic-heavy",
            "plastic heavy",
            "single-use plastic",
            "single use plastic",
            "microplastic",
            "polyester",
            "polypropylene",
            "pvc packaging",
            "pet bottle",
            "virgin plastic",
        )
    ):
        found.append("high_plastic")

    return merge_and_order_labels(found)


def merge_and_order_labels(labels: list[str]) -> list[str]:
    """Deduplicate and order using ECO_LABEL_ORDER."""
    seen = {x for x in labels if x in _ALLOWED}
    return [x for x in ECO_LABEL_ORDER if x in seen]
