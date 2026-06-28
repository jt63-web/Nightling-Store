'use client';

import { useState, useMemo } from 'react';
import { lights as allLights } from '@/lib/products';
import { CollectionGrid } from './CollectionGrid';

type SortKey = 'bestsellers' | 'price-asc' | 'price-desc' | 'top-rated';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'bestsellers', label: 'Bestsellers' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'top-rated', label: 'Top Rated' },
];

export function CollectionPageContent() {
  const [sort, setSort] = useState<SortKey>('bestsellers');

  const sorted = useMemo(() => {
    const arr = [...allLights];
    switch (sort) {
      case 'price-asc':
        return arr.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return arr.sort((a, b) => b.price - a.price);
      case 'top-rated':
        return arr.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      default:
        return arr;
    }
  }, [sort]);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <p className="font-body text-sm mode-transition" style={{ color: 'var(--text-secondary)' }}>
          {allLights.length} products
        </p>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="font-body text-sm pl-4 pr-9 py-2.5 rounded-xl mode-transition appearance-none cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs"
            style={{ color: 'var(--text-secondary)' }}
          >
            ▾
          </span>
        </div>
      </div>
      <CollectionGrid lights={sorted} />
    </>
  );
}
