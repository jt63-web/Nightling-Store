'use client';

import { useState } from 'react';
import type { Light } from '@/lib/products';

const TABS = ['Materials', 'Care', "What's in the box"] as const;
type Tab = (typeof TABS)[number];

interface SafetyDeckProps {
  light: Light;
}

export function SafetyDeck({ light }: SafetyDeckProps) {
  const [active, setActive] = useState<Tab>('Materials');

  const content: Record<Tab, React.ReactNode> = {
    Materials: (
      <div className="space-y-4">
        <p className="font-body leading-relaxed mode-transition" style={{ color: 'var(--text-secondary)' }}>
          Every Nightling light is made entirely from food-grade silicone — the same material used in baby teethers and feeding equipment. It contains no BPA, phthalates, or PVC.
        </p>
        <ul className="space-y-2">
          {['Food-grade silicone body', 'ABS plastic internal housing', 'USB-C charging port', 'Warm LED (non-UV, non-flicker)'].map((item) => (
            <li key={item} className="flex items-center gap-2 font-body text-sm mode-transition" style={{ color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--accent)' }}>✓</span> {item}
            </li>
          ))}
        </ul>
      </div>
    ),
    Care: (
      <div className="space-y-4">
        <p className="font-body leading-relaxed mode-transition" style={{ color: 'var(--text-secondary)' }}>
          Silicone is wonderfully easy to care for. Here is all you need to know:
        </p>
        <ul className="space-y-2">
          {[
            'Wipe clean with a damp cloth',
            'Do not submerge in water',
            'Charge with the included USB-C cable',
            'Store at room temperature',
            'Avoid prolonged exposure to direct sunlight (fades colour)',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 font-body text-sm mode-transition" style={{ color: 'var(--text-secondary)' }}>
              <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }}>◉</span> {item}
            </li>
          ))}
        </ul>
      </div>
    ),
    "What's in the box": (
      <ul className="space-y-2">
        {light.inBox.map((item) => (
          <li key={item} className="flex items-center gap-2 font-body text-sm mode-transition" style={{ color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--accent)' }}>—</span> {item}
          </li>
        ))}
      </ul>
    ),
  };

  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex gap-0 border-b mb-6 mode-transition"
        style={{ borderColor: 'var(--border)' }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="px-4 py-2.5 font-body text-sm whitespace-nowrap border-b-2 transition-all mode-transition"
            style={{
              borderBottomColor: active === tab ? 'var(--accent)' : 'transparent',
              color: active === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{content[active]}</div>
    </div>
  );
}
