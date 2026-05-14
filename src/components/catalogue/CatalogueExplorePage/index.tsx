"use client";

import { Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageFade } from "@/components/shared/PageFade";
import { Button } from "@/components/ui/button";
import { useCatalogueExploreModels } from "@/hooks/catalogue";
import type { VehicleCategory } from "@/lib/preferences";

import { BrandCatalogueListing } from "../BrandModelsPage/BrandCatalogueListing";
import { EXPLORE_BANNER_BACKGROUND, EXPLORE_CATALOGUE_COPY } from "./constants";

export interface CatalogueExplorePageProps {
  vehicleType: VehicleCategory;
}

/**
 * `/cars/explore` and `/bikes/explore` — driven by paginated `GET /v1/catalogue/models`.
 */
export function CatalogueExplorePage({ vehicleType }: CatalogueExplorePageProps) {
  const copy = EXPLORE_CATALOGUE_COPY[vehicleType];
  const hub = `/${vehicleType}`;
  const {
    models,
    hasMore,
    isLoading,
    isFetchingMore,
    isError,
    loadMore,
    refetch,
  } = useCatalogueExploreModels(vehicleType);

  return (
    <PageFade>
      <section className="relative min-h-[280px] overflow-hidden border-b border-border sm:min-h-[320px]">
        <Image
          src={EXPLORE_BANNER_BACKGROUND.light}
          alt=""
          fill
          priority
          className="theme-light-only object-cover object-[72%_center] sm:object-right"
          sizes="100vw"
          aria-hidden
        />
        <Image
          src={EXPLORE_BANNER_BACKGROUND.dark}
          alt=""
          fill
          priority
          className="theme-dark-only object-cover object-[72%_center] sm:object-right"
          sizes="100vw"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/92 via-background/45 to-transparent dark:from-[#05070d]/93 dark:via-[#070a12]/52 dark:to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-background/30 dark:bg-background/25"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{copy.badge}</p>
          <h1 className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {copy.subtitle}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-6 rounded-full border-2 border-primary"
            asChild
          >
            <Link href={hub}>
              <Building2 aria-hidden />
              {copy.directoryLinkLabel}
            </Link>
          </Button>
        </div>
      </section>

      <BrandCatalogueListing
        listings={models}
        vehicleType={vehicleType}
        pageBrandSlug=""
        displayName=""
        lockedBrandBadge=""
        showBrandLockBadge={false}
        modelsHeading={copy.modelsHeading}
        emptyCatalogueCopy={copy.emptyCopy}
        isInitialLoading={isLoading && models.length === 0}
        modelsError={isError && models.length === 0}
        onRetryModels={refetch}
        afterListings={
          hasMore ? (
            <div className="mt-10 flex justify-center pb-6">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="rounded-full px-8"
                disabled={isFetchingMore || isLoading}
                onClick={() => void loadMore()}
              >
                {isFetchingMore ? "Loading…" : copy.loadMore}
              </Button>
            </div>
          ) : null
        }
      />
    </PageFade>
  );
}
