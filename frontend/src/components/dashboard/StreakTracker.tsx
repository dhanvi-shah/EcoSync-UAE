import { motion } from "framer-motion";
import GlassPanel from "@/components/dashboard/GlassPanel";
import { WEEK_STREAK_DAYS } from "@/data/ecosyncDashboardMock";
import { sectionBlock } from "@/utils/motionVariants";

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"] as const;

function computeTrailingStreak(days: boolean[]): number {
  let i = days.length - 1;
  while (i >= 0 && !days[i]) i--;
  if (i < 0) return 0;
  let c = 0;
  while (i >= 0 && days[i]) {
    c++;
    i--;
  }
  return c;
}

export default function StreakTracker() {
  const streak = computeTrailingStreak([...WEEK_STREAK_DAYS]);
  const weekTarget = WEEK_STREAK_DAYS.length;
  const pct = Math.round((streak / weekTarget) * 100);

  return (
    <motion.div
      variants={sectionBlock}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <GlassPanel glow="emerald" className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400/75">
              Consistency
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
              Weekly streak
            </h2>
            <p className="mt-1 max-w-md text-sm text-emerald-100/55">
              One qualifying event per day keeps your streak alive—pickup,
              drop-off, or verified locker deposit.
            </p>
            <p className="mt-4 font-display text-4xl font-semibold tabular-nums text-white">
              {streak}
              <span className="text-lg font-medium text-emerald-300/80">
                {" "}
                / {weekTarget} days
              </span>
            </p>
          </div>

          <div className="flex w-full max-w-md flex-col gap-4 lg:w-auto lg:min-w-[320px]">
            <div className="flex justify-between gap-1 sm:gap-2">
              {WEEK_STREAK_DAYS.map((active, i) => (
                <motion.div
                  key={`streak-day-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className={`flex h-11 w-10 items-center justify-center rounded-2xl border text-xs font-bold sm:h-12 sm:w-11 ${
                      active
                        ? "border-emerald-400/40 bg-gradient-to-b from-emerald-500/35 to-emerald-700/20 text-emerald-50 shadow-neon"
                        : "border-white/[0.08] bg-black/25 text-emerald-100/35"
                    }`}
                  >
                    {DAY_LABELS[i]}
                  </div>
                  <span
                    className={`h-1 w-6 rounded-full ${
                      active ? "bg-emerald-400 shadow-[0_0_12px_#34d399]" : "bg-white/10"
                    }`}
                  />
                </motion.div>
              ))}
            </div>

            <div>
              <div className="mb-2 flex justify-between text-[11px] font-medium uppercase tracking-wider text-emerald-100/45">
                <span>Week progress</span>
                <span className="tabular-nums text-emerald-300/90">{pct}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-black/35 ring-1 ring-white/[0.07]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
