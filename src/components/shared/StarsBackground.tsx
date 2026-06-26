'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useModeStore } from '@/lib/stores/mode';

type Star = { x: number; y: number; r: number; dur: number; delay: number };

export function StarsBackground() {
  const mode = useModeStore((s) => s.mode);
  const isNight = mode === 'night';

  const stars = useMemo<Star[]>(() => {
    const rng = (seed: number) => {
      let s = seed;
      return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    };
    const rand = rng(42);
    return Array.from({ length: 80 }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      r: 0.25 + rand() * 0.55,
      dur: 3 + rand() * 5,
      delay: rand() * 6,
    }));
  }, []);

  if (!isNight) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="rgba(232,225,255,0.25)"
            style={{
              animation: `drift-star ${s.dur}s ${s.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
