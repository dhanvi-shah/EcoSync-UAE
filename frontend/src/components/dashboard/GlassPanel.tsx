import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  glow?: "emerald" | "teal" | "violet" | "none";
};

const glowClass: Record<NonNullable<Props["glow"]>, string> = {
  emerald: "before:bg-emerald-500/15",
  teal: "before:bg-teal-400/12",
  violet: "before:bg-violet-500/12",
  none: "",
};

export default function GlassPanel({
  children,
  className = "",
  glow = "none",
}: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.05] shadow-glass backdrop-blur-xl before:pointer-events-none before:absolute before:-right-24 before:-top-24 before:h-48 before:w-48 before:rounded-full before:blur-3xl ${glowClass[glow]} ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
