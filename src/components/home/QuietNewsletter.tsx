'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function QuietNewsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-24">
      <div className="max-w-xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            className="font-body text-xs tracking-widest uppercase mb-4 mode-transition"
            style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
          >
            Stay quiet
          </p>
          <h2
            className="font-display text-3xl mb-3 mode-transition"
            style={{ color: 'var(--text-primary)' }}
          >
            Get a quiet email once a month.
          </h2>
          <p
            className="font-body text-base mb-8 mode-transition"
            style={{ color: 'var(--text-secondary)' }}
          >
            New lights, sleep reading, and the occasional gentle offer. No noise.
          </p>

          {submitted ? (
            <p
              className="font-display text-xl mode-transition"
              style={{ color: 'var(--accent)' }}
            >
              You&apos;re in. Sleep well.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3 rounded-full border font-body text-sm focus:outline-none mode-transition"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full font-body text-sm font-medium mode-transition hover:opacity-90 transition-opacity whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--midnight, #1F2A44)',
                }}
              >
                Join
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
