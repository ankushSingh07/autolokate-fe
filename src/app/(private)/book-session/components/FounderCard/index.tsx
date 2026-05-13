"use client";

import Image from "next/image";
import Link from "next/link";
import { Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";
import { IDG_FOUNDER, INDIAN_DRIVE_GUIDE_CHANNEL_URL } from "@/lib/idg";

export function FounderCard() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section
      className="relative border-b border-border px-4 py-8 sm:px-6 sm:py-10"
      aria-labelledby="founder-heading"
    >
      {isDark && (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(37,99,235,0.07),transparent_55%)]"
          aria-hidden
        />
      )}
      <div className="relative mx-auto max-w-6xl">
        <div
          className={cn(
            "rounded-3xl border p-5 sm:p-7 lg:p-9",
            isDark
              ? "border-white/12 bg-zinc-900/45 backdrop-blur-md shadow-[0_24px_60px_-40px_rgba(0,0,0,0.55)]"
              : "border-border bg-card shadow-sm",
          )}
        >
          <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-10 xl:grid-cols-[minmax(0,300px)_1fr]">
            <div className="mx-auto flex w-full max-w-[280px] flex-col items-center lg:mx-0 lg:max-w-none">
              <div className="relative w-full max-w-[240px] sm:max-w-[260px] lg:max-w-none">
                {isDark && (
                  <div
                    className="pointer-events-none absolute -inset-3 rounded-full bg-gradient-to-br from-blue-400/20 via-indigo-500/12 to-transparent blur-2xl"
                    aria-hidden
                  />
                )}
                <div
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-full border bg-muted",
                    isDark
                      ? "border-white/15 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] ring-2 ring-primary/20"
                      : "border-border shadow-sm ring-2 ring-primary/15",
                  )}
                >
                  <Image
                    src={IDG_FOUNDER.avatarUrl}
                    alt={`${IDG_FOUNDER.name}, ${IDG_FOUNDER.title}`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 260px, 300px"
                    priority
                  />
                </div>
                <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:mt-4 sm:tracking-[0.2em] lg:text-left">
                  Session lead
                </p>
              </div>
            </div>

            <div className="min-w-0 space-y-4 sm:space-y-5">
              <span className="inline-flex w-fit items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                Indian Drive Guide
              </span>
              <header className="space-y-1.5 pt-0.5 sm:space-y-2">
                <h2
                  id="founder-heading"
                  className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  {IDG_FOUNDER.name}
                </h2>
                <p className="text-sm font-medium text-primary sm:text-base">
                  Founder — Practical guidance for Indian buyers
                </p>
              </header>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                Sessions follow the same approach as the channel: shortlist, budget,
                ownership reality — straight talk, no scripts.
              </p>
              <Button
                className="h-10 w-full gap-2 rounded-xl border-0 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-950/40 hover:brightness-110 sm:w-auto sm:px-5"
                asChild
              >
                <Link
                  href={INDIAN_DRIVE_GUIDE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-4 w-4 shrink-0" aria-hidden />
                  Watch on YouTube
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
