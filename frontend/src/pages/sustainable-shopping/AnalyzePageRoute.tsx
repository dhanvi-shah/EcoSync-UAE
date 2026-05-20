import AnalyzePage from "@/pages/analyze/AnalyzePage";
import { useAnalysisStats } from "@/context/AnalysisStatsContext";

type Props = {
  variant?: "full" | "embedded";
};

export default function AnalyzePageRoute({ variant = "full" }: Props) {
  const { recordAnalysis } = useAnalysisStats();
  return (
    <AnalyzePage
      onAnalysisRecorded={recordAnalysis}
      variant={variant}
    />
  );
}
