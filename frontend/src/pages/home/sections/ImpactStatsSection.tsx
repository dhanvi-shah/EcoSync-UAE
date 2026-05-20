import { motion } from "framer-motion";
import SectionHeading from "@/pages/home/SectionHeading";
import { useCountUp } from "@/hooks/useCountUp";
import { sectionBlock, sectionCard, transitionSmooth } from "@/utils/motionVariants";

type StatConfig = {
  label: string;
  suffix: string;
  sub: string;
  target: number;
  decimals: number;
  prefix?: string;
};

const STATS: StatConfig[] = [
  {
    label: "Materials recycled",
    target: 12.4,
    decimals: 1,
    suffix: "M kg",
    sub: "High-confidence streams diverted from landfill",
  },
  {
    label: "CO₂e avoided",
    target: 8.2,
    decimals: 1,
    suffix: "M kg",
    sub: "Modeled against regional disposal baseline",
  },
  {
    label: "Active participants",
    target: 48,
    decimals: 0,
    suffix: "K+",
    sub: "Households, teams, and campus cohorts",
  },
];

function ImpactStatCard({
  label,
  suffix,
  sub,
  target,
  decimals,
  prefix = "",
  index,
}: StatConfig & { index: number }) {
  const { ref, formatted } = useCountUp(target, { duration: 2.5, decimals });

  return (
    <motion.div
      ref={ref}
      variants={sectionCard}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ ...transitionSmooth, delay: index * 0.12 }}
      className="relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 text-center shadow-glass backdrop-blur-xl"
    >
      <div
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
        aria-hidden
      />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/75">
        {label}
      </p>
      <p className="mt-4 font-display text-4xl font-semibold tabular-nums tracking-tight text-white sm:text-5xl">
        <span className="text-emerald-200/90">{prefix}</span>
        {formatted}
        <span className="text-lg font-medium text-emerald-300/80 sm:text-xl">
          {suffix}
        </span>
      </p>
      <p className="mt-3 text-sm text-emerald-100/55">{sub}</p>
    </motion.div>
  );
}

export default function ImpactStatsSection() {
  return (
    <section
      id="impact"
      className="scroll-mt-28 border-t border-white/[0.06] bg-[#030f0c]/35 py-20 backdrop-blur-sm sm:scroll-mt-32 sm:py-24"
      aria-labelledby="impact-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          titleId="impact-title"
          eyebrow="Impact"
          title="Outcomes you can audit"
          subtitle="Illustrative trajectory for a national-scale deployment—modeled from pilot corridors and partner commitments, not vanity dashboards."
        />

        <motion.div
          className="mt-6 text-center"
          variants={sectionBlock}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="mx-auto max-w-2xl text-sm text-emerald-100/50">
            Figures animate when this section enters view. Replace with live
            telemetry from your warehouse and fleet APIs when you go to
            production.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STATS.map((s, i) => (
            <ImpactStatCard key={s.label} index={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
