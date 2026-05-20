from __future__ import annotations

import json
import re
from typing import Any
from urllib.parse import unquote, urlparse

import certifi
import requests
from bs4 import BeautifulSoup, Tag

from models import ProductScrape

# Use Mozilla CA bundle so HTTPS fetches work when OS trust store is incomplete (common on Windows).
_VERIFY_TLS = certifi.where()

DEFAULT_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

TIMEOUT_S = 20
MAX_LEN = 8000


def _clean(text: str | None) -> str:
    if not text:
        return ""
    out = re.sub(r"\s+", " ", text).strip()
    return out[:MAX_LEN]


def _meta_by_property(soup: BeautifulSoup, prop: str) -> str:
    tag = soup.find("meta", attrs={"property": prop})
    if tag and tag.get("content"):
        return _clean(str(tag.get("content")))
    return ""


def _meta_by_name(soup: BeautifulSoup, name: str) -> str:
    tag = soup.find("meta", attrs={"name": re.compile(rf"^{re.escape(name)}$", re.I)})
    if tag and tag.get("content"):
        return _clean(str(tag.get("content")))
    return ""


def _itemprop(soup: BeautifulSoup, name: str) -> str:
    el = soup.find(attrs={"itemprop": name})
    if not el:
        return ""
    c = el.get("content")
    if c:
        return _clean(str(c))
    return _clean(el.get_text())


def _iter_json_ld_objects(data: Any) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    if isinstance(data, dict):
        out.append(data)
        for v in data.values():
            out.extend(_iter_json_ld_objects(v))
    elif isinstance(data, list):
        for item in data:
            out.extend(_iter_json_ld_objects(item))
    return out


def _flatten_json_ld_root(data: Any) -> list[dict[str, Any]]:
    """Expand @graph and nested structures into a flat list of dicts."""
    if isinstance(data, dict):
        if "@graph" in data and isinstance(data["@graph"], list):
            blocks: list[dict[str, Any]] = []
            for item in data["@graph"]:
                blocks.extend(_iter_json_ld_objects(item))
            return blocks
        return _iter_json_ld_objects(data)
    if isinstance(data, list):
        blocks = []
        for item in data:
            blocks.extend(_flatten_json_ld_root(item))
        return blocks
    return []


def _parse_json_ld_blocks(soup: BeautifulSoup) -> list[dict[str, Any]]:
    blocks: list[dict[str, Any]] = []
    for script in soup.find_all("script", type=re.compile(r"application/ld\+json", re.I)):
        raw = (script.string or script.get_text() or "").strip()
        if not raw:
            continue
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            continue
        blocks.extend(_flatten_json_ld_root(data))
    return blocks


def _is_schema_type(obj: dict[str, Any], *names: str) -> bool:
    t = obj.get("@type")
    candidates: set[str] = set()
    if isinstance(t, str):
        candidates.add(t.lower())
    elif isinstance(t, list):
        candidates.update(str(x).lower() for x in t)
    return any(n.lower() in candidates for n in names)


def _brand_from_obj(obj: dict[str, Any]) -> str:
    b = obj.get("brand")
    if isinstance(b, str):
        return _clean(b)
    if isinstance(b, dict):
        n = b.get("name")
        if isinstance(n, str):
            return _clean(n)
    return ""


def _price_from_offers(offers: Any) -> str:
    if offers is None:
        return ""
    items = offers if isinstance(offers, list) else [offers]
    for o in items:
        if not isinstance(o, dict):
            continue
        price = o.get("price") or o.get("lowPrice") or o.get("highPrice")
        cur = o.get("priceCurrency") or ""
        if price is not None and str(price).strip():
            p = _clean(str(price))
            c = _clean(str(cur)) if cur else ""
            return f"{p} {c}".strip() if c else p
    return ""


def _category_from_product(obj: dict[str, Any]) -> str:
    cat = obj.get("category")
    if isinstance(cat, str):
        return _clean(cat)
    if isinstance(cat, list) and cat:
        parts = [str(x).strip() for x in cat if x]
        return _clean(" > ".join(parts[:5]))
    return ""


def _extract_from_json_ld(soup: BeautifulSoup) -> dict[str, str]:
    title = ""
    description = ""
    price = ""
    brand = ""
    category = ""

    for obj in _parse_json_ld_blocks(soup):
        if _is_schema_type(obj, "Product", "IndividualProduct", "ProductModel"):
            if not brand:
                brand = _brand_from_obj(obj)
            if not price:
                price = _price_from_offers(obj.get("offers"))
            if not category:
                category = _category_from_product(obj)
            if not description:
                d = obj.get("description")
                if isinstance(d, str):
                    description = _clean(d)
            if not title:
                n = obj.get("name")
                if isinstance(n, str):
                    title = _clean(n)

        if _is_schema_type(obj, "BreadcrumbList"):
            if category:
                continue
            crumbs: list[str] = []
            elist = obj.get("itemListElement") or []
            if isinstance(elist, list):
                for it in elist:
                    if not isinstance(it, dict):
                        continue
                    item = it.get("item")
                    if isinstance(item, str):
                        crumbs.append(_clean(unquote(item.split("/")[-1] or item)))
                    elif isinstance(item, dict):
                        nm = item.get("name")
                        if isinstance(nm, str):
                            crumbs.append(_clean(nm))
            if crumbs:
                category = _clean(" > ".join(crumbs[:6]))

    return {
        "title": title,
        "description": description,
        "price": price,
        "brand": brand,
        "category": category,
    }


