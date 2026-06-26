'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const FEATURES = [
  { icon: '◉', label: 'BPA-free silicone' },
  { icon: '✓', label: 'CE & FCC certified' },
  { icon: '⏱', label: '12-hr battery' },
  { icon: '⚡', label: 'USB-C rechargeable' },
  { icon: '☀', label: 'Tap to cycle brightness' },
];

export function SafetyStrip() {
  return (
    <section className="py-12 border-y mode-transition" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.label}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <span
                className="font-body text-base"
                style={{ color: 'var(--accent)' }}
              >
                {f.icon}
              </span>
              <span
                className="font-body text-sm font-medium mode-transition"
                style={{ color: 'var(--text-secondary)' }}
              >
                {f.label}
              </span>
            </motion.div>
          ))}
          <Link
            href="/safety"
            className="font-body text-sm hover:opacity-60 transition-opacity mode-transition ml-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Full safety info →
          </Link>
        </div>
      </div>
    </section>
  );
}
