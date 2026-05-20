/**
 * Leaderboard demo data — replace with API.
 * rankChange: positive = climbed (better); negative = dropped; 0 = unchanged.
 */
export type LeaderboardEntry = {
  rank: number;
  username: string;
  kgRecycled: number;
  credits: number;
  streak: number;
  /** vs previous period snapshot */
  rankChange: number;
  /** Highlight current viewer (demo) */
  isYou?: boolean;
};

export const ALL_TIME_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: "amira.k", kgRecycled: 1184, credits: 47_000, streak: 21, rankChange: 0 },
  { rank: 2, username: "dev_loop", kgRecycled: 1102, credits: 44_000, streak: 18, rankChange: 1 },
  { rank: 3, username: "marina_runners", kgRecycled: 1055, credits: 42_000, streak: 16, rankChange: -1 },
  { rank: 4, username: "eco_majid", kgRecycled: 988, credits: 39_000, streak: 12, rankChange: 2 },
  { rank: 5, username: "jlt_cycles", kgRecycled: 902, credits: 36_000, streak: 14, rankChange: 0 },
  { rank: 6, username: "barsha_bins", kgRecycled: 876, credits: 35_000, streak: 9, rankChange: -2 },
  { rank: 7, username: "sharjah_sort", kgRecycled: 821, credits: 32_000, streak: 11, rankChange: 1 },
  { rank: 8, username: "you", kgRecycled: 798, credits: 31_920, streak: 8, rankChange: 3, isYou: true },
  { rank: 9, username: "difc_green", kgRecycled: 765, credits: 30_000, streak: 7, rankChange: -1 },
  { rank: 10, username: "palm_collective", kgRecycled: 702, credits: 28_000, streak: 6, rankChange: 0 },
  { rank: 11, username: "motorcity_mrf", kgRecycled: 655, credits: 26_000, streak: 5, rankChange: 1 },
  { rank: 12, username: "silicon_oasis", kgRecycled: 598, credits: 23_920, streak: 4, rankChange: -3 },
];

export const WEEKLY_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: "marina_runners", kgRecycled: 142, credits: 5_600, streak: 16, rankChange: 4 },
  { rank: 2, username: "amira.k", kgRecycled: 128, credits: 5_000, streak: 21, rankChange: -1 },
  { rank: 3, username: "jlt_cycles", kgRecycled: 119, credits: 4_760, streak: 14, rankChange: 2 },
  { rank: 4, username: "you", kgRecycled: 98, credits: 3_920, streak: 8, rankChange: 1, isYou: true },
  { rank: 5, username: "dev_loop", kgRecycled: 94, credits: 3_760, streak: 18, rankChange: -3 },
  { rank: 6, username: "barsha_bins", kgRecycled: 87, credits: 3_480, streak: 9, rankChange: 0 },
  { rank: 7, username: "eco_majid", kgRecycled: 81, credits: 3_240, streak: 12, rankChange: 2 },
  { rank: 8, username: "sharjah_sort", kgRecycled: 76, credits: 3_040, streak: 11, rankChange: -2 },
];

export type NeighborhoodBoard = {
  id: string;
  name: string;
  champion: string;
  collectiveKg: number;
  collectiveCredits: number;
  avgStreak: number;
  /** 1–4 trophy tier among the four hubs */
  hubRank: number;
};

export const NEIGHBORHOOD_LEADERBOARDS: NeighborhoodBoard[] = [
  {
    id: "marina",
    name: "Dubai Marina",
    champion: "marina_runners",
    collectiveKg: 9_420,
    collectiveCredits: 376_800,
    avgStreak: 11,
    hubRank: 1,
  },
  {
    id: "jlt",
    name: "JLT",
    champion: "jlt_cycles",
    collectiveKg: 8_180,
    collectiveCredits: 327_200,
    avgStreak: 9,
    hubRank: 2,
  },
  {
    id: "barsha",
    name: "Al Barsha",
    champion: "barsha_bins",
    collectiveKg: 6_950,
    collectiveCredits: 278_000,
    avgStreak: 8,
    hubRank: 4,
  },
  {
    id: "sharjah",
    name: "Sharjah",
    champion: "sharjah_sort",
    collectiveKg: 7_260,
    collectiveCredits: 290_400,
    avgStreak: 10,
    hubRank: 3,
  },
];
