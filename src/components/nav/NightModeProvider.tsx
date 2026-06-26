'use client';

// Importing the store here ensures the module-level subscribe + rehydrate
// in mode.ts runs on every page (this provider lives in layout.tsx).
import '@/lib/stores/mode';

export function NightModeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
