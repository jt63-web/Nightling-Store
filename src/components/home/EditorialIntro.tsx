'use client';

import { motion } from 'framer-motion';
import { CloudLogo } from '@/components/shared/CloudLogo';

export function EditorialIntro() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="font-body text-xs tracking-widest uppercase mb-6 mode-transition"
            style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
          >
            Why a night light matters
          </p>
          <h2
            className="font-display text-4xl lg:text-5xl mb-8 text-balance mode-transition"
            style={{ color: 'var(--text-primary)' }}
          >
            The easiest part of bedtime.
          </h2>
          <div
            className="font-body text-lg leading-relaxed space-y-5 mode-transition"
            style={{ color: 'var(--text-secondary)' }}
          >
            <p>
              There is a moment, somewhere between the third book and the fourth glass of water, when parents would give anything for bedtime to just be a little softer. Not faster — softer. Less bright, less loud, less fraught.
            </p>
            <p>
              A warm light changes the room before a single word is spoken. It tells little bodies that the day is done. It handles the biology so you can handle everything else.
            </p>
            <p>
              Nightling lights are made from food-grade silicone, rechargeable in two hours, and gentle enough to leave on all night. They sit on shelves, get squeezed and carried to bed. They do their job quietly.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <CloudLogo size={260} float />
        </motion.div>
      </div>
    </section>
  );
}
