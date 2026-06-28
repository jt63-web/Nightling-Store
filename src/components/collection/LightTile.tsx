'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
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
  const price = formatPrice(light.price, currency as Currency, rate);
  const [hovered, setHovered] = useState(false);

  const showOn = isNight || hovered;

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
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image area with hover crossfade */}
          <div
            className="relative aspect-square overflow-hidden"
            style={{ backgroundColor: 'var(--bg-subtle)' }}
          >
            {light.tag && (
              <div
                className="absolute top-2.5 left-2.5 z-10 font-body text-xs font-bold px-2.5 py-1 rounded-full tracking-wide"
                style={
                  light.tag === 'new'
                    ? { backgroundColor: 'var(--accent)', color: 'var(--bg-page)' }
                    : { backgroundColor: 'rgba(0,0,0,0.72)', color: '#FFE9B8' }
                }
              >
                {light.tag === 'new' ? 'NEW' : '★ BESTSELLER'}
              </div>
            )}
            <Image
              src={light.images.off}
              alt={light.name}
              fill
              className="object-contain p-4 transition-opacity duration-500"
              style={{ opacity: showOn ? 0 : 1 }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <Image
              src={light.images.on}
              alt={`${light.name} glowing`}
              fill
              className="object-contain p-4 transition-opacity duration-500"
              style={{ opacity: showOn ? 1 : 0 }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>

          {/* Info */}
          <div className="p-3 sm:p-5">
            <h3
              className="font-display text-base sm:text-xl mb-0.5 sm:mb-1 mode-transition leading-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {light.name}
            </h3>
            <p
              className="font-body text-xs sm:text-sm mb-2 sm:mb-4 mode-transition hidden sm:block"
              style={{ color: 'var(--text-secondary)' }}
            >
              {light.tagline}
            </p>
            <span
              className="font-body font-semibold text-sm sm:text-base mode-transition"
              style={{ color: 'var(--text-primary)' }}
            >
              {price}
            </span>
            {light.lowStock && (
              <p className="font-body text-xs mt-1 font-medium" style={{ color: '#C0622B' }}>
                Only {light.lowStock} left
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
