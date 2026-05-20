export type ShoppingCategoryId =
  | "all"
  | "fashion"
  | "home"
  | "electronics"
  | "beauty"
  | "food"
  | "kids";

export type ProductRecommendation = {
  id: string;
  name: string;
  brand: string;
  category: Exclude<ShoppingCategoryId, "all">;
  ecoScore: number;
  carbonHint: string;
  shopUrl: string;
  badge?: string;
};

export const SHOPPING_CATEGORIES: {
  id: ShoppingCategoryId;
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "fashion", label: "Fashion" },
  { id: "home", label: "Home" },
  { id: "electronics", label: "Electronics" },
  { id: "beauty", label: "Beauty" },
  { id: "food", label: "Food" },
  { id: "kids", label: "Kids" },
];

export const PRODUCT_RECOMMENDATIONS: ProductRecommendation[] = [
  {
    id: "rec-1",
    name: "Organic cotton essentials tee",
    brand: "EarthThread AE",
    category: "fashion",
    ecoScore: 86,
    carbonHint: "~2.1 kg CO₂e · low dye",
    shopUrl: "https://example.com/products/organic-cotton-tee-uae",
    badge: "Staff pick",
  },
  {
    id: "rec-2",
    name: "Refillable glass cleaner concentrate",
    brand: "ClearLoop",
    category: "home",
    ecoScore: 81,
    carbonHint: "~0.4 kg CO₂e / refill",
    shopUrl: "https://example.com/glass-cleaner-refill",
  },
  {
    id: "rec-3",
    name: "Repairable modular earbuds",
    brand: "CircuitKind",
    category: "electronics",
    ecoScore: 72,
    carbonHint: "Spare parts · 5 yr warranty",
    shopUrl: "https://example.com/modular-earbuds",
  },
  {
    id: "rec-4",
    name: "Solid shampoo · no plastic",
    brand: "BarLab",
    category: "beauty",
    ecoScore: 88,
    carbonHint: "Waterless · FSC paper wrap",
    shopUrl: "https://example.com/solid-shampoo-bar",
    badge: "Low waste",
  },
  {
    id: "rec-5",
    name: "UAE-grown dates · bulk",
    brand: "Al Foah Co-op",
    category: "food",
    ecoScore: 79,
    carbonHint: "Short chain · returnable crate",
    shopUrl: "https://example.com/bulk-dates-uae",
  },
  {
    id: "rec-6",
    name: "Recycled PET school backpack",
    brand: "ReGen Kids",
    category: "kids",
    ecoScore: 74,
    carbonHint: "Ocean-bound plastic feedstock",
    shopUrl: "https://example.com/recycled-pet-backpack",
  },
  {
    id: "rec-7",
    name: "Linen bedding set · OEKO-TEX",
    brand: "DesertLoom",
    category: "home",
    ecoScore: 83,
    carbonHint: "Biodegradable fibers",
    shopUrl: "https://example.com/linen-bedding-oeko",
  },
  {
    id: "rec-8",
    name: "Fair-trade athletic joggers",
    brand: "Stride Collective",
    category: "fashion",
    ecoScore: 77,
    carbonHint: "Renewable energy sewing floor",
    shopUrl: "https://example.com/fair-trade-joggers",
  },
];
