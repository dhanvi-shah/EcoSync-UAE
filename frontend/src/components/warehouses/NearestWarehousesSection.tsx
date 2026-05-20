import { motion } from "framer-motion";
import type { Warehouse } from "@/data/warehousesMock";
import { USER_ANCHOR, warehousesByNearest } from "@/data/warehousesMock";
import { sectionCard, staggerSection } from "@/utils/motionVariants";

function NearestRow({ w, rank }: { w: Warehouse; rank: number }) {
  return (
    <motion.li
      variants={sectionCard}
      className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 backdrop-blur-md"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/15 font-display text-sm font-bold text-emerald-200">
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-emerald-50/95">{w.area}</p>
        <p className="truncate text-xs text-emerald-100/50">
          {w.city} · {w.materialsAccepted.slice(0, 2).join(", ")}
          {w.materialsAccepted.length > 2 ? "…" : ""}
        </p>
      </div>
      <p className="shrink-0 text-right">
        <span className="block font-display text-sm font-semibold tabular-nums text-emerald-200/95">
          {w.distanceKm < 10
            ? w.distanceKm.toFixed(1)
            : Math.round(w.distanceKm)}{" "}
          km
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wide text-emerald-400/60">
          road est.
        </span>
      </p>
    </motion.li>
  );
}

export default function NearestWarehousesSection() {
  const nearest = warehousesByNearest().slice(0, 4);

  return (
    <section
      className="rounded-3xl border border-white/[0.1] bg-gradient-to-br from-emerald-950/40 via-[#04130f]/80 to-transparent p-6 shadow-glass backdrop-blur-xl sm:p-8"
      aria-labelledby="nearest-heading"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400/75">
            Proximity
          </p>
          <h2
            id="nearest-heading"
            className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl"
          >
            Nearest warehouse near you
          </h2>
          <p className="mt-2 text-sm text-emerald-100/55">
            Anchor:{" "}
            <span className="font-medium text-emerald-200/85">
              {USER_ANCHOR.label}
            </span>{" "}
            · sorted by modeled road distance (demo).
          </p>
        </div>
        <div className="rounded-xl border border-cyan-400/25 bg-cyan-500/10 px-3 py-2 text-center sm:text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-200/80">
            Live location
          </p>
          <p className="text-xs font-semibold text-cyan-100/90">
            Simulated GPS fix
          </p>
        </div>
      </div>

      <motion.ol
        className="mt-6 space-y-3"
        variants={staggerSection}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {nearest.map((w, i) => (
          <NearestRow key={w.id} w={w} rank={i + 1} />
        ))}
      </motion.ol>
    </section>
  );
}
