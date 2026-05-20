import { motion } from "framer-motion";
import {
  NEIGHBORHOOD_LEADERBOARDS,
  type NeighborhoodBoard,
} from "@/data/leaderboardMock";
import { sectionCard, staggerSection, springSoft } from "@/utils/motionVariants";

const TROPHY: Record<number, { emoji: string; label: string; ring: string }> = {
  1: {
    emoji: "🥇",
    label: "Champion hub",
    ring: "ring-amber-400/40",
  },
  2: {
    emoji: "🥈",
    label: "Runner-up",
    ring: "ring-slate-300/35",
  },
  3: {
    emoji: "🥉",
    label: "On the podium",
    ring: "ring-orange-400/35",
  },
  4: {
    emoji: "⚡",
    label: "Climbing",
    ring: "ring-emerald-400/25",
  },
};

function NeighborhoodCard({ n }: { n: NeighborhoodBoard }) {
  const tier = TROPHY[n.hubRank] ?? TROPHY[4];

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={springSoft}
      className={`relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 shadow-glass backdrop-blur-xl ring-1 ${tier.ring}`}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl"
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-400/75">
            Neighborhood
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-white sm:text-xl">
            {n.name}
          </h3>
        </div>
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-xl"
          title={tier.label}
        >
          {tier.emoji}
        </span>
      </div>
      <p className="relative mt-4 text-xs text-emerald-100/55">
        Top crew:{" "}
        <span className="font-semibold text-emerald-200/90">{n.champion}</span>
      </p>
      <dl className="relative mt-4 grid grid-cols-3 gap-3 border-t border-white/[0.08] pt-4 text-center text-xs">
        <div>
          <dt className="text-emerald-100/45">Collective kg</dt>
          <dd className="mt-1 font-display text-sm font-semibold tabular-nums text-white">
            {(n.collectiveKg / 1000).toFixed(2)}k
          </dd>
        </div>
        <div>
          <dt className="text-emerald-100/45">Credits</dt>
          <dd className="mt-1 font-semibold tabular-nums text-emerald-200/90">
            {(n.collectiveCredits / 1000).toFixed(0)}k
          </dd>
        </div>
        <div>
          <dt className="text-emerald-100/45">Avg streak</dt>
          <dd className="mt-1 font-semibold tabular-nums text-amber-200/90">
            {n.avgStreak}d
          </dd>
        </div>
      </dl>
      <p className="relative mt-3 text-[10px] font-bold uppercase tracking-wider text-emerald-400/55">
        Hub rank #{n.hubRank} of 4 · GCC corridor
      </p>
    </motion.article>
  );
}

export default function NeighborhoodGrid() {
  const sorted = [...NEIGHBORHOOD_LEADERBOARDS].sort(
    (a, b) => a.hubRank - b.hubRank
  );

  return (
    <section className="space-y-6" aria-labelledby="neighborhoods-heading">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400/75">
          Hyperlocal
        </p>
        <h2
          id="neighborhoods-heading"
          className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl"
        >
          Neighborhood leaderboard
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-emerald-100/60">
          Four pilot corridors compete on collective verified tonnage and crew
          momentum—Marina, JLT, Al Barsha, and Sharjah.
        </p>
      </div>

      <motion.div
        className="grid gap-5 sm:grid-cols-2"
        variants={staggerSection}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
      >
        {sorted.map((n) => (
          <motion.div key={n.id} variants={sectionCard}>
            <NeighborhoodCard n={n} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
