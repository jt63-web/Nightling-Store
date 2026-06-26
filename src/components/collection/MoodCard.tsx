'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Mood } from '@/lib/moods';

interface MoodCardProps {
  mood: Mood;
}

export function MoodCard({ mood }: MoodCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <Link href={`/collection/${mood.slug}`}>
        <div
          className="relative rounded-3xl overflow-hidden aspect-[4/5] flex flex-col justify-end p-8 cursor-pointer mode-transition"
          style={{
            backgroundColor: mood.accentColor + '40',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Placeholder gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${mood.accentColor}33 0%, ${mood.accentColor}88 100%)`,
            }}
          />

          {/* Large mood initial as background art */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden
          >
            <span
              className="font-display text-[12rem] font-light opacity-10"
              style={{ color: mood.accentColor }}
            >
              {mood.name[0]}
            </span>
          </div>

          <div className="relative z-10">
            <p
              className="font-body text-xs tracking-widest uppercase mb-2 opacity-70"
              style={{ color: 'var(--text-primary)' }}
            >
              {mood.tagline}
            </p>
            <h3
              className="font-display text-2xl mode-transition"
              style={{ color: 'var(--text-primary)' }}
            >
              {mood.name}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
