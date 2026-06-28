import type { Light } from '@/lib/products';
import { LightTile } from './LightTile';

interface CollectionGridProps {
  lights: Light[];
}

export function CollectionGrid({ lights }: CollectionGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {lights.map((light) => (
        <LightTile key={light.slug} light={light} />
      ))}
    </div>
  );
}
