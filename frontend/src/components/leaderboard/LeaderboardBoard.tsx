import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import Podium from "@/components/leaderboard/Podium";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import {
  ALL_TIME_LEADERBOARD,
  WEEKLY_LEADERBOARD,
} from "@/data/leaderboardMock";
import { transitionSmooth } from "@/utils/motionVariants";

type TabId = "weekly" | "alltime";

const TABS: { id: TabId; label: string; sub: string }[] = [
  { id: "weekly", label: "This week", sub: "Resets every Sunday 00:00 GST" },
  { id: "alltime", label: "All-time", sub: "Verified recovery since join" },
];

export default function LeaderboardBoard() {
  const [tab, setTab] = useState<TabId>("weekly");
  const data = tab === "weekly" ? WEEKLY_LEADERBOARD : ALL_TIME_LEADERBOARD;
  const top3 = data.slice(0, 3);

  return (
    <LayoutGroup id="eco-leaderboard">
      <div className="rounded-3xl border border-white/[0.1] bg-white/[0.04] p-5 shadow-glass backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400/75">
              Live rankings
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-white sm:text-3xl">
              Who&apos;s leading the diversion game?
            </h2>
          </div>
          <div
            className="flex rounded-2xl border border-white/10 bg-black/25 p-1"
            role="tablist"
            aria-label="Leaderboard period"
          >
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.id)}
                  className={`relative rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "text-white"
                      : "text-emerald-100/55 hover:text-emerald-100/85"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="leaderboard-tab-pill"
                      className="absolute inset-0 -z-10 rounded-xl border border-emerald-400/35 bg-gradient-to-r from-emerald-600/85 to-teal-700/70 shadow-neon"
                      transition={transitionSmooth}
                    />
                  ) : null}
                  <span className="relative z-10">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="mt-2 text-xs text-emerald-100/50">
          {TABS.find((x) => x.id === tab)?.sub}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={transitionSmooth}
          >
            <Podium entries={top3} />

            <div className="mt-10">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400/65">
                Full standings
              </h3>
              <LeaderboardTable rows={data} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
