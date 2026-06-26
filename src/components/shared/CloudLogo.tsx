'use client';

import { motion } from 'framer-motion';
import { useModeStore } from '@/lib/stores/mode';

interface CloudLogoProps {
  /** Pixel width of the SVG. Height auto-calculated from 140:192 aspect ratio. */
  size?: number;
  /** Apply gentle floating bob animation (for hero use). */
  float?: boolean;
  className?: string;
}

// Cloud body: overlapping shapes with identical fill = merge into one smooth blob
// Proportions traced from the real product image (140mm W × 192mm H including legs)
const DARK = '#1C0E06';

export function CloudLogo({ size = 80, float = false, className = '' }: CloudLogoProps) {
  const mode = useModeStore((s) => s.mode);
  const isNight = mode === 'night';

  const cloudFill = isNight ? '#FFE9B8' : '#FFFBF0';
  const fillTransition = 'fill 800ms ease-out';
  const filterDay = 'drop-shadow(0 4px 12px rgba(31,42,68,0.10))';
  const filterNight =
    'drop-shadow(0 0 18px rgba(255,185,87,0.75)) drop-shadow(0 0 40px rgba(255,185,87,0.35))';

  const viewW = 140;
  const viewH = 192;
  const svgHeight = (size / viewW) * viewH;

  return (
    <motion.div
      className={`inline-block ${className}`}
      // Float animation (hero variant)
      animate={float ? { y: [0, -10, 0] } : {}}
      transition={
        float
          ? { y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }
          : {}
      }
      whileHover={{ scale: 1.05, y: float ? undefined : -4 }}
      style={{ display: 'inline-block' }}
    >
      <motion.svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        width={size}
        height={svgHeight}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Nightling cloud character"
        animate={{ filter: isNight ? filterNight : filterDay }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* ── Cloud body ─────────────────────────────────────────────── */}
        {/* All shapes use the same fill → renders as one cohesive blob */}
        <ellipse
          cx="70" cy="80" rx="54" ry="50"
          fill={cloudFill}
          style={{ transition: fillTransition }}
        />
        {/* Left bump (slightly offset up-left) */}
        <circle
          cx="22" cy="54" r="26"
          fill={cloudFill}
          style={{ transition: fillTransition }}
        />
        {/* Top-center bump */}
        <circle
          cx="68" cy="38" r="30"
          fill={cloudFill}
          style={{ transition: fillTransition }}
        />
        {/* Right bump */}
        <circle
          cx="112" cy="56" r="22"
          fill={cloudFill}
          style={{ transition: fillTransition }}
        />

        {/* ── Inner glow (night only) ────────────────────────────────── */}
        <motion.ellipse
          cx="70" cy="72" rx="42" ry="36"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isNight ? [0.08, 0.18, 0.08] : 0,
            rx: isNight ? [42, 47, 42] : 42,
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          fill="rgba(255,220,120,1)"
        />

        {/* ── Face ───────────────────────────────────────────────────── */}
        {/* Left eye */}
        <circle cx="52" cy="74" r="4.5" fill={DARK} />
        {/* Right eye */}
        <circle cx="86" cy="72" r="4.5" fill={DARK} />
        {/* Smile — gentle upward curve */}
        <path
          d="M55,86 Q70,100 88,86"
          stroke={DARK}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* ── Legs ───────────────────────────────────────────────────── */}
        <rect x="33" y="122" width="16" height="40" rx="8" fill={DARK} />
        <rect x="91" y="122" width="16" height="40" rx="8" fill={DARK} />

        {/* ── Feet ───────────────────────────────────────────────────── */}
        <ellipse cx="41" cy="165" rx="18" ry="12" fill={DARK} />
        <ellipse cx="99" cy="165" rx="18" ry="12" fill={DARK} />
      </motion.svg>
    </motion.div>
  );
}
