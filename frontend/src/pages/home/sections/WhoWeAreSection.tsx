import { motion } from "framer-motion";
import SectionHeading from "@/pages/home/SectionHeading";
import { sectionBlock, transitionSection } from "@/utils/motionVariants";

export default function WhoWeAreSection() {
  return (
    <section
      id="who-we-are"
      className="scroll-mt-28 border-t border-white/[0.06] bg-[#030f0c]/40 py-20 backdrop-blur-sm sm:scroll-mt-32 sm:py-24"
      aria-labelledby="who-we-are-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          titleId="who-we-are-title"
          eyebrow="Who we are"
          title="EcoSync UAE"
          subtitle="We build the coordination layer between people who generate recoverable materials and the facilities that can actually process them—across the UAE’s dense urban corridors and rapidly growing logistics footprint."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <motion.article
            variants={sectionBlock}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={transitionSection}
            className="rounded-3xl border border-white/[0.1] bg-white/[0.05] p-8 shadow-glass backdrop-blur-xl"
          >
            <h3 className="font-display text-xl font-semibold text-white">
              What EcoSync does
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100/70 sm:text-base">
              EcoSync UAE is an AI-powered recycling operations platform. We
              synchronize pickups, drop-offs, warehouse intake, and community
              incentives so every kilogram is routed with purpose—not left to
              guesswork, ad-hoc trucks, or contaminated commingled streams.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100/70 sm:text-base">
              Our north star is simple: increase high-quality diversion without
              burning more diesel, warehouse hours, or resident patience than
              necessary.
            </p>
          </motion.article>

          <motion.article
            variants={sectionBlock}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={transitionSection}
            className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-600/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          >
            <h3 className="font-display text-xl font-semibold text-white">
              The UAE logistics gap
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100/70 sm:text-base">
              The Emirates moves enormous volumes of consumer and construction
              waste while pursuing ambitious landfill diversion goals. The
              bottleneck is rarely intent—it is{" "}
              <span className="font-medium text-emerald-200/90">
                coordination
              </span>
              : unpredictable arrivals, uneven sorting quality, and routes
              that were never designed for circularity.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100/70 sm:text-base">
              Without a shared operating picture, trucks run half-empty,
              warehouses idle between spikes, and residents lose trust when
              their effort does not translate into verified recovery.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
