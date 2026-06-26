import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  slug: string;
  name: string;
  color: string;
  colorHex: string;
  price: number; // AUD cents
  qty: number;
  image: string;
};

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (slug: string, color: string) => void;
  updateQty: (slug: string, color: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  subtotalCents: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((s) => {
          const existing = s.items.find(
            (i) => i.slug === item.slug && i.color === item.color
          );
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.slug === item.slug && i.color === item.color
                  ? { ...i, qty: i.qty + 1 }
                  : i
              ),
              isOpen: true,
            };
          }
          return { items: [...s.items, { ...item, qty: 1 }], isOpen: true };
        }),

      removeItem: (slug, color) =>
        set((s) => ({
          items: s.items.filter((i) => !(i.slug === slug && i.color === color)),
        })),

      updateQty: (slug, color, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => !(i.slug === slug && i.color === color))
              : s.items.map((i) =>
                  i.slug === slug && i.color === color ? { ...i, qty } : i
                ),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      totalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      subtotalCents: () =>
        get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    {
      name: 'nightling-cart-v1',
      skipHydration: true,
    }
  )
);

// Rehydrate cart on client
if (typeof window !== 'undefined') {
  useCartStore.persist.rehydrate();
}
