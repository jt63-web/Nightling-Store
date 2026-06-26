'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { lights } from '@/lib/products';
import { moods } from '@/lib/moods';
import { CloudLogo } from '@/components/shared/CloudLogo';

const OTHER_LINKS = [
  { href: '/our-story', label: 'Our Story', desc: 'How Nightling began' },
  { href: '/safety', label: 'Safety', desc: 'Materials & care' },
  { href: '/journal', label: 'Journal', desc: 'Sleep science & tips' },
];

// Group lights by mood
const byMood = moods.map((mood) => ({
  mood,
  lights: lights.filter((l) => l.mood === mood.slug),
})).filter((g) => g.lights.length > 0);

export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleMouseEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button
        className="font-body text-sm mode-transition hover:opacity-70 transition-opacity flex items-center gap-1"
        style={{ color: 'var(--text-secondary)' }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        Collection
        <motion.svg
          viewBox="0 0 10 6" width="10" height="6" fill="none"
          stroke="currentColor" strokeWidth="1.5"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M1 1l4 4 4-4" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50 mode-transition"
            style={{ width: 600 }}
          >
            {/* Arrow */}
            <div className="flex justify-center mb-1">
              <div
                className="w-3 h-3 rotate-45 mode-transition"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', marginBottom: -7 }}
              />
            </div>

            <div
              className="rounded-2xl overflow-hidden shadow-2xl mode-transition"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {/* Products grid */}
              <div className="p-5">
                <p
                  className="font-body text-xs tracking-widest uppercase mb-4 mode-transition"
                  style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
                >
                  Shop by mood
                </p>
                <div className="space-y-5">
                  {byMood.map(({ mood, lights: moodLights }) => (
                    <div key={mood.slug}>
                      <Link
                        href={`/collection/${mood.slug}`}
                        onClick={() => setOpen(false)}
                        className="font-body text-xs font-semibold uppercase tracking-wider mb-2 block hover:opacity-70 transition-opacity mode-transition"
                        style={{ color: 'var(--accent)' }}
                      >
                        {mood.name} →
                      </Link>
                      <div className="grid grid-cols-3 gap-2">
                        {moodLights.map((light) => (
                          <Link
                            key={light.slug}
                            href={`/collection/light/${light.slug}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 p-2 rounded-xl hover:opacity-80 transition-opacity group"
                            style={{ backgroundColor: 'var(--bg-subtle)' }}
                          >
                            <div className="flex-shrink-0">
                              <CloudLogo size={28} />
                            </div>
                            <div className="min-w-0">
                              <p
                                className="font-body text-xs font-medium truncate mode-transition"
                                style={{ color: 'var(--text-primary)' }}
                              >
                                {light.name}
                              </p>
                              <div className="flex gap-0.5 mt-0.5">
                                {light.variants.slice(0, 3).map((v) => (
                                  <span
                                    key={v.color}
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: v.colorHex }}
                                  />
                                ))}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* View all */}
                <Link
                  href="/collection"
                  onClick={() => setOpen(false)}
                  className="block mt-4 text-center font-body text-xs py-2 rounded-xl mode-transition hover:opacity-70 transition-opacity"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                >
                  View all lights →
                </Link>
              </div>

              {/* Divider + other pages */}
              <div
                className="px-5 py-3 border-t mode-transition flex gap-4"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-page)' }}
              >
                {OTHER_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex-1 p-3 rounded-xl hover:opacity-80 transition-opacity mode-transition"
                    style={{ backgroundColor: 'var(--bg-card)' }}
                  >
                    <p className="font-body text-xs font-semibold mode-transition" style={{ color: 'var(--text-primary)' }}>
                      {link.label}
                    </p>
                    <p className="font-body text-xs mt-0.5 mode-transition" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
                      {link.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
