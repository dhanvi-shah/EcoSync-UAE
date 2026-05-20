export type ScoreTier = "good" | "mid" | "bad";

export function getScoreTier(score: number): ScoreTier {
  const s = Math.min(100, Math.max(0, score));
  if (s >= 67) return "good";
  if (s >= 34) return "mid";
  return "bad";
}

export const tierVisual: Record<
  ScoreTier,
  {
    ringRgb: string;
    trackRgb: string;
    label: string;
    scoreText: string;
    subline: string;
  }
> = {
  good: {
    ringRgb: "rgb(52 211 153)",
    trackRgb: "rgb(15 23 42 / 0.85)",
    label: "Strong sustainability",
    scoreText: "text-emerald-300",
    subline: "text-emerald-400/90",
  },
  mid: {
    ringRgb: "rgb(250 204 21)",
    trackRgb: "rgb(15 23 42 / 0.85)",
    label: "Mixed impact",
    scoreText: "text-amber-200",
    subline: "text-amber-300/90",
  },
  bad: {
    ringRgb: "rgb(248 113 113)",
    trackRgb: "rgb(15 23 42 / 0.85)",
    label: "High impact risk",
    scoreText: "text-red-300",
    subline: "text-red-400/90",
  },
};
