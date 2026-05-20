import { motion } from "framer-motion";
import type { LeaderboardEntry } from "@/data/leaderboardMock";
import { springSoft, transitionSmooth } from "@/utils/motionVariants";

type PodiumSlot = {
  entry: LeaderboardEntry;
  place: 1 | 2 | 3;
  heightClass: string;
  medal: "gold" | "silver" | "bronze";
};

const STYLES: Record<
  PodiumSlot["medal"],
  { border: string; glow: string; bar: string; crown: string }
> = {
  gold: {
    border: "border-amber-400/50",
    glow: "shadow-[0_0_40px_rgba(251,191,36,0.2)]",
    bar: "from-amber-400/90 to-yellow-700/60",
    crown: "text-amber-300",
  },
  silver: {
    border: "border-slate-300/45",
    glow: "shadow-[0_0_32px_rgba(148,163,184,0.18)]",
    bar: "from-slate-300/85 to-slate-500/55",
    crown: "text-slate-200",
  },
  bronze: {
    border: "border-orange-400/45",
    glow: "shadow-[0_0_28px_rgba(251,146,60,0.15)]",
    bar: "from-orange-400/85 to-amber-900/50",
    crown: "text-orange-300/90",
  },
};

function initials(username: string): string {
  const parts = username.replace(/[._]/g, " ").split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase().slice(0, 2);
  }
  return username.slice(0, 2).toUpperCase();
}

export default function Podium({ entries }: { entries: LeaderboardEntry[] }) {
  if (entries.length < 3) return null;

  const second = entries[1];
  const first = entries[0];
  const third = entries[2];

  const slots: PodiumSlot[] = [
    {
      entry: second,
      place: 2,
      heightClass: "min-h-[148px] sm:min-h-[168px]",
      medal: "silver",
    },
    {
      entry: first,
      place: 1,
      heightClass: "min-h-[196px] sm:min-h-[220px]",
      medal: "gold",
    },
    {
      entry: third,
      place: 3,
      heightClass: "min-h-[128px] sm:min-h-[148px]",
      medal: "bronze",
    },
  ];

  return (
    <div className="mx-auto flex max-w-3xl items-end justify-center gap-3 sm:gap-5">
      {slots.map((slot, i) => {
        const t = STYLES[slot.medal];
        return (
          <motion.div
            key={slot.entry.username}
            initial={{ opacity: 0, y: 48, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              ...transitionSmooth,
              delay: 0.08 * i,
            }}
            className="flex w-[30%] max-w-[200px] flex-1 flex-col items-center"
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={springSoft}
              className={`relative mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border-2 bg-gradient-to-br from-white/12 to-white/[0.03] text-lg font-bold text-white backdrop-blur-md sm:h-[72px] sm:w-[72px] ${t.border} ${t.glow}`}
            >
              <span className="font-display tracking-tight">
                {initials(slot.entry.username)}
              </span>
              <span
                className={`absolute -top-2 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-[#04130f]/90 text-xs font-bold text-white shadow-lg`}
              >
                {slot.place}
              </span>
            </motion.div>
            <p className="max-w-full truncate px-1 text-center text-xs font-semibold text-emerald-50/95 sm:text-sm">
              {slot.entry.username}
            </p>
            <p className="mt-0.5 text-[10px] tabular-nums text-emerald-300/75 sm:text-xs">
              {slot.entry.kgRecycled.toLocaleString()} kg
            </p>
            <div
              className={`mt-4 flex w-full flex-col items-center rounded-t-2xl border border-white/10 bg-gradient-to-b ${t.bar} p-2 ${slot.heightClass}`}
            >
              <span className={`mt-2 text-2xl sm:text-3xl ${t.crown}`} aria-hidden>
                {slot.place === 1 ? "♛" : slot.place === 2 ? "♜" : "♝"}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
