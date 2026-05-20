import { motion } from "framer-motion";
import GlassPanel from "@/components/dashboard/GlassPanel";
import {
  RECENT_DROPOFFS,
  RECENT_PICKUPS,
  type ActivityItem,
} from "@/data/ecosyncDashboardMock";
import { sectionCard, staggerSection } from "@/utils/motionVariants";

function statusLabel(s: ActivityItem["status"]): string {
  switch (s) {
    case "completed":
      return "Done";
    case "scheduled":
      return "Scheduled";
    case "in_transit":
      return "In transit";
    default:
      return "";
  }
}

function statusStyles(s: ActivityItem["status"]): string {
  switch (s) {
    case "completed":
      return "border-emerald-400/35 bg-emerald-500/15 text-emerald-200/95";
    case "scheduled":
      return "border-amber-400/30 bg-amber-500/10 text-amber-200/90";
    case "in_transit":
      return "border-cyan-400/30 bg-cyan-500/10 text-cyan-200/90";
    default:
      return "border-white/10 bg-white/5 text-emerald-100/70";
  }
}

function ActivityList({
  title,
  items,
}: {
  title: string;
  items: ActivityItem[];
}) {
  return (
    <GlassPanel className="h-full p-6 sm:p-7">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400/75">
        {title}
      </p>
      <motion.ul
        className="mt-5 space-y-3"
        variants={staggerSection}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {items.map((item) => (
          <motion.li
            key={item.id}
            variants={sectionCard}
            className="rounded-2xl border border-white/[0.08] bg-black/20 px-4 py-3 backdrop-blur-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-emerald-50/95">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-emerald-100/55">
                  {item.subtitle}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusStyles(item.status)}`}
              >
                {statusLabel(item.status)}
              </span>
            </div>
            <p className="mt-2 text-[11px] font-medium tabular-nums text-emerald-400/70">
              {item.when}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </GlassPanel>
  );
}

export default function RecentActivityPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ActivityList title="Last pickups" items={RECENT_PICKUPS} />
      <ActivityList title="Last drop-offs" items={RECENT_DROPOFFS} />
    </div>
  );
}
