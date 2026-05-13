import { HeroBanner } from "../HeroBanner";
import { HomeAmbient } from "../HomeAmbient";
import { AiMatchedResults } from "../AiMatchedResults";
import { BrowseMarketplace } from "../BrowseMarketplace";
import { ExpertBookCta } from "../ExpertBookCta";
import { IdgVideoBand } from "../IdgVideoBand";
import { PlatformHighlights } from "../PlatformHighlights";

/**
 * Top-level home page composition. Sections are arranged so each one is
 * self-contained — `AiMatchedResults` renders nothing until the user has
 * completed the preference finder, so first-time visitors see the marketing
 * sections cleanly without an empty slot in between.
 */
export function HomeContent() {
  return (
    <main className="relative">
      <HomeAmbient />
      <HeroBanner />
      <AiMatchedResults />
      <BrowseMarketplace />
      <ExpertBookCta />
      <IdgVideoBand />
      <PlatformHighlights />
    </main>
  );
}
