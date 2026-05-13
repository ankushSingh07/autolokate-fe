import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SHOP_HERO_BG, heroPerks } from "./constants";

export function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/70">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <Image
          src={SHOP_HERO_BG.dark}
          alt=""
          fill
          priority
          sizes="100vw"
          className="theme-dark-only object-cover object-[78%_center]"
        />
        <Image
          src={SHOP_HERO_BG.light}
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
              "inline-flex items-center gap-2 rounded-full border border-primary/35",
              "bg-primary/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-sm"
            )}
          >
            <Truck className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            Free shipping on all orders
          </span>

          <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            Your vehicle always reachable
            <br />
            <span className="bg-gradient-to-r from-primary via-sky-500 to-primary bg-clip-text text-transparent">
              Autolokate QR
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
            Official stickers for bikes and cars — scan-to-chat contact without broadcasting your
            number. Built for Indian roads, sealed against weather, and designed to match our app
            experience.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-[13px] font-medium text-muted-foreground sm:text-[14px]">
            {heroPerks.map(({ Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/70 backdrop-blur-sm">
                  <Icon className="h-4 w-4 text-primary" aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild className="rounded-full">
              <Link href="/contact-us">
                <ShoppingCart className="h-4 w-4" aria-hidden />
                Buy stickers
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full">
              <Link href="/how-to-use">How it works</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
