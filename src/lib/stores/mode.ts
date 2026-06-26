import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Mode = 'day' | 'night';

interface ModeStore {
  mode: Mode;
  toggle: () => void;
  setMode: (mode: Mode) => void;
}

export const useModeStore = create<ModeStore>()(
  persist(
    (set) => ({
      mode: 'day',
      toggle: () => set((s) => ({ mode: s.mode === 'day' ? 'night' : 'day' })),
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'nightling-mode',
      skipHydration: true,
    }
  )
);

// Client-only: sync data-mode attribute on every store change (bypasses React
// render cycle, so it works reliably with Next.js App Router RSC children), then
// rehydrate from localStorage so the persisted preference takes effect.
if (typeof window !== 'undefined') {
  useModeStore.subscribe((state) => {
    document.documentElement.setAttribute('data-mode', state.mode);
  });
  useModeStore.persist.rehydrate();
}
