export type EcoLabel =
  | "eco_friendly"
  | "recyclable"
  | "biodegradable"
  | "high_plastic";

export type ProductAlternative = {
  product_type: string;
  why_better: string;
  price_range?: string;
};

export type AnalyzeResult = {
  eco_score: number;
  carbon_kg: number;
  labels: EcoLabel[];
  summary: string;
  hidden_impact: string;
  alternatives: ProductAlternative[];
  /** e.g. ["SDG 12", "SDG 13"] */
  sdg_tags: string[];
  sdg_explanation: string;
};
