import { motion } from "framer-motion";
import GlassPanel from "@/components/dashboard/GlassPanel";
import { MATERIAL_BREAKDOWN } from "@/data/ecosyncDashboardMock";
import { sectionCard, staggerSection } from "@/utils/motionVariants";

export default function MaterialBreakdownPanel() {
  return (
    <GlassPanel glow="emerald" className="p-6 sm:p-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400/75">
            Material mix
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
            Recycling breakdown
          </h2>
          <p className="mt-1 text-sm text-emerald-100/55">
            By weight · last 90 days
          </p>
        </div>
        <p className="mt-3 text-sm font-medium tabular-nums text-emerald-200/80 sm:mt-0">
          2,207 kg tracked
        </p>
      </div>

      <motion.ul
        className="mt-8 space-y-5"
        variants={staggerSection}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {MATERIAL_BREAKDOWN.map((row) => (
          <motion.li
            key={row.id}
            variants={sectionCard}
            className="space-y-2"
          >
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium text-emerald-100/90">{row.label}</span>
              <span className="tabular-nums text-emerald-100/60">
                {row.kg.toLocaleString()} kg ·{" "}
                <span className="text-emerald-300/90">{row.pct}%</span>
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-black/30 ring-1 ring-white/[0.06]">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${row.color}cc, ${row.color})`,
                  boxShadow: `0 0 20px ${row.color}55`,
                }}
                initial={{ width: 0 }}
                whileInView={{ width: `${row.pct}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.05,
                }}
              />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </GlassPanel>
  );
}