def _extract_title(soup: BeautifulSoup) -> str:
    t = _meta_by_property(soup, "og:title") or _meta_by_name(soup, "twitter:title")
    if t:
        return t
    if soup.title and soup.title.string:
        return _clean(soup.title.string)
    h1 = soup.find("h1")
    if h1:
        return _clean(h1.get_text())
    return ""


def _extract_description(soup: BeautifulSoup) -> str:
    return (
        _meta_by_property(soup, "og:description")
        or _meta_by_name(soup, "twitter:description")
        or _meta_by_name(soup, "description")
    )


def _extract_price_dom(soup: BeautifulSoup) -> str:
    # Open Graph / product meta
    p = _meta_by_property(soup, "product:price:amount") or _meta_by_name(
        soup, "twitter:data1"
    )
    if p:
        cur = _meta_by_property(soup, "product:price:currency") or ""
        return f"{_clean(p)} {_clean(cur)}".strip() if cur else _clean(p)

    ip = _itemprop(soup, "price")
    if ip:
        return ip

    for sel in (
        "[data-price]",
        "[data-product-price]",
        ".price",
        "#price",
        "[itemprop=price]",
    ):
        el = soup.select_one(sel)
        if el:
            val = el.get("content") or el.get("data-price") or el.get_text()
            if val:
                return _clean(val)
    return ""


def _extract_brand_dom(soup: BeautifulSoup) -> str:
    b = (
        _meta_by_property(soup, "product:brand")
        or _meta_by_name(soup, "brand")
        or _itemprop(soup, "brand")
    )
    if b:
        return b
    el = soup.find(attrs={"itemprop": "brand"})
    if el and isinstance(el, Tag):
        if el.name == "meta" and el.get("content"):
            return _clean(str(el.get("content")))
        return _clean(el.get_text())
    return ""


def _guess_category_from_breadcrumbs(soup: BeautifulSoup) -> str:
    nav = soup.find("nav", attrs={"aria-label": re.compile(r"breadcrumb", re.I)})
    if nav:
        links = nav.find_all("a")
        parts = [_clean(a.get_text()) for a in links if _clean(a.get_text())]
        if len(parts) > 1:
            return _clean(" > ".join(parts[1:][:8]))
    ol = soup.find("ol", class_=re.compile(r"breadcrumb", re.I))
    if ol:
        items = ol.find_all("li")
        parts = [_clean(li.get_text()) for li in items if _clean(li.get_text())]
        if parts:
            return _clean(" > ".join(parts[:8]))
    return ""


def _looks_like_product_slug(seg: str) -> bool:
    s = seg.lower()
    if re.search(r"_\d+$", s) or re.match(r"^[a-z0-9-]+-\d+$", s):
        return True
    if re.match(r"^[bB]\d{2}[a-zA-Z0-9]{6,}$", s):  # Amazon-style ASIN-ish
        return True
    return False


def _guess_category_from_url(url: str) -> str:
    try:
        path = urlparse(url).path.strip("/")
    except Exception:
        return ""
    if not path:
        return ""
    raw_segs = [s for s in path.split("/") if s and not s.lower().endswith(".html")]
    segments = [unquote(s).replace("-", " ").strip() for s in raw_segs]
    skip = {"product", "products", "item", "dp", "p", "shop", "index.html", "index"}
    filtered = [s for s in segments if s.lower() not in skip and len(s) < 80]
    while filtered and _looks_like_product_slug(filtered[-1]):
        filtered.pop()
    if len(filtered) >= 2:
        return _clean(" > ".join(filtered[:-1][:5]).title())
    if len(filtered) == 1:
        return _clean(filtered[0].title())
    return ""


def _guess_category_heuristic(title: str, description: str) -> str:
    text = f"{title} {description}".lower()
    hints = (
        ("electronics", ("phone", "laptop", "tablet", "usb", "charger", "headphone")),
        ("clothing", ("shirt", "dress", "jacket", "jeans", "apparel", "cotton")),
        ("home", ("mattress", "furniture", "decor", "kitchen", "bedding")),
        ("beauty", ("skincare", "moisturizer", "shampoo", "cosmetic", "serum")),
        ("food", ("organic", "snack", "coffee", "tea", "grocery")),
        ("sports", ("running", "yoga", "fitness", "bike", "gym")),
    )
    for label, keywords in hints:
        if any(k in text for k in keywords):
            return label.title()
    return ""


def scrape_product(product_url: str) -> ProductScrape:
    """
    Fetch HTML and extract title, description, price, brand, category (best-effort).
    Raises ValueError if the URL cannot be fetched or is not HTML.
    """
    try:
        resp = requests.get(
            product_url,
            headers=DEFAULT_HEADERS,
            timeout=TIMEOUT_S,
            verify=_VERIFY_TLS,
        )
        resp.raise_for_status()
    except requests.RequestException as e:
        raise ValueError(f"Failed to fetch URL: {e}") from e

    ctype = (resp.headers.get("Content-Type") or "").lower()
    if "html" not in ctype and "xml" not in ctype:
        raise ValueError("URL did not return HTML content.")

    soup = BeautifulSoup(resp.text, "html.parser")
    ld = _extract_from_json_ld(soup)

    title = ld["title"] or _extract_title(soup)
    description = ld["description"] or _extract_description(soup)
    price = ld["price"] or _extract_price_dom(soup)
    brand = ld["brand"] or _extract_brand_dom(soup)
    category = ld["category"] or _guess_category_from_breadcrumbs(soup)
    if not category:
        category = _guess_category_from_url(product_url)
    if not category:
        category = _guess_category_heuristic(title, description)

    return ProductScrape(
        title=title,
        description=description,
        price=price,
        brand=brand,
        category=category,
    )
