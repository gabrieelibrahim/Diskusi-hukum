'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
}

export default function FadeInView({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 200,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
