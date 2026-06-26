'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useModeStore } from '@/lib/stores/mode';
import { useCurrencyStore } from '@/lib/stores/currency';
import { formatPrice } from '@/lib/currency-helpers';
import type { Currency } from '@/lib/currency-helpers';
import type { Light } from '@/lib/products';

interface LightTileProps {
  light: Light;
}

export function LightTile({ light }: LightTileProps) {
  const mode = useModeStore((s) => s.mode);
  const isNight = mode === 'night';
  const { currency, getRate } = useCurrencyStore();
  const rate = getRate();
  const price = formatPrice(light.variants[0].price, currency as Currency, rate);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <Link href={`/collection/light/${light.slug}`}>
        <div
          className="rounded-3xl overflow-hidden border mode-transition cursor-pointer"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Image area with day/night crossfade */}
          <div
            className="relative aspect-square flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: 'var(--bg-subtle)' }}
          >
            {/* Day image */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: isNight ? 0 : 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Placeholder SVG representing the light off */}
              <svg viewBox="0 0 120 140" className="w-2/3 h-2/3" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="60" cy="60" rx="48" ry="44" fill="#FFFBF0" />
                <circle cx="24" cy="40" r="22" fill="#FFFBF0" />
                <circle cx="58" cy="28" r="26" fill="#FFFBF0" />
                <circle cx="96" cy="42" r="20" fill="#FFFBF0" />
                <circle cx="44" cy="58" r="4" fill="#1C0E06" />
                <circle cx="72" cy="56" r="4" fill="#1C0E06" />
                <path d="M46,70 Q60,82 74,70" stroke="#1C0E06" strokeWidth="3" fill="none" strokeLinecap="round" />
                <rect x="28" y="96" width="13" height="30" rx="6.5" fill="#1C0E06" />
                <rect x="79" y="96" width="13" height="30" rx="6.5" fill="#1C0E06" />
                <ellipse cx="34.5" cy="128" rx="15" ry="9" fill="#1C0E06" />
                <ellipse cx="85.5" cy="128" rx="15" ry="9" fill="#1C0E06" />
              </svg>
            </motion.div>

            {/* Night image — glowing version */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: isNight ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255,185,87,0.8)) drop-shadow(0 0 40px rgba(255,185,87,0.4))',
                }}
              >
                <svg viewBox="0 0 120 140" className="w-2/3 h-2/3" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="60" cy="60" rx="48" ry="44" fill="#FFE9B8" />
                  <circle cx="24" cy="40" r="22" fill="#FFE9B8" />
                  <circle cx="58" cy="28" r="26" fill="#FFE9B8" />
                  <circle cx="96" cy="42" r="20" fill="#FFE9B8" />
                  <ellipse cx="60" cy="58" rx="30" ry="26" fill="rgba(255,220,120,0.3)" />
                  <circle cx="44" cy="58" r="4" fill="#1C0E06" />
                  <circle cx="72" cy="56" r="4" fill="#1C0E06" />
                  <path d="M46,70 Q60,82 74,70" stroke="#1C0E06" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <rect x="28" y="96" width="13" height="30" rx="6.5" fill="#1C0E06" />
                  <rect x="79" y="96" width="13" height="30" rx="6.5" fill="#1C0E06" />
                  <ellipse cx="34.5" cy="128" rx="15" ry="9" fill="#1C0E06" />
                  <ellipse cx="85.5" cy="128" rx="15" ry="9" fill="#1C0E06" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Info */}
          <div className="p-5">
            <h3
              className="font-display text-xl mb-1 mode-transition"
              style={{ color: 'var(--text-primary)' }}
            >
              {light.name}
            </h3>
            <p
              className="font-body text-sm mb-4 mode-transition"
              style={{ color: 'var(--text-secondary)' }}
            >
              {light.tagline}
            </p>
            <div className="flex items-center justify-between">
              <span
                className="font-body font-semibold mode-transition"
                style={{ color: 'var(--text-primary)' }}
              >
                {price}
              </span>
              {/* Colour dots */}
              <div className="flex gap-1">
                {light.variants.slice(0, 3).map((v) => (
                  <span
                    key={v.color}
                    className="w-4 h-4 rounded-full border"
                    style={{
                      backgroundColor: v.colorHex,
                      borderColor: 'var(--border)',
                    }}
                    title={v.color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
