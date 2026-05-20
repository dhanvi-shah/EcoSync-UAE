type Props = {
  visible: boolean;
};

export default function AnalysisLoading({ visible }: Props) {
  if (!visible) return null;

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-md"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-2 border-white/15" />
        <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-transparent border-t-emerald-400 border-r-teal-500/50" />
        <div className="absolute inset-2 rounded-full border border-white/10" />
      </div>
      <div className="space-y-1 text-center">
        <p className="animate-pulse-soft text-sm font-medium text-white">
          Analyzing impact
        </p>
        <p className="text-xs text-gray-400">
          Scoring sustainability, footprint, and alternatives…
        </p>
      </div>
    </div>
  );
}
