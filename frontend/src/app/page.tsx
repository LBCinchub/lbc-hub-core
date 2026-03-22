'use client';

import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-luxury-gradient flex flex-col items-center justify-center p-8">
      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block text-sm font-semibold tracking-[0.3em] uppercase text-diamond-300 mb-6"
        >
          The Diamond Standard
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-6xl md:text-8xl font-display font-bold mb-6 prestige-diamond"
        >
          LBC Hub
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          The unified ecosystem for Social connection, Marketplace innovation,
          AI-powered Travel, and Riding services.
        </motion.p>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="glass-card text-center"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}

const features = [
  {
    icon: '🌐',
    title: 'Social',
    description: "Connect with the world's most prestigious community",
  },
  {
    icon: '💍',
    title: 'Marketplace',
    description: 'Discover Lab Diamond rings and luxury goods',
  },
  {
    icon: '✈️',
    title: 'Travel',
    description: 'AI-powered luxury travel experiences',
  },
  {
    icon: '⚡',
    title: 'Riding',
    description: 'Premium on-demand transportation services',
  },
];
