import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Props = { children: ReactNode; id: string }

export function AnimatedItem({ children, id }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        key={id}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
