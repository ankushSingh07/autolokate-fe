import { FeatureCards, HeroBanner, QrStickers, downloadMetadata } from "./";

export const metadata = downloadMetadata;

export default function DownloadAppPage() {
  return (
    <main className="relative">
      <HeroBanner />
      <FeatureCards />
      <QrStickers />
    </main>
  );
}
