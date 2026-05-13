import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ABOUT_HERO_BG, heroPillars } from "./constants";

export function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/70 bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <Image
          src={ABOUT_HERO_BG.light}
          alt=""
          fill
          priority
          sizes="100vw"
          className="theme-light-only object-cover object-[70%_center] opacity-[0.55]"
        />
        <Image
          src={ABOUT_HERO_BG.dark}
          alt=""
          fill
          priority
          sizes="100vw"
          className="theme-dark-only object-cover object-[70%_center] opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30 dark:from-background dark:via-background/80 dark:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-2xl">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-primary/30",
                "bg-primary/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-primary",
              )}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              About Autolokate
            </span>

            <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              Building a Safer
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-sky-500 bg-clip-text text-transparent">
                Vehicle Community
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
              Autolokate is a free platform that helps vehicle owners manage their vehicles,
              connect with others, and stay prepared for emergencies — all while keeping complete
              control over your privacy.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button size="lg" asChild>
                <Link href="#offers">
                  Explore features
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact-us">Contact us</Link>
              </Button>
            </div>
          </div>

          {/* Pillars — connected timeline stack */}
          <div className="relative hidden w-[19rem] lg:block">
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-6 left-[1.625rem] top-6 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-[1.4375rem] top-3 h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_4px_rgba(37,99,235,0.55)]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-3 left-[1.4375rem] h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_18px_4px_rgba(14,165,233,0.5)]"
            />

            <ol className="relative flex flex-col gap-3.5">
              {heroPillars.map(({ Icon, label, caption }, i) => {
                const step = String(i + 1).padStart(2, "0");
                return (
                  <li
                    key={label}
                    className="group relative flex items-center gap-3.5 rounded-2xl border border-border/80 bg-card/85 px-3 py-3 shadow-app-soft backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-card hover:shadow-md"
                  >
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-4 ring-background transition-colors group-hover:bg-primary/18">
                      <Icon className="h-4 w-4" aria-hidden />
                      <span className="absolute -bottom-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold leading-none text-primary-foreground shadow-sm">
                        {step}
                      </span>
                    </span>

                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold leading-tight text-foreground">
                        {label}
                      </p>
                      <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">
                        {caption}
                      </p>
                    </div>

                    <ArrowRight
                      className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground/60 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100"
                      aria-hidden
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
