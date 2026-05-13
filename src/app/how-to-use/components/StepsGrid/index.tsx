import { cn } from "@/lib/utils";
import { steps } from "./constants";

export function StepsGrid() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Simple <span className="text-primary">4</span> Steps
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-[15px]">
            Follow these steps to get started with Autolokate QR.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ Icon, title, body, accent, iconBg, iconColor }, i) => {
            const stepNumber = String(i + 1).padStart(2, "0");
            return (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-app-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-60 blur-2xl transition-opacity group-hover:opacity-90",
                    accent,
                  )}
                />
                <div className="relative flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl",
                      iconBg,
                      iconColor,
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-display text-3xl font-extrabold leading-none tracking-tight text-muted-foreground/40">
                    {stepNumber}
                  </span>
                </div>
                <h3 className="relative mt-5 text-[15px] font-semibold text-foreground">
                  {title}
                </h3>
                <p className="relative mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
