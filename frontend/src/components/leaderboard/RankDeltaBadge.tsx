import { motion } from "framer-motion";
import { transitionFast } from "@/utils/motionVariants";

type Props = {
  change: number;
};

export default function RankDeltaBadge({ change }: Props) {
  if (change === 0) {
    return (
      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-100/45">
        —
      </span>
    );
  }

  const up = change > 0;
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={transitionFast}
      className={`inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-[10px] font-bold tabular-nums uppercase tracking-wide ${
        up
          ? "border-emerald-400/35 bg-emerald-500/15 text-emerald-300"
          : "border-rose-400/30 bg-rose-500/12 text-rose-300"
      }`}
    >
      <span aria-hidden>{up ? "▲" : "▼"}</span>
      {up ? change : Math.abs(change)}
    </motion.span>
  );
}

export function RankCell({
  rank,
  rankChange,
}: {
  rank: number;
  rankChange: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <motion.span
        layout
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-500/10 font-display text-sm font-bold tabular-nums text-emerald-100"
      >
        {rank}
      </motion.span>
      <RankDeltaBadge change={rankChange} />
    </div>
  );
}
