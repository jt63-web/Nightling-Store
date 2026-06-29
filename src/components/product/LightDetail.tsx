'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useModeStore } from '@/lib/stores/mode';
import { useCartStore } from '@/lib/stores/cart';
import { useCurrencyStore } from '@/lib/stores/currency';
import { formatPrice } from '@/lib/currency-helpers';
import type { Currency } from '@/lib/currency-helpers';
import type { Light } from '@/lib/products';
import { GlowDemo } from './GlowDemo';
import { SafetyDeck } from './SafetyDeck';
import { ProductReviews } from './ProductReviews';
import { ProductFAQ } from './ProductFAQ';

interface LightDetailProps {
  light: Light;
  related: Light[];
}

const STAR_RATINGS = [1, 2, 3, 4, 5];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_RATINGS.map((n) => (
        <svg key={n} viewBox="0 0 16 16" className="w-4 h-4" fill={n <= Math.round(rating) ? 'var(--accent)' : 'none'} stroke="var(--accent)" strokeWidth="1.2">
          <polygon points="8,1.5 10,6 14.5,6 11,9 12.5,14 8,11 3.5,14 5,9 1.5,6 6,6" />
        </svg>
      ))}
    </div>
  );
}

export function LightDetail({ light, related }: LightDetailProps) {
  const mode = useModeStore((s) => s.mode);
  const isNight = mode === 'night';
  const { currency, getRate } = useCurrencyStore();
  const rate = getRate();
  const addItem = useCartStore((s) => s.addItem);

  const price = formatPrice(light.price, currency as Currency, rate);

  const photos = [
    { src: light.images.off, label: 'Off' },
    { src: light.images.on, label: 'On' },
    { src: light.images.angle, label: 'Detail' },
    { src: light.images.room, label: 'Lifestyle' },
  ].filter((p, i, arr) => arr.findIndex((q) => q.src === p.src) === i);

  const [activeImage, setActiveImage] = useState(isNight ? 1 : 0);
  const [added, setAdded] = useState(false);
  const [stickyAdded, setStickyAdded] = useState(false);

  function handleAddToCart() {
    addItem({ slug: light.slug, name: light.name, price: light.price, image: light.images.off });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleStickyAddToCart() {
    addItem({ slug: light.slug, name: light.name, price: light.price, image: light.images.off });
    setStickyAdded(true);
    setTimeout(() => setStickyAdded(false), 2000);
  }

  return (
    <>
    {/* Sticky mobile add-to-cart bar */}
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 px-4 py-3 border-t mode-transition"
      style={{
        backgroundColor: 'var(--bg-page)',
        borderColor: 'var(--border)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm truncate mode-transition" style={{ color: 'var(--text-primary)' }}>
            {light.name}
          </p>
          <p className="font-body text-xs mode-transition" style={{ color: 'var(--text-secondary)' }}>
            {price}
          </p>
        </div>
        <motion.button
          onClick={handleStickyAddToCart}
          whileTap={{ scale: 0.97 }}
          className="flex-shrink-0 px-5 py-3 rounded-xl font-body font-semibold text-sm mode-transition"
          style={{
            backgroundColor: isNight ? 'rgba(255,185,87,0.15)' : 'var(--text-primary)',
            color: isNight ? 'var(--accent)' : 'var(--bg-page)',
            border: isNight ? '1.5px solid var(--accent)' : 'none',
            minWidth: 140,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={stickyAdded ? 'added' : 'add'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {stickyAdded ? '✓ Added' : 'Add to cart'}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
    <main className="pb-20 lg:pb-0">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-0">
        <nav className="flex gap-2 font-body text-xs mode-transition" style={{ color: 'var(--text-secondary)' }}>
          <Link href="/" className="hover:opacity-80">Home</Link>
          <span>/</span>
          <Link href="/collection" className="hover:opacity-80">Collection</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)' }}>{light.name}</span>
        </nav>
      </div>

      {/* Main product grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div
            className="rounded-3xl overflow-hidden aspect-square relative mode-transition"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={photos[activeImage].src}
                  alt={`${light.name} — ${photos[activeImage].label}`}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {isNight && activeImage === 1 && (
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ boxShadow: 'inset 0 0 60px rgba(255,185,87,0.08)' }}
              />
            )}

            <div
              className="absolute top-4 right-4 font-body text-xs px-3 py-1.5 rounded-full mode-transition"
              style={{ backgroundColor: isNight ? 'rgba(255,185,87,0.15)' : 'rgba(255,255,255,0.7)', color: 'var(--text-secondary)' }}
            >
              {isNight ? '✦ night glow' : '☀ day'}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                aria-label={photo.label}
                className="flex-1 aspect-square rounded-2xl overflow-hidden relative mode-transition"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: `2px solid ${activeImage === i ? 'var(--accent)' : 'var(--border)'}`,
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.label}
                  fill
                  className="object-contain p-2"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-6">
          <div>
            {light.tag && (
              <div
                className="inline-block font-body text-xs font-bold px-3 py-1.5 rounded-full tracking-wide mb-4"
                style={
                  light.tag === 'new'
                    ? { backgroundColor: 'var(--accent)', color: 'var(--bg-page)' }
                    : { backgroundColor: 'rgba(0,0,0,0.08)', color: 'var(--text-primary)', border: '1px solid var(--border)' }
                }
              >
                {light.tag === 'new' ? 'NEW' : '★ BESTSELLER'}
              </div>
            )}
            <h1 className="font-display text-4xl lg:text-5xl mb-3 mode-transition" style={{ color: 'var(--text-primary)' }}>
              The ORIGINAL {light.name} Night Light
            </h1>
            <p className="font-body text-lg leading-relaxed mode-transition" style={{ color: 'var(--text-secondary)' }}>
              {light.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <StarRating rating={light.rating} />
            <span className="font-body text-sm mode-transition" style={{ color: 'var(--text-secondary)' }}>
              {light.rating.toFixed(1)} ({light.reviewCount} reviews)
            </span>
          </div>

          <span className="font-display text-3xl mode-transition" style={{ color: 'var(--text-primary)' }}>
            {price}
          </span>

          {/* BOGO promo */}
          <div
            className="rounded-2xl px-4 py-3.5 mode-transition"
            style={{ backgroundColor: 'var(--accent)', opacity: 0.97 }}
          >
            <p className="font-body font-bold text-sm" style={{ color: 'var(--midnight, #1F2A44)' }}>
              🎁 Bundle &amp; Save — Buy 1, Get 1 10% Off
            </p>
            <p className="font-body text-xs mt-1" style={{ color: 'var(--midnight, #1F2A44)', opacity: 0.75 }}>
              Add a second light and save on the second unit — two lights for only{' '}
              <strong>{formatPrice(light.price + Math.round(light.price * 0.9), currency as Currency, rate)}</strong>
            </p>
          </div>

          {/* Low stock */}
          {light.lowStock && (
            <p className="font-body text-sm font-semibold" style={{ color: '#C0622B' }}>
              ⚠ Only {light.lowStock} left in stock — order soon
            </p>
          )}

          {/* Add to cart */}
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.97 }}
            className="py-4 rounded-2xl font-body font-semibold text-base mode-transition"
            style={{
              backgroundColor: isNight ? 'rgba(255,185,87,0.15)' : 'var(--text-primary)',
              color: isNight ? 'var(--accent)' : 'var(--bg-page)',
              border: isNight ? '1.5px solid var(--accent)' : 'none',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={added ? 'added' : 'add'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {added ? '✓ Added to cart' : 'Add to cart'}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Authenticity copy */}
          <p className="font-body text-xs text-center mode-transition" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
            Don&apos;t settle for cheap imitations. Shop the Original. · Premium Quality Guaranteed.
          </p>

          {/* Trust strip */}
          <div
            className="rounded-2xl p-4 grid grid-cols-2 gap-3 mode-transition"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            {[
              { icon: '✈', label: 'Free shipping, always' },
              { icon: '⚡', label: 'Ships in 1 business day' },
              { icon: '↩', label: '30-day returns on faulty items' },
              { icon: '◉', label: 'Secure checkout' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 font-body text-xs mode-transition" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent)' }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>

          {/* Key features */}
          <div
            className="rounded-2xl p-5 space-y-2 mode-transition"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            {light.features.slice(0, 4).map((f) => (
              <div key={f} className="flex items-start gap-2 font-body text-sm mode-transition" style={{ color: 'var(--text-secondary)' }}>
                <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }}>✦</span>
                {f}
              </div>
            ))}
          </div>

          <p className="font-body leading-relaxed mode-transition" style={{ color: 'var(--text-secondary)' }}>
            {light.description}
          </p>

        </div>
      </div>

      {/* Reviews */}
      <ProductReviews light={light} />

      {/* Glow demo */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl mb-10 mode-transition" style={{ color: 'var(--text-primary)' }}>
          Try the warmth
        </h2>
        <GlowDemo />
      </section>

      {/* Safety deck */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl mb-10 mode-transition" style={{ color: 'var(--text-primary)' }}>
          Safety & materials
        </h2>
        <div className="max-w-2xl">
          <SafetyDeck />
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="font-display text-3xl mb-10 mode-transition" style={{ color: 'var(--text-primary)' }}>
          Common questions
        </h2>
        <div className="max-w-2xl">
          <ProductFAQ />
        </div>
      </section>

      {/* Pairs well with */}
      {related.length > 0 && (
        <section
          className="py-20 mode-transition"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-3xl mb-10 mode-transition" style={{ color: 'var(--text-primary)' }}>
              Pairs well with
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/collection/light/${r.slug}`}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="rounded-2xl overflow-hidden p-4 mode-transition"
                    style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)' }}
                  >
                    <div
                      className="aspect-square rounded-xl relative mb-3 overflow-hidden mode-transition"
                      style={{ backgroundColor: 'var(--bg-subtle)' }}
                    >
                      <Image
                        src={r.images.off}
                        alt={r.name}
                        fill
                        className="object-contain p-3"
                        sizes="160px"
                      />
                    </div>
                    <p className="font-display text-base mode-transition" style={{ color: 'var(--text-primary)' }}>{r.name}</p>
                    <p className="font-body text-xs mt-0.5 mode-transition" style={{ color: 'var(--text-secondary)' }}>
                      {formatPrice(r.price, currency as Currency, rate)}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
    </>
  );
}
