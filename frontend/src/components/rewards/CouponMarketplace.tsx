import { motion } from "framer-motion";
import CouponCard from "@/components/rewards/CouponCard";
import { MARKETPLACE_COUPONS, REWARDS_USER } from "@/data/rewardsMock";
import { sectionCard, staggerSection } from "@/utils/motionVariants";

export default function CouponMarketplace() {
  const balance = REWARDS_USER.creditsBalance;

  return (
    <section className="space-y-6" aria-labelledby="marketplace-heading">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400/75">
          Partners
        </p>
        <h2
          id="marketplace-heading"
          className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl"
        >
          Coupon marketplace
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-emerald-100/60">
          Redeem verified credits with UAE partners. Locked offers unlock
          automatically when your balance crosses the threshold.
        </p>
      </div>

      <motion.div
        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        variants={staggerSection}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.06 }}
      >
        {MARKETPLACE_COUPONS.map((coupon) => (
          <motion.div key={coupon.id} variants={sectionCard}>
            <CouponCard coupon={coupon} balance={balance} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
