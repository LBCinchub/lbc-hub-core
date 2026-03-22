'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  /** Enable hover lift animation (default: true) */
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className = '',
  hoverEffect = true,
  ...motionProps
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass-card ${className}`}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
