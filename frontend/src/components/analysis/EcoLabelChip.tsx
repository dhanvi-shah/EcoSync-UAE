import type { FC } from "react";
import type { EcoLabel } from "@/types";

function IconLeaf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22c4.5-4.5 7-9 7-14a7 7 0 00-14 0c0 5 2.5 9.5 7 14z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 22V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconRecycle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 19H4.815a1.83 1.83 0 01-1.57-.881 1.745 1.745 0 01-.233-1.55L4 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 17l-4-4 4-4M17 5h2.185a1.83 1.83 0 011.57.881 1.745 1.745 0 01.233 1.55L20 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 7l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSprout({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22v-6M5 12H2a10 10 0 0110-10v3M22 12h-3a10 10 0 00-10-10v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 16c-2 0-3.5-1.5-3.5-3.5S10 9 12 9s3.5 1.5 3.5 3.5S14 16 12 16z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IconPlastic({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 3h6l1 4H8l1-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 7h8v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V7z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 11h4M10 15h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICONS: Record<EcoLabel, FC<{ className?: string }>> = {
  eco_friendly: IconLeaf,
  recyclable: IconRecycle,
  biodegradable: IconSprout,
  high_plastic: IconPlastic,
};

const STYLES: Record<EcoLabel, string> = {
  eco_friendly:
    "border-emerald-400/35 bg-emerald-500/15 text-emerald-200 hover:border-emerald-400/50 hover:bg-emerald-500/25",
  recyclable:
    "border-sky-400/35 bg-sky-500/15 text-sky-200 hover:border-sky-400/50 hover:bg-sky-500/25",
  biodegradable:
    "border-teal-400/35 bg-teal-500/15 text-teal-200 hover:border-teal-400/50 hover:bg-teal-500/25",
  high_plastic:
    "border-amber-400/40 bg-amber-500/15 text-amber-200 hover:border-amber-400/55 hover:bg-amber-500/25",
};

type Props = {
  label: EcoLabel;
};

export default function EcoLabelChip({ label }: Props) {
  const Icon = ICONS[label];
  const style = STYLES[label];
  const text = label.replace(/_/g, " ");

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${style}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 opacity-90" />
      {text}
    </span>
  );
}
