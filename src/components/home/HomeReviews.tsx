'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const OVERALL_RATING = 4.9;
const TOTAL_REVIEWS = 1526;

const HOME_REVIEWS = [
  {
    reviewer: 'Sophie M.',
    product: 'Honey the Bear',
    productSlug: 'honey-the-bear',
    date: 'April 2025',
    rating: 5,
    text: 'Best purchase we\'ve made for the nursery. The double-tap ultra-low mode has been a lifesaver for night feeds — enough light to see without waking my newborn. Worth every cent.',
  },
  {
    reviewer: 'Jessica W.',
    product: 'Luna the Bunny',
    productSlug: 'luna-the-bunny',
    date: 'May 2025',
    rating: 5,
    text: 'Luna\'s ears glow beautifully from the inside. It\'s the most aesthetically pleasing night light I\'ve ever seen in a child\'s room. My daughter has a bedtime ritual now that ends with switching her on.',
  },
  {
    reviewer: 'Tom F.',
    product: 'Nimbus the Cloud',
    productSlug: 'nimbus-the-cloud',
    date: 'March 2025',
    rating: 5,
    text: 'Nimbus has been on every night for two years. The charge still lasts a full 12 hours. Genuinely impressive quality for something that\'s handled by a toddler every single day.',
  },
  {
    reviewer: 'Kate F.',
    product: 'Sunny the Duck',
    productSlug: 'sunny-the-duck',
    date: 'February 2025',
    rating: 5,
    text: 'My 2-year-old woke at 3am and instead of crying just looked at Sunny and went back to sleep. I genuinely don\'t know what kind of magic this is. We\'ve bought three more as gifts.',
  },
  {
    reviewer: 'Anna W.',
    product: 'Pepper the Black Sheep',
    productSlug: 'pepper-the-black-sheep',
    date: 'April 2025',
    rating: 5,
    text: 'Pepper is for kids who don\'t want pink bunnies. My daughter pointed at the screen and said "that one, that one." She tucks Pepper in every single night. The sweetest thing.',
  },
  {
    reviewer: 'Emma R.',
    product: 'Cooper the Puppy',
    productSlug: 'cooper-the-puppy',
    date: 'May 2025',
    rating: 5,
    text: 'Arrived beautifully packaged. My daughter named it Biscuit and tucked it in immediately. She\'d never slept with a stuffed animal before — now Cooper is non-negotiable at bedtime.',
  },
];

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 16 16"
          style={{ width: size, height: size }}
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

export function HomeReviews() {
  return (
    <section className="py-20 mode-transition" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p
            className="font-body text-xs tracking-widest uppercase mb-3 mode-transition"
            style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
          >
            What parents say
          </p>
          <h2
            className="font-display text-3xl lg:text-4xl mb-4 mode-transition"
            style={{ color: 'var(--text-primary)' }}
          >
            Real families. Real bedtimes.
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            <Stars rating={5} size={18} />
            <span
              className="font-display text-xl mode-transition"
              style={{ color: 'var(--text-primary)' }}
            >
              {OVERALL_RATING}
            </span>
            <span
              className="font-body text-sm mode-transition"
              style={{ color: 'var(--text-secondary)' }}
            >
              · {TOTAL_REVIEWS.toLocaleString()} verified reviews
            </span>
          </div>
        </motion.div>

        {/* Review grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOME_REVIEWS.map((review, i) => (
            <motion.div
              key={review.reviewer}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="p-6 rounded-3xl mode-transition flex flex-col"
              style={{
                backgroundColor: 'var(--bg-page)',
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
                className="flex items-center justify-between pt-4 border-t mode-transition"
                style={{ borderColor: 'var(--border)' }}
              >
                <p
                  className="font-body text-xs font-semibold mode-transition"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {review.reviewer}
                </p>
                <Link
                  href={`/collection/light/${review.productSlug}`}
                  className="font-body text-xs hover:opacity-70 transition-opacity mode-transition"
                  style={{ color: 'var(--accent)' }}
                >
                  {review.product} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
