'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TRACKS = [
  { id: 'rain', label: 'Gentle rain' },
  { id: 'white', label: 'White noise' },
  { id: 'lullaby', label: 'Soft lullaby' },
];

export function AmbientPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [playing, setPlaying] = useState<string | null>(null);

  const toggle = (id: string) => {
    setPlaying((p) => (p === id ? null : id));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Ambient sounds"
        className="flex items-center gap-1.5 font-body text-xs hover:opacity-70 transition-opacity"
        style={{ color: 'var(--text-secondary)' }}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
        </svg>
        {playing ? <span style={{ color: 'var(--accent)' }}>♪ {TRACKS.find((t) => t.id === playing)?.label}</span> : 'Sounds'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-full mb-2 left-0 rounded-2xl p-3 w-40 space-y-1 border mode-transition"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {TRACKS.map((t) => (
              <button
                key={t.id}
                onClick={() => toggle(t.id)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xl text-left font-body text-xs hover:opacity-70 transition-opacity"
                style={{ color: playing === t.id ? 'var(--accent)' : 'var(--text-secondary)' }}
              >
                <span>{playing === t.id ? '■' : '▶'}</span>
                {t.label}
              </button>
            ))}
            <p className="text-center pt-1 font-body" style={{ fontSize: '10px', color: 'var(--text-secondary)', opacity: 0.5 }}>
              Audio coming soon
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
