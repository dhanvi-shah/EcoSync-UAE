export type PickupFormValues = {
  materialType: string;
  quantity: string;
  area: string;
  address: string;
  timeSlot: string;
};

export const MATERIAL_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Select material type" },
  { value: "mixed-plastics", label: "Mixed plastics (PET, HDPE, PP)" },
  { value: "paper-occ", label: "Paper & cardboard (OCC)" },
  { value: "glass", label: "Glass cullet" },
  { value: "metal", label: "Ferrous & non-ferrous metal" },
  { value: "textiles", label: "Textiles & fabric" },
  { value: "e-waste", label: "E-waste (sorted)" },
];

export const AREA_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Select area" },
  { value: "dubai-marina", label: "Dubai Marina" },
  { value: "jlt", label: "Jumeirah Lakes Towers (JLT)" },
  { value: "downtown", label: "Downtown Dubai" },
  { value: "barsha", label: "Al Barsha" },
  { value: "silicon-oasis", label: "Dubai Silicon Oasis" },
  { value: "sharjah", label: "Sharjah — city" },
  { value: "abu-dhabi", label: "Abu Dhabi — main island" },
  { value: "al-ain", label: "Al Ain" },
];

export const TIME_SLOT_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Preferred time slot" },
  { value: "early", label: "Early · 07:00 – 10:00" },
  { value: "mid", label: "Mid · 10:00 – 14:00" },
  { value: "late", label: "Late · 14:00 – 18:00" },
  { value: "evening", label: "Evening · 18:00 – 21:00 (select zones)" },
];

export const EMPTY_PICKUP_FORM: PickupFormValues = {
  materialType: "",
  quantity: "",
  area: "",
  address: "",
  timeSlot: "",
};

export function validatePickupForm(
  v: PickupFormValues
): Partial<Record<keyof PickupFormValues, string>> {
  const errors: Partial<Record<keyof PickupFormValues, string>> = {};

  if (!v.materialType.trim()) {
    errors.materialType = "Choose a material type.";
  }
  if (!v.area.trim()) {
    errors.area = "Select your area.";
  }
  if (!v.timeSlot.trim()) {
    errors.timeSlot = "Pick a preferred time slot.";
  }

  const addr = v.address.trim();
  if (!addr) {
    errors.address = "Enter the pickup address.";
  } else if (addr.length < 10) {
    errors.address = "Include building name, street, and area (min. 10 characters).";
  }

  const qRaw = v.quantity.trim();
  if (!qRaw) {
    errors.quantity = "Enter estimated quantity in kilograms.";
  } else {
    const q = Number(qRaw);
    if (Number.isNaN(q) || q <= 0) {
      errors.quantity = "Use a positive number (kg).";
    } else if (q > 5_000) {
      errors.quantity = "For loads over 5,000 kg, contact EcoSync operations.";
    }
  }

  return errors;
}

export function generatePickupReference(): string {
  const part = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ECC-2026-${part}`;
}
