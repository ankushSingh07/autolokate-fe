"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PreferenceCategoryDialog } from "@/components/shared/PreferenceCategoryDialog";
import { useMarketplaceStats } from "@/hooks/catalogue";
import { useIsAuthenticated } from "@/hooks/auth/useIsAuthenticated";
import { useVehiclePreference } from "@/hooks/preferences";
import { formatIntIn } from "@/lib/utils";
import {
  DEFAULT_VEHICLE_CATEGORY,
  VEHICLE_CATEGORY_PROMPT_ENABLED,
  readVehiclePreference,
  type VehicleCategory,
} from "@/lib/preferences";
import {
  MARKETPLACE_BACKGROUND,
  MARKETPLACE_CARDS,
  MARKETPLACE_COPY,
  MARKETPLACE_STATS,
  type MarketplaceCardId,
  type MarketplaceStat,
} from "./constants";

interface PendingCardAction {
  id: MarketplaceCardId;
  href: string;
}

/**
 * "Browse the marketplace" section.
 *
 * Layout: section-wide showroom backdrop (light + dark variants) → header
 * with title + 3 stat columns → three large explainer cards (Brand /
 * Compare / Explore).
 *
 * Auth-aware behaviour:
 *  - Logged in  → buttons navigate (Brand/Compare) or scroll to the AI
 *                 wizard (Explore).
 *  - Logged out → if `VEHICLE_CATEGORY_PROMPT_ENABLED` is on, the first
 *                 interaction opens a "Cars or Bikes?" preference popup and
 *                 persists the choice in localStorage before continuing the
 *                 original navigation. While the flag is off (only Cars are
 *                 live today), we silently seed `DEFAULT_VEHICLE_CATEGORY`
 *                 in localStorage and proceed straight to the destination.
 */
