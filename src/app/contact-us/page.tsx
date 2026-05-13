import { FormSection, HeroBanner, contactMetadata } from "./";

export const metadata = contactMetadata;

export default function ContactUsPage() {
  return (
    <main className="relative">
      <HeroBanner />
      <FormSection />
    </main>
  );
}
