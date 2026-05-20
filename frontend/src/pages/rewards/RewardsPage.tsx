import { motion } from "framer-motion";
import CreditsSummaryPanel from "@/components/rewards/CreditsSummaryPanel";
import CouponMarketplace from "@/components/rewards/CouponMarketplace";
import { sectionBlock } from "@/utils/motionVariants";

export default function RewardsPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <motion.header
        variants={sectionBlock}
        initial="hidden"
        animate="show"
        className="mb-10 max-w-3xl lg:mb-12"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400/75">
          EcoSync UAE
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Rewards
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-emerald-100/60 sm:text-base">
          Credits are issued when material is verified at destination—not when it
          leaves your door. Spend them on everyday essentials from trusted
          regional partners.
        </p>
      </motion.header>

      <div className="flex flex-col gap-12 lg:gap-14">
        <CreditsSummaryPanel />
        <CouponMarketplace />
      </div>
    </div>
  );
}
