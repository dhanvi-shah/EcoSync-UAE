import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import TopNav from "@/components/layout/TopNav";
import ShaderBackground from "@/components/ui/shader-background";
import { pageSwitch, transitionSmooth } from "@/utils/motionVariants";

function mainSectionKey(pathname: string): string {
  if (pathname.startsWith("/sustainable-shopping")) {
    return "/sustainable-shopping";
  }
  return pathname;
}

export default function MainLayout() {
  const location = useLocation();
  const transitionKey = mainSectionKey(location.pathname);

  return (
    <div className="relative min-h-screen">
      <div
        className="pointer-events-none fixed inset-0 -z-[5] bg-gradient-to-b from-[#02120d]/80 via-transparent to-[#020c0a]/90"
        aria-hidden
      />
      <ShaderBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <TopNav />
        <AnimatePresence mode="wait">
          <motion.main
            key={transitionKey}
            className="flex-1"
            initial={pageSwitch.initial}
            animate={pageSwitch.animate}
            exit={pageSwitch.exit}
            transition={transitionSmooth}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <footer className="relative z-10 border-t border-white/[0.06] bg-[#04130f]/40 py-8 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p className="text-sm text-emerald-100/55">
              © {new Date().getFullYear()} EcoSync UAE. Circular logistics for
              the Emirates.
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400/50">
              Pilot-ready · Enterprise-grade routing
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
