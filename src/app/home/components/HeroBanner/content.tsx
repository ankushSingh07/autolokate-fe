import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight, Flame } from "lucide-react";
import { TRENDING_MODELS } from "./constants";
import styles from "./index.module.css";

/**
 * Right-side teaser card showing 3 trending catalogue models.
 * Static today; wire to a `getTrending()` call when the catalogue API lands.
 */
export function TrendingModelsCard() {
  return (
    <aside
      aria-label="Trending models in the catalogue"
      className="relative w-full overflow-hidden rounded-3xl border border-border/80 bg-card/95 p-5 shadow-hero-card ring-1 ring-foreground/[0.04] backdrop-blur-md sm:p-6"
    >
      <div
        className="ambient-blob-primary right-[-3rem] top-[-3.5rem] h-32 w-32"
        aria-hidden
      />

      <div className="relative mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          Trending Models
        </h3>
        <span
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15"
          aria-hidden
        >
          <Flame className="h-3.5 w-3.5" />
        </span>
      </div>

      <ul className="relative space-y-2.5">
        {TRENDING_MODELS.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-background/40 p-2.5 transition hover:-translate-y-0.5 hover:border-primary/35 hover:bg-background hover:shadow-md"
            >
              <div className={styles.thumb}>
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    sizes="80px"
                    className="object-contain p-3 transition duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-muted/50 via-muted/70 to-muted/40" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-semibold text-foreground sm:text-[0.95rem]">
                  {item.title}
                </p>
                <p className="mt-0.5 line-clamp-1 text-[11px] uppercase tracking-wide text-muted-foreground sm:text-[12px]">
                  {item.subtitle}
                </p>
                <p className="mt-1 line-clamp-1 text-[12px] font-medium tabular-nums text-foreground/85 sm:text-[13px]">
                  {item.priceLabel}
                </p>
              </div>
              <ChevronRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>

      <div className="relative mt-4 border-t border-border/70 pt-3">
        <Link
          href="/cars"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:gap-2"
        >
          <BookOpen className="h-4 w-4" aria-hidden />
          View all models
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </aside>
  );
}
