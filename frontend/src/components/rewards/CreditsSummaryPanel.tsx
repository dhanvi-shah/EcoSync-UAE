import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import GlassPanel from "@/components/dashboard/GlassPanel";
import {
  CREDITS_PER_TRANCHE,
  KG_PER_TRANCHE,
  REWARDS_USER,
  getNextCouponUnlock,
  creditsFromRecyclingKg,
  trancheProgress,
  MARKETPLACE_COUPONS,
} from "@/data/rewardsMock";
import { sectionBlock } from "@/utils/motionVariants";

export default function CreditsSummaryPanel() {
  const { ref, formatted } = useCountUp(REWARDS_USER.creditsBalance, {
    duration: 2.1,
    decimals: 0,
  });

  const fromRecycling = creditsFromRecyclingKg(REWARDS_USER.lifetimeKgVerified);
  const nextCoupon = getNextCouponUnlock(
    REWARDS_USER.creditsBalance,
    MARKETPLACE_COUPONS
  );
  const couponProgress = nextCoupon
    ? Math.min(
        1,
        REWARDS_USER.creditsBalance / nextCoupon.creditsRequired
      )
    : 1;
  const creditsToNextCoupon = nextCoupon
    ? Math.max(0, nextCoupon.creditsRequired - REWARDS_USER.creditsBalance)
    : 0;

  const kgTranchePct = trancheProgress(REWARDS_USER.lifetimeKgVerified);
  const kgIntoTranche =
    REWARDS_USER.lifetimeKgVerified % KG_PER_TRANCHE;

  return (
    <motion.div
      ref={ref}
      variants={sectionBlock}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <GlassPanel glow="emerald" className="p-6 sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400/75">
              Your balance
            </p>
            <p className="mt-3 font-display text-4xl font-semibold tabular-nums tracking-tight text-white sm:text-5xl">
              {formatted}
              <span className="text-lg font-medium text-emerald-300/85 sm:text-2xl">
                {" "}
                credits
              </span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100/60">
              Every{" "}
              <span className="font-semibold text-emerald-200/90">
                {KG_PER_TRANCHE} kg
              </span>{" "}
              of verified recycling earns{" "}
              <span className="font-semibold text-emerald-200/90">
                {CREDITS_PER_TRANCHE.toLocaleString()} credits
              </span>
              . Bonuses may apply for streaks, referrals, and partner promos.
            </p>
            <dl className="mt-6 grid gap-3 text-sm text-emerald-100/55 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-black/20 px-4 py-3">
                <dt className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/65">
                  Verified kg (lifetime)
                </dt>
                <dd className="mt-1 font-display text-xl font-semibold tabular-nums text-white">
                  {REWARDS_USER.lifetimeKgVerified.toLocaleString(undefined, {
                    maximumFractionDigits: 1,
                  })}{" "}
                  kg
                </dd>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-black/20 px-4 py-3">
                <dt className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/65">
                  From recycling
                </dt>
                <dd className="mt-1 font-display text-xl font-semibold tabular-nums text-emerald-200/95">
                  {fromRecycling.toLocaleString()} cr
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col justify-center gap-8">
            <div>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-400/75">
                    Next marketplace unlock
                  </p>
                  <p className="mt-1 text-sm font-medium text-emerald-100/85">
                    {nextCoupon ? (
                      <>
                        {nextCoupon.brandLabel} ·{" "}
                        <span className="text-emerald-200/90">
                          {nextCoupon.creditsRequired.toLocaleString()} credits
                        </span>
                      </>
                    ) : (
                      <span className="text-emerald-200/90">
                        All current offers unlocked
                      </span>
                    )}
                  </p>
                </div>
                {nextCoupon ? (
                  <p className="text-xs tabular-nums text-emerald-400/80">
                    {creditsToNextCoupon.toLocaleString()} to go
                  </p>
                ) : null}
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-black/35 ring-1 ring-white/[0.08]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${couponProgress * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-400/75">
                    Next 1,000 credit tranche
                  </p>
                  <p className="mt-1 text-sm text-emerald-100/65">
                    {kgIntoTranche.toFixed(1)} / {KG_PER_TRANCHE} kg in current
                    batch
                  </p>
                </div>
                <p className="text-xs tabular-nums text-emerald-400/80">
                  {Math.round(kgTranchePct * 100)}%
                </p>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-black/35 ring-1 ring-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${kgTranchePct * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                />
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
