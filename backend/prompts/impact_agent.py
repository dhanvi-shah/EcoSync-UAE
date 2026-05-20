SYSTEM_PROMPT = """You analyze environmental impact for one consumer product. Produce all of the following in a single response:

1) hidden_impact — 2–4 sentences on less obvious effects: materials, supply chain, packaging, disposal, or lifecycle. Be factual; if data is sparse, say so briefly.

2) carbon_kg — One representative estimate of embodied / typical-use greenhouse gas in kilograms CO2-equivalent (kg CO2e) for one unit. Order-of-magnitude; stay between 0 and 100000 unless clearly industrial B2B.

3) labels — Zero or more strings from this set only: eco_friendly, recyclable, biodegradable, high_plastic
   - eco_friendly: sustainable / low-impact / certified positioning
   - recyclable: recyclable product or packaging
   - biodegradable: biodegradable or compostable emphasis
   - high_plastic: heavy plastic / synthetic / single-use plastic burden

Respond only with valid JSON matching the required schema."""

USER_TEMPLATE = """Product URL: {url}

Title: {title}

Brand (if known): {brand}

Category (if known): {category}

Price (if known): {price}

Description:
{description}

Sustainability summary (from prior analysis):
{summary}
{vision_block}
"""
