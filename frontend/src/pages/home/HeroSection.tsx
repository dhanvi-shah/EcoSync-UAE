import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { springSoft, transitionSmooth } from "@/utils/motionVariants";

const ANCHORS = [
  { href: "#who-we-are", label: "Who we are" },
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#features", label: "Features" },
  { href: "#impact", label: "Impact" },
] as const;

export default function HeroSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-20">
      <div className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSmooth, delay: 0.05 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/90 shadow-[0_0_28px_rgba(16,185,129,0.12)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
          EcoSync UAE · Home
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSmooth, delay: 0.1 }}
          className="font-display text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Transforming Recycling Through AI &amp; Community Logistics
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSmooth, delay: 0.18 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-emerald-100/75 sm:text-xl"
        >
          The Emirates-wide platform that aligns households, retailers, and
          recovery infrastructure—so diversion stops being a slogan and becomes
          a measured operational reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSmooth, delay: 0.24 }}
          className="mt-8 flex flex-wrap gap-2"
          aria-label="On this page"
        >
          {ANCHORS.map((a, i) => (
            <motion.a
              key={a.href}
              href={a.href}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...transitionSmooth, delay: 0.28 + i * 0.04 }}
              className="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-emerald-100/85 shadow-sm backdrop-blur-md transition hover:border-emerald-400/35 hover:bg-emerald-500/10 hover:text-white"
            >
              {a.label}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSmooth, delay: 0.32 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={springSoft}
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-emerald-300/40 bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(52,211,153,0.35)] transition hover:border-emerald-200/60 hover:shadow-[0_0_40px_rgba(52,211,153,0.45)]"
            >
              Get Started
            </Link>
          </motion.div>
          <Link
            to="/sustainable-shopping"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-emerald-50/90 backdrop-blur-md transition hover:border-emerald-400/30 hover:bg-white/10"
          >
            Sustainable Shopping Assistant
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
