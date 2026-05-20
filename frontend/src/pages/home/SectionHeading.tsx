import { motion } from "framer-motion";
import { sectionBlock } from "@/utils/motionVariants";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  titleId?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  titleId,
}: Props) {
  return (
    <motion.header
      variants={sectionBlock}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5, margin: "-0px 0px -80px 0px" }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400/80">
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-emerald-100/65 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </motion.header>
  );
}
