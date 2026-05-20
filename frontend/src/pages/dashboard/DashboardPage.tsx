import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { getScoreTier, tierVisual } from "@/components/analysis/scoreTier";
import {
  dashboardContainer,
  dashboardItem,
  springSoft,
} from "@/utils/motionVariants";

type Props = {
  totalProducts: number;
  averageEcoScore: number;
  totalCarbonKg: number;
};

function IconStack({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6.878V6a2 2 0 012-2h8a2 2 0 012 2v.878m-12 0V18a2 2 0 002 2h8a2 2 0 002-2V6.878m-12 0H4a2 2 0 00-2 2v8a2 2 0 002 2h2"
      />
    </svg>
  );
}

function IconGauge({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function IconCloud({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
      />
    </svg>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon,
  accentClass,
  variants,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: ReactNode;
  accentClass: string;
  variants?: Variants;
}) {
  return (
    <motion.div
      variants={variants}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-xl ${accentClass}`}
      whileHover={{ y: -4, transition: springSoft }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {label}
        </p>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-emerald-300 transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-400/30 group-hover:bg-emerald-500/15">
          {icon}
        </span>
      </div>
      <p className="text-3xl font-semibold tabular-nums tracking-tight text-white">
        {value}
      </p>
      {hint && (
        <p className="mt-3 text-xs leading-relaxed text-gray-400">{hint}</p>
      )}
    </motion.div>
  );
}

export default function DashboardPage({
  totalProducts,
  averageEcoScore,
  totalCarbonKg,
}: Props) {
  const avgRounded =
    totalProducts > 0 ? averageEcoScore.toFixed(1) : "—";
  const carbonRounded = totalCarbonKg.toFixed(2);
  const tier =
    totalProducts > 0 ? getScoreTier(Math.round(averageEcoScore)) : "mid";
  const avgAccent =
    tier === "good"
      ? "hover:border-emerald-400/40"
      : tier === "bad"
        ? "hover:border-red-400/40"
        : "hover:border-amber-400/40";

  return (
    <motion.div
      variants={dashboardContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-6 sm:grid-cols-3"
    >
      <motion.div variants={dashboardItem} className="sm:col-span-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Overview
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          Your dashboard
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-300">
          Totals from analyses in this browser. Data stays on your device.
        </p>
      </motion.div>

      <StatCard
        variants={dashboardItem}
        label="Products analyzed"
        value={String(totalProducts)}
        hint={
          totalProducts === 0
            ? "Run an analysis on the Analyze tab."
            : undefined
        }
        icon={<IconStack className="h-5 w-5" />}
        accentClass=""
      />
      <StatCard
        variants={dashboardItem}
        label="Average eco score"
        value={avgRounded}
        hint={
          totalProducts === 0
            ? "Run analyses to see your rolling average."
            : `${tierVisual[tier].label} · mean of scores 0–100.`
        }
        icon={<IconGauge className="h-5 w-5" />}
        accentClass={avgAccent}
      />
      <StatCard
        variants={dashboardItem}
        label="Total carbon estimated"
        value={totalProducts > 0 ? `${carbonRounded} kg` : "—"}
        hint={
          totalProducts > 0
            ? "Sum of CO₂e estimates from your analyses."
            : "No footprint totals yet."
        }
        icon={<IconCloud className="h-5 w-5" />}
        accentClass=""
      />

      {totalProducts > 0 && (
        <motion.p
          variants={dashboardItem}
          className="sm:col-span-3 text-center text-xs text-gray-400"
        >
          Score band:{" "}
          <span className={`font-semibold ${tierVisual[tier].scoreText}`}>
            {tierVisual[tier].label}
          </span>
        </motion.p>
      )}
    </motion.div>
  );
}
