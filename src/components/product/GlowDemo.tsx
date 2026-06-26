'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CloudLogo } from '@/components/shared/CloudLogo';

const WARMTH_COLORS = [
  { label: 'Cool', hex: '#E8F0FF', temp: '4000K' },
  { label: 'Neutral', hex: '#FFF8F0', temp: '3000K' },
  { label: 'Warm', hex: '#FFE9B8', temp: '2700K' },
  { label: 'Amber', hex: '#FFB957', temp: '2400K' },
];

export function GlowDemo() {
  const [warmthIdx, setWarmthIdx] = useState(2);
  const [brightness, setBrightness] = useState(70);

  const color = WARMTH_COLORS[warmthIdx];
  const glowOpacity = brightness / 100;

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

        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Preview */}
          <div className="relative flex-shrink-0 w-56 h-56 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: `radial-gradient(circle, ${color.hex} 0%, transparent 70%)`,
                opacity: glowOpacity,
              }}
              transition={{ duration: 0.4 }}
            />
            <div style={{ filter: `drop-shadow(0 0 ${brightness / 4}px ${color.hex})` }}>
              <CloudLogo size={140} />
            </div>
          </div>

          {/* Controls */}
          <div className="flex-1 space-y-8 w-full">
            {/* Warmth selector */}
            <div>
              <p className="font-body text-sm font-medium mb-3 mode-transition" style={{ color: 'var(--text-primary)' }}>
                Colour temperature
              </p>
              <div className="flex gap-2">
                {WARMTH_COLORS.map((c, i) => (
                  <button
                    key={c.label}
                    onClick={() => setWarmthIdx(i)}
                    className="flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-2xl border transition-all font-body text-xs mode-transition"
                    style={{
                      borderColor: warmthIdx === i ? 'var(--accent)' : 'var(--border)',
                      backgroundColor: warmthIdx === i ? 'var(--bg-subtle)' : 'var(--bg-card)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span
                      className="w-5 h-5 rounded-full border"
                      style={{ backgroundColor: c.hex, borderColor: 'var(--border)' }}
                    />
                    <span>{c.label}</span>
                    <span style={{ opacity: 0.5, fontSize: '10px' }}>{c.temp}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brightness slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="font-body text-sm font-medium mode-transition" style={{ color: 'var(--text-primary)' }}>
                  Brightness
                </p>
                <p className="font-body text-xs mode-transition" style={{ color: 'var(--text-secondary)' }}>
                  {brightness}%
                </p>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${color.hex} 0%, ${color.hex} ${brightness}%, var(--bg-subtle) ${brightness}%, var(--bg-subtle) 100%)`,
                }}
              />
              <div className="flex justify-between mt-1.5">
                <span className="font-body text-xs mode-transition" style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>Night-light</span>
                <span className="font-body text-xs mode-transition" style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>Reading</span>
              </div>
            </div>

            <p className="font-body text-sm leading-relaxed mode-transition" style={{ color: 'var(--text-secondary)' }}>
              All Nightling lights offer three brightness levels with a single tap. The warmest setting (2400K) has the lowest effect on melatonin — scientifically the gentlest choice at bedtime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
