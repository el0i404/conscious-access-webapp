import { AnimatePresence, motion } from 'framer-motion'

import { useEffect, useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function AnimationLayout({ children }: LayoutProps) {
  const [showOverlay, setShowOverlay] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(true)

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="gradient-overlay"
            initial={{ y: '100%' }} // start fully below the screen
            animate={{ y: 0 }} // slide up to cover screen
            exit={{ y: '-100%' }} // slide up and out of screen
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'linear-gradient(135deg, #6b73ff 0%, #000dff 100%)',
              zIndex: 9999,
            }}
          />
        )}
      </AnimatePresence>

      <div>{displayChildren ? children : null}</div>
    </>
  )
}
