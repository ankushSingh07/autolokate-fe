import { cn } from "@/lib/utils";
import { featureCards } from "./constants";

export function FeatureCards() {
  return (
    <>
      <section className="bg-background pb-2 pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-[2rem] lg:text-[2.25rem]">
            Why{" "}
            <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
              2 Million+
            </span>{" "}
            Drivers Trust Us?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-[15px]">
            Essential tools designed specifically for the Indian road ecosystem.
          </p>
        </div>
      </section>

      <section className="bg-background py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map(({ Icon, title, body, badges, iconBg, iconColor, glow }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-app-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-7"
              >
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-60 blur-2xl transition-opacity group-hover:opacity-90",
                    glow,
                  )}
                />

                <span
                  className={cn(
                    "relative flex h-12 w-12 items-center justify-center rounded-xl",
                    iconBg,
                    iconColor,
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>

                <h3 className="font-display relative mt-5 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                  {title}
                </h3>
                <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground sm:text-sm">
                  {body}
                </p>

                <ul className="relative mt-5 flex flex-wrap gap-2">
                  {badges.map((badge) => (
                    <li
                      key={badge}
                      className="inline-flex items-center rounded-md border border-border/70 bg-secondary/60 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-foreground/80"
                    >
                      {badge}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
