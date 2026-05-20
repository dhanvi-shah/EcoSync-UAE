import ShoppingAssistantHub from "@/components/shopping/ShoppingAssistantHub";
import AnalyzePageRoute from "@/pages/sustainable-shopping/AnalyzePageRoute";

export default function SustainableShoppingHomePage() {
  return (
    <div className="space-y-14 lg:space-y-16">
      <ShoppingAssistantHub />
      <section
        id="assistant-analyze"
        className="scroll-mt-28 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-glass backdrop-blur-xl sm:p-8"
        aria-label="Product analyzer"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400/70">
          Deep analysis
        </p>
        <h2 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
          Run the assistant on any listing
        </h2>
        <p className="mt-1 text-sm text-emerald-100/55">
          URLs from recommendations above pre-fill automatically. You can still
          paste any shop link or upload a product photo.
        </p>
        <div className="mt-8">
          <AnalyzePageRoute variant="embedded" />
        </div>
      </section>
    </div>
  );
}
