import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import UaeOperationsMap from "@/components/warehouses/UaeOperationsMap";
import WarehouseCard from "@/components/warehouses/WarehouseCard";
import NearestWarehousesSection from "@/components/warehouses/NearestWarehousesSection";
import { WAREHOUSES } from "@/data/warehousesMock";
import { sectionBlock, sectionCard, staggerSection } from "@/utils/motionVariants";

export default function WarehousesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(
    WAREHOUSES[0]?.id ?? null
  );

  const onSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

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
          Warehouse mesh
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-emerald-100/60 sm:text-base">
          Pilot recovery nodes across the Emirates—capacity, accepted streams,
          and inventory at a glance. Map and heatmap are illustrative UI only.
        </p>
      </motion.header>

      <div className="flex flex-col gap-10 lg:gap-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <UaeOperationsMap selectedId={selectedId} onSelect={onSelect} />

          <motion.div
            className="flex flex-col gap-4"
            variants={staggerSection}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.06 }}
          >
            <div>
              <h2 className="font-display text-lg font-semibold text-white sm:text-xl">
                Network nodes
              </h2>
              <p className="mt-1 text-sm text-emerald-100/55">
                Tap a marker or card to sync selection. Glowing markers indicate
                EcoSync-certified intake.
              </p>
            </div>
            <div className="grid max-h-[min(70vh,560px)] gap-3 overflow-y-auto pr-1 sm:grid-cols-1">
              {WAREHOUSES.map((w) => (
                <motion.div key={w.id} variants={sectionCard}>
                  <WarehouseCard
                    warehouse={w}
                    selected={selectedId === w.id}
                    onSelect={() => onSelect(w.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <NearestWarehousesSection />
      </div>
    </div>
  );
}
