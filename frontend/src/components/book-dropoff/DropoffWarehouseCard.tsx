import { motion } from "framer-motion";
import type { Warehouse } from "@/data/warehousesMock";
import { springSoft } from "@/utils/motionVariants";

type Props = {
  warehouse: Warehouse;
  selected: boolean;
  onSelect: () => void;
  rank: number;
};

export default function DropoffWarehouseCard({
  warehouse,
  selected,
  onSelect,
  rank,
}: Props) {
  const km =
    warehouse.distanceKm < 10
      ? warehouse.distanceKm.toFixed(1)
      : Math.round(warehouse.distanceKm);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={springSoft}
      className={`relative w-full overflow-hidden rounded-3xl border p-5 text-left shadow-glass backdrop-blur-xl transition ${
        selected
          ? "border-emerald-400/55 bg-gradient-to-b from-emerald-500/18 to-emerald-950/25 ring-2 ring-emerald-400/35 shadow-[0_0_36px_rgba(16,185,129,0.18)]"
          : "border-white/[0.1] bg-white/[0.05] hover:border-emerald-400/30"
      }`}
    >
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl ${
          selected ? "bg-emerald-400/25" : "bg-teal-500/10"
        }`}
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/15 font-display text-xs font-bold text-emerald-200">
          {rank}
        </span>
        <span className="shrink-0 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold tabular-nums text-cyan-200/95">
          {km} km
        </span>
      </div>
      <p className="relative mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-400/75">
        {warehouse.city}
      </p>
      <h3 className="relative mt-1 font-display text-lg font-semibold text-white">
        {warehouse.area}
      </h3>
      <p className="relative mt-2 text-xs leading-relaxed text-emerald-300/80">
        <span className="font-semibold text-emerald-200/90">Capacity · </span>
        {warehouse.capacity}
      </p>
      <p className="relative mt-4 text-[11px] font-bold uppercase tracking-wider text-emerald-100/45">
        Materials accepted
      </p>
      <ul className="relative mt-2 flex flex-wrap gap-1.5">
        {warehouse.materialsAccepted.slice(0, 5).map((m) => (
          <li
            key={m}
            className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] font-medium text-emerald-100/85"
          >
            {m}
          </li>
        ))}
        {warehouse.materialsAccepted.length > 5 ? (
          <li className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] text-emerald-100/55">
            +{warehouse.materialsAccepted.length - 5}
          </li>
        ) : null}
      </ul>
      {selected ? (
        <p className="relative mt-4 text-[11px] font-bold uppercase tracking-wider text-emerald-300/90">
          Selected for drop-off
        </p>
      ) : (
        <p className="relative mt-4 text-[11px] font-medium text-emerald-100/40">
          Tap to select this hub
        </p>
      )}
    </motion.button>
  );
}
