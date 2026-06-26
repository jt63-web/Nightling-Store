'use client';

import { motion } from 'framer-motion';
import { CloudLogo } from '@/components/shared/CloudLogo';

const LEVELS = [
  { label: 'Low', pct: 15, sub: 'sleep all night' },
  { label: 'Mid', pct: 50, sub: 'bedtime reading' },
  { label: 'High', pct: 100, sub: 'getting ready' },
];

const GLOW = '#FFE9B8';

export function GlowDemo() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p
            className="font-body text-xs tracking-widest uppercase mb-3 mode-transition"
            style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
          >
            Try it before you buy
          </p>
          <h2
            className="font-display text-3xl lg:text-4xl mode-transition"
            style={{ color: 'var(--text-primary)' }}
          >
            Feel the light.
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
          {LEVELS.map((level) => (
            <div key={level.label} className="flex flex-col items-center gap-4">
              {/* Cloud preview */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${GLOW} 0%, transparent 70%)`,
                    opacity: level.pct / 100,
                  }}
                />
                <div style={{ filter: `drop-shadow(0 0 ${level.pct / 5}px ${GLOW})`, opacity: 0.4 + (level.pct / 100) * 0.6 }}>
                  <CloudLogo size={100} />
                </div>
              </div>

              {/* Label */}
              <div className="text-center">
                <p className="font-display text-lg mode-transition" style={{ color: 'var(--text-primary)' }}>
                  {level.label}
                </p>
                <p className="font-body text-xs mt-0.5 mode-transition" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
                  {level.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="font-body text-sm leading-relaxed text-center mt-12 max-w-sm mx-auto mode-transition" style={{ color: 'var(--text-secondary)' }}>
          One tap cycles through all three brightness levels. All Nightling lights glow at a warm, gentle tone that won't disrupt sleep.
        </p>
      </div>
    </section>
  );
}
