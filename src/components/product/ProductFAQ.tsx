'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'Is it safe for babies and young children?',
    a: 'Yes. All Nightling lights are made from BPA-free, food-grade silicone and meet international product safety standards. The warm, low-level glow is gentle on little eyes and safe to leave on overnight.',
  },
  {
    q: 'How does the touch control work?',
    a: 'Tap once to turn on and cycle through three brightness levels — high, mid, and low. Double-tap to activate ultra-low sleep mode. Tap again to turn off.',
  },
  {
    q: 'How long does the battery last?',
    a: 'Charge time is approximately 2–3 hours via the included USB-C cable. On ultra-low mode, a full charge lasts well through several nights of continuous use.',
  },
  {
    q: "What's in the box?",
    a: 'Your Nightling light, a USB-C charging cable, and a care & safety guide.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes — we ship worldwide. Shipping is always free, with no minimum order and no code needed. Standard delivery takes 4–10 business days and we dispatch within 1 business day of your order.',
  },
  {
    q: 'What is your returns policy?',
    a: 'We accept returns within 30 days of delivery for items that arrive faulty or damaged. Please contact us at returns@nightling.com with your order number and photos of the issue and we will sort it out promptly. We are unable to accept returns for change of mind.',
  },
];

export function ProductFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y mode-transition" style={{ borderColor: 'var(--border)' }}>
      {FAQS.map((faq, i) => (
        <div key={i} className="py-4">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 text-left"
          >
            <span
              className="font-body font-semibold text-sm sm:text-base mode-transition"
              style={{ color: 'var(--text-primary)' }}
            >
              {faq.q}
            </span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 text-lg leading-none"
              style={{ color: 'var(--accent)' }}
            >
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p
                  className="font-body text-sm leading-relaxed pt-3 mode-transition"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
