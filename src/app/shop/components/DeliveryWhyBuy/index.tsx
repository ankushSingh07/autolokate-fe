import Link from "next/link";
import { Award, Check, Clock, Truck } from "lucide-react";
import { deliveryChecks } from "./constants";

export function DeliveryWhyBuy() {
  return (
    <section className="bg-background pb-16 pt-2 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-7 shadow-app-soft sm:p-8">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-20 top-0 h-40 w-40 rounded-full bg-primary/12 blur-3xl"
            />
            <div className="relative flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                <Truck className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                  Fast delivery
                </h2>
                <p className="text-sm text-muted-foreground">
                  We ship direct from the official warehouse.
                </p>
              </div>
            </div>
            <ul className="relative mt-6 space-y-3 text-sm text-muted-foreground">
              {deliveryChecks.map((line) => (
                <li key={line} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center rounded-3xl border border-border/80 bg-card/60 p-7 shadow-app-soft backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                <Award className="h-6 w-6" aria-hidden />
              </span>
              <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                Why buy direct?
              </h2>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              Purchasing from Autolokate means authentic QR encoding, quality-controlled printing,
              and support that understands the product. Third-party marketplaces can&apos;t
              guarantee scan reliability or warranty coverage.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-background/80 px-5 py-4 text-center">
                <p className="font-display text-2xl font-extrabold tabular-nums text-foreground">
                  10k+
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Active users
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/80 px-5 py-4 text-center">
                <p className="font-display text-2xl font-extrabold tabular-nums text-foreground">
                  4.8/5
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Customer rating
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" aria-hidden />
              <span>Need help choosing a pack? We&apos;re one message away.</span>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground sm:text-sm">
          Prices shown are indicative for demo checkout — confirm with our team on{" "}
          <Link
            href="/contact-us"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Contact
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
