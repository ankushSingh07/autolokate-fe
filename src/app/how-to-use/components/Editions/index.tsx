import Image from "next/image";
import { cn } from "@/lib/utils";
import { qrEditions } from "./constants";

export function Editions() {
  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Which QR Code Fits You?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-[15px]">
            Custom-engineered designs for every vehicle type.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {qrEditions.map((edition) => (
            <div
              key={edition.id}
              className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card p-6 shadow-app-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg sm:p-7"
            >
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
                <div
                  className={cn(
                    "relative flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-2xl p-3 shadow-inner sm:h-40 sm:w-40",
                    edition.imageWrap,
                  )}
                >
                  <Image
                    src={edition.image}
                    alt={edition.imageAlt}
                    width={320}
                    height={640}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <h3 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {edition.name}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    {edition.badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center rounded-full border border-border/70 bg-secondary/70 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                    {edition.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
