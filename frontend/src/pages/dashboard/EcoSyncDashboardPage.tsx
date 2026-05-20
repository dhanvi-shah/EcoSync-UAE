import { motion } from "framer-motion";
import DashboardMetricCards from "@/components/dashboard/DashboardMetricCards";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import MaterialBreakdownPanel from "@/components/dashboard/MaterialBreakdownPanel";
import RecentActivityPanel from "@/components/dashboard/RecentActivityPanel";
import StreakTracker from "@/components/dashboard/StreakTracker";
import { sectionBlock } from "@/utils/motionVariants";

export default function EcoSyncDashboardPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <motion.header
        variants={sectionBlock}
        initial="hidden"
        animate="show"
        className="mb-10 max-w-3xl lg:mb-12"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400/75">
          EcoSync UAE
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Your impact dashboard
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-emerald-100/60 sm:text-base">
          Live-style telemetry for your household or team pilot—credits,
          materials, routes, and streaks in one glass surface. Connect your data
          sources when you graduate from demo mode.
        </p>
      </motion.header>

      <div className="flex flex-col gap-8 lg:gap-10">
        <DashboardMetricCards />
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <MaterialBreakdownPanel />
          </div>
          <motion.div
            variants={sectionBlock}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-600/5 p-6 shadow-glass backdrop-blur-xl sm:p-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300/80">
              Signal quality
            </p>
            <p className="mt-3 font-display text-lg font-semibold text-white">
              98.2% events verified
            </p>
            <p className="mt-2 text-sm leading-relaxed text-emerald-100/55">
              Chain-of-custody checks across pickups and warehouse weigh-ins.
              Exceptions surface to your ops inbox within minutes.
            </p>
            <div className="mt-6 space-y-3 text-xs text-emerald-100/50">
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span>Contamination flags</span>
                <span className="tabular-nums text-emerald-200/90">2</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span>On-time arrivals</span>
                <span className="tabular-nums text-emerald-200/90">94%</span>
              </div>
              <div className="flex justify-between">
                <span>Credits pending audit</span>
                <span className="tabular-nums text-amber-200/90">120</span>
              </div>
            </div>
          </motion.div>
        </div>
        <DashboardCharts />
        <StreakTracker />
        <RecentActivityPanel />
      </div>
    </div>
  );
}
