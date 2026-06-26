export type LightVariant = {
  color: string;
  colorHex: string;
  price: number; // in cents AUD
};

export type Light = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  mood: string; // mood slug
  variants: LightVariant[];
  features: string[];
  dimensions: string;
  battery: string;
  images: {
    day: string;
    night: string;
    room: string;
    extras: string[];
  };
  inBox: string[];
  pairsWell: string[]; // slugs
  certifications: string[];
  reviewCount: number;
  rating: number; // 1–5
};

const IMG = (slug: string) => ({
  day: `/images/lights/${slug}/day.png`,
  night: `/images/lights/${slug}/night.png`,
  room: `/images/lights/${slug}/room.png`,
  extras: [`/images/lights/${slug}/extra-1.png`],
});

export const lights: Light[] = [
  {
    slug: 'cloud-dreamer',
    name: 'Cloud Dreamer',
    tagline: 'The original soft glow companion.',
    description:
      'Meet the Cloud Dreamer — the light that started it all. A plump, smiling cloud with stumpy little legs, made entirely from soft food-grade silicone. Squeeze it, cuddle it, leave it glowing on the shelf. Rechargeable in two hours, glowing gently for twelve.',
    mood: 'sleepy-clouds',
    variants: [
      { color: 'Warm White', colorHex: '#FFFBF0', price: 4995 },
      { color: 'Blush Pink', colorHex: '#F5D5C8', price: 4995 },
      { color: 'Sky Mist', colorHex: '#BFD9E8', price: 4995 },
    ],
    features: [
      'Tap to cycle 3 brightness levels',
      '12-hour battery at mid brightness',
      'USB-C rechargeable (cable included)',
      'BPA-free food-grade silicone',
      'Warm 2700K glow — easy on little eyes',
    ],
    dimensions: '140mm W × 192mm H × 131mm D',
    battery: '12 hours (mid) / 6 hours (high)',
    images: IMG('cloud-dreamer'),
    inBox: ['Cloud Dreamer light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['moon-bear', 'star-bunny'],
    certifications: [],
    reviewCount: 284,
    rating: 4.9,
  },
  {
    slug: 'moon-bear',
    name: 'Moon Bear',
    tagline: 'A bear-shaped crescent for dreamers.',
    description:
      'Moon Bear sits upright with a sleepy crescent-moon face and rounded ears. Soft amber warmth fills the room without waking your little one when you check in at midnight.',
    mood: 'cosmic-friends',
    variants: [
      { color: 'Honey Gold', colorHex: '#FFD78E', price: 4995 },
      { color: 'Moonlight Lavender', colorHex: '#D8C9E8', price: 4995 },
    ],
    features: [
      'Tap to cycle 3 brightness levels',
      'Double-tap for ultra-low night-light mode',
      '12-hour battery',
      'USB-C rechargeable',
    ],
    dimensions: '110mm W × 155mm H × 90mm D',
    battery: '12 hours (night-light mode)',
    images: IMG('moon-bear'),
    inBox: ['Moon Bear light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['cloud-dreamer', 'cosmic-cat'],
    certifications: [],
    reviewCount: 156,
    rating: 4.8,
  },
  {
    slug: 'star-bunny',
    name: 'Star Bunny',
    tagline: 'Long ears, warm light, big dreams.',
    description:
      'Star Bunny has oversized floppy ears and a soft star embossed on its tummy. The star casts a gentle shadow pattern on the ceiling in low-light settings — a little magic at bedtime.',
    mood: 'sleepy-clouds',
    variants: [
      { color: 'Cloud White', colorHex: '#FFFBF0', price: 4995 },
      { color: 'Butter Yellow', colorHex: '#FFE9B8', price: 4995 },
      { color: 'Blush Pink', colorHex: '#F5D5C8', price: 4995 },
    ],
    features: [
      'Ceiling star projection at lowest brightness',
      '3 brightness levels',
      '10-hour battery',
      'USB-C rechargeable',
    ],
    dimensions: '100mm W × 185mm H × 80mm D',
    battery: '10 hours (mid)',
    images: IMG('star-bunny'),
    inBox: ['Star Bunny light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['cloud-dreamer', 'forest-fawn'],
    certifications: [],
    reviewCount: 201,
    rating: 4.9,
  },
  {
    slug: 'forest-fawn',
    name: 'Forest Fawn',
    tagline: 'A gentle woodland glow.',
    description:
      'Forest Fawn brings the quiet of a woodland clearing into the nursery. Tiny antler nubs, a sweet freckled nose, and a warm amber-to-white colour cycle that settles as little ones drift off.',
    mood: 'forest-babies',
    variants: [
      { color: 'Warm Fawn', colorHex: '#E8C9A0', price: 4995 },
      { color: 'Forest Green', colorHex: '#B8D4B8', price: 4995 },
    ],
    features: [
      'Auto-colour cycle: amber → warm white (settles in 20 min)',
      '3 brightness levels',
      '11-hour battery',
      'USB-C rechargeable',
    ],
    dimensions: '120mm W × 170mm H × 95mm D',
    battery: '11 hours (mid)',
    images: IMG('forest-fawn'),
    inBox: ['Forest Fawn light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['sleepy-owl', 'star-bunny'],
    certifications: [],
    reviewCount: 98,
    rating: 4.8,
  },
  {
    slug: 'cosmic-cat',
    name: 'Cosmic Cat',
    tagline: 'Stars, whiskers, and wonder.',
    description:
      'Cosmic Cat has pointy ears, whisker dots, and a constellation of tiny raised stars across its back. In night mode the stars glow faintly — a universe on your bedside table.',
    mood: 'cosmic-friends',
    variants: [
      { color: 'Midnight Blue', colorHex: '#1F2A44', price: 5495 },
      { color: 'Starlight Purple', colorHex: '#D8C9E8', price: 5495 },
    ],
    features: [
      'Raised constellation texture glows in the dark',
      '3 brightness levels + colour cycle',
      '10-hour battery',
      'USB-C rechargeable',
    ],
    dimensions: '115mm W × 160mm H × 90mm D',
    battery: '10 hours (mid)',
    images: IMG('cosmic-cat'),
    inBox: ['Cosmic Cat light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['moon-bear', 'cloud-dreamer'],
    certifications: [],
    reviewCount: 142,
    rating: 4.7,
  },
  {
    slug: 'sleepy-owl',
    name: 'Sleepy Owl',
    tagline: 'Wide eyes, soft glow, wise comfort.',
    description:
      'Sleepy Owl has oversized round eyes (closed in a gentle squint), feathery texture etched into its silicone body, and tiny feet that grip any shelf. The warmest glow in the collection.',
    mood: 'forest-babies',
    variants: [
      { color: 'Warm Cream', colorHex: '#FFFBF0', price: 4995 },
      { color: 'Toffee Brown', colorHex: '#C4955A', price: 4995 },
    ],
    features: [
      'Warmest 2400K tone in the range',
      '3 brightness levels',
      '12-hour battery',
      'USB-C rechargeable',
      'Textured feather silicone body',
    ],
    dimensions: '105mm W × 150mm H × 85mm D',
    battery: '12 hours (mid)',
    images: IMG('sleepy-owl'),
    inBox: ['Sleepy Owl light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['forest-fawn', 'moon-bear'],
    certifications: [],
    reviewCount: 73,
    rating: 4.9,
  },
];

export function getLightBySlug(slug: string): Light | undefined {
  return lights.find((l) => l.slug === slug);
}

export function getLightsByMood(mood: string): Light[] {
  return lights.filter((l) => l.mood === mood);
}

export function getRelatedLights(slug: string): Light[] {
  const light = getLightBySlug(slug);
  if (!light) return [];
  return light.pairsWell
    .map((s) => getLightBySlug(s))
    .filter((l): l is Light => l !== undefined);
}
