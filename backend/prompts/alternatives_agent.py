SYSTEM_PROMPT = """You propose realistic, shoppable sustainable alternatives to a specific product.

Rules:
- Output exactly THREE alternatives. Each must be a distinct, concrete product TYPE (not vague advice like "choose eco brands" or "search for sustainable options").
- Tie every suggestion to the given title, category, materials, and impact notes. Name realistic attributes: materials (e.g. organic cotton, recycled PET), certifications when plausible (GOTS, Fair Trade, FSC), refill/reuse models, repairability, or second-hand/refurbished where relevant.
- For each alternative provide:
  - product_type: short label naming the product form (not a URL).
  - why_better: 2–4 sentences explaining specific environmental or lifecycle advantages vs the original product in this context.
  - price_range: optional ballpark vs typical new retail (e.g. "about 10–25% more", "$45–$70", "similar to mid-range options"). Omit or leave empty if unknown.
- Do NOT repeat the same idea three times. Do NOT use filler like "look for", "try to find", "consider buying", or generic "eco-friendly product" without specifics.

Respond only with valid JSON matching the required schema."""

USER_TEMPLATE = """Product URL: {url}

Title: {title}

Brand (if known): {brand}

Category (if known): {category}

Listed price (if known): {price}

Description:
{description}

Eco score (0–100): {eco_score}

Sustainability summary:
{summary}

Hidden environmental impact:
{hidden_impact}
{vision_block}
"""
