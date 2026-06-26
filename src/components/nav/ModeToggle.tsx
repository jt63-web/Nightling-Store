'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useModeStore } from '@/lib/stores/mode';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.5" />
      <line x1="12" y1="2.5" x2="12" y2="4.5" />
      <line x1="12" y1="19.5" x2="12" y2="21.5" />
      <line x1="2.5" y1="12" x2="4.5" y2="12" />
      <line x1="19.5" y1="12" x2="21.5" y2="12" />
      <line x1="5.1" y1="5.1" x2="6.5" y2="6.5" />
      <line x1="17.5" y1="17.5" x2="18.9" y2="18.9" />
      <line x1="5.1" y1="18.9" x2="6.5" y2="17.5" />
      <line x1="17.5" y1="6.5" x2="18.9" y2="5.1" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  );
}

const iconVariants = {
  enter: { opacity: 0, rotate: -30, scale: 0.6 },
  center: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 30, scale: 0.6 },
};

export function ModeToggle() {
  const { mode, toggle } = useModeStore();
  const isNight = mode === 'night';

  return (
    <motion.button
      onClick={toggle}
      aria-label={isNight ? 'Switch to day mode' : 'Switch to night mode'}
      className="relative w-10 h-10 rounded-full flex items-center justify-center
                 border mode-transition cursor-pointer select-none"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
        color: isNight ? '#FFB957' : '#1F2A44',
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      title={isNight ? 'Day mode' : 'Night mode'}
    >
      {/* Glow ring that appears in night mode */}
      {isNight && (
        <motion.span
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ boxShadow: '0 0 14px rgba(255,185,87,0.5)' }}
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isNight ? 'sun' : 'moon'}
          variants={iconVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isNight ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
