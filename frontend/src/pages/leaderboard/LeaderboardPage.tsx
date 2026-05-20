import { motion } from "framer-motion";
import LeaderboardBoard from "@/components/leaderboard/LeaderboardBoard";
import NeighborhoodGrid from "@/components/leaderboard/NeighborhoodGrid";
import { sectionBlock } from "@/utils/motionVariants";

export default function LeaderboardPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <motion.header
        variants={sectionBlock}
        initial="hidden"
        animate="show"
        className="mb-10 max-w-3xl lg:mb-12"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400/75">
          EcoSync UAE
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Leaderboard
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-emerald-100/60 sm:text-base">
          Rankings are built on verified recovery—not selfies. Climb by
          quality diversion, streak discipline, and clean hand-offs at
          warehouses.
        </p>
      </motion.header>

      <div className="flex flex-col gap-14 lg:gap-16">
        <LeaderboardBoard />
        <NeighborhoodGrid />
      </div>
    </div>
  );
}
