export type Light = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  mood: string;
  price: number; // in cents AUD
  features: string[];
  dimensions: string;
  battery: string;
  images: {
    off: string;
    on: string;
    angle: string;
    room: string;
  };
  inBox: string[];
  pairsWell: string[]; // slugs
  reviewCount: number;
  rating: number; // 1–5
};

const IMG = (slug: string) => ({
  off: `/images/lights/${slug}/photo1.png`,
  on: `/images/lights/${slug}/photo2.png`,
  angle: `/images/lights/${slug}/photo3.png`,
  room: `/images/lights/${slug}/photo4.png`,
});

export const lights: Light[] = [
  {
    slug: 'blu-the-whale',
    name: 'Blu the Whale',
    tagline: 'A gentle giant for little dreamers.',
    description:
      'Blu is a soft beluga whale with one tiny dot eye and a rounded smile that glows from within. Plump, squeeze-able, and perfectly balanced on a shelf. Kids who love the ocean fall hard for Blu.',
    mood: 'sleepy-clouds',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      'Double-tap for ultra-low night-light mode',
      '12-hour battery at mid brightness',
      'USB-C rechargeable (cable included)',
      'BPA-free food-grade silicone',
    ],
    dimensions: '160mm W × 120mm H × 95mm D',
    battery: '12 hours (mid) / 6 hours (high)',
    images: IMG('blu-the-whale'),
    inBox: ['Blu the Whale light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['nimbus-the-cloud', 'luna-the-bunny'],
    reviewCount: 218,
    rating: 4.9,
  },
  {
    slug: 'coco-the-capybara',
    name: 'Coco the Capybara',
    tagline: 'The calmest light in the room.',
    description:
      'Coco is a plump, low-slung capybara with a serene expression and a warm amber glow that feels like a campfire from across the room. Coco never panics. Coco just glows.',
    mood: 'tiny-companions',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      '12-hour battery at mid brightness',
      'USB-C rechargeable (cable included)',
      'BPA-free food-grade silicone',
    ],
    dimensions: '155mm W × 110mm H × 85mm D',
    battery: '12 hours (mid) / 6 hours (high)',
    images: IMG('coco-the-capybara'),
    inBox: ['Coco the Capybara light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['mocha-the-coffee', 'sunny-the-duck'],
    reviewCount: 134,
    rating: 4.8,
  },
  {
    slug: 'cooper-the-puppy',
    name: 'Cooper the Puppy',
    tagline: 'Floppy ears, warm light, happy dreams.',
    description:
      'Cooper sits with floppy ears and a wide-eyed look of pure contentment. The soft silicone body catches the glow beautifully — warm all the way through, like sunshine through a frosted window.',
    mood: 'forest-babies',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      '12-hour battery at mid brightness',
      'USB-C rechargeable (cable included)',
      'BPA-free food-grade silicone',
    ],
    dimensions: '130mm W × 150mm H × 90mm D',
    battery: '12 hours (mid) / 6 hours (high)',
    images: IMG('cooper-the-puppy'),
    inBox: ['Cooper the Puppy light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['honey-the-bear', 'coco-the-capybara'],
    reviewCount: 187,
    rating: 4.9,
  },
  {
    slug: 'honey-the-bear',
    name: 'Honey the Bear',
    tagline: 'Round, warm, and impossibly soft.',
    description:
      'Honey is a squat little bear with small round ears and a face that looks permanently delighted. The warm amber glow is the mellowest in the collection — perfect for keeping on all night.',
    mood: 'forest-babies',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      'Double-tap for ultra-low night-light mode',
      '12-hour battery at mid brightness',
      'USB-C rechargeable (cable included)',
      'BPA-free food-grade silicone',
    ],
    dimensions: '125mm W × 155mm H × 90mm D',
    battery: '12 hours (mid) / 6 hours (high)',
    images: IMG('honey-the-bear'),
    inBox: ['Honey the Bear light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['cooper-the-puppy', 'pepper-the-black-sheep'],
    reviewCount: 302,
    rating: 4.9,
  },
  {
    slug: 'luna-the-bunny',
    name: 'Luna the Bunny',
    tagline: 'Long ears and a soft glow for big dreamers.',
    description:
      'Luna has impossibly long ears that catch the glow from inside and a perfectly round body that fits in two tiny hands. The warmest member of the Sleepy Clouds family.',
    mood: 'sleepy-clouds',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      '12-hour battery at mid brightness',
      'USB-C rechargeable (cable included)',
      'BPA-free food-grade silicone',
    ],
    dimensions: '110mm W × 185mm H × 85mm D',
    battery: '12 hours (mid) / 6 hours (high)',
    images: IMG('luna-the-bunny'),
    inBox: ['Luna the Bunny light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['blu-the-whale', 'nimbus-the-cloud'],
    reviewCount: 241,
    rating: 4.9,
  },
  {
    slug: 'mocha-the-coffee',
    name: 'Mocha the Coffee',
    tagline: 'A bedtime brew for tiny hands.',
    description:
      'Mocha is a chubby coffee mug with a happy face, little legs, and a warm amber glow that feels like a morning cup. Proof that the best bedtime companion doesn\'t have to be an animal.',
    mood: 'tiny-companions',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      'Double-tap for ultra-low night-light mode',
      '10-hour battery at mid brightness',
      'USB-C rechargeable (cable included)',
      'BPA-free food-grade silicone',
    ],
    dimensions: '115mm W × 145mm H × 100mm D',
    battery: '10 hours (mid) / 5 hours (high)',
    images: IMG('mocha-the-coffee'),
    inBox: ['Mocha the Coffee light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['coco-the-capybara', 'luna-the-bunny'],
    reviewCount: 98,
    rating: 4.8,
  },
  {
    slug: 'nimbus-the-cloud',
    name: 'Nimbus the Cloud',
    tagline: 'The original soft glow companion.',
    description:
      'Nimbus is a plump, smiling cloud with stumpy little legs — the light that started it all. Squeeze it, cuddle it, leave it glowing on the shelf. Rechargeable in two hours, glowing gently for twelve.',
    mood: 'sleepy-clouds',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      '12-hour battery at mid brightness',
      'USB-C rechargeable (cable included)',
      'BPA-free food-grade silicone',
      'Soft silicone that won\'t scratch shelves or floors',
    ],
    dimensions: '140mm W × 130mm H × 105mm D',
    battery: '12 hours (mid) / 6 hours (high)',
    images: IMG('nimbus-the-cloud'),
    inBox: ['Nimbus the Cloud light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['blu-the-whale', 'luna-the-bunny'],
    reviewCount: 284,
    rating: 4.9,
  },
  {
    slug: 'pepper-the-black-sheep',
    name: 'Pepper the Black Sheep',
    tagline: 'Stands out. Glows softly.',
    description:
      'Pepper is a fluffy little sheep who never quite fit in — and that\'s exactly what makes them special. Soft cream silicone with black accents, a sleepy expression, and a glow that\'s quietly, perfectly warm.',
    mood: 'forest-babies',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      '12-hour battery at mid brightness',
      'USB-C rechargeable (cable included)',
      'BPA-free food-grade silicone',
    ],
    dimensions: '135mm W × 150mm H × 95mm D',
    battery: '12 hours (mid) / 6 hours (high)',
    images: IMG('pepper-the-black-sheep'),
    inBox: ['Pepper the Black Sheep light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['honey-the-bear', 'cooper-the-puppy'],
    reviewCount: 156,
    rating: 4.8,
  },
  {
    slug: 'rex-the-dinosaur',
    name: 'Rex the Dinosaur',
    tagline: 'Tiny roar, enormous glow.',
    description:
      'Rex has a spiky green back, blushing pink cheeks, and a glow that fills a whole room with warmth. For kids who want something a little different at the end of the shelf.',
    mood: 'cosmic-friends',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      'Double-tap for ultra-low night-light mode',
      '12-hour battery at mid brightness',
      'USB-C rechargeable (cable included)',
      'BPA-free food-grade silicone',
    ],
    dimensions: '150mm W × 155mm H × 95mm D',
    battery: '12 hours (mid) / 6 hours (high)',
    images: IMG('rex-the-dinosaur'),
    inBox: ['Rex the Dinosaur light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['sunny-the-duck', 'honey-the-bear'],
    reviewCount: 173,
    rating: 4.8,
  },
  {
    slug: 'sunny-the-duck',
    name: 'Sunny the Duck',
    tagline: 'A little glow to brighten bedtime.',
    description:
      'Sunny is a chubby rubber duck reimagined in soft silicone — warm, round, and completely at home on a bath shelf or a bedside table. The cheeriest light in the collection.',
    mood: 'cosmic-friends',
    price: 4995,
    features: [
      'Tap to cycle 3 brightness levels',
      '12-hour battery at mid brightness',
      'USB-C rechargeable (cable included)',
      'BPA-free food-grade silicone',
    ],
    dimensions: '140mm W × 140mm H × 95mm D',
    battery: '12 hours (mid) / 6 hours (high)',
    images: IMG('sunny-the-duck'),
    inBox: ['Sunny the Duck light', 'USB-C charging cable', 'Care guide'],
    pairsWell: ['rex-the-dinosaur', 'coco-the-capybara'],
    reviewCount: 211,
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
