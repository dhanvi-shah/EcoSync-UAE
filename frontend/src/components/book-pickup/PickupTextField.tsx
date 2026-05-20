import type { HTMLAttributes } from "react";

type Props = {
  id: string;
  label: string;  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: "text" | "number";
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  disabled?: boolean;
};

export default function PickupTextField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  inputMode,
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
      <input
        id={fieldId}
        type={type}
        inputMode={inputMode}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="street-address"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-err` : undefined}
        className={`w-full rounded-2xl border bg-black/35 px-4 py-3.5 text-sm font-medium text-emerald-50 shadow-inner backdrop-blur-md transition placeholder:text-emerald-100/35 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          error
            ? "border-rose-400/45 focus:border-rose-400/55 focus:ring-rose-500/25"
            : "border-white/15 focus:border-emerald-400/45 focus:ring-emerald-500/30"
        }`}
      />
      {error ? (
        <p id={`${fieldId}-err`} className="text-xs font-medium text-rose-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
