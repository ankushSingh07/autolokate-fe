import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Check, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EXPERT_CTA_BACKGROUND,
  EXPERT_CTA_COPY,
  TRUST_CHIPS,
} from "./constants";

/**
 * Home banner inviting visitors to book a paid expert session.
 * Mirrors Autolokate's banner variant 1:1 — theme-aware showroom backdrop
 * (`home_session_{light,dark}.png`), 8/4 column split, Lock fee-clarity pill,
 * Calendar-iconed CTA, and a check-prefixed footnote on the right.
 */
export function ExpertBookCta() {
  return (
    <section
      aria-labelledby="expert-cta-heading"
      className="relative py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="relative isolate overflow-hidden rounded-3xl border border-border/80 bg-card text-foreground shadow-app-soft ring-1 ring-foreground/[0.04]">
          {/* Theme-aware showroom backdrop. */}
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
            <Image
              src={EXPERT_CTA_BACKGROUND.light}
              alt=""
              fill
              sizes="100vw"
              className="theme-light-only object-cover object-[78%_center] lg:object-[72%_center]"
            />
            <Image
              src={EXPERT_CTA_BACKGROUND.dark}
              alt=""
              fill
              sizes="100vw"
              className="theme-dark-only object-cover object-[78%_center] lg:object-[72%_center]"
            />
            {/* Soften the right side so copy stays readable across themes. */}
            <div className="absolute inset-0 bg-linear-to-r from-card via-card/85 to-card/0 lg:via-card/65" />
            <div className="absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-card/35 to-transparent" />
          </div>

          {/* Hairline accent at the top edge. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-primary/35 to-transparent"
          />

          <div className="relative z-10 grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:p-10">
            <div className="min-w-0 lg:col-span-8">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary sm:text-xs">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/12 text-primary ring-1 ring-primary/20">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                </span>
                {EXPERT_CTA_COPY.eyebrow}
              </p>
              <h3
                id="expert-cta-heading"
                className="font-display mt-4 text-balance text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-[1.85rem] lg:text-[2.05rem]"
              >
                {EXPERT_CTA_COPY.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                {EXPERT_CTA_COPY.body}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2.5">
                {TRUST_CHIPS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm sm:text-[13px]"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>

              <div className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.08] px-3.5 py-1.5 text-xs font-semibold text-primary sm:text-[13px]">
                <Lock className="h-3.5 w-3.5" aria-hidden />
                {EXPERT_CTA_COPY.lockPillLabel}
              </div>
            </div>

            <div className="flex w-full shrink-0 flex-col items-stretch gap-2 lg:col-span-4 lg:items-end">
              <Button
                asChild
                size="lg"
                className="h-12 w-full max-w-sm gap-2 rounded-2xl px-6 text-sm font-semibold shadow-[0_12px_32px_-12px_rgba(37,99,235,0.55)] sm:text-base lg:max-w-none lg:min-w-[14rem]"
              >
                <Link href={EXPERT_CTA_COPY.primaryCta.href}>
                  <CalendarCheck className="h-4 w-4" aria-hidden />
                  {EXPERT_CTA_COPY.primaryCta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <p className="inline-flex items-center justify-center gap-1.5 text-[11px] leading-relaxed text-muted-foreground lg:justify-end lg:text-right">
                <Check className="h-3 w-3 text-primary" aria-hidden />
                {EXPERT_CTA_COPY.footnote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
