import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "@/pages/home/SectionHeading";
import { springSoft, sectionCard, staggerSection } from "@/utils/motionVariants";

type FeatureKind = "pickup" | "rewards" | "warehouses" | "community";

type Feature = {
  kind: FeatureKind;
  title: string;
  description: string;
  to: string;
  cta: string;
};

const FEATURES: Feature[] = [
  {
    kind: "pickup",
    title: "Smart pickup",
    description:
      "Adaptive routing and honest ETAs—fewer failed attempts, cleaner loads, and drivers who spend time moving material—not waiting at gates.",
    to: "/book-pickup",
    cta: "Book pickup",
  },
  {
    kind: "rewards",
    title: "Rewards",
    description:
      "Credits tied to verified recovery outcomes—so incentives reinforce quality diversion, not vanity metrics or one-off campaigns.",
    to: "/rewards",
    cta: "View rewards",
  },
  {
    kind: "warehouses",
    title: "Warehouses",
    description:
      "Slotting, QC, and inbound telemetry in one pane—so supervisors can protect throughput when the city sends a surge.",
    to: "/warehouses",
    cta: "Explore warehouses",
  },
  {
    kind: "community",
    title: "Community participation",
    description:
      "Leaderboards, challenges, and transparent impact storytelling—built for neighborhoods, campuses, and employers who want shared accountability.",
    to: "/leaderboard",
    cta: "See leaderboard",
  },
];

function FeatureIcon({ kind }: { kind: FeatureKind }) {
  const paths: Record<FeatureKind, JSX.Element> = {
    pickup: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.125 1.125 0 01-1.125-1.125V9.375m10.5 9.375a1.125 1.125 0 001.125-1.125V9.375M3.375 9.375h17.25m-17.25 0a3 3 0 01-.88-2.125l.88-4.125A1.125 1.125 0 014.5 2.25h15a1.125 1.125 0 011.125 1l.88 4.125a3 3 0 01-.88 2.125M6.75 18.75v-1.875a1.875 1.875 0 011.875-1.875h6.75a1.875 1.875 0 011.875 1.875V18.75"
      />
    ),
    rewards: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
      />
    ),
    warehouses: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.125c.621 0 1.125-.504 1.125-1.125v-7.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V21m17.25 0h.375a1.125 1.125 0 001.125-1.125v-9.75a1.125 1.125 0 00-.75-1.06L16.5 7.5m0 0l-3-3m3 3l3-3m-9 9h.008v.008H8.25V15z"
      />
    ),
    community: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.09 9.09 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
      />
    ),
  };

  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      {paths[kind]}
    </svg>
  );
}

export default function FeaturesOverviewSection() {
  return (
    <section
      id="features"
      className="scroll-mt-28 py-20 sm:scroll-mt-32 sm:py-24"
      aria-labelledby="features-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          titleId="features-title"
          eyebrow="Platform"
          title="Features overview"
          subtitle="Everything we ship ladders up to one outcome: higher-quality diversion with lower friction for operators and residents."
        />

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2"
          variants={staggerSection}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {FEATURES.map((f) => (
            <motion.article
              key={f.title}
              variants={sectionCard}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.04] p-7 shadow-glass backdrop-blur-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-500/10 text-emerald-200">
                  <FeatureIcon kind={f.kind} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-100/65">
                    {f.description}
                  </p>
                </div>
              </div>
              <motion.div
                className="mt-6"
                whileHover={{ x: 2 }}
                transition={springSoft}
              >
                <Link
                  to={f.to}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition group-hover:text-emerald-200"
                >
                  {f.cta}
                  <span
                    aria-hidden
                    className="transition group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
