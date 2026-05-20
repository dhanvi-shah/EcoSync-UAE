import { useCallback, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PickupSelectField from "@/components/book-pickup/PickupSelectField";
import PickupTextField from "@/components/book-pickup/PickupTextField";
import DropoffWarehouseCard from "@/components/book-dropoff/DropoffWarehouseCard";
import {
  DROPOFF_TIME_OPTIONS,
  DROP_OFF_MATERIAL_OPTIONS,
  EMPTY_DROPOFF_FORM,
  generateDropoffReference,
  validateDropoffForm,
  warehouseSelectOptions,
  type DropoffFormValues,
} from "@/data/bookDropoffConfig";
import { USER_ANCHOR, warehousesByNearest } from "@/data/warehousesMock";
import {
  sectionBlock,
  sectionCard,
  springSnappy,
  staggerSection,
  transitionSmooth,
} from "@/utils/motionVariants";

export default function BookDropoffPage() {
  const nearby = useMemo(() => warehousesByNearest(), []);
  const warehouseOptions = useMemo(
    () => warehouseSelectOptions(nearby),
    [nearby]
  );

  const [values, setValues] = useState<DropoffFormValues>(EMPTY_DROPOFF_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof DropoffFormValues, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const update = useCallback(
    <K extends keyof DropoffFormValues>(key: K, v: DropoffFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: v }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    []
  );

  const setWarehouse = useCallback((id: string) => {
    update("warehouseId", id);
  }, [update]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const nextErrors = validateDropoffForm(values);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) {
        setSubmitted(false);
        return;
      }
      setReference(generateDropoffReference());
      setSubmitted(true);
    },
    [values]
  );

  const onAnother = useCallback(() => {
    setValues(EMPTY_DROPOFF_FORM);
    setErrors({});
    setSubmitted(false);
    setReference(null);
  }, []);

  const selectedWarehouse = nearby.find((w) => w.id === values.warehouseId);

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <motion.header
        variants={sectionBlock}
        initial="hidden"
        animate="show"
        className="mb-10 max-w-2xl lg:mb-12"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400/75">
          EcoSync UAE
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Book drop-off
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-emerald-100/60 sm:text-base">
          Reserve a gate window at the hub that fits your stream. Nearby sites
          are ranked from{" "}
          <span className="font-medium text-emerald-200/85">
            {USER_ANCHOR.label}
          </span>{" "}
          (demo anchor).
        </p>
      </motion.header>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="flow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={transitionSmooth}
            className="flex flex-col gap-12 lg:gap-14"
          >
            <section aria-labelledby="nearby-warehouses-heading">
              <h2
                id="nearby-warehouses-heading"
                className="font-display text-xl font-semibold text-white sm:text-2xl"
              >
                Nearby warehouses
              </h2>
              <p className="mt-2 text-sm text-emerald-100/55">
                Tap a card to select, or use the dropdown in the form below.
              </p>
              <motion.div
                className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                variants={staggerSection}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.06 }}
              >
                {nearby.map((w, i) => (
                  <motion.div key={w.id} variants={sectionCard}>
                    <DropoffWarehouseCard
                      warehouse={w}
                      rank={i + 1}
                      selected={values.warehouseId === w.id}
                      onSelect={() => setWarehouse(w.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </section>

            <motion.section
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={transitionSmooth}
              className="rounded-3xl border border-white/[0.1] bg-gradient-to-br from-white/[0.07] via-[#04130f]/60 to-transparent p-6 shadow-glass backdrop-blur-xl sm:p-8"
              aria-labelledby="dropoff-form-heading"
            >
              <h2
                id="dropoff-form-heading"
                className="font-display text-xl font-semibold text-white"
              >
                Drop-off details
              </h2>
              <p className="mt-1 text-sm text-emerald-100/55">
                {selectedWarehouse ? (
                  <>
                    Routing to{" "}
                    <span className="font-medium text-emerald-200/90">
                      {selectedWarehouse.area}
                    </span>
                    , {selectedWarehouse.city}.
                  </>
                ) : (
                  "Select a warehouse above or from the list."
                )}
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
                <PickupSelectField
                  id="materialType"
                  label="Material type"
                  value={values.materialType}
                  onChange={(v) => update("materialType", v)}
                  error={errors.materialType}
                  options={DROP_OFF_MATERIAL_OPTIONS}
                />
                <PickupTextField
                  id="quantity"
                  label="Quantity (kg)"
                  value={values.quantity}
                  onChange={(v) => update("quantity", v)}
                  error={errors.quantity}
                  placeholder="e.g. 32"
                  type="number"
                  inputMode="decimal"
                />
                <PickupSelectField
                  id="warehouseId"
                  label="Warehouse"
                  value={values.warehouseId}
                  onChange={(v) => update("warehouseId", v)}
                  error={errors.warehouseId}
                  options={warehouseOptions}
                />
                <PickupSelectField
                  id="timeSlot"
                  label="Preferred drop-off time"
                  value={values.timeSlot}
                  onChange={(v) => update("timeSlot", v)}
                  error={errors.timeSlot}
                  options={DROPOFF_TIME_OPTIONS}
                />
                <motion.button
                  type="submit"
                  className="w-full rounded-2xl border border-emerald-400/40 bg-gradient-to-r from-emerald-500 to-teal-600 py-4 text-sm font-semibold text-white shadow-[0_0_32px_rgba(52,211,153,0.25)] transition hover:border-emerald-300/55"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={springSnappy}
                >
                  Confirm drop-off slot
                </motion.button>
              </form>
            </motion.section>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="relative mx-auto max-w-lg overflow-hidden rounded-3xl border border-teal-400/35 bg-gradient-to-b from-teal-500/15 via-[#04130f]/95 to-[#04130f] p-8 shadow-[0_0_56px_rgba(45,212,191,0.18)] backdrop-blur-xl sm:p-10"
            role="status"
            aria-live="polite"
          >
            <div
              className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl"
              aria-hidden
            />
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 16,
                delay: 0.08,
              }}
              className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/40 bg-teal-500/20 text-2xl text-teal-100 shadow-neon"
              aria-hidden
            >
              ✓
            </motion.div>
            <h2 className="relative mt-6 text-center font-display text-2xl font-semibold text-white">
              Slot secured
            </h2>
            <p className="relative mx-auto mt-4 max-w-sm text-center text-base leading-relaxed text-emerald-100/75">
              Your drop-off is booked. Show the QR at the gate during your
              window—we’ll sync weight and credits after QC.
            </p>
            {reference ? (
              <p className="relative mt-4 text-center text-sm font-medium tabular-nums text-teal-200/90">
                Reference · <span className="text-white">{reference}</span>
              </p>
            ) : null}
            {selectedWarehouse ? (
              <p className="relative mt-3 text-center text-xs text-emerald-100/55">
                {selectedWarehouse.area} · {selectedWarehouse.city}
              </p>
            ) : null}
            <motion.button
              type="button"
              onClick={onAnother}
              className="relative mt-8 w-full rounded-2xl border border-white/15 bg-white/5 py-3.5 text-sm font-semibold text-emerald-100 transition hover:border-teal-400/35 hover:bg-teal-500/10"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              transition={springSnappy}
            >
              Book another drop-off
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
