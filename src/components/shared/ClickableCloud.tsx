'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useModeStore } from '@/lib/stores/mode';
import { CloudLogo } from './CloudLogo';

export function ClickableCloud() {
  const { mode, toggle } = useModeStore();
  const isNight = mode === 'night';

  return (
    <div className="flex flex-col items-center gap-8 select-none">

      {/* Hint label above */}
      <AnimatePresence mode="wait">
        <motion.p
          key={isNight ? 'night-hint' : 'day-hint'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          className="font-body text-sm tracking-widest uppercase mode-transition"
          style={{ color: 'var(--text-secondary)' }}
        >
          {isNight ? 'tap to turn the lights on' : 'tap to turn the lights off'}
        </motion.p>
      </AnimatePresence>

      {/* Clickable cloud */}
      <motion.button
        onClick={toggle}
        aria-label={isNight ? 'Switch to day mode' : 'Switch to night mode'}
        className="relative cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 rounded-full"
        style={{ ['--tw-ring-color' as string]: 'var(--accent)' }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      >
        {/* Ripple on click */}
        <CloudLogo size={220} float />

        {/* "Click me!" bounce badge */}
        <AnimatePresence>
          {!isNight && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                y: { duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 },
              }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-body font-semibold whitespace-nowrap pointer-events-none"
              style={{
                backgroundColor: 'var(--honey-glow, #FFD78E)',
                color: 'var(--midnight, #1F2A44)',
              }}
            >
              click me ✦
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Brand copy — shifts with mode */}
      <div className="text-center space-y-3 max-w-sm">
        <AnimatePresence mode="wait">
          <motion.h1
            key={isNight ? 'h1-night' : 'h1-day'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="font-display text-5xl mode-transition"
            style={{ color: 'var(--text-primary)' }}
          >
            {isNight ? 'Good night.' : 'Nightling'}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={isNight ? 'p-night' : 'p-day'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-lg mode-transition"
            style={{ color: 'var(--text-secondary)' }}
          >
            {isNight
              ? 'A gentle glow for little dreamers.'
              : 'Silicone night lights for little ones.'}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Mini logo lockup */}
      <div className="flex items-center gap-3 mt-2" style={{ opacity: 0.35 }}>
        <CloudLogo size={32} />
        <span className="font-display text-lg mode-transition" style={{ color: 'var(--text-primary)' }}>
          nightling
        </span>
      </div>
    </div>
  );
}
