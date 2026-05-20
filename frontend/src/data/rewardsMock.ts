/**
 * Rewards demo data — replace with API.
 * Rule: 1,000 credits per 25 kg verified recycling.
 */
export const CREDITS_PER_TRANCHE = 1000;
export const KG_PER_TRANCHE = 25;

export const REWARDS_USER = {
  /** Spendable balance */
  creditsBalance: 18_420,
  /** Lifetime verified kg (for display + tranche math) */
  lifetimeKgVerified: 472.5,
} as const;

export type CouponBrand = "noon" | "careem" | "etisalat" | "amazon";

export type MarketplaceCoupon = {
  id: string;
  brand: CouponBrand;
  brandLabel: string;
  rewardType: string;
  creditsRequired: number;
  /** Tailwind gradient for brand strip */
  accentClass: string;
};

export const MARKETPLACE_COUPONS: MarketplaceCoupon[] = [
  {
    id: "noon-25",
    brand: "noon",
    brandLabel: "Noon",
    rewardType: "AED 25 e-voucher",
    creditsRequired: 12_000,
    accentClass: "from-amber-400/90 to-yellow-600/50",
  },
  {
    id: "careem-30",
    brand: "careem",
    brandLabel: "Careem",
    rewardType: "AED 30 ride credit",
    creditsRequired: 15_000,
    accentClass: "from-emerald-400/90 to-teal-700/50",
  },
  {
    id: "etisalat-data",
    brand: "etisalat",
    brandLabel: "Etisalat",
    rewardType: "5GB data add-on",
    creditsRequired: 20_000,
    accentClass: "from-red-400/85 to-rose-700/45",
  },
  {
    id: "amazon-50",
    brand: "amazon",
    brandLabel: "Amazon UAE",
    rewardType: "AED 50 gift card",
    creditsRequired: 25_000,
    accentClass: "from-orange-400/90 to-amber-800/45",
  },
];

/** Next coupon unlock: lowest requirement strictly greater than balance (if any). */
export function getNextCouponUnlock(
  balance: number,
  coupons: MarketplaceCoupon[]
): MarketplaceCoupon | null {
  const sorted = [...coupons]
    .filter((c) => c.creditsRequired > balance)
    .sort((a, b) => a.creditsRequired - b.creditsRequired);
  return sorted[0] ?? null;
}

/** Credits earned from recycling only (discrete 25 kg tranches). */
export function creditsFromRecyclingKg(kg: number): number {
  return Math.floor(kg / KG_PER_TRANCHE) * CREDITS_PER_TRANCHE;
}

/** Progress 0–1 within current 25 kg tranche toward next 1,000 credits. */
export function trancheProgress(kg: number): number {
  const inTranche = kg % KG_PER_TRANCHE;
  return inTranche / KG_PER_TRANCHE;
}
