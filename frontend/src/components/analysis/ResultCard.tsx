import type { ReactNode } from "react";

type Props = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function ResultCard({
  title,
  icon,
  children,
  className = "",
}: Props) {
  return (
    <article
      className={`group rounded-2xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:shadow-xl ${className}`}
    >
      <div className="mb-4 flex items-center gap-2.5">
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-emerald-300/90 transition-colors duration-300 group-hover:border-emerald-400/25 group-hover:bg-emerald-500/15 group-hover:text-emerald-200">
            {icon}
          </span>
        )}
        <h2 className="text-base font-semibold tracking-tight text-white">
          {title}
        </h2>
      </div>
      <div className="space-y-3 text-[15px] leading-relaxed text-gray-300">
        {children}
      </div>
    </article>
  );
}
