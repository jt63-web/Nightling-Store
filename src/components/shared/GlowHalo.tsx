'use client';

import { motion } from 'framer-motion';
import { useModeStore } from '@/lib/stores/mode';

interface GlowHaloProps {
  className?: string;
  size?: number;
  color?: string;
}

export function GlowHalo({ className = '', size = 400, color }: GlowHaloProps) {
  const mode = useModeStore((s) => s.mode);
  const isNight = mode === 'night';

  const bg = isNight
    ? (color ?? 'rgba(255,185,87,0.12)')
    : (color ?? 'rgba(255,215,142,0.25)');

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${bg} 0%, transparent 70%)`,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}
