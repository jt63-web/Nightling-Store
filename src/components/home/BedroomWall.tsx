'use client';

import { motion } from 'framer-motion';

// Placeholder bedroom scenes with soft pastel gradients
const ROOMS = [
  { id: 1, label: 'Mia, 2', palette: ['#F5D5C8', '#FFFBF0'] },
  { id: 2, label: 'Oliver, 4', palette: ['#BFD9E8', '#E8F4FF'] },
  { id: 3, label: 'Isla, 1', palette: ['#D8C9E8', '#F0EAF8'] },
  { id: 4, label: 'Noah, 3', palette: ['#FFE9B8', '#FFFBF0'] },
  { id: 5, label: 'Luna, 5', palette: ['#B8D4B8', '#EAF4EA'] },
  { id: 6, label: 'Finn, 2', palette: ['#F5D5C8', '#FFE9B8'] },
];

export function BedroomWall() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p
            className="font-body text-xs tracking-widest uppercase mb-3 mode-transition"
            style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
          >
            Real rooms, real families
          </p>
          <h2
            className="font-display text-3xl lg:text-4xl mode-transition"
            style={{ color: 'var(--text-primary)' }}
          >
            Nightling in the wild.
          </h2>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {ROOMS.map((room, i) => (
            <motion.div
              key={room.id}
              className="break-inside-avoid rounded-3xl overflow-hidden relative"
              style={{
                background: `linear-gradient(135deg, ${room.palette[0]} 0%, ${room.palette[1]} 100%)`,
                aspectRatio: i % 3 === 1 ? '3/4' : '1/1',
              }}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              {/* Placeholder room illustration */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg viewBox="0 0 100 100" className="w-1/2 h-1/2">
                  <rect x="20" y="60" width="60" height="30" rx="4" fill="#1F2A44" />
                  <rect x="30" y="40" width="40" height="22" rx="2" fill="#1F2A44" />
                  <circle cx="50" cy="30" r="12" fill="#FFD78E" />
                  <circle cx="50" cy="30" r="8" fill="#FFE9B8" />
                </svg>
              </div>
              <div className="absolute bottom-3 left-4">
                <span
                  className="font-body text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.7)', color: '#1F2A44' }}
                >
                  {room.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 font-body text-sm text-center mode-transition"
          style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
        >
          Tag @nightling to be featured
        </motion.p>
      </div>
    </section>
  );
}
