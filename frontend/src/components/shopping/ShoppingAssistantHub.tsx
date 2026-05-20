import { useCallback, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PRODUCT_RECOMMENDATIONS,
  SHOPPING_CATEGORIES,
  type ProductRecommendation,
  type ShoppingCategoryId,
} from "@/data/shoppingRecommendationsMock";
import { getScoreTier, tierVisual } from "@/components/analysis/scoreTier";
import {
  sectionCard,
  staggerSection,
  springSoft,
  transitionSmooth,
} from "@/utils/motionVariants";

function MiniEcoScore({ score }: { score: number }) {
  const clamped = Math.min(100, Math.max(0, score));
  const deg = (clamped / 100) * 360;
  const tier = getScoreTier(clamped);
  const v = tierVisual[tier];

  return (
    <div
      className="relative flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center"
      aria-label={`Eco score ${clamped}`}
    >
      <div
        className="absolute inset-0 rounded-full shadow-inner"
        style={{
          background: `conic-gradient(${v.ringRgb} ${deg}deg, ${v.trackRgb} 0deg)`,
        }}
        aria-hidden
      />
      <div className="relative flex h-[3.25rem] w-[3.25rem] flex-col items-center justify-center rounded-full border border-white/10 bg-[#04130f]/90 backdrop-blur-sm">
        <span className={`text-lg font-semibold tabular-nums ${v.scoreText}`}>
          {clamped}
        </span>
        <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-100/45">
          eco
        </span>
      </div>
    </div>
  );
}

function RecommendationCard({
  product,
  onAnalyze,
}: {
  product: ProductRecommendation;
  onAnalyze: (url: string) => void;
}) {
  const tier = getScoreTier(product.ecoScore);
  const v = tierVisual[tier];

  return (
    <motion.article
      variants={sectionCard}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 shadow-glass backdrop-blur-xl"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl transition group-hover:bg-emerald-500/15"
        aria-hidden
      />
      <div className="relative flex gap-4">
        <MiniEcoScore score={product.ecoScore} />
        <div className="min-w-0 flex-1">
          {product.badge ? (
            <span className="inline-block rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-200/90">
              {product.badge}
            </span>
          ) : null}
          <h3 className="mt-1 font-display text-base font-semibold leading-snug text-white">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-emerald-100/55">
            {product.brand}
          </p>
        </div>
      </div>
      <p className={`relative mt-3 text-xs leading-relaxed ${v.subline}`}>
        {product.carbonHint}
      </p>
      <motion.button
        type="button"
        onClick={() => onAnalyze(product.shopUrl)}
        className="relative mt-4 w-full rounded-2xl border border-emerald-400/35 bg-emerald-500/10 py-2.5 text-xs font-semibold text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-500/20"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={springSoft}
      >
        Analyze this listing
      </motion.button>
    </motion.article>
  );
}

export default function ShoppingAssistantHub() {
  const [, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ShoppingCategoryId>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCT_RECOMMENDATIONS.filter((p) => {
      const catOk = category === "all" || p.category === category;
      if (!catOk) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.carbonHint.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const onAnalyze = useCallback(
    (url: string) => {
      setSearchParams({ url: encodeURIComponent(url) });
      requestAnimationFrame(() => {
        document
          .getElementById("assistant-analyze")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [setSearchParams]
  );

  const onSearchSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;
      if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        onAnalyze(trimmed);
      } else {
        document
          .getElementById("assistant-analyze")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [query, onAnalyze]
  );

  return (
    <section className="space-y-8" aria-labelledby="assistant-hub-heading">
      <div className="text-center sm:text-left">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400/75">
          EcoSync UAE
        </p>
        <h2
          id="assistant-hub-heading"
          className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl"
        >
          Sustainable picks &amp; product intelligence
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-emerald-100/60 sm:mx-0">
          Curated lower-impact SKUs, live eco scores, and one-click hand-off to
          the analyzer—same glass language as the rest of your workspace.
        </p>
      </div>

      <form
        onSubmit={onSearchSubmit}
        className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.06] p-2 shadow-glass backdrop-blur-xl sm:p-3"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-600/10"
          aria-hidden
        />
        <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <span
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400/70"
              aria-hidden
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search picks, brands, or paste a product URL…"
              className="w-full rounded-2xl border border-white/10 bg-black/35 py-3.5 pl-12 pr-4 text-sm font-medium text-emerald-50 placeholder:text-emerald-100/35 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
              aria-label="Search recommendations or product URL"
            />
          </div>
          <motion.button
            type="submit"
            className="rounded-2xl border border-emerald-400/40 bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-neon sm:shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springSoft}
          >
            Search
          </motion.button>
        </div>
      </form>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-400/65">
          Category
        </p>
        <div
          className="mt-3 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by category"
        >
          {SHOPPING_CATEGORIES.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(c.id)}
                className={`relative rounded-full px-4 py-2 text-xs font-semibold transition ${
                  active
                    ? "text-white"
                    : "text-emerald-100/65 hover:text-emerald-50"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="assistant-category-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-emerald-400/35 bg-gradient-to-r from-emerald-600/85 to-teal-700/70 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    transition={transitionSmooth}
                  />
                ) : null}
                <span className="relative z-10">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg font-semibold text-white">
            Sustainable recommendations
          </h3>
          <p className="text-xs tabular-nums text-emerald-100/45">
            {filtered.length} picks
          </p>
        </div>
        <motion.div
          className="mt-5 grid gap-4 sm:grid-cols-2"
          variants={staggerSection}
          initial="hidden"
          animate="show"
          key={`${category}-${query}`}
        >
          {filtered.map((p: ProductRecommendation) => (
            <RecommendationCard key={p.id} product={p} onAnalyze={onAnalyze} />
          ))}
        </motion.div>
        {filtered.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-8 text-center text-sm text-emerald-100/55">
            No matches—try another category or shorter search.
          </p>
        ) : null}
      </div>
    </section>
  );
}
