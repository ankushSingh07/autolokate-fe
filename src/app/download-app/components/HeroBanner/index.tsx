import Image from "next/image";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ANDROID_URL,
  AppleGlyph,
  DOWNLOAD_HERO_BG,
  GooglePlayGlyph,
  IOS_URL,
} from "./constants";
import { StoreBadge } from "./StoreBadge";

export function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/70">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <Image
          src={DOWNLOAD_HERO_BG.dark}
          alt=""
          fill
          priority
          sizes="100vw"
          className="theme-dark-only object-cover object-[78%_center]"
        />
        <Image
          src={DOWNLOAD_HERO_BG.light}
          alt=""
          fill
          priority
          sizes="100vw"
          className="theme-light-only object-cover object-[78%_center]"
        />
        <div className="theme-dark-only absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/10" />
        <div
          className="theme-dark-only absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_30%,rgba(59,130,246,0.18),transparent_60%)]"
          aria-hidden
        />
        <div className="theme-light-only absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />
        <div
          className="theme-light-only absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_30%,rgba(59,130,246,0.10),transparent_60%)]"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-primary/30",
              "bg-primary/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-primary backdrop-blur-sm",
            )}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            One App for Total Safety
          </span>

          <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            Safety &amp; Privacy
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-sky-500 bg-clip-text text-transparent">
              For Your Vehicle
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
            From emergency alerts to solving wrong parking without sharing your number. The only
            automotive app you need for Indian roads.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <StoreBadge
              href={ANDROID_URL}
              topLabel="Get it on"
              bottomLabel="Google Play"
              icon={<GooglePlayGlyph className="h-7 w-7 sm:h-8 sm:w-8" />}
            />
            <StoreBadge
              href={IOS_URL}
              topLabel="Download on the"
              bottomLabel="App Store"
              icon={<AppleGlyph className="h-7 w-7 text-white sm:h-8 sm:w-8" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
