export type Mood = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  coverImage: string;
  accentColor: string;
};

export const moods: Mood[] = [
  {
    slug: 'sleepy-clouds',
    name: 'Sleepy Clouds',
    tagline: 'Soft, round, and floating.',
    description:
      'For nurseries that feel like a cloudy afternoon nap. These lights are the roundest, softest things in the range — all gentle curves and warm cream tones.',
    coverImage: '/images/moods/sleepy-clouds.jpg',
    accentColor: '#BFD9E8',
  },
  {
    slug: 'cosmic-friends',
    name: 'Cosmic Friends',
    tagline: 'Stars, moons, and a little wonder.',
    description:
      'For the child who asks where the moon goes in the morning. These lights carry a little starlight into the bedroom — moons, bears, and constellations.',
    coverImage: '/images/moods/cosmic-friends.jpg',
    accentColor: '#D8C9E8',
  },
  {
    slug: 'forest-babies',
    name: 'Forest Babies',
    tagline: 'Quiet woodland warmth.',
    description:
      'For rooms that smell of pine and feel like a clearing in the trees. Fawns, owls, and woodland creatures, glowing in the warmest tones.',
    coverImage: '/images/moods/forest-babies.jpg',
    accentColor: '#B8D4B8',
  },
  {
    slug: 'tiny-companions',
    name: 'Tiny Companions',
    tagline: 'Small lights, big comfort.',
    description:
      'Compact lights for little hands. These travel well, sit on any shelf, and are the first thing little ones reach for at bedtime.',
    coverImage: '/images/moods/tiny-companions.jpg',
    accentColor: '#FFD78E',
  },
];

export function getMoodBySlug(slug: string): Mood | undefined {
  return moods.find((m) => m.slug === slug);
}
