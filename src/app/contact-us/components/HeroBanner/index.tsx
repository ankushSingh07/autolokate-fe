import Image from "next/image";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT_HERO_BG, heroStats } from "./constants";

export function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/70">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <Image
          src={CONTACT_HERO_BG.dark}
          alt=""
          fill
          priority
          sizes="100vw"
          className="theme-dark-only object-cover object-[75%_center]"
        />
        <Image
          src={CONTACT_HERO_BG.light}
          alt=""
          fill
          priority
          sizes="100vw"
          className="theme-light-only object-cover object-[75%_center]"
        />

        <div className="theme-dark-only absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/10" />
        <div
          className="theme-dark-only absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_30%,rgba(59,130,246,0.18),transparent_60%)]"
          aria-hidden
        />
        <div className="theme-light-only absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />
        <div
          className="theme-light-only absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_30%,rgba(59,130,246,0.10),transparent_60%)]"
          aria-hidden
        />

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-secondary/40" />
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
            24/7 Support Center
          </span>

          <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            How can we
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-sky-400 bg-clip-text text-transparent">
              help you?
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
            We&apos;re here to help — whether you need support, have a question, or want to share
            feedback. Our team is ready to assist you.
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {heroStats.map(({ Icon, label, value }) => (
              <li
                key={label}
                className="group flex items-center gap-3 rounded-full border border-border/70 bg-card/80 px-4 py-2.5 shadow-app-soft backdrop-blur-md transition-colors hover:border-primary/40"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {label}
                  </span>
                  <span className="text-[13.5px] font-semibold text-foreground">{value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
