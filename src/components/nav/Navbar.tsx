'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/stores/cart';
import { ModeToggle } from './ModeToggle';
import { CurrencyPicker } from './CurrencyPicker';
import { CloudLogo } from '@/components/shared/CloudLogo';
import { MegaMenu } from './MegaMenu';

export function Navbar() {
  const { totalItems, toggleCart } = useCartStore();
  const count = totalItems();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 mode-transition"
      style={{ backgroundColor: 'var(--bg-page)' }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div
        className="border-b mode-transition"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <CloudLogo size={34} />
            <span
              className="font-display text-xl mode-transition hidden sm:block"
              style={{ color: 'var(--text-primary)' }}
            >
              nightling
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            <MegaMenu />
            {[
              { href: '/our-story', label: 'Our Story' },
              { href: '/safety', label: 'Safety' },
              { href: '/journal', label: 'Journal' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-body text-sm mode-transition hover:opacity-70 transition-opacity"
                style={{ color: 'var(--text-secondary)' }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <CurrencyPicker />
            <ModeToggle />

            {/* Cart */}
            <button
              onClick={toggleCart}
              aria-label={`Open cart (${count} items)`}
              className="relative w-10 h-10 rounded-full flex items-center justify-center border mode-transition hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-body font-semibold flex items-center justify-center"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--midnight, #1F2A44)' }}
                >
                  {count}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
