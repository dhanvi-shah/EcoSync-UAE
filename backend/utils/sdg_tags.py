from __future__ import annotations

import re

_SDG_RE = re.compile(r"SDG\s*(\d{1,2})", re.IGNORECASE)


def normalize_sdg_tags(raw: list[str]) -> list[str]:
    """
    Keep only SDG 1–17, canonical form 'SDG N', dedupe, sort by goal number.
    """
    seen: set[str] = set()
    out: list[str] = []
    for item in raw:
        if not item or not str(item).strip():
            continue
        m = _SDG_RE.search(str(item).strip())
        if not m:
            continue
        n = int(m.group(1))
        if 1 <= n <= 17:
            label = f"SDG {n}"
            if label not in seen:
                seen.add(label)
                out.append(label)
    out.sort(key=lambda s: int(s.split()[1]))
    return out[:8]
