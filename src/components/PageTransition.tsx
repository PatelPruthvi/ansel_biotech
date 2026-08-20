import { type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation } from "wouter";
import { duration, easePremium } from "@/lib/motion";

export function PageTransition({
  children,
}: {
  children: (location: string) => ReactNode;
}) {
  const [location] = useLocation();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        className="w-full"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={
          reduced
            ? { opacity: 0, transition: { duration: 0.01 } }
            : { opacity: 0, y: -8, transition: { duration: duration.pageExit, ease: easePremium } }
        }
        transition={{ duration: reduced ? 0.01 : duration.pageEnter, ease: easePremium }}
      >
        {children(location)}
      </motion.div>
    </AnimatePresence>
  );
}
