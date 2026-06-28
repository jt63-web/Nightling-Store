'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { lights } from '@/lib/products';
import { useCurrencyStore } from '@/lib/stores/currency';
import { formatPrice } from '@/lib/currency-helpers';
import type { Currency } from '@/lib/currency-helpers';

// Double for seamless loop
const SLIDES = [...lights, ...lights];
const CARD_W = 256; // px
const GAP = 16; // px

export function ProductSlider() {
  const { currency, getRate } = useCurrencyStore();
  const rate = getRate();

  return (
    <section className="py-20 overflow-hidden">
      <style>{`
        @keyframes nightling-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .nl-slider-track {
          animation: nightling-scroll 38s linear infinite;
          will-change: transform;
        }
        .nl-slider-wrap:hover .nl-slider-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between"
        >
          <div>
            <p
              className="font-body text-xs tracking-widest uppercase mb-3 mode-transition"
              style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
            >
              The full collection
            </p>
            <h2
              className="font-display text-3xl lg:text-4xl mode-transition"
              style={{ color: 'var(--text-primary)' }}
            >
              Ten lights. One for every little one.
            </h2>
          </div>
          <Link
            href="/collection"
            className="font-body text-sm hover:opacity-60 transition-opacity mode-transition hidden md:block flex-shrink-0 ml-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            View all →
          </Link>
        </motion.div>
      </div>

      {/* Scrolling strip */}
      <div className="nl-slider-wrap">
        <div
          className="nl-slider-track flex"
          style={{
            width: SLIDES.length * (CARD_W + GAP),
            gap: GAP,
            paddingLeft: 24,
          }}
        >
          {SLIDES.map((light, i) => (
            <Link
              key={`${light.slug}-${i}`}
              href={`/collection/light/${light.slug}`}
              className="flex-shrink-0 group"
              style={{ width: CARD_W }}
            >
              <div
                className="rounded-3xl overflow-hidden mode-transition transition-transform duration-300 group-hover:-translate-y-2"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {/* Product photo — on/glowing state */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: '1 / 1',
                    backgroundColor: 'var(--bg-subtle)',
                  }}
                >
                  <Image
                    src={light.images.on}
                    alt={light.name}
                    fill
                    className="object-contain p-5"
                    sizes={`${CARD_W}px`}
                  />
                </div>

                {/* Info strip */}
                <div className="px-4 py-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p
                      className="font-display text-base truncate mode-transition"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {light.name}
                    </p>
                    <p
                      className="font-body text-xs mode-transition"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {formatPrice(light.price, currency as Currency, rate)}
                    </p>
                  </div>
                  <span
                    className="flex-shrink-0 font-body text-xs px-3 py-1.5 rounded-full whitespace-nowrap"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--midnight, #1F2A44)',
                    }}
                  >
                    Shop →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
