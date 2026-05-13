import { CtaBanner, Editions, HeroBanner, StepsGrid, VideoSection, howToUseMetadata } from "./";

export const metadata = howToUseMetadata;

export default function HowToUsePage() {
  return (
    <main className="relative">
      <HeroBanner />
      <VideoSection />
      <StepsGrid />
      <Editions />
      <CtaBanner />
    </main>
  );
}
