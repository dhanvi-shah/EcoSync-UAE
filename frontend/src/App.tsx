import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AnalysisStatsProvider } from "@/context/AnalysisStatsContext";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/home/HomePage";
import RewardsPage from "@/pages/rewards/RewardsPage";
import LeaderboardPage from "@/pages/leaderboard/LeaderboardPage";
import WarehousesPage from "@/pages/warehouses/WarehousesPage";
import BookPickupPage from "@/pages/book-pickup/BookPickupPage";
import BookDropoffPage from "@/pages/book-dropoff/BookDropoffPage";
import SustainableShoppingLayout from "@/pages/sustainable-shopping/SustainableShoppingLayout";
import SustainableShoppingHomePage from "@/pages/sustainable-shopping/SustainableShoppingHomePage";
import InsightsPageRoute from "@/pages/sustainable-shopping/InsightsPageRoute";

const EcoSyncDashboardPage = lazy(() => import("@/pages/dashboard/EcoSyncDashboardPage"));

function DashboardRouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-16">
      <div
        className="rounded-2xl border border-white/10 bg-white/[0.06] px-10 py-8 text-center shadow-glass backdrop-blur-xl"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-medium text-emerald-100/80">
          Loading your dashboard…
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AnalysisStatsProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<DashboardRouteFallback />}>
                  <EcoSyncDashboardPage />
                </Suspense>
              }
            />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/warehouses" element={<WarehousesPage />} />
            <Route path="/book-pickup" element={<BookPickupPage />} />
            <Route path="/book-dropoff" element={<BookDropoffPage />} />
            <Route
              path="/sustainable-shopping"
              element={<SustainableShoppingLayout />}
            >
              <Route index element={<SustainableShoppingHomePage />} />
              <Route path="insights" element={<InsightsPageRoute />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AnalysisStatsProvider>
  );
}
