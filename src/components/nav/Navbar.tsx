'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/stores/cart';
import { ModeToggle } from './ModeToggle';
import { CurrencyPicker } from './CurrencyPicker';
import { CloudLogo } from '@/components/shared/CloudLogo';
import { MegaMenu } from './MegaMenu';

const NAV_LINKS = [
  { href: '/our-story', label: 'Our Story' },
  { href: '/safety', label: 'Safety' },
  { href: '/journal', label: 'Journal' },
];

export function Navbar() {
  const { totalItems, toggleCart } = useCartStore();
  const count = totalItems();
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobile() { setMobileOpen(false); }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 mode-transition"
        style={{ backgroundColor: 'var(--bg-page)' }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="border-b mode-transition" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" onClick={closeMobile}>
              <CloudLogo size={34} />
              <span
                className="font-display text-xl mode-transition hidden sm:block"
                style={{ color: 'var(--text-primary)' }}
              >
                nightling
              </span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-8">
              <MegaMenu />
              {NAV_LINKS.map(({ href, label }) => (
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

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border mode-transition"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.svg
                      key="close"
                      initial={{ opacity: 0, rotate: -45 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 45 }}
                      transition={{ duration: 0.15 }}
                      viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="burger"
                      initial={{ opacity: 0, rotate: 45 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -45 }}
                      transition={{ duration: 0.15 }}
                      viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden border-b mode-transition"
              style={{
                backgroundColor: 'var(--bg-page)',
                borderColor: 'var(--border)',
              }}
            >
              <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
                <Link
                  href="/collection"
                  onClick={closeMobile}
                  className="font-display text-2xl py-3 mode-transition border-b"
                  style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}
                >
                  Collection
                </Link>
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMobile}
                    className="font-display text-2xl py-3 mode-transition border-b"
                    style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}
                  >
                    {label}
                  </Link>
                ))}
                <Link
                  href="/collection"
                  onClick={closeMobile}
                  className="mt-4 py-3.5 rounded-2xl font-body font-semibold text-base text-center mode-transition"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--midnight, #1F2A44)' }}
                >
                  Shop the collection
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Backdrop — closes menu on outside tap */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            style={{ backgroundColor: 'rgba(31,42,68,0.3)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
          />
        )}
      </AnimatePresence>
    </>
  );
}
