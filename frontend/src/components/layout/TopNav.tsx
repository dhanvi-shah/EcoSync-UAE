import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { springSnappy, transitionSmooth } from "@/utils/motionVariants";

export type NavItem = {
  to: string;
  label: string;
  end?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home", end: true },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/rewards", label: "Rewards" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/warehouses", label: "Warehouses" },
  { to: "/book-pickup", label: "Book Pickup" },
  { to: "/book-dropoff", label: "Book Drop-off" },
  { to: "/sustainable-shopping", label: "Shopping Assistant" },
];

function LogoMark() {
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/25 bg-gradient-to-br from-emerald-500/20 to-teal-600/10 shadow-lg shadow-emerald-950/40 ring-1 ring-white/10"
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-emerald-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c-4.5 2.5-6 6.5-6 10a6 6 0 1012 0c0-3.5-1.5-7.5-6-10z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m-3-3h6"
        />
      </svg>
    </div>
  );
}

function navLinkClassName(isActive: boolean): string {
  const base =
    "relative whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200";
  if (isActive) {
    return `${base} text-white`;
  }
  return `${base} text-emerald-100/70 hover:text-white`;
}

export default function TopNav() {
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#04130f]/75 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="group flex min-w-0 shrink-0 items-center gap-3 rounded-xl outline-none ring-emerald-400/40 focus-visible:ring-2"
          onClick={closeMenu}
        >
          <LogoMark />
          <div className="min-w-0 text-left">
            <p className="truncate text-sm font-semibold tracking-tight text-white">
              EcoSync UAE
            </p>
            <p className="truncate text-[11px] font-medium uppercase tracking-[0.14em] text-emerald-300/80">
              AI · Logistics · Circularity
            </p>
          </div>
        </NavLink>

        <nav
          className="hidden flex-1 items-center justify-center gap-1 overflow-x-auto pb-1 xl:flex"
          aria-label="Primary"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => navLinkClassName(isActive)}
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-emerald-400/35 bg-gradient-to-r from-emerald-600/90 to-teal-600/75 shadow-[0_0_24px_rgba(16,185,129,0.25)]"
                      transition={springSnappy}
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <NavLink
            to="/book-pickup"
            className="hidden rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-100 shadow-[0_0_20px_rgba(52,211,153,0.15)] transition hover:border-emerald-300/50 hover:bg-emerald-500/25 sm:inline-flex"
            onClick={closeMenu}
          >
            Schedule pickup
          </NavLink>

          <motion.button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            whileTap={{ scale: 0.96 }}
            transition={springSnappy}
          >
            <span className="sr-only">Menu</span>
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transitionSmooth}
            className="overflow-hidden border-t border-white/[0.06] bg-[#04130f]/95 xl:hidden"
          >
            <nav
              className="flex max-h-[min(70vh,520px)] flex-col gap-1 overflow-y-auto px-4 py-4"
              aria-label="Mobile primary"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...transitionSmooth, delay: i * 0.04 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm font-semibold ${
                        isActive
                          ? "border border-emerald-400/35 bg-gradient-to-r from-emerald-600/35 to-teal-700/25 text-white shadow-inner"
                          : "border border-transparent text-emerald-100/80 hover:bg-white/5"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <NavLink
                to="/book-pickup"
                onClick={closeMenu}
                className="mt-2 rounded-xl border border-emerald-400/40 bg-emerald-500/20 py-3 text-center text-sm font-semibold text-emerald-50"
              >
                Schedule pickup
              </NavLink>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
