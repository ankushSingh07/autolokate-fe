"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, IndianRupee, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ShopProduct } from "./constants";

export function ProductCard({ product }: { product: ShopProduct }) {
  const [tierId, setTierId] = useState<string>(product.tiers[0]?.id ?? "single");
  const tier = useMemo(
    () => product.tiers.find((t) => t.id === tierId) ?? product.tiers[0],
    [product.tiers, tierId],
  );
  const savePct =
    tier && tier.mrp > tier.price ? Math.round((1 - tier.price / tier.mrp) * 100) : 0;

  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-6 shadow-app-soft",
        "transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-8",
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            "relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full p-4 shadow-inner sm:h-40 sm:w-40",
            product.ringClass,
          )}
        >
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={320}
            height={320}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {product.badges.map((b) => (
            <span
              key={b}
              className="rounded-full border border-border/70 bg-secondary/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
            >
              {b}
            </span>
          ))}
          {product.highlightBadge ? (
            <span className="rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              {product.highlightBadge}
            </span>
          ) : null}
        </div>
      </div>

      <h2 className="font-display relative mt-6 text-center text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {product.title}
      </h2>
      <p className="relative mt-2 text-center text-sm leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      <div className="relative mt-5">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Choose pack
        </p>
        <div
          className="mt-2 flex gap-1 rounded-2xl border border-border/60 bg-muted/35 p-1"
          role="group"
          aria-label={`Quantity tiers for ${product.title}`}
        >
          {product.tiers.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTierId(t.id)}
              className={cn(
                "min-h-10 flex-1 rounded-xl px-2 text-[11px] font-semibold uppercase tracking-wide transition-all sm:text-xs",
                tierId === t.id
                  ? "bg-primary text-primary-foreground shadow-[0_4px_14px_-4px_rgba(37,99,235,0.55)]"
                  : "text-muted-foreground hover:bg-background/80 hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="relative mt-5 space-y-2.5 text-left text-[13px] text-muted-foreground">
        {product.bullets.map((line) => (
          <li key={line} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-6 flex flex-wrap items-end justify-center gap-3 border-t border-border/60 pt-6">
        <div className="flex items-baseline gap-1.5">
          <span className="flex items-center text-3xl font-extrabold tabular-nums text-foreground sm:text-[2rem]">
            <IndianRupee
              className="h-6 w-6 shrink-0 text-primary opacity-90 sm:h-7 sm:w-7"
              aria-hidden
            />
            {tier?.price}
          </span>
          {tier && tier.mrp > tier.price ? (
            <span className="text-sm text-muted-foreground line-through">₹{tier.mrp}</span>
          ) : null}
        </div>
        {savePct > 0 ? (
          <span className="inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
            {savePct}% save
          </span>
        ) : null}
      </div>

      <Button size="lg" className="relative mt-6 w-full rounded-2xl sm:h-12" asChild>
        <Link href="/contact-us">
          <ShoppingCart className="h-4 w-4" aria-hidden />
          Buy now
        </Link>
      </Button>
    </article>
  );
}
