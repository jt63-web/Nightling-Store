import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  slug: string;
  name: string;
  price: number; // USD cents
  qty: number;
  image: string;
};

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  subtotalCents: () => number;
  discountCents: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((s) => {
          const existing = s.items.find((i) => i.slug === item.slug);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.slug === item.slug ? { ...i, qty: i.qty + 1 } : i
              ),
              isOpen: true,
            };
          }
          return { items: [...s.items, { ...item, qty: 1 }], isOpen: true };
        }),

      removeItem: (slug) =>
        set((s) => ({
          items: s.items.filter((i) => i.slug !== slug),
        })),

      updateQty: (slug, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.slug !== slug)
              : s.items.map((i) => (i.slug === slug ? { ...i, qty } : i)),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      totalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      subtotalCents: () =>
        get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      discountCents: () => {
        const allUnits = get().items
          .flatMap((i) => Array<number>(i.qty).fill(i.price))
          .sort((a, b) => b - a);
        let discount = 0;
        for (let i = 1; i < allUnits.length; i += 2) {
          discount += Math.round(allUnits[i] * 0.1);
        }
        return discount;
      },
    }),
    {
      name: 'nightling-cart-v2',
      skipHydration: true,
    }
  )
);

// Rehydrate cart on client
if (typeof window !== 'undefined') {
  useCartStore.persist.rehydrate();
}
