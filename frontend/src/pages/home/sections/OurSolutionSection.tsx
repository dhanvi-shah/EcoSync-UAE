import { motion } from "framer-motion";
import SectionHeading from "@/pages/home/SectionHeading";
import { sectionBlock, transitionSection } from "@/utils/motionVariants";

export default function OurSolutionSection() {
  return (
    <section
      id="solution"
      className="scroll-mt-28 border-t border-white/[0.06] bg-[#020a08]/50 py-20 backdrop-blur-sm sm:scroll-mt-32 sm:py-24"
      aria-labelledby="solution-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          titleId="solution-title"
          eyebrow="Our solution"
          title="AI coordination + a virtual warehouse layer"
          subtitle="EcoSync turns fragmented signals—requests, inventory rules, traffic windows, and QC constraints—into plans people can execute without heroic manual dispatch."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            variants={sectionBlock}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={transitionSection}
            className="relative overflow-hidden rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-emerald-600/15 via-[#041912]/80 to-transparent p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(52,211,153,0.12),transparent_55%)]" />
            <div className="relative">
              <span className="inline-flex rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-200/90">
                AI-powered clustering
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">
                Demand folds into efficient loops
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-emerald-100/70 sm:text-base">
                Our models cluster nearby pickups, compatible material classes,
                and time windows to minimize deadheading. Instead of optimizing
                each stop in isolation, EcoSync evaluates{" "}
                <span className="text-emerald-200/90">batch integrity</span>—how
                likely a route is to arrive at the warehouse within spec.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-emerald-100/65">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-neon" />
                  Dynamic re-ranking when delays, weather, or gate access
                  changes.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-neon" />
                  Contamination risk signals to protect downstream sorting.
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={sectionBlock}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={transitionSection}
            className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.05] p-8 shadow-glass backdrop-blur-xl"
          >
            <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-teal-500/15 blur-3xl" />
            <div className="relative">
              <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-200/85">
                Virtual warehouse
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">
                Digital intake before physical handling
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-emerald-100/70 sm:text-base">
                A virtual warehouse is the live mirror of capacity: slots,
                lanes, accepted SKUs, and quality gates. Materials exist in
                EcoSync as{" "}
                <span className="text-emerald-200/90">
                  verified commitments
                </span>{" "}
                before they cross the weighbridge—so supervisors can throttle
                flows, pre-stage labor, and reject incompatible loads early.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-emerald-100/65">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300/90" />
                  Chain-of-custody events from pickup or drop-off to baling.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300/90" />
                  Partner visibility without exposing sensitive pricing.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
