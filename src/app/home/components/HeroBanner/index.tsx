import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_BACKGROUND, HERO_COPY, HERO_FEATURES } from "./constants";
import { TrendingModelsCard } from "./content";
import styles from "./index.module.css";

export function HeroBanner() {
  return (
    <section className={styles.hero}>
      {/* Theme-aware background imagery */}
      <div className={styles.bg} aria-hidden="true">
        <Image
          src={HERO_BACKGROUND.light}
          alt=""
          fill
          priority
          sizes="100vw"
          className="theme-light-only object-cover object-[78%_center] lg:object-[68%_center]"
        />
        <Image
          src={HERO_BACKGROUND.dark}
          alt=""
          fill
          priority
          sizes="100vw"
          className="theme-dark-only object-cover object-[78%_center] lg:object-[68%_center]"
        />
        <div className={styles.fadeRight} />
        <div className={styles.fadeTop} />
        <div className={styles.fadeBottom} />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-8 lg:py-24">
        <div className="min-w-0 lg:col-span-7">
          <span className="eyebrow-chip">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {HERO_COPY.eyebrow}
          </span>

          <h1 className="font-display mt-6 max-w-xl text-balance text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem]">
            {HERO_COPY.headlinePrefix}{" "}
            <span className="text-primary">{HERO_COPY.headlineHighlight}</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
            {HERO_COPY.subheading}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="px-7">
              <Link href={HERO_COPY.primaryCta.href}>
                <Sparkles className="h-4 w-4" aria-hidden />
                {HERO_COPY.primaryCta.label}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-background/70 px-7 backdrop-blur-md hover:bg-background"
            >
              <Link href={HERO_COPY.secondaryCta.href}>
                {HERO_COPY.secondaryCta.label}
              </Link>
            </Button>
          </div>

          <ul className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {HERO_FEATURES.map(({ title, body, Icon }) => (
              <li
                key={title}
                className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/70 p-3.5 backdrop-blur-sm transition hover:border-primary/35 hover:bg-card"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15"
                  aria-hidden
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-foreground sm:text-sm">
                    {title}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground sm:text-[12.5px]">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:col-span-5 lg:max-w-md lg:justify-self-end">
          <TrendingModelsCard />
        </div>
      </div>
    </section>
  );
}
