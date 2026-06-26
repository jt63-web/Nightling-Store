export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string; // HTML string
  date: string; // ISO date
  readingTime: number; // minutes
  coverImage: string;
  category: string;
};

export const journalPosts: JournalPost[] = [
  {
    slug: 'why-sleep-environment-matters',
    title: 'Why the sleep environment matters more than the bedtime routine',
    excerpt:
      'Most parents focus on what happens at bedtime — the bath, the book, the song. But the room itself does most of the heavy lifting.',
    body: `<p>There is a moment, usually around the second or third week of a new sleep routine, when parents notice something unexpected: the routine is working, but only in this room. In the car, in the grandparents' spare room, in the travel cot at a hotel — the magic evaporates.</p>
    <p>This is the environment working exactly as it should, and also exactly as it shouldn't.</p>
    <h2>The room as a sleep cue</h2>
    <p>Children's sleep is extraordinarily context-dependent. A familiar ceiling, a particular quality of darkness, the specific warmth of a known lamp — these aren't incidental details. They're cues that tell a child's nervous system: this is the place where we let go.</p>
    <p>Light is the most powerful of these cues, because light directly regulates melatonin. Cool, blue-toned light suppresses it. Warm, amber light allows it. The moment a child's bedroom switches from daylight-balanced ceiling lights to a warm, low night light, the body begins to prepare for sleep — sometimes before a single word of the bedtime story has been read.</p>
    <h2>Getting the light right</h2>
    <p>The research on sleep-compatible light is consistent: below 10 lux, below 3000K. In practice, this means a light you can comfortably navigate by, but one that doesn't interrupt the biological cascade that leads to sleep.</p>
    <p>Most households fail this test spectacularly. The bathroom light clicked on for a midnight nappy change, the overhead light for a feed, the bright screen during a 3am check-in — each one pushes the reset button on melatonin and sets the process back by 20–30 minutes.</p>
    <p>A dedicated, always-on night light solves this structurally. Not because it's on all night — it doesn't need to be — but because it means the overhead light never needs to come on at all.</p>`,
    date: '2026-04-12',
    readingTime: 5,
    coverImage: '/images/journal/sleep-environment.jpg',
    category: 'Sleep science',
  },
  {
    slug: 'bedtime-routines-by-age',
    title: 'Bedtime routines by age: what actually works at each stage',
    excerpt:
      'A newborn routine looks nothing like a toddler routine, and neither looks like what works for a six-year-old. Here is what the research says about each window.',
    body: `<p>The phrase "consistent bedtime routine" covers a multitude of different things depending on the age of the child. What a four-month-old needs from bedtime looks almost nothing like what a four-year-old needs — and the mistake most parents make is assuming the framework stays the same while just the specifics change.</p>
    <h2>Newborns (0–3 months)</h2>
    <p>Routines at this stage are less about cues and more about regulation. A newborn's circadian rhythm is largely absent — their melatonin production is minimal and not yet tied to the light cycle. What matters is warmth, fullness, and proximity. The "routine" is you.</p>
    <p>That said, starting gentle habits early — a consistent wind-down sequence, a warm dim light — means those cues are already loaded when the child's biology begins to respond to them at around 6–8 weeks.</p>
    <h2>3–6 months</h2>
    <p>This is when environmental cues begin to matter. Circadian rhythms establish themselves, melatonin production starts to track the light cycle, and the brain begins forming sleep associations. A consistent room, a consistent light level, and a consistent short sequence (feed, change, cuddle, down) can make a remarkable difference here.</p>
    <h2>6 months–2 years</h2>
    <p>The classic routine window. Children at this stage respond powerfully to predictability. The same bath, the same book, the same song, the same lamp — repeated in the same order — build a conditioned response that is genuinely neurological, not just habitual. This is the stage where a good night light earns its keep: the act of switching it on becomes a cue powerful enough to initiate drowsiness on its own.</p>
    <h2>2–5 years</h2>
    <p>Developmental push: the period when "one more" and "I'm not tired" emerge as full strategic programmes. The research here points toward shorter, crisper routines — fewer steps, clear transitions, predictable endings. A light that the child controls (within limits) shifts the dynamic from confrontation to agency.</p>`,
    date: '2026-03-28',
    readingTime: 7,
    coverImage: '/images/journal/bedtime-routines.jpg',
    category: 'Routines',
  },
  {
    slug: 'science-of-warm-light',
    title: 'The science of warm light: why colour temperature matters at night',
    excerpt:
      'Your bedroom light might be working against your child\'s sleep without you knowing it. The difference between 3000K and 6500K is not aesthetic — it\'s biological.',
    body: `<p>When lighting designers talk about colour temperature, they're describing something that sounds abstract but has immediate, measurable effects on human biology. A candle burns at around 1800K. A clear midday sky is about 6500K. The difference between them is not just visual — it's physiological.</p>
    <h2>How light controls melatonin</h2>
    <p>The eye contains a third type of photoreceptor — beyond the rods and cones that handle vision — called intrinsically photosensitive retinal ganglion cells (ipRGCs). These cells are specifically tuned to short-wavelength (blue) light, and they connect directly to the suprachiasmatic nucleus, the brain's master clock.</p>
    <p>When ipRGCs detect blue light, they send a signal that suppresses melatonin production. This is exactly what you want at 9am. It is not what you want at 7pm when you're trying to get a toddler to sleep.</p>
    <h2>What this means for your child's room</h2>
    <p>Cool white LED bulbs — the kind found in most children's overhead lights — typically sit at 4000–6500K. They're efficient, they last forever, and they're a melatonin suppressor running every evening in the room where you're trying to help your child sleep.</p>
    <p>Warm bulbs at 2700K or below have a negligible effect on melatonin. Amber light — the colour of a candle or a salt lamp — has the lowest suppressive effect of any visible light. This is not coincidence: it's why humans were able to sit around fires in the evenings for hundreds of thousands of years without disrupting their sleep.</p>
    <p>A good night light isn't just low-brightness. It's warm-toned. The warmest lights in the Nightling range sit at 2400–2700K — deliberately chosen to be biologically quiet after dark.</p>`,
    date: '2026-03-08',
    readingTime: 6,
    coverImage: '/images/journal/warm-light-science.jpg',
    category: 'Sleep science',
  },
];

export function getPostBySlug(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}

export function getLatestPosts(n = 3): JournalPost[] {
  return [...journalPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, n);
}
