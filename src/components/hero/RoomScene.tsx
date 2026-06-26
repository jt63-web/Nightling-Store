'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useModeStore } from '@/lib/stores/mode';
import { ClickableCloud } from '@/components/shared/ClickableCloud';
import { GlowHalo } from '@/components/shared/GlowHalo';

export function RoomScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const mode = useModeStore((s) => s.mode);
  const isNight = mode === 'night';

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      {/* Illustrated room — SVG background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y }}>
        <svg
          viewBox="0 0 1200 700"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Room wall */}
          <rect width="1200" height="700" fill={isNight ? '#0B1226' : '#FFF8F0'} />
          {/* Floor */}
          <rect y="560" width="1200" height="140" fill={isNight ? '#0D1529' : '#F5EBE0'} />
          {/* Skirting */}
          <rect y="552" width="1200" height="12" fill={isNight ? '#1A2440' : '#EDD9C8'} />
          {/* Window (left) */}
          <rect x="80" y="80" width="160" height="220" rx="8" fill={isNight ? '#1A2440' : '#E8F4FF'} stroke={isNight ? '#2A3556' : '#BFCFE0'} strokeWidth="4" />
          <line x1="160" y1="80" x2="160" y2="300" stroke={isNight ? '#2A3556' : '#BFCFE0'} strokeWidth="3" />
          <line x1="80" y1="190" x2="240" y2="190" stroke={isNight ? '#2A3556' : '#BFCFE0'} strokeWidth="3" />
          {/* Moonlight through window (night only) */}
          {isNight && (
            <ellipse cx="160" cy="190" rx="60" ry="80" fill="rgba(232,225,255,0.04)" />
          )}
          {/* Sunlight streaks through window (day only) */}
          {!isNight && (
            <>
              <line x1="80" y1="80" x2="260" y2="260" stroke="#FFF0C8" strokeWidth="30" strokeOpacity="0.3" />
              <line x1="120" y1="80" x2="280" y2="240" stroke="#FFF0C8" strokeWidth="20" strokeOpacity="0.2" />
            </>
          )}
          {/* Shelf (right side) */}
          <rect x="820" y="320" width="300" height="14" rx="4" fill={isNight ? '#1A2440' : '#D4B896'} />
          <rect x="820" y="334" width="10" height="80" rx="3" fill={isNight ? '#1A2440' : '#C4A880'} />
          <rect x="1110" y="334" width="10" height="80" rx="3" fill={isNight ? '#1A2440' : '#C4A880'} />
          {/* Books on shelf */}
          <rect x="830" y="265" width="18" height="55" rx="2" fill={isNight ? '#2A3556' : '#F5D5C8'} />
          <rect x="852" y="270" width="22" height="50" rx="2" fill={isNight ? '#2A3556' : '#BFD9E8'} />
          <rect x="878" y="260" width="16" height="60" rx="2" fill={isNight ? '#2A3556' : '#D8C9E8'} />
          {/* Small potted plant */}
          <ellipse cx="1060" cy="321" rx="16" ry="8" fill={isNight ? '#1A2440' : '#C4A880'} />
          <rect x="1054" y="310" width="12" height="14" rx="2" fill={isNight ? '#1A2440' : '#B8905A'} />
          <ellipse cx="1060" cy="305" rx="18" ry="12" fill={isNight ? '#2A3556' : '#9ABA88'} />
          <ellipse cx="1048" cy="298" rx="12" ry="8" fill={isNight ? '#2A3556' : '#8BAA78'} />
          <ellipse cx="1072" cy="296" rx="10" ry="7" fill={isNight ? '#2A3556' : '#9ABA88'} />
          {/* Rug */}
          <ellipse cx="600" cy="590" rx="280" ry="30" fill={isNight ? '#1A2440' : '#F0D8C4'} opacity="0.8" />
          <ellipse cx="600" cy="590" rx="240" ry="24" fill={isNight ? '#1F2A44' : '#EDD4BE'} opacity="0.6" />
          {/* Small toy (left floor) */}
          <rect x="320" y="540" width="28" height="24" rx="6" fill={isNight ? '#2A3556' : '#F5D5C8'} />
          <circle cx="334" cy="565" r="6" fill={isNight ? '#1A2440' : '#E8B8A0'} />
        </svg>
      </motion.div>

      {/* Glow halo behind the cloud (night mode) */}
      {isNight && (
        <div className="absolute top-1/2 left-1/2 pointer-events-none">
          <GlowHalo size={500} />
        </div>
      )}

      {/* Main cloud — centred, interactive */}
      <div className="relative z-10 flex flex-col items-center">
        <ClickableCloud />
        {/* Scroll cue below the fold */}
        <motion.p
          className="mt-20 font-body text-xs tracking-widest uppercase opacity-40 mode-transition"
          style={{ color: 'var(--text-secondary)' }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          scroll to explore ↓
        </motion.p>
      </div>
    </section>
  );
}
