"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";
import { FAQ_ITEMS } from "./constants";

export function Faq() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section className="space-y-3 sm:space-y-4" aria-labelledby="heading-faq">
      <header className="space-y-1.5 sm:space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground sm:tracking-[0.2em]">
          FAQ
        </p>
        <h2
          id="heading-faq"
          className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        >
          Quick answers
        </h2>
      </header>
      <div className="space-y-2 sm:space-y-2.5">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.q}
            className={cn(
              "group rounded-xl border px-4 py-3 text-left [&_summary::-webkit-details-marker]:hidden sm:px-4 sm:py-3.5",
              isDark
                ? "border-white/10 bg-zinc-950/40"
                : "border-border bg-muted/40",
            )}
          >
            <summary className="cursor-pointer list-none text-sm font-medium text-foreground sm:text-[0.9375rem]">
              <span className="flex items-center justify-between gap-2">
                {item.q}
                <span className="text-muted-foreground transition group-open:rotate-180">
                  ▼
                </span>
              </span>
            </summary>
            <p
              className={cn(
                "mt-2 border-t pt-2 text-sm leading-relaxed text-muted-foreground",
                isDark ? "border-white/5" : "border-border/50",
              )}
            >
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
