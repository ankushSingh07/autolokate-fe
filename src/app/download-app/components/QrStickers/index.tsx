import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ctaPerks, qrEditions } from "./constants";

export function QrStickers() {
  return (
    <section className="bg-background pb-16 pt-4 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-app-soft">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl"
          />

          <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 lg:p-12">
            <div className="flex flex-col justify-center">
              <span
                className={cn(
                  "inline-flex w-fit items-center gap-2 rounded-full border border-primary/30",
                  "bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-primary",
                )}
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Physical Product
              </span>

              <h2 className="font-display mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-[2.25rem]">
                <span className="text-foreground">Get Premium </span>
                <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
                  QR
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
                  Stickers
                </span>
                <span className="text-foreground"> Delivered</span>
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                High-quality, weatherproof QR for your car or bike. Enable{" "}
                <span className="font-semibold text-primary">private contact</span> regarding
                parking issues and emergencies.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <Link href="/contact-us">
                    <ShoppingCart className="h-4 w-4" aria-hidden />
                    Order Stickers Now
                  </Link>
                </Button>
              </div>

              <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] font-medium text-muted-foreground">
                {ctaPerks.map(({ Icon, label }) => (
                  <li key={label} className="inline-flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {qrEditions.map((edition) => (
                <div key={edition.id} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-2xl p-3 shadow-app-soft sm:p-4",
                      edition.imageWrap,
                    )}
                  >
                    <Image
                      src={edition.image}
                      alt={edition.imageAlt}
                      width={320}
                      height={420}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                    {edition.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/how-to-use"
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary transition-colors hover:underline"
          >
            Learn how to use Autolokate QR
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
