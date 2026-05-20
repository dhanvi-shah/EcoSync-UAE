type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
};

export default function PickupSelectField({
  id,
  label,
  value,
  onChange,
  error,
  options,
  disabled,
}: Props) {
  const fieldId = `pickup-${String(id)}`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={fieldId}
        className="block text-xs font-bold uppercase tracking-[0.14em] text-emerald-400/80"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={fieldId}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}-err` : undefined}
          className={`w-full cursor-pointer appearance-none rounded-2xl border bg-black/35 py-3.5 pl-4 pr-12 text-sm font-medium text-emerald-50 shadow-inner backdrop-blur-md transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            error
              ? "border-rose-400/45 focus:border-rose-400/55 focus:ring-rose-500/25"
              : "border-white/15 focus:border-emerald-400/45 focus:ring-emerald-500/30"
          }`}
        >
          {options.map((opt) => (
            <option key={opt.value || "empty"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-300/70"
          aria-hidden
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
      {error ? (
        <p id={`${fieldId}-err`} className="text-xs font-medium text-rose-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
