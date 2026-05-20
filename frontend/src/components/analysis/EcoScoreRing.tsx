import { getScoreTier, tierVisual } from "./scoreTier";

type Props = {
  score: number;
  className?: string;
};

export default function EcoScoreRing({ score, className = "" }: Props) {
  const clamped = Math.min(100, Math.max(0, score));
  const deg = (clamped / 100) * 360;
  const tier = getScoreTier(clamped);
  const v = tierVisual[tier];

  return (
    <div
      className={`relative flex h-40 w-40 shrink-0 items-center justify-center sm:h-44 sm:w-44 ${className}`}
    >
      <div
        className="absolute inset-0 animate-score-ring-in rounded-full shadow-inner transition-all duration-700 ease-out"
        style={{
          background: `conic-gradient(${v.ringRgb} ${deg}deg, ${v.trackRgb} 0deg)`,
        }}
        aria-hidden
      />
      <div className="relative flex h-[7.25rem] w-[7.25rem] flex-col items-center justify-center rounded-full border border-white/10 bg-slate-950/80 shadow-inner backdrop-blur-md sm:h-[7.75rem] sm:w-[7.75rem]">
        <span
          className={`text-4xl font-semibold tabular-nums tracking-tight transition-colors duration-500 ${v.scoreText}`}
        >
          {clamped}
        </span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
          Eco score
        </span>
        <span
          className={`mt-1 max-w-[5.5rem] text-center text-[11px] font-medium leading-tight ${v.subline}`}
        >
          {v.label}
        </span>
      </div>
    </div>
  );
}
