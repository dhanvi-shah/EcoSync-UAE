import { useCallback, useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AnalysisLoading from "@/components/analysis/AnalysisLoading";
import EcoLabelChip from "@/components/analysis/EcoLabelChip";
import EcoScoreRing from "@/components/analysis/EcoScoreRing";
import ResultCard from "@/components/analysis/ResultCard";
import {
  IconCarbon,
  IconImpact,
  IconSdg,
  IconSummary,
  IconSwap,
} from "@/components/analysis/sectionIcons";
import { analyzeProduct } from "@/services/analyze";
import type { AnalyzeResult } from "@/types";
import {
  altListContainer,
  altListItem,
  resultsContainer,
  resultsItem,
  springSnappy,
  transitionFast,
  transitionSmooth,
} from "@/utils/motionVariants";

type Props = {
  onAnalysisRecorded: (result: AnalyzeResult) => void;
  /** When embedded in Shopping hub, hide hero header and tighten EcoSync styling */
  variant?: "full" | "embedded";
};

function resultKey(r: AnalyzeResult): string {
  return `${r.eco_score}-${r.carbon_kg}-${r.summary.slice(0, 48)}`;
}

export default function AnalyzePage({
  onAnalysisRecorded,
  variant = "full",
}: Props) {
  const [searchParams] = useSearchParams();
  const [url, setUrl] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [imageInputKey, setImageInputKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setResult(null);
      const trimmed = url.trim();
      if (!trimmed && !imageDataUrl) {
        setError("Enter a product URL or attach a product photo.");
        return;
      }
      setLoading(true);
      try {
        const data = await analyzeProduct({
          productUrl: trimmed,
          imageBase64: imageDataUrl,
        });
        setResult(data);
        onAnalysisRecorded(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
    [url, imageDataUrl, onAnalysisRecorded]
  );

  const onUrlChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }, []);

  const onImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageDataUrl(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageDataUrl(reader.result);
      }
    };
    reader.onerror = () => setImageDataUrl(null);
    reader.readAsDataURL(file);
  }, []);

  const onClearImage = useCallback(() => {
    setImageDataUrl(null);
    setImageInputKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const raw = searchParams.get("url");
    if (raw === null || raw === "") return;
    let decoded = raw;
    try {
      decoded = decodeURIComponent(raw);
    } catch {
      decoded = raw;
    }
    setUrl((prev) => (prev === decoded ? prev : decoded));
  }, [searchParams]);

  const embedded = variant === "embedded";

  return (
    <>
      {!embedded ? (
        <motion.header
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transitionSmooth}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400/70">
            Climate-aware shopping
          </p>
          <h1 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Sustainable Shopping Assistant
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-relaxed text-emerald-100/65 sm:text-base">
            Paste a link or upload a photo. Get a scored footprint, impact notes,
            SDG alignment, and lower-impact alternatives.
          </p>
        </motion.header>
      ) : null}

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transitionSmooth, delay: embedded ? 0 : 0.06 }}
      >
        <form
          onSubmit={onSubmit}
          aria-busy={loading}
          className={`relative overflow-hidden rounded-2xl border p-6 shadow-lg backdrop-blur-md transition-all duration-500 sm:p-8 ${
            embedded
              ? "border-emerald-400/20 bg-white/[0.06] hover:border-emerald-400/35 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              : "border-white/10 bg-white/10 hover:border-emerald-400/25 hover:shadow-xl"
          }`}
        >
          <AnalysisLoading visible={loading} />
          <label
            htmlFor="url"
            className="block text-xs font-semibold uppercase tracking-wide text-gray-400"
          >
            Product URL{" "}
            <span className="font-normal normal-case text-gray-500">
              — optional if you add a photo
            </span>
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="url"
              name="url"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://…"
              value={url}
              onChange={onUrlChange}
              className="w-full flex-1 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3.5 text-white shadow-inner outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
              disabled={loading}
            />
            <motion.button
              type="submit"
              disabled={loading}
              className="shrink-0 rounded-xl border border-emerald-400/30 bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
              whileHover={
                loading
                  ? undefined
                  : { scale: 1.03, y: -2, boxShadow: "0 12px 28px -8px rgb(16 185 129 / 0.45)" }
              }
              whileTap={loading ? undefined : { scale: 0.97 }}
              transition={springSnappy}
            >
              {loading ? "Analyzing…" : "Analyze"}
            </motion.button>
          </div>
          <div className="mt-6">
            <label
              htmlFor="product-image"
              className="block text-xs font-semibold uppercase tracking-wide text-gray-400"
            >
              Product photo{" "}
              <span className="font-normal normal-case text-gray-500">(optional)</span>
            </label>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <input
                key={imageInputKey}
                id="product-image"
                name="product-image"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                disabled={loading}
                className="block w-full max-w-md text-sm text-gray-300 file:mr-3 file:rounded-lg file:border file:border-white/10 file:bg-white/10 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white file:backdrop-blur-sm file:transition-all file:duration-300 hover:file:border-emerald-400/30 hover:file:bg-emerald-500/20"
              />
              <AnimatePresence>
                {imageDataUrl && (
                  <motion.button
                    key="clear-img"
                    type="button"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={transitionFast}
                    onClick={onClearImage}
                    disabled={loading}
                    className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-gray-200 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/15 disabled:opacity-50"
                    whileHover={loading ? undefined : { scale: 1.04 }}
                    whileTap={
                      loading
                        ? undefined
                        : { scale: 0.96, transition: springSnappy }
                    }
                  >
                    Remove image
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
          <AnimatePresence>
            {error && (
              <motion.div
                key={error}
                role="alert"
                aria-live="assertive"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={transitionFast}
                className="mt-6 rounded-xl border border-red-500/40 bg-red-950/50 px-4 py-3 text-sm text-red-200 backdrop-blur-md"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.section
            key={resultKey(result)}
            aria-live="polite"
            className="mt-12 space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={transitionSmooth}
          >
            <motion.div
              variants={resultsContainer}
              initial="hidden"
              animate="show"
              className="space-y-5"
            >
              <motion.div
                variants={resultsItem}
                className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:shadow-xl sm:p-8"
              >
                <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between">
                  <EcoScoreRing score={result.eco_score} />
                  <div className="min-w-0 flex-1 space-y-4 text-left">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-emerald-300">
                        <IconSummary className="h-5 w-5" />
                      </span>
                      <h2 className="text-lg font-semibold tracking-tight text-white">
                        Sustainability summary
                      </h2>
                    </div>
                    <p className="text-[15px] leading-relaxed text-gray-300">
                      {result.summary}
                    </p>
                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 transition-colors duration-300 hover:border-emerald-400/25 hover:bg-emerald-500/10">
                      <IconCarbon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Est. carbon footprint
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-gray-200">
                          {typeof result.carbon_kg === "number"
                            ? `${result.carbon_kg.toFixed(2)} kg CO₂e`
                            : "—"}
                        </p>
                      </div>
                    </div>
                    {result.labels && result.labels.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {result.labels.map((label) => (
                          <EcoLabelChip key={label} label={label} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={resultsItem}>
                <ResultCard
                  title="Hidden environmental impact"
                  icon={<IconImpact className="h-4 w-4" />}
                >
                  <p>{result.hidden_impact}</p>
                </ResultCard>
              </motion.div>

              {((result.sdg_tags?.length ?? 0) > 0 ||
                (result.sdg_explanation ?? "").trim() !== "") && (
                <motion.div variants={resultsItem}>
                  <ResultCard
                    title="UN Sustainable Development Goals"
                    icon={<IconSdg className="h-4 w-4" />}
                  >
                    {(result.sdg_tags?.length ?? 0) > 0 && (
                      <div className="flex flex-wrap gap-2 pb-1">
                        {(result.sdg_tags ?? []).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex rounded-full border border-sky-400/35 bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-200 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400/50 hover:bg-sky-500/25 hover:shadow-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {(result.sdg_explanation ?? "").trim() !== "" && (
                      <p className="text-gray-300">{result.sdg_explanation}</p>
                    )}
                  </ResultCard>
                </motion.div>
              )}

              <motion.div variants={resultsItem}>
                <div className="mb-4 flex items-center gap-2.5 px-0.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-emerald-300">
                    <IconSwap className="h-5 w-5" />
                  </span>
                  <h2 className="text-lg font-semibold tracking-tight text-white">
                    Better alternatives
                  </h2>
                </div>
                <motion.ol
                  variants={altListContainer}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {result.alternatives.map((alt, index) => (
                    <motion.li
                      key={`${index}-${alt.product_type.slice(0, 32)}`}
                      variants={altListItem}
                      className="group rounded-2xl border border-white/10 bg-white/10 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:shadow-xl"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-emerald-300/90">
                        Option {index + 1}
                      </span>
                      <p className="mt-2 text-base font-semibold text-white">
                        {alt.product_type}
                      </p>
                      <p className="mt-2 text-[15px] leading-relaxed text-gray-300">
                        {alt.why_better}
                      </p>
                      {alt.price_range && alt.price_range.trim() !== "" && (
                        <p className="mt-3 text-sm text-gray-400">
                          <span className="font-medium text-gray-300">Price: </span>
                          {alt.price_range}
                        </p>
                      )}
                    </motion.li>
                  ))}
                </motion.ol>
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
