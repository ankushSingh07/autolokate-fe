import Link from "next/link";
import { ArrowRight, Download, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ctaPerks } from "./constants";

export function CtaBanner() {
  return (
    <section className="bg-background pb-20 pt-6 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-sky-600 p-8 shadow-[0_24px_60px_-24px_rgba(37,99,235,0.6)] sm:p-10">
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-20"
            aria-hidden
          >
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute -bottom-12 right-10 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Ready to Secure
                <br className="hidden sm:block" /> Your Range?
              </h2>
            </div>

            <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:items-end">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  className="border border-transparent bg-white text-primary shadow-md hover:bg-white/90 hover:text-primary"
                  asChild
                >
                  <Link href="/download-app">
                    <Download className="h-4 w-4" aria-hidden />
                    Download App
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="/contact-us">
                    <QrCode className="h-4 w-4" aria-hidden />
                    Buy QR Stickers
                  </Link>
                </Button>
              </div>

              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] font-medium text-white/85">
                {ctaPerks.map(({ Icon, label }) => (
                  <li key={label} className="inline-flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary transition-colors hover:underline"
          >
            Need help? Contact our team
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
