import { RoomScene } from '@/components/hero/RoomScene';
import { EditorialIntro } from '@/components/home/EditorialIntro';
import { MoodReel } from '@/components/home/MoodReel';
import { GlowDemo } from '@/components/product/GlowDemo';
import { SafetyStrip } from '@/components/home/SafetyStrip';
import { BedroomWall } from '@/components/home/BedroomWall';
import { JournalTeasers } from '@/components/home/JournalTeasers';
import { QuietNewsletter } from '@/components/home/QuietNewsletter';

export default function Home() {
  return (
    <main>
      <RoomScene />
      <EditorialIntro />
      <MoodReel />
      <GlowDemo />
      <SafetyStrip />
      <BedroomWall />
      <JournalTeasers />
      <QuietNewsletter />
    </main>
  );
}
