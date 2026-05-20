import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import GlassPanel from "@/components/dashboard/GlassPanel";
import { DASHBOARD_KPIS } from "@/data/ecosyncDashboardMock";
import { sectionCard, staggerSection, transitionSmooth } from "@/utils/motionVariants";

type MetricDef = {
  key: string;
  label: string;
  target: number;
  decimals: number;
  prefix?: string;
  suffix: string;
  sub: string;
  glow: "emerald" | "teal" | "violet" | "none";
};

const METRICS: MetricDef[] = [
  {
    key: "recycled",
    label: "Total recycled",
    target: DASHBOARD_KPIS.totalRecycledKg,
    decimals: 1,
    suffix: " kg",
    sub: "Verified weighbridge & locker events",
    glow: "emerald",
  },
  {
    key: "credits",
    label: "Eco credits",
    target: DASHBOARD_KPIS.totalCredits,
    decimals: 0,
    suffix: "",
    sub: "Redeemable with partner network",
    glow: "teal",
  },
  {
    key: "rank",
    label: "Leaderboard",
    target: DASHBOARD_KPIS.leaderboardRank,
    decimals: 0,
    prefix: "#",
    suffix: "",
    sub: "Dubai coastal corridor · monthly",
    glow: "violet",
  },
  {
    key: "co2",
    label: "CO₂ saved",
    target: DASHBOARD_KPIS.co2SavedKg,
    decimals: 1,
    suffix: " kg",
    sub: "Modeled vs. landfill baseline",
    glow: "emerald",
  },
];

function MetricStatBody({
  label,
  target,
  decimals,
  prefix = "",
  suffix,
  sub,
}: Omit<MetricDef, "key" | "glow">) {
  const { ref, formatted } = useCountUp(target, { duration: 2, decimals });

  return (
    <div ref={ref} className="p-6 sm:p-7">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-400/75">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl font-semibold tabular-nums tracking-tight text-white sm:text-4xl">
        <span className="text-emerald-200/95">{prefix}</span>
        {formatted}
        <span className="text-lg font-medium text-emerald-300/85 sm:text-xl">
          {suffix}
        </span>
      </p>
      <p className="mt-2 text-xs leading-relaxed text-emerald-100/50">{sub}</p>
    </div>
  );
}

export default function DashboardMetricCards() {
  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      variants={staggerSection}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
    >
      {METRICS.map((m) => (
        <motion.div key={m.key} variants={sectionCard} transition={transitionSmooth}>
          <GlassPanel glow={m.glow} className="h-full">
            <MetricStatBody
              label={m.label}
              target={m.target}
              decimals={m.decimals}
              prefix={m.prefix}
              suffix={m.suffix}
              sub={m.sub}
            />
          </GlassPanel>
        </motion.div>
      ))}
    </motion.div>
  );
}
