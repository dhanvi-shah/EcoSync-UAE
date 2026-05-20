import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { springSnappy } from "@/utils/motionVariants";

type Props = {
  title: string;
  description: string;
  eyebrow?: string;
  icon?: ReactNode;
};

export default function PlaceholderPage({
  title,
  description,
  eyebrow = "EcoSync platform",
  icon,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springSnappy}
        className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.06] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-12"
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-teal-500/15 blur-3xl"
          aria-hidden
        />

        <div className="relative">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            {icon ? (
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-500/10 text-emerald-200 shadow-inner">
                {icon}
              </div>
            ) : null}
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-200/90">
              Coming soon
            </span>
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/70">
            {eyebrow}
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-emerald-100/70">
            {description}
          </p>
          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent" />
          <p className="mt-6 text-sm text-emerald-100/50">
            This module is being calibrated with UAE warehouse partners and
            municipal collection windows. Your team will be notified when the
            pilot slot opens.
          </p>
        </div>
      </motion.article>
    </div>
  );
}
