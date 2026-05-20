import { motion } from "framer-motion";
import type { LeaderboardEntry } from "@/data/leaderboardMock";
import { RankCell } from "@/components/leaderboard/RankDeltaBadge";
import { sectionCard, staggerSection, transitionSmooth } from "@/utils/motionVariants";

function RowMobile({ row }: { row: LeaderboardEntry }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      className={`rounded-2xl border p-4 backdrop-blur-md ${
        row.isYou
          ? "border-emerald-400/40 bg-emerald-500/10 shadow-neon"
          : "border-white/[0.08] bg-white/[0.04]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <RankCell rank={row.rank} rankChange={row.rankChange} />
        <span className="truncate text-right text-sm font-semibold text-white">
          {row.username}
          {row.isYou ? (
            <span className="ml-2 rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-200">
              You
            </span>
          ) : null}
        </span>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <dt className="text-emerald-100/45">Kg</dt>
          <dd className="mt-0.5 font-semibold tabular-nums text-emerald-100">
            {row.kgRecycled.toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className="text-emerald-100/45">Credits</dt>
          <dd className="mt-0.5 font-semibold tabular-nums text-emerald-200/90">
            {row.credits.toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className="text-emerald-100/45">Streak</dt>
          <dd className="mt-0.5 font-semibold tabular-nums text-amber-200/90">
            {row.streak}d
          </dd>
        </div>
      </dl>
    </motion.div>
  );
}

export default function LeaderboardTable({ rows }: { rows: LeaderboardEntry[] }) {
  const body = rows.slice(3);

  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] shadow-glass backdrop-blur-xl lg:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-400/70">
              <th className="px-5 py-4">Rank</th>
              <th className="px-5 py-4">Username</th>
              <th className="px-5 py-4 text-right tabular-nums">Kg recycled</th>
              <th className="px-5 py-4 text-right tabular-nums">Credits</th>
              <th className="px-5 py-4 text-right">Streak</th>
            </tr>
          </thead>
          <motion.tbody className="divide-y divide-white/[0.06]">
            {body.map((row, i) => (
              <motion.tr
                key={`${row.username}-${row.rank}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transitionSmooth, delay: i * 0.04 }}
                className={
                  row.isYou
                    ? "bg-emerald-500/[0.08] ring-1 ring-emerald-400/25"
                    : "hover:bg-white/[0.03]"
                }
              >
                <td className="px-5 py-3.5">
                  <RankCell rank={row.rank} rankChange={row.rankChange} />
                </td>
                <td className="px-5 py-3.5 font-medium text-emerald-50/95">
                  <span className="flex flex-wrap items-center gap-2">
                    {row.username}
                    {row.isYou ? (
                      <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-200">
                        You
                      </span>
                    ) : null}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right font-semibold tabular-nums text-emerald-100">
                  {row.kgRecycled.toLocaleString()}
                </td>
                <td className="px-5 py-3.5 text-right font-semibold tabular-nums text-emerald-200/90">
                  {row.credits.toLocaleString()}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className="inline-flex min-w-[3rem] justify-end rounded-lg border border-amber-400/25 bg-amber-500/10 px-2.5 py-1 text-xs font-bold tabular-nums text-amber-200/95">
                    {row.streak}d
                  </span>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      <motion.div
        className="flex flex-col gap-3 lg:hidden"
        variants={staggerSection}
        initial="hidden"
        animate="show"
      >
        {body.map((row) => (
          <motion.div key={`${row.username}-${row.rank}`} variants={sectionCard}>
            <RowMobile row={row} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
