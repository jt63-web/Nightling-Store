export type Light = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // in cents USD
  features: string[];
  images: {
    off: string;
    on: string;
    angle: string;
    room: string;
  };
  pairsWell: string[]; // slugs
  reviewCount: number;
  rating: number; // 1–5
  tag?: 'new' | 'bestseller';
  lowStock?: number;
};

const IMG = (slug: string) => ({
  off: `/images/lights/${slug}/photo1.png`,
  on: `/images/lights/${slug}/photo2.png`,
  angle: `/images/lights/${slug}/photo3.png`,
  room: `/images/lights/${slug}/photo4.png`,
});

export const lights: Light[] = [
  {
    slug: 'nimbus-the-cloud',
    name: 'Nimbus the Cloud',
    tagline: 'The original soft glow companion.',
    description:
      'Nimbus is a plump, smiling cloud with stumpy little legs — the light that started it all. Squeeze it, cuddle it, leave it glowing on the shelf. Rechargeable, gentle, and built to last.',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      'USB-C rechargeable (cable included)',
      'Food-grade silicone',
      "Soft silicone that won't scratch shelves or floors",
    ],
    images: IMG('nimbus-the-cloud'),
    pairsWell: ['blu-the-whale', 'luna-the-bunny'],
    reviewCount: 258,
    rating: 4.9,
    tag: 'bestseller',
  },
  {
    slug: 'blu-the-whale',
    name: 'Blu the Whale',
    tagline: 'A gentle giant for little dreamers.',
    description:
      'Blu is a soft beluga whale with one tiny dot eye and a rounded smile that glows from within. Plump, squeeze-able, and perfectly balanced on a shelf. Kids who love the ocean fall hard for Blu.',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      'Double-tap for ultra-low night-light mode',
      'USB-C rechargeable (cable included)',
      'Food-grade silicone',
    ],
    images: {
      off: '/images/lights/blu-the-whale/photo4.png',
      on: '/images/lights/blu-the-whale/photo1.png',
      angle: '/images/lights/blu-the-whale/photo3.png',
      room: '/images/lights/blu-the-whale/photo2.png',
    },
    pairsWell: ['nimbus-the-cloud', 'luna-the-bunny'],
    reviewCount: 142,
    rating: 4.8,
  },
  {
    slug: 'coco-the-capybara',
    name: 'Coco the Capybara',
    tagline: 'The calmest light in the room.',
    description:
      'Coco is a plump, low-slung capybara with a serene expression and a warm amber glow that feels like a campfire from across the room. Coco never panics. Coco just glows.',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      'USB-C rechargeable (cable included)',
      'Food-grade silicone',
    ],
    images: IMG('coco-the-capybara'),
    pairsWell: ['mocha-the-coffee', 'sunny-the-duck'],
    reviewCount: 87,
    rating: 4.6,
  },
  {
    slug: 'cooper-the-puppy',
    name: 'Cooper the Puppy',
    tagline: 'Floppy ears, warm light, happy dreams.',
    description:
      'Cooper sits with floppy ears and a wide-eyed look of pure contentment. The soft silicone body catches the glow beautifully — warm all the way through, like sunshine through a frosted window.',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      'USB-C rechargeable (cable included)',
      'Food-grade silicone',
    ],
    images: IMG('cooper-the-puppy'),
    pairsWell: ['honey-the-bear', 'coco-the-capybara'],
    reviewCount: 203,
    rating: 4.9,
  },
  {
    slug: 'honey-the-bear',
    name: 'Honey the Bear',
    tagline: 'Round, warm, and impossibly soft.',
    description:
      'Honey is a squat little bear with small round ears and a face that looks permanently delighted. The warm amber glow is the mellowest in the collection — perfect for keeping on all night.',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      'Double-tap for ultra-low night-light mode',
      'USB-C rechargeable (cable included)',
      'Food-grade silicone',
    ],
    images: IMG('honey-the-bear'),
    pairsWell: ['cooper-the-puppy', 'pepper-the-black-sheep'],
    reviewCount: 312,
    rating: 4.9,
    tag: 'bestseller',
  },
  {
    slug: 'luna-the-bunny',
    name: 'Luna the Bunny',
    tagline: 'Long ears and a soft glow for big dreamers.',
    description:
      'Luna has impossibly long ears that catch the glow from inside and a perfectly round body that fits in two tiny hands. Warm, round, and completely at home on any shelf.',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      'USB-C rechargeable (cable included)',
      'Food-grade silicone',
    ],
    images: {
      off: '/images/lights/luna-the-bunny/photo1.png',
      on: '/images/lights/luna-the-bunny/photo3.png',
      angle: '/images/lights/luna-the-bunny/photo4.png',
      room: '/images/lights/luna-the-bunny/photo4.png',
    },
    pairsWell: ['blu-the-whale', 'nimbus-the-cloud'],
    reviewCount: 201,
    rating: 4.8,
  },
  {
    slug: 'mocha-the-coffee',
    name: 'Mocha the Coffee',
    tagline: 'A bedtime brew for tiny hands.',
    description:
      "Mocha is a chubby coffee mug with a happy face, little legs, and a warm amber glow that feels like a morning cup. Proof that the best bedtime companion doesn't have to be an animal.",
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      'Double-tap for ultra-low night-light mode',
      'USB-C rechargeable (cable included)',
      'Food-grade silicone',
    ],
    images: IMG('mocha-the-coffee'),
    pairsWell: ['coco-the-capybara', 'luna-the-bunny'],
    reviewCount: 54,
    rating: 4.7,
    lowStock: 4,
  },
  {
    slug: 'pepper-the-black-sheep',
    name: 'Pepper the Black Sheep',
    tagline: 'Stands out. Glows softly.',
    description:
      "Pepper is a fluffy little sheep who never quite fit in — and that's exactly what makes them special. Soft cream silicone with black accents, a sleepy expression, and a glow that's quietly, perfectly warm.",
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      'USB-C rechargeable (cable included)',
      'Food-grade silicone',
    ],
    images: {
      off: '/images/lights/pepper-the-black-sheep/photo1.png',
      on: '/images/lights/pepper-the-black-sheep/photo4.png',
      angle: '/images/lights/pepper-the-black-sheep/photo3.png',
      room: '/images/lights/pepper-the-black-sheep/photo2.png',
    },
    pairsWell: ['honey-the-bear', 'cooper-the-puppy'],
    reviewCount: 73,
    rating: 4.5,
    lowStock: 3,
  },
  {
    slug: 'rex-the-dinosaur',
    name: 'Rex the Dinosaur',
    tagline: 'Tiny roar, enormous glow.',
    description:
      'Rex has a spiky green back, blushing pink cheeks, and a glow that fills a whole room with warmth. For kids who want something a little different at the end of the shelf.',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      'Double-tap for ultra-low night-light mode',
      'USB-C rechargeable (cable included)',
      'Food-grade silicone',
    ],
    images: IMG('rex-the-dinosaur'),
    pairsWell: ['sunny-the-duck', 'honey-the-bear'],
    reviewCount: 44,
    rating: 4.3,
    tag: 'new',
  },
  {
    slug: 'sunny-the-duck',
    name: 'Sunny the Duck',
    tagline: 'A little glow to brighten bedtime.',
    description:
      'Sunny is a chubby rubber duck reimagined in soft silicone — warm, round, and completely at home on a bath shelf or a bedside table. The cheeriest light in the collection.',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      'USB-C rechargeable (cable included)',
      'Food-grade silicone',
    ],
    images: IMG('sunny-the-duck'),
    pairsWell: ['rex-the-dinosaur', 'coco-the-capybara'],
    reviewCount: 152,
    rating: 4.7,
  },
];

export function getLightBySlug(slug: string): Light | undefined {
  return lights.find((l) => l.slug === slug);
}

export function getRelatedLights(slug: string): Light[] {
  const light = getLightBySlug(slug);
  if (!light) return [];
  return light.pairsWell
    .map((s) => getLightBySlug(s))
    .filter((l): l is Light => l !== undefined);
}
