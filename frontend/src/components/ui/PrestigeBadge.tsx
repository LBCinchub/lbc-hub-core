'use client';

import { motion } from 'framer-motion';
import type { PrestigeLevel } from '@lbc/shared';

interface PrestigeBadgeProps {
  level: PrestigeLevel;
  showIcon?: boolean;
}

const prestigeConfig: Record<
  PrestigeLevel,
  { label: string; icon: string; className: string }
> = {
  Diamond: {
    label: 'Diamond',
    icon: '💎',
    className: 'prestige-diamond',
  },
  Gold: {
    label: 'Gold',
    icon: '🏆',
    className: 'prestige-gold',
  },
  Silver: {
    label: 'Silver',
    icon: '🥈',
    className: 'prestige-silver',
  },
};

export function PrestigeBadge({ level, showIcon = true }: PrestigeBadgeProps) {
  const config = prestigeConfig[level];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1 font-bold text-sm ${config.className}`}
    >
      {showIcon && <span>{config.icon}</span>}
      {config.label}
    </motion.span>
  );
}
