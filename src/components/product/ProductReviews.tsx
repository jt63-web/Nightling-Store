'use client';

import { motion } from 'framer-motion';
import type { Light } from '@/lib/products';
import { reviews } from '@/lib/reviews';

interface ProductReviewsProps {
  light: Light;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 16 16"
          className="w-3.5 h-3.5"
          fill={n <= rating ? 'var(--accent)' : 'none'}
          stroke="var(--accent)"
          strokeWidth="1.2"
        >
          <polygon points="8,1.5 10,6 14.5,6 11,9 12.5,14 8,11 3.5,14 5,9 1.5,6 6,6" />
        </svg>
      ))}
    </div>
  );
}

function StarsLarge({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.floor(rating);
        const partial = !filled && n - 1 < rating;
        const pct = partial ? Math.round((rating - Math.floor(rating)) * 100) : 0;
        return (
          <svg
            key={n}
            viewBox="0 0 16 16"
            className="w-5 h-5"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.2"
          >
            {filled && <polygon points="8,1.5 10,6 14.5,6 11,9 12.5,14 8,11 3.5,14 5,9 1.5,6 6,6" fill="var(--accent)" />}
            {partial && (
              <>
                <defs>
                  <linearGradient id={`pg-${n}`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset={`${pct}%`} stopColor="var(--accent)" />
                    <stop offset={`${pct}%`} stopColor="transparent" />
                  </linearGradient>
                </defs>
                <polygon points="8,1.5 10,6 14.5,6 11,9 12.5,14 8,11 3.5,14 5,9 1.5,6 6,6" fill={`url(#pg-${n})`} />
              </>
            )}
            {!filled && !partial && <polygon points="8,1.5 10,6 14.5,6 11,9 12.5,14 8,11 3.5,14 5,9 1.5,6 6,6" />}
          </svg>
        );
      })}
    </div>
  );
}

export function ProductReviews({ light }: ProductReviewsProps) {
  const productReviews = reviews[light.slug] ?? [];
  if (productReviews.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-8">
        <h2
          className="font-display text-3xl mb-3 mode-transition"
          style={{ color: 'var(--text-primary)' }}
        >
          What parents say
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <StarsLarge rating={light.rating} />
          <span
            className="font-display text-2xl mode-transition"
            style={{ color: 'var(--text-primary)' }}
          >
            {light.rating.toFixed(1)}
          </span>
          <span
            className="font-body text-sm mode-transition"
            style={{ color: 'var(--text-secondary)' }}
          >
            · {light.reviewCount} verified reviews
          </span>
        </div>
      </div>

      {/* Review grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {productReviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="p-6 rounded-3xl mode-transition flex flex-col"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <Stars rating={review.rating} />
              <span
                className="font-body text-xs mode-transition"
                style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
              >
                {review.date}
              </span>
            </div>
            <p
              className="font-body text-sm leading-relaxed flex-1 mb-4 mode-transition"
              style={{ color: 'var(--text-secondary)' }}
            >
              &ldquo;{review.text}&rdquo;
            </p>
            <div
              className="flex items-center justify-between pt-3 border-t mode-transition"
              style={{ borderColor: 'var(--border)' }}
            >
              <p
                className="font-body text-xs font-semibold mode-transition"
                style={{ color: 'var(--text-primary)' }}
              >
                {review.reviewer}
              </p>
              <span
                className="font-body text-xs px-2.5 py-1 rounded-full mode-transition"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                }}
              >
                ✓ Verified
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
