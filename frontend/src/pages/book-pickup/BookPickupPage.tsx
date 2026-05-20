import { useCallback, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PickupSelectField from "@/components/book-pickup/PickupSelectField";
import PickupTextField from "@/components/book-pickup/PickupTextField";
import {
  AREA_OPTIONS,
  EMPTY_PICKUP_FORM,
  MATERIAL_OPTIONS,
  TIME_SLOT_OPTIONS,
  generatePickupReference,
  validatePickupForm,
  type PickupFormValues,
} from "@/data/bookPickupConfig";
import {
  sectionBlock,
  springSnappy,
  transitionSmooth,
} from "@/utils/motionVariants";

export default function BookPickupPage() {
  const [values, setValues] = useState<PickupFormValues>(EMPTY_PICKUP_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof PickupFormValues, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const update = useCallback(
    <K extends keyof PickupFormValues>(key: K, v: PickupFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: v }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    []
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const nextErrors = validatePickupForm(values);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) {
        setSubmitted(false);
        return;
      }
      setReference(generatePickupReference());
      setSubmitted(true);
    },
    [values]
  );

  const onBookAnother = useCallback(() => {
    setValues(EMPTY_PICKUP_FORM);
    setErrors({});
    setSubmitted(false);
    setReference(null);
  }, []);

  return (
    <div className="relative mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <motion.header
        variants={sectionBlock}
        initial="hidden"
        animate="show"
        className="mb-10 text-center lg:mb-12"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400/75">
          EcoSync UAE
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Book pickup
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-emerald-100/60 sm:text-base">
          Bundle your slot with neighborhood clusters for fewer miles and cleaner
          loads. All fields are required for routing.
        </p>
      </motion.header>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={transitionSmooth}
            className="rounded-3xl border border-white/[0.1] bg-white/[0.05] p-6 shadow-glass backdrop-blur-xl sm:p-8"
          >
            <form onSubmit={onSubmit} className="space-y-6" noValidate>
              <PickupSelectField
                id="materialType"
                label="Material type"
                value={values.materialType}
                onChange={(v) => update("materialType", v)}
                error={errors.materialType}
                options={MATERIAL_OPTIONS}
              />
              <PickupTextField
                id="quantity"
                label="Quantity (kg)"
                value={values.quantity}
                onChange={(v) => update("quantity", v)}
                error={errors.quantity}
                placeholder="e.g. 45"
                type="number"
                inputMode="decimal"
              />
              <PickupSelectField
                id="area"
                label="Area"
                value={values.area}
                onChange={(v) => update("area", v)}
                error={errors.area}
                options={AREA_OPTIONS}
              />
              <PickupTextField
                id="address"
                label="Address"
                value={values.address}
                onChange={(v) => update("address", v)}
                error={errors.address}
                placeholder="Tower, unit, street, landmark"
                type="text"
              />
              <PickupSelectField
                id="timeSlot"
                label="Preferred time slot"
                value={values.timeSlot}
                onChange={(v) => update("timeSlot", v)}
                error={errors.timeSlot}
                options={TIME_SLOT_OPTIONS}
              />

              <motion.button
                type="submit"
                className="w-full rounded-2xl border border-emerald-400/40 bg-gradient-to-r from-emerald-500 to-teal-600 py-4 text-sm font-semibold text-white shadow-neon transition hover:border-emerald-300/55"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={springSnappy}
              >
                Submit pickup request
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="relative overflow-hidden rounded-3xl border border-emerald-400/35 bg-gradient-to-b from-emerald-500/15 via-[#04130f]/90 to-[#04130f] p-8 shadow-[0_0_48px_rgba(16,185,129,0.2)] backdrop-blur-xl sm:p-10"
            role="status"
            aria-live="polite"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl"
              aria-hidden
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/20 text-2xl text-emerald-200 shadow-neon"
              aria-hidden
            >
              ✓
            </motion.div>
            <h2 className="mt-6 text-center font-display text-2xl font-semibold text-white">
              Request clustered
            </h2>
            <p className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-emerald-100/75">
              Your request has been added to the area cluster.
            </p>
            {reference ? (
              <p className="mt-4 text-center text-sm font-medium tabular-nums text-emerald-300/90">
                Reference · <span className="text-white">{reference}</span>
              </p>
            ) : null}
            <motion.button
              type="button"
              onClick={onBookAnother}
              className="mt-8 w-full rounded-2xl border border-white/15 bg-white/5 py-3.5 text-sm font-semibold text-emerald-100 transition hover:border-emerald-400/35 hover:bg-emerald-500/10"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              transition={springSnappy}
            >
              Book another pickup
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
