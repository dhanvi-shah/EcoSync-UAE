import type { KeyboardEvent } from "react";
import { motion } from "framer-motion";
import type { Warehouse } from "@/data/warehousesMock";
import { USER_ANCHOR, WAREHOUSES } from "@/data/warehousesMock";
import { springSoft } from "@/utils/motionVariants";

const VB_W = 500;
const VB_H = 450;

/** Stylized UAE land silhouette (UI illustration — not survey-grade). */
const LAND_PATH =
  "M 52 338 C 38 260 55 175 118 118 C 168 78 248 62 318 88 C 392 112 448 168 462 242 C 472 302 438 368 372 398 C 308 422 228 412 168 382 C 108 352 68 348 52 338 Z";

type Props = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const HEAT_BLOBS: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rot?: number;
}[] = [
  { cx: 300, cy: 165, rx: 110, ry: 72, rot: 12 },
  { cx: 210, cy: 255, rx: 95, ry: 88, rot: -8 },
  { cx: 350, cy: 220, rx: 75, ry: 60, rot: 20 },
  { cx: 145, cy: 305, rx: 70, ry: 65, rot: 0 },
  { cx: 275, cy: 315, rx: 55, ry: 48, rot: -15 },
];

export default function UaeOperationsMap({ selectedId, onSelect }: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-[#020c0a] shadow-[0_0_60px_rgba(16,185,129,0.12)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(52,211,153,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52,211,153,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04130f] via-transparent to-emerald-950/20"
        aria-hidden
      />

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="relative z-[1] w-full touch-manipulation"
        role="img"
        aria-label="Stylized UAE operations map with warehouse markers"
      >
        <defs>
          <filter id="markerGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="markerGlowStrong"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="heatCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#14b8a6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heatWarm" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#34d399" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#020c0a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="landFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#065f46" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#022c22" stopOpacity="0.65" />
          </linearGradient>
        </defs>

        <g opacity={0.9}>
          {HEAT_BLOBS.map((h, i) => (
            <motion.ellipse
              key={`heat-${i}`}
              cx={h.cx}
              cy={h.cy}
              rx={h.rx}
              ry={h.ry}
              fill={i % 2 === 0 ? "url(#heatCore)" : "url(#heatWarm)"}
              transform={h.rot ? `rotate(${h.rot} ${h.cx} ${h.cy})` : undefined}
              initial={{ opacity: 0.25 }}
              animate={{ opacity: [0.22, 0.42, 0.28, 0.38, 0.25] }}
              transition={{
                duration: 6 + i * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        <path
          d={LAND_PATH}
          fill="url(#landFill)"
          stroke="rgba(52,211,153,0.35)"
          strokeWidth={1.25}
          className="drop-shadow-[0_0_24px_rgba(16,185,129,0.15)]"
        />

        <g>
          <motion.circle
            cx={USER_ANCHOR.mapX}
            cy={USER_ANCHOR.mapY}
            r={14}
            fill="none"
            stroke="rgba(96,165,250,0.5)"
            strokeWidth={1}
            initial={{ opacity: 0.4, scale: 0.9 }}
            animate={{
              opacity: [0.35, 0.65, 0.4],
              scale: [0.92, 1.05, 0.92],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle
            cx={USER_ANCHOR.mapX}
            cy={USER_ANCHOR.mapY}
            r={5}
            fill="#38bdf8"
            stroke="#e0f2fe"
            strokeWidth={1.5}
            filter="url(#markerGlow)"
          />
          <text
            x={USER_ANCHOR.mapX + 14}
            y={USER_ANCHOR.mapY - 10}
            fill="rgba(224,242,254,0.9)"
            fontSize={11}
            fontWeight={700}
            className="font-sans"
          >
            You
          </text>
        </g>

        {WAREHOUSES.map((w: Warehouse) => {
          const selected = selectedId === w.id;
          return (
            <g key={w.id}>
              {selected ? (
                <motion.circle
                  cx={w.mapX}
                  cy={w.mapY}
                  r={22}
                  fill="none"
                  stroke="rgba(52,211,153,0.45)"
                  strokeWidth={1.5}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.5, 0.9, 0.5],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ) : null}
              <motion.circle
                role="button"
                tabIndex={0}
                cx={w.mapX}
                cy={w.mapY}
                r={selected ? 9 : 7}
                fill={selected ? "#6ee7b7" : "#10b981"}
                stroke={selected ? "#ecfdf5" : "rgba(6,78,59,0.9)"}
                strokeWidth={selected ? 2 : 1.5}
                filter={selected ? "url(#markerGlowStrong)" : "url(#markerGlow)"}
                className="cursor-pointer outline-none"
                onClick={() => onSelect(w.id)}
                onKeyDown={(e: KeyboardEvent<SVGCircleElement>) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(w.id);
                  }
                }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                transition={springSoft}
                aria-label={`${w.area}, ${w.city}`}
              />
            </g>
          );
        })}
      </svg>

      <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-[2] flex flex-wrap items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wider text-emerald-200/55 sm:bottom-4 sm:left-4">
        <span>Recycling activity · synthetic heatmap</span>
        <span className="tabular-nums">EcoSync UAE · pilot mesh</span>
      </div>
    </div>
  );
}
