import { redirect } from 'next/navigation';

// These pages no longer exist — any old mood URLs redirect to the full collection
export function generateStaticParams() {
  return [
    { mood: 'sleepy-clouds' },
    { mood: 'cosmic-friends' },
    { mood: 'forest-babies' },
    { mood: 'tiny-companions' },
  ];
}

export default function MoodPage() {
  redirect('/collection');
}
