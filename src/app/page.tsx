import { RoomScene } from '@/components/hero/RoomScene';
import { EditorialIntro } from '@/components/home/EditorialIntro';
import { ProductSlider } from '@/components/home/ProductSlider';
import { HomeReviews } from '@/components/home/HomeReviews';
import { GlowDemo } from '@/components/product/GlowDemo';
import { SafetyStrip } from '@/components/home/SafetyStrip';
import { JournalTeasers } from '@/components/home/JournalTeasers';
import { QuietNewsletter } from '@/components/home/QuietNewsletter';

export default function Home() {
  return (
    <main>
      <RoomScene />
      <EditorialIntro />
      <ProductSlider />
      <HomeReviews />
      <GlowDemo />
      <SafetyStrip />
      <JournalTeasers />
      <QuietNewsletter />
    </main>
  );
}
