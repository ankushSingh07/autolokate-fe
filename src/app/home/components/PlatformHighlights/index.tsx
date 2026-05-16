"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMarketplaceStats } from "@/hooks/catalogue";
import { usePreferenceFinder } from "@/hooks/advisor";
import { useVehiclePreference } from "@/hooks/preferences";
import { DEFAULT_VEHICLE_CATEGORY } from "@/lib/preferences";
import { formatIntIn } from "@/lib/utils";
import {
  ABOUT_CARD_BACKGROUND,
  ABOUT_CARD_COPY,
  ABOUT_STAT_ICONS,
  HIGHLIGHT_ITEMS,
  HIGHLIGHTS_FALLBACK_BODY,
} from "./constants";

const SITE_NAME = "Autolokate";

/**
 * "Why Autolokate" highlight strip with three cards plus a footer "About"
 * card that ties the section back to top-level marketplace stats.
 *
 * - The AI card body adapts to the user's preference-finder snapshot once
 *   they finish the questionnaire.
 * - The About card pulls brand count live from `/v1/catalogue/brands` via
 *   `useMarketplaceStats`; listings + cities fall back to sensible static
 *   numbers until those endpoints land.
 */
export function PlatformHighlights() {
  const { brandCount, listingCount, cityCount } = useMarketplaceStats();
  const { promptSnapshot, completed } = usePreferenceFinder();
  const vehiclePreference = useVehiclePreference();

  const hasFullSnapshot =
    Boolean(promptSnapshot.city?.trim()) &&
    Boolean(promptSnapshot.body?.trim()) &&
    Boolean(promptSnapshot.fuel?.trim()) &&
    Boolean(promptSnapshot.budget?.trim());

  const items = useMemo(() => {
    const pref = vehiclePreference.value ?? DEFAULT_VEHICLE_CATEGORY;
    return HIGHLIGHT_ITEMS.map((item) => {
      if (item.key === "compare") {
        return { ...item, cta: { ...item.cta, href: `/${pref}/compare` } };
      }
      if (item.key !== "ai") return item;
      const body =
        completed && hasFullSnapshot
          ? `Your advisor session is using ${promptSnapshot.city}, ${promptSnapshot.body}, ${promptSnapshot.fuel}, and ${promptSnapshot.budget}. Ranked matches pull from the live catalogue — scroll up to tweak answers anytime.`
          : HIGHLIGHTS_FALLBACK_BODY.ai;
      return { ...item, body };
    });
  }, [
    completed,
    hasFullSnapshot,
    promptSnapshot.body,
    promptSnapshot.budget,
    promptSnapshot.city,
    promptSnapshot.fuel,
    vehiclePreference.value,
  ]);

  const aboutLead = `${SITE_NAME} is a research-first stack: ${formatIntIn(listingCount)} listings, ${formatIntIn(
    brandCount,
  )} brands, ${formatIntIn(cityCount)} cities, plus AI shortlists and human backup when you want a second opinion.`;

  const aboutStats = [
    { id: "listings", label: `${formatIntIn(listingCount)} listings`, Icon: ABOUT_STAT_ICONS.listings },
    { id: "brands", label: `${formatIntIn(brandCount)} brands`, Icon: ABOUT_STAT_ICONS.brands },
    { id: "cities", label: `${formatIntIn(cityCount)} cities`, Icon: ABOUT_STAT_ICONS.cities },
  ];

  return (
    <section
      aria-labelledby="platform-highlights-heading"
      className="relative isolate z-[1] bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-primary sm:text-xs">
            <span
              className="hidden h-px w-10 bg-primary/40 sm:inline-block"
              aria-hidden
            />
            <span>Why {SITE_NAME}</span>
            <span
              className="hidden h-px w-10 bg-primary/40 sm:inline-block"
              aria-hidden
            />
          </p>
          <h2
            id="platform-highlights-heading"
            className="font-display mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.5rem]"
          >
            Tools that make your shortlist smarter
          </h2>
        </div>

        <ul className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-3 md:gap-6">
          {items.map((item) => (
            <li key={item.key} className="min-h-0">
              <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card/90 p-7 text-center shadow-app-soft ring-1 ring-foreground/[0.04] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 motion-reduce:hover:translate-y-0 sm:p-8">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/[0.08] blur-3xl"
                  aria-hidden
                />
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/12 text-primary ring-1 ring-primary/20 sm:h-16 sm:w-16">
                  <item.icon
                    className="h-6 w-6 sm:h-7 sm:w-7"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
                <h3 className="font-display mt-6 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                  {item.title}
                </h3>
                <span
                  aria-hidden
                  className="mx-auto mt-2.5 block h-[3px] w-9 rounded-full bg-primary/70"
                />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* About-Autolokate footer card with theme-aware backdrop. */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-border/80 bg-card shadow-app-soft ring-1 ring-foreground/[0.04]">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image
              src={ABOUT_CARD_BACKGROUND.light}
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="theme-light-only object-cover object-[85%_center]"
            />
            <Image
              src={ABOUT_CARD_BACKGROUND.dark}
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="theme-dark-only object-cover object-[85%_center]"
            />
            <div className="absolute inset-0 bg-linear-to-r from-card from-[5%] via-card/90 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl px-6 py-8 sm:px-8 sm:py-10 lg:max-w-[min(40rem,58%)] lg:py-12">
            <div>
              <span
                className="mb-2 block h-px w-10 bg-primary sm:w-12"
                aria-hidden
              />
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary sm:text-xs">
                {ABOUT_CARD_COPY.eyebrow}
              </p>
            </div>

            <p className="font-display mt-5 text-lg font-bold leading-snug tracking-tight text-foreground sm:text-xl lg:text-[1.35rem]">
              {aboutLead}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
              {ABOUT_CARD_COPY.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
              {aboutStats.map(({ id, label, Icon }) => (
                <li
                  key={id}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/95 px-3.5 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm sm:text-[13px]"
                >
                  <Icon
                    className="h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4"
                    aria-hidden
                  />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                size="lg"
                className="rounded-full px-6 shadow-[0_12px_32px_-12px_rgba(37,99,235,0.55)]"
                asChild
              >
                <Link href={ABOUT_CARD_COPY.primaryCta.href}>
                  {ABOUT_CARD_COPY.primaryCta.label}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 backdrop-blur-md"
                asChild
              >
                <Link href={ABOUT_CARD_COPY.secondaryCta.href}>
                  {ABOUT_CARD_COPY.secondaryCta.label}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
