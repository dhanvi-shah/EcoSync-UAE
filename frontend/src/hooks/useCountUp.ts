import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { easePremium } from "@/utils/motionVariants";

type Options = {
  duration?: number;
  decimals?: number;
};

/**
 * Animates from 0 to target when the ref element enters the viewport (once).
 */
export function useCountUp(target: number, options: Options = {}) {
  const { duration = 2.35, decimals = 0 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: easePremium,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, target, duration]);

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));

  return { ref, formatted, raw: value };
}
