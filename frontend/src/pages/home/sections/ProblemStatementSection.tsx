import { motion } from "framer-motion";
import SectionHeading from "@/pages/home/SectionHeading";
import {
  sectionCard,
  staggerSection,
} from "@/utils/motionVariants";

type ProblemCard = {
  title: string;
  tag: string;
  body: string;
  bars: number[];
  accent: string;
};

const CARDS: ProblemCard[] = [
  {
    title: "Waste generation",
    tag: "Volume & complexity",
    body: "High consumption, seasonal peaks, and mixed packaging create streams that are hard to forecast—so collection plans default to rigid schedules instead of adaptive capacity.",
    bars: [44, 72, 58, 91, 68, 85],
    accent: "from-emerald-400/90 to-teal-500/70",
  },
  {
    title: "Landfill pressure",
    tag: "Space & liability",
    body: "Landfill capacity, environmental cost, and long-term liability concentrate political attention on diversion—yet infrastructure-ready material still leaks into disposal when logistics fail.",
    bars: [88, 76, 92, 64, 79, 95],
    accent: "from-amber-400/85 to-orange-500/60",
  },
  {
    title: "The logistics paradox",
    tag: "Cost vs. coverage",
    body: "Door-to-door recovery is expensive; drop-off networks are under-used. The result is half-utilized trucks, redundant miles, and warehouses that cannot plan intake with confidence.",
    bars: [52, 48, 61, 55, 49, 57],
    accent: "from-cyan-400/80 to-emerald-500/65",
  },
];

function InfographicBars({ bars, accent }: { bars: number[]; accent: string }) {
  return (
    <div
      className="mt-6 flex h-24 items-end justify-between gap-1.5 rounded-2xl border border-white/[0.08] bg-black/25 px-3 py-3"
      aria-hidden
    >
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0.2, opacity: 0.4 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.06 * i,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ height: `${h}%`, transformOrigin: "bottom" }}
          className={`w-full max-w-[14%] rounded-md bg-gradient-to-t ${accent} shadow-neon`}
        />
      ))}
    </div>
  );
}

export default function ProblemStatementSection() {
  return (
    <section
      id="problem"
      className="scroll-mt-28 py-20 sm:scroll-mt-32 sm:py-24"
      aria-labelledby="problem-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          titleId="problem-title"
          eyebrow="Problem statement"
          title="Circularity breaks in the middle mile"
          subtitle="Three structural forces keep diversion goals out of reach—even when consumers and municipalities are willing to participate."
        />

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-3"
          variants={staggerSection}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {CARDS.map((card) => (
            <motion.article
              key={card.title}
              variants={sectionCard}
              className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.04] p-6 shadow-glass backdrop-blur-xl sm:p-7"
            >
              <div
                className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl"
                aria-hidden
              />
              <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-300/75">
                {card.tag}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-emerald-100/65">
                {card.body}
              </p>
              <InfographicBars bars={card.bars} accent={card.accent} />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
