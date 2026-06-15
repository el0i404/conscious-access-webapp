"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createContext, type ReactNode, useContext, useState } from "react";
import TicketIcon from "../icons/ticket-icon";

const TransitionContext = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});

export const useTransitionRouter = () => useContext(TransitionContext);

export default function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [overlayVisible, setOverlayVisible] = useState(false);

  const navigate = (href: string) => {
    // Step 1: Show overlay
    setOverlayVisible(true);

    // Step 2: Wait for overlay animation to cover screen
    setTimeout(() => {
      router.push(href);
    }, 600); // match overlay enter duration

    // Step 3: Hide overlay after route has changed
    setTimeout(() => {
      setOverlayVisible(false);
    }, 1200); // enter (0.6s) + exit (0.6s)
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      {/* Overlay transition */}
      <AnimatePresence>
        {overlayVisible && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 backdrop-blur-3xl"
            initial={{ y: "100%" }}
            animate={{
              y: "0%",
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
            exit={{
              y: "-100%",
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.4, delay: 0.2 },
              }}
              exit={{
                opacity: 0,
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
            >
              {/* Example: Spinning icon */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
                className="text-white text-4xl"
              >
                <TicketIcon />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
