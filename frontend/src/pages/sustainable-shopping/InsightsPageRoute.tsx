import { useAnalysisStats } from "@/context/AnalysisStatsContext";
import DashboardPage from "@/pages/dashboard/DashboardPage";

export default function InsightsPageRoute() {
  const { totalProducts, averageEcoScore, totalCarbonKg } = useAnalysisStats();
  return (
    <DashboardPage
      totalProducts={totalProducts}
      averageEcoScore={averageEcoScore}
      totalCarbonKg={totalCarbonKg}
    />
  );
}
