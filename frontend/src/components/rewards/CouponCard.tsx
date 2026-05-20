import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import type { MarketplaceCoupon } from "@/data/rewardsMock";
import { springSoft } from "@/utils/motionVariants";

type Props = {
  coupon: MarketplaceCoupon;
  balance: number;
};

export default function CouponCard({ coupon, balance }: Props) {
  const unlocked = balance >= coupon.creditsRequired;
  const [status, setStatus] = useState<string | null>(null);

  const onRedeem = useCallback(() => {
    if (!unlocked) return;
    setStatus("Redemption queued — you’ll get a secure link by SMS (demo).");
  }, [unlocked]);

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.05] shadow-glass backdrop-blur-xl transition ${
        unlocked ? "" : "select-none"
      }`}
    >
      <div
        className={`h-1.5 w-full bg-gradient-to-r ${coupon.accentClass}`}
        aria-hidden
      />

      <div
        className={`relative flex flex-1 flex-col p-6 sm:p-7 ${
          unlocked ? "" : "blur-[2px] brightness-[0.88]"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-lg font-semibold text-white sm:text-xl">
              {coupon.brandLabel}
            </p>
            <p className="mt-1 text-sm text-emerald-100/65">{coupon.rewardType}</p>
          </div>
          <p className="shrink-0 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold tabular-nums uppercase tracking-wide text-emerald-200/90">
            {coupon.creditsRequired.toLocaleString()} cr
          </p>
        </div>

        <div className="mt-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/65">
            Progress to requirement
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/35 ring-1 ring-white/[0.06]">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${coupon.accentClass}`}
              initial={{ width: 0 }}
              whileInView={{
                width: `${Math.min(100, (balance / coupon.creditsRequired) * 100)}%`,
              }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <p className="mt-2 text-xs text-emerald-100/50">
            {unlocked
              ? "You meet the credit requirement."
              : `${(coupon.creditsRequired - balance).toLocaleString()} more credits needed.`}
          </p>
        </div>

        <div className="mt-auto pt-6">
          <motion.button
            type="button"
            disabled={!unlocked}
            aria-disabled={!unlocked}
            onClick={onRedeem}
            whileHover={unlocked ? { scale: 1.02 } : undefined}
            whileTap={unlocked ? { scale: 0.98 } : undefined}
            transition={springSoft}
            className={`w-full rounded-2xl border px-4 py-3.5 text-sm font-semibold transition ${
              unlocked
                ? "border-emerald-400/40 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-neon hover:border-emerald-300/60"
                : "cursor-not-allowed border-white/[0.08] bg-white/[0.04] text-emerald-100/35"
            }`}
          >
            {unlocked ? "Redeem" : "Locked"}
          </motion.button>
        </div>
      </div>

      {!unlocked ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#04130f]/35 px-6"
          aria-hidden
        >
          <div className="rounded-2xl border border-white/15 bg-[#04130f]/90 px-4 py-3 text-center shadow-glass backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200/90">
              Locked
            </p>
            <p className="mt-1 text-[11px] text-emerald-100/60">
              Earn more credits to unlock
            </p>
          </div>
        </div>
      ) : null}

      {status ? (
        <p
          className="border-t border-white/[0.06] bg-emerald-500/10 px-4 py-3 text-center text-xs text-emerald-100/85"
          role="status"
        >
          {status}
        </p>
      ) : null}
    </div>
  );
}
