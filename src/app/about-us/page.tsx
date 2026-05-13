import { CtaBanner, FaqGrid, HeroBanner, Philosophy, WhyOffers, aboutMetadata } from "./";

export const metadata = aboutMetadata;

export default function AboutPage() {
  return (
    <main className="relative">
      <HeroBanner />
      <WhyOffers />
      <Philosophy />
      <FaqGrid />
      <CtaBanner />
    </main>
  );
}
