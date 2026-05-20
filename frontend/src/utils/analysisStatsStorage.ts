import type { AnalyzeResult } from "@/types";

const STORAGE_KEY = "ssa_analysis_stats_v1";

export type AnalysisAggregates = {
  totalCount: number;
  sumEcoScore: number;
  sumCarbonKg: number;
};

function emptyAggregates(): AnalysisAggregates {
  return { totalCount: 0, sumEcoScore: 0, sumCarbonKg: 0 };
}

export function loadAggregates(): AnalysisAggregates {
  if (typeof window === "undefined") {
    return emptyAggregates();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return emptyAggregates();
    }
    const p = JSON.parse(raw) as Partial<AnalysisAggregates>;
    return {
      totalCount: Math.max(0, Number(p.totalCount) || 0),
      sumEcoScore: Math.max(0, Number(p.sumEcoScore) || 0),
      sumCarbonKg: Math.max(0, Number(p.sumCarbonKg) || 0),
    };
  } catch {
    return emptyAggregates();
  }
}

export function persistAggregates(agg: AnalysisAggregates): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(agg));
  } catch {
    /* quota or private mode */
  }
}

export function appendAnalysis(
  current: AnalysisAggregates,
  result: AnalyzeResult
): AnalysisAggregates {
  const eco = Number(result.eco_score);
  const carbon = Number(result.carbon_kg);
  return {
    totalCount: current.totalCount + 1,
    sumEcoScore: current.sumEcoScore + (Number.isFinite(eco) ? eco : 0),
    sumCarbonKg: current.sumCarbonKg + (Number.isFinite(carbon) ? carbon : 0),
  };
}
