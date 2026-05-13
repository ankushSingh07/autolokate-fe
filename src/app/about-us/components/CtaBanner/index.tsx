import Link from "next/link";
import { Download, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            <div className="flex items-center gap-4">
              <span className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm sm:flex">
                <ShieldCheck className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Ready to Get Started?
                </h2>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/85 sm:text-[15px]">
                  Join thousands of vehicle owners already using Autolokate to manage their
                  vehicles and stay connected.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
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
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
