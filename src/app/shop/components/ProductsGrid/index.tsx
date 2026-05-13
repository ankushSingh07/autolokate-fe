import { Sparkles } from "lucide-react";
import { products } from "./constants";
import { ProductCard } from "./ProductCard";

export function ProductsGrid() {
  return (
    <section className="bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Official store
          </span>
          <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pick your{" "}
            <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
              QR edition
            </span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-[15px]">
            Two formats, one privacy-first workflow. Select a pack and complete checkout with our
            team.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {products.map((p) => (
            <ProductCard key={p.key} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
