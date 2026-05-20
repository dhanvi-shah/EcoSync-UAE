import type { Transition, Variants } from "framer-motion";

/** Premium ease-out curve for UI motion */
export const easePremium: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transitionSmooth: Transition = {
  duration: 0.45,
  ease: easePremium,
};

export const transitionFast: Transition = {
  duration: 0.34,
  ease: easePremium,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 28,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 32,
};

export const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const resultsContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const resultsItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitionFast,
  },
};

export const altListContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

export const altListItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitionFast,
  },
};

export const pageSwitch = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const dashboardContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
};

export const dashboardItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: transitionFast },
};

export const transitionSection: Transition = {
  duration: 0.62,
  ease: easePremium,
};

/** Parent: stagger children inside a section */
export const staggerSection: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

export const sectionCard: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitionSmooth,
  },
};

export const sectionBlock: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitionSection,
  },
};
