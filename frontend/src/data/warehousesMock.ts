export type Warehouse = {
  id: string;
  area: string;
  city: string;
  /** Human-readable capacity / utilization signal for UI */
  capacity: string;
  materialsAccepted: string[];
  quantityStored: string;
  /** Position in map SVG viewBox 0 0 500 450 */
  mapX: number;
  mapY: number;
  /** Fake distance from user anchor (Dubai Marina) in km */
  distanceKm: number;
};

/** Stylized anchor — demo “you are here” for nearest sorting */
export const USER_ANCHOR = {
  label: "Dubai Marina",
  mapX: 338,
  mapY: 178,
} as const;

export const WAREHOUSES: Warehouse[] = [
  {
    id: "wh-dxb-marina",
    area: "Marina Inbound Hub",
    city: "Dubai",
    capacity: "Bay load · 76% · good availability",
    materialsAccepted: ["PET", "HDPE", "PP rigid", "Aluminum UBC"],
    quantityStored: "1,420 t",
    mapX: 342,
    mapY: 182,
    distanceKm: 1.2,
  },
  {
    id: "wh-jafza",
    area: "JAFZA Sorting & Bale",
    city: "Dubai",
    capacity: "Bale line · 68% · slots open",
    materialsAccepted: ["OCC cardboard", "Mixed paper", "Steel scrap"],
    quantityStored: "2,890 t",
    mapX: 288,
    mapY: 208,
    distanceKm: 18.4,
  },
  {
    id: "wh-shj-ind",
    area: "Industrial Area 10",
    city: "Sharjah",
    capacity: "Sorting hall · 82% · peak windows tight",
    materialsAccepted: ["LDPE film", "PP woven", "Glass cullet"],
    quantityStored: "1,960 t",
    mapX: 322,
    mapY: 128,
    distanceKm: 32.7,
  },
  {
    id: "wh-ad-mussafah",
    area: "Mussafah Recovery Park",
    city: "Abu Dhabi",
    capacity: "Heavy metals · 71% · QC lanes clear",
    materialsAccepted: ["E-waste prep", "Copper", "Brass"],
    quantityStored: "3,240 t",
    mapX: 168,
    mapY: 292,
    distanceKm: 112,
  },
  {
    id: "wh-alain",
    area: "Al Ain Circular Yard",
    city: "Al Ain",
    capacity: "Bulk receiving · 58% · high headroom",
    materialsAccepted: ["Textiles", "Wood pallets", "HDPE drums"],
    quantityStored: "980 t",
    mapX: 268,
    mapY: 332,
    distanceKm: 126,
  },
  {
    id: "wh-dxb-silicon",
    area: "Silicon Oasis QC Lab",
    city: "Dubai",
    capacity: "Lab intake · 88% · book ahead",
    materialsAccepted: ["Battery-safe staging", "Small appliances"],
    quantityStored: "640 t",
    mapX: 312,
    mapY: 152,
    distanceKm: 22.1,
  },
];

export function warehousesByNearest(): Warehouse[] {
  return [...WAREHOUSES].sort((a, b) => a.distanceKm - b.distanceKm);
}
