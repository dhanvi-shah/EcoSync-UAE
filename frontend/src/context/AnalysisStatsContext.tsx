import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AnalyzeResult } from "@/types";
import {
  appendAnalysis,
  loadAggregates,
  persistAggregates,
  type AnalysisAggregates,
} from "@/utils/analysisStatsStorage";

export type DashboardStats = {
  totalProducts: number;
  averageEcoScore: number;
  totalCarbonKg: number;
};

type AnalysisStatsValue = DashboardStats & {
  recordAnalysis: (result: AnalyzeResult) => void;
};

const AnalysisStatsContext = createContext<AnalysisStatsValue | null>(null);

function deriveStats(agg: AnalysisAggregates): DashboardStats {
  const n = agg.totalCount;
  return {
    totalProducts: n,
    averageEcoScore: n > 0 ? agg.sumEcoScore / n : 0,
    totalCarbonKg: agg.sumCarbonKg,
  };
}

export function AnalysisStatsProvider({ children }: { children: ReactNode }) {
  const [aggregates, setAggregates] = useState(() => loadAggregates());

  const recordAnalysis = useCallback((result: AnalyzeResult) => {
    setAggregates((prev) => {
      const next = appendAnalysis(prev, result);
      persistAggregates(next);
      return next;
    });
  }, []);

  const stats = useMemo(() => deriveStats(aggregates), [aggregates]);

  const value = useMemo<AnalysisStatsValue>(
    () => ({
      ...stats,
      recordAnalysis,
    }),
    [stats, recordAnalysis]
  );

  return (
    <AnalysisStatsContext.Provider value={value}>
      {children}
    </AnalysisStatsContext.Provider>
  );
}

export function useAnalysisStats(): AnalysisStatsValue {
  const ctx = useContext(AnalysisStatsContext);
  if (!ctx) {
    throw new Error("useAnalysisStats must be used within AnalysisStatsProvider");
  }
  return ctx;
}
