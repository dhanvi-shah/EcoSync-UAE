from fastapi import APIRouter, HTTPException

from models import AnalyzeRequest, AnalyzeResponse, ProductScrape
from services.ai_agent import run_sustainability_analysis
from services.image_vision import extract_product_from_image_base64
from services.scraper import scrape_product

router = APIRouter(tags=["analyze"])


@router.post("/analyze", response_model=AnalyzeResponse)
def analyze_product(body: AnalyzeRequest) -> AnalyzeResponse:
    vision_pt = ""
    vision_mat = ""
    if body.image_base64 and body.image_base64.strip():
        try:
            v = extract_product_from_image_base64(body.image_base64)
            vision_pt = v["vision_product_type"]
            vision_mat = v["material_guess"]
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e)) from e

    scraped = ProductScrape().model_dump()
    if body.product_url.strip():
        try:
            scraped = scrape_product(body.product_url).model_dump()
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e)) from e

    merged: dict = {
        **scraped,
        "url": body.product_url.strip(),
        "vision_product_type": vision_pt,
        "material_guess": vision_mat,
    }
    if not (merged.get("title") or "").strip() and vision_pt:
        merged["title"] = vision_pt
    if not (merged.get("description") or "").strip() and vision_mat:
        merged["description"] = f"Material observation from photo: {vision_mat}"

    try:
        return run_sustainability_analysis(merged)
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail=str(e)) from e
