import { motion } from "framer-motion";
import type { Warehouse } from "@/data/warehousesMock";

type Props = {
  warehouse: Warehouse;
  selected: boolean;
  onSelect: () => void;
};

export default function WarehouseCard({
  warehouse,
  selected,
  onSelect,
}: Props) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      className={`w-full rounded-3xl border p-5 text-left shadow-glass backdrop-blur-xl transition ${
        selected
          ? "border-emerald-400/50 bg-emerald-500/[0.12] ring-1 ring-emerald-400/30"
          : "border-white/[0.1] bg-white/[0.05] hover:border-emerald-400/25"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-400/75">
            {warehouse.city}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-white">
            {warehouse.area}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-emerald-300/75">
            {warehouse.capacity}
          </p>
        </div>
        <span className="shrink-0 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold tabular-nums text-emerald-200/90">
          {warehouse.quantityStored}
        </span>
      </div>
      <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-emerald-100/45">
        Materials accepted
      </p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {warehouse.materialsAccepted.map((m) => (
          <li
            key={m}
            className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[11px] font-medium text-emerald-100/80"
          >
            {m}
          </li>
        ))}
      </ul>
    </motion.button>
  );
}