export function BrowseMarketplace() {
  const router = useRouter();
  const { brandCount, listingCount, cityCount } = useMarketplaceStats();
  const authed = useIsAuthenticated();
  const loggedIn = authed === true;
  const preference = useVehiclePreference();

  const [pendingAction, setPendingAction] = useState<PendingCardAction | null>(
    null,
  );
  const [preferenceDialogOpen, setPreferenceDialogOpen] = useState(false);

  const statValueById: Record<MarketplaceStat["id"], string> = {
    brands: formatIntIn(brandCount),
    listings: formatIntIn(listingCount),
    cities: formatIntIn(cityCount),
  };

  /**
   * Resolve the actual destination for a card press.
   *
   * The "brand" card routes to `/{vehicleType}` so the listing page can show
   * the right catalogue (Cars vs Bikes). We read the freshest value straight
   * from localStorage rather than from the `preference` closure, because this
   * function is invoked synchronously after `preference.set(...)` from the
   * popup submit handler, when the React state has not re-rendered yet.
   */
  const navigateForCard = useCallback(
    (id: MarketplaceCardId, href: string) => {
      if (id === "brand") {
        const vehicleType =
          readVehiclePreference() ?? DEFAULT_VEHICLE_CATEGORY;
        router.push(`/${vehicleType}`);
        return;
      }
      if (id === "compare") {
        const vehicleType =
          readVehiclePreference() ?? DEFAULT_VEHICLE_CATEGORY;
        router.push(`/${vehicleType}/compare`);
        return;
      }
      if (id !== "explore") {
        router.push(href || "/shop");
        return;
      }
      if (!loggedIn) {
        router.push(MARKETPLACE_COPY.loginHref);
        return;
      }
      const target =
        document.getElementById("ai-matched-results") ??
        document.getElementById("preference-finder-stepper");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(`/${readVehiclePreference() ?? DEFAULT_VEHICLE_CATEGORY}`);
      }
    },
    [loggedIn, router],
  );

  /**
   * Entry point for every card's CTA. For logged-out visitors who haven't
   * picked a vehicle category yet:
   *  - Prompt flag ON  → open the Cars/Bikes dialog and defer navigation.
   *  - Prompt flag OFF → silently persist the default category and continue.
   * Logged-in users (and anyone with a saved preference) navigate directly.
   */
  const handleCardClick = useCallback(
    (id: MarketplaceCardId, href: string) => {
      const needsPreference =
        !loggedIn && preference.hydrated && preference.value === null;

      if (needsPreference) {
        if (VEHICLE_CATEGORY_PROMPT_ENABLED) {
          setPendingAction({ id, href });
          setPreferenceDialogOpen(true);
          return;
        }
        // Single-category world today — lock in the default so future visits
        // (and the rest of the app) can read a real value from localStorage.
        preference.set(DEFAULT_VEHICLE_CATEGORY);
      }

      navigateForCard(id, href);
    },
    [loggedIn, preference, navigateForCard],
  );

  const handlePreferenceSubmit = useCallback(
    (value: VehicleCategory) => {
      preference.set(value);
      setPreferenceDialogOpen(false);
      const next = pendingAction;
      setPendingAction(null);
      if (next) navigateForCard(next.id, next.href);
    },
    [preference, pendingAction, navigateForCard],
  );

  const handlePreferenceOpenChange = useCallback((open: boolean) => {
    setPreferenceDialogOpen(open);
    if (!open) setPendingAction(null);
  }, []);

  return (
    <section
      aria-labelledby="browse-marketplace-heading"
      className="relative isolate overflow-hidden bg-background py-14 sm:py-18 lg:py-20"
    >
      {/* Theme-aware showroom backdrop. */}
      <div className="pointer-events-none absolute inset-0 -z-1" aria-hidden>
        <Image
          src={MARKETPLACE_BACKGROUND.light}
          alt=""
          fill
          sizes="100vw"
          className="theme-light-only object-cover object-[80%_center] lg:object-[72%_center]"
        />
        <Image
          src={MARKETPLACE_BACKGROUND.dark}
          alt=""
          fill
          sizes="100vw"
          className="theme-dark-only object-cover object-[80%_center] lg:object-[72%_center]"
        />
        {/* Layered overlays so the backdrop reads as ambient texture, not as
            a competing illustration behind the cards. */}
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/55 lg:via-background/80 lg:to-background/45" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="min-w-0 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {MARKETPLACE_COPY.eyebrow}
            </span>
            <h2
              id="browse-marketplace-heading"
              className="font-display mt-4 max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.75rem]"
            >
              {MARKETPLACE_COPY.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              {MARKETPLACE_COPY.description}
            </p>
          </div>

          <dl className="flex items-start gap-8 sm:gap-10 lg:col-span-5 lg:justify-end">
            {MARKETPLACE_STATS.map((s) => (
              <div key={s.id} className="text-left">
                <dd className="font-display text-3xl font-bold tabular-nums text-primary sm:text-[2rem]">
                  {statValueById[s.id]}
                </dd>
                <dt className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </header>

        <ul className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {MARKETPLACE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <li key={card.id} className="min-h-0">
                <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card/90 p-7 text-center shadow-app-soft ring-1 ring-foreground/[0.04] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 motion-reduce:hover:translate-y-0 sm:p-8">
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/[0.08] blur-3xl"
                    aria-hidden
                  />

                  {/* Icon tile — centered, matches PlatformHighlights style. */}
                  <span
                    className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/12 text-primary ring-1 ring-primary/20 sm:h-16 sm:w-16"
                    aria-hidden
                  >
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} />
                  </span>

                  <h3 className="font-display mt-6 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    {card.title}
                  </h3>
                  <span
                    aria-hidden
                    className="mx-auto mt-2.5 block h-[3px] w-9 rounded-full bg-primary/70"
                  />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                    {card.body}
                  </p>

                  <Button
                    type="button"
                    size="lg"
                    className="mt-7 w-full rounded-full"
                    onClick={() => handleCardClick(card.id, card.cta.href)}
                  >
                    {card.cta.label}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <PreferenceCategoryDialog
        open={preferenceDialogOpen}
        defaultValue={preference.value}
        onOpenChange={handlePreferenceOpenChange}
        onSubmit={handlePreferenceSubmit}
      />
    </section>
  );
}
