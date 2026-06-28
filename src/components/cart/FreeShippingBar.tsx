'use client';

import { useModeStore } from '@/lib/stores/mode';

export function FreeShippingBar() {
  const mode = useModeStore((s) => s.mode);
  const isNight = mode === 'night';

  return (
    <div className="px-6 py-3 border-b mode-transition" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2">
        <div
          className="h-1 flex-1 rounded-full"
          style={{ backgroundColor: isNight ? 'rgba(255,185,87,0.3)' : '#FFD78E' }}
        >
          <div className="h-full w-full rounded-full" style={{ backgroundColor: isNight ? '#FFB957' : '#F5A623' }} />
        </div>
      </div>
      <p className="font-body text-xs mt-1.5 mode-transition" style={{ color: 'var(--text-secondary)' }}>
        ✓ Free shipping on your order — no minimum needed
      </p>
    </div>
  );
}
