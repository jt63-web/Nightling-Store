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
  const price = formatPrice(light.variants[0].price, currency as Currency, rate);
  const [hovered, setHovered] = useState(false);

  // In night mode always show the glowing (on) photo; in day mode crossfade off→on on hover
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
            {/* Off photo */}
            <Image
              src={light.images.off}
              alt={light.name}
              fill
              className="object-contain p-4 transition-opacity duration-500"
              style={{ opacity: showOn ? 0 : 1 }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {/* On photo */}
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
