/** Demo telemetry — replace with API integration. */

export type MonthlyRecyclingRow = {
  month: string;
  kg: number;
};

export type MaterialSlice = {
  name: string;
  value: number;
  color: string;
};

export type MaterialBreakdownRow = {
  id: string;
  label: string;
  kg: number;
  pct: number;
  color: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  subtitle: string;
  when: string;
  status: "completed" | "scheduled" | "in_transit";
};

export const DASHBOARD_KPIS = {
  totalRecycledKg: 2847.5,
  totalCredits: 18420,
  leaderboardRank: 12,
  co2SavedKg: 413.2,
} as const;

export const MATERIAL_BREAKDOWN: MaterialBreakdownRow[] = [
  {
    id: "plastic",
    label: "Plastic",
    kg: 842,
    pct: 38,
    color: "#34d399",
  },
  {
    id: "paper",
    label: "Paper",
    kg: 611,
    pct: 28,
    color: "#5eead4",
  },
  {
    id: "fabric",
    label: "Fabric",
    kg: 398,
    pct: 18,
    color: "#a78bfa",
  },
  {
    id: "metal",
    label: "Metal",
    kg: 356,
    pct: 16,
    color: "#94a3b8",
  },
];

export const MONTHLY_RECYCLING: MonthlyRecyclingRow[] = [
  { month: "Jan", kg: 420 },
  { month: "Feb", kg: 510 },
  { month: "Mar", kg: 380 },
  { month: "Apr", kg: 620 },
  { month: "May", kg: 540 },
  { month: "Jun", kg: 710 },
];

export const MATERIAL_PIE: MaterialSlice[] = MATERIAL_BREAKDOWN.map((m) => ({
  name: m.label,
  value: m.kg,
  color: m.color,
}));

/** Mon–Sun: true = contributed that day */
export const WEEK_STREAK_DAYS: boolean[] = [
  true,
  true,
  true,
  true,
  true,
  false,
  false,
];

export const RECENT_PICKUPS: ActivityItem[] = [
  {
    id: "p1",
    title: "Curbside · Al Wasl",
    subtitle: "Mixed plastics · 6.2 kg",
    when: "Today · 09:40",
    status: "completed",
  },
  {
    id: "p2",
    title: "Tower pickup · DIFC",
    subtitle: "Paper & cardboard · 12.8 kg",
    when: "Yesterday · 16:15",
    status: "completed",
  },
  {
    id: "p3",
    title: "Scheduled · Jumeirah",
    subtitle: "E-waste prep · est. 4 kg",
    when: "Thu · 10:00",
    status: "scheduled",
  },
];

export const RECENT_DROPOFFS: ActivityItem[] = [
  {
    id: "d1",
    title: "Mall hub · MOE",
    subtitle: "Textiles + metals · 8.4 kg",
    when: "Today · 11:05",
    status: "completed",
  },
  {
    id: "d2",
    title: "Locker B12 · Marina",
    subtitle: "PET bottles · 3.1 kg",
    when: "Mon · 19:22",
    status: "completed",
  },
  {
    id: "d3",
    title: "Warehouse slot · DIP",
    subtitle: "In transit · QC pending",
    when: "In progress",
    status: "in_transit",
  },
];
