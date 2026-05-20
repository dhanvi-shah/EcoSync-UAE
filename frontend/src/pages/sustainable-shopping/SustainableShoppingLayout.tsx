import { AnimatePresence, motion } from "framer-motion";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { pageSwitch, transitionSmooth } from "@/utils/motionVariants";

const subNavLink = ({
  isActive,
}: {
  isActive: boolean;
}): string =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
    isActive
      ? "border border-emerald-400/35 bg-emerald-600/80 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]"
      : "border border-transparent text-emerald-100/70 hover:text-white"
  }`;

export default function SustainableShoppingLayout() {
  const location = useLocation();

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 rounded-2xl border border-white/[0.1] bg-white/[0.04] p-4 shadow-[0_16px_48px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/75">
          Sustainable Shopping Assistant
        </p>
        <p className="mt-1 text-sm text-emerald-100/65">
          Discover curated low-impact picks, filter by category, then run deep
          analysis on any UAE or global listing—aligned with your EcoSync
          workspace.
        </p>
        <nav
          className="mt-4 flex flex-wrap gap-2"
          aria-label="Assistant sections"
        >
          <NavLink to="/sustainable-shopping" end className={subNavLink}>
            Discover
          </NavLink>
          <NavLink to="/sustainable-shopping/insights" className={subNavLink}>
            Insights
          </NavLink>
        </nav>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={pageSwitch.initial}
          animate={pageSwitch.animate}
          exit={pageSwitch.exit}
          transition={transitionSmooth}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
