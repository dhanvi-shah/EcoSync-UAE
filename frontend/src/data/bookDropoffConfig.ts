import { MATERIAL_OPTIONS } from "@/data/bookPickupConfig";

export type DropoffFormValues = {
  materialType: string;
  quantity: string;
  warehouseId: string;
  timeSlot: string;
};

/** Drop-off windows — copy tuned for warehouse gate */
export const DROPOFF_TIME_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Preferred drop-off window" },
  { value: "early", label: "Gate A · 07:00 – 10:00" },
  { value: "mid", label: "Gate A · 10:00 – 14:00" },
  { value: "late", label: "Gate B · 14:00 – 18:00" },
  { value: "evening", label: "Gate B · 18:00 – 20:30 (hub dependent)" },
];

export const DROP_OFF_MATERIAL_OPTIONS = MATERIAL_OPTIONS;

export const EMPTY_DROPOFF_FORM: DropoffFormValues = {
  materialType: "",
  quantity: "",
  warehouseId: "",
  timeSlot: "",
};

export function validateDropoffForm(
  v: DropoffFormValues
): Partial<Record<keyof DropoffFormValues, string>> {
  const errors: Partial<Record<keyof DropoffFormValues, string>> = {};

  if (!v.materialType.trim()) {
    errors.materialType = "Select the material you’re bringing.";
  }
  if (!v.warehouseId.trim()) {
    errors.warehouseId = "Choose a warehouse for drop-off.";
  }
  if (!v.timeSlot.trim()) {
    errors.timeSlot = "Pick a drop-off window.";
  }

  const qRaw = v.quantity.trim();
  if (!qRaw) {
    errors.quantity = "Enter estimated quantity in kilograms.";
  } else {
    const q = Number(qRaw);
    if (Number.isNaN(q) || q <= 0) {
      errors.quantity = "Use a positive number (kg).";
    } else if (q > 5_000) {
      errors.quantity = "For loads over 5,000 kg, schedule a dedicated intake.";
    }
  }

  return errors;
}

export function generateDropoffReference(): string {
  const part = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ECD-2026-${part}`;
}

export function warehouseSelectOptions(
  sorted: { id: string; area: string; city: string; distanceKm: number }[]
): { value: string; label: string }[] {
  return [
    { value: "", label: "Select warehouse" },
    ...sorted.map((w) => ({
      value: w.id,
      label: `${w.area} · ${w.city} · ${
        w.distanceKm < 10 ? w.distanceKm.toFixed(1) : Math.round(w.distanceKm)
      } km`,
    })),
  ];
}
