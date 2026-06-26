'use client';

import { motion } from 'framer-motion';
import { moods } from '@/lib/moods';
import { MoodCard } from '@/components/collection/MoodCard';

export function MoodReel() {
  return (
    <section className="py-20">
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
              Browse by mood
            </p>
            <h2
              className="font-display text-3xl lg:text-4xl mode-transition"
              style={{ color: 'var(--text-primary)' }}
            >
              Find your feeling.
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll on mobile, grid on larger */}
      <div className="pl-6 md:px-6 max-w-7xl md:mx-auto">
        <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-4 md:overflow-visible md:pb-0 scrollbar-hide">
          {moods.map((mood, i) => (
            <motion.div
              key={mood.slug}
              className="flex-shrink-0 w-64 md:w-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <MoodCard mood={mood} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
