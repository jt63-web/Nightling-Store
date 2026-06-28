import { redirect } from 'next/navigation';
import { moods } from '@/lib/moods';

export function generateStaticParams() {
  return moods.map((m) => ({ mood: m.slug }));
}

export default function MoodPage() {
  redirect('/collection');
}
