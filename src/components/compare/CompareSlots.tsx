"use client";

import Image from "next/image";
import { Car, Loader2, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn, formatINR } from "@/lib/utils";
import type { CatalogueModel, CatalogueVariant } from "@/lib/catalogue/types";
import { COMPARE_MAX_SLOTS } from "@/components/compare/constants";
import {
  compareTrayPrice,
  compareTraySubtitle,
  compareTrayThumb,
  compareTrayTitleLine,
} from "@/lib/catalogue/compare-tray-display";

function isEvVariant(v: CatalogueVariant | undefined): boolean {
  if (!v) return false;
  const raw = String(v.fuel_type ?? "").trim().toLowerCase();
  if (!raw) return false;
  return (
    raw.includes("electric") ||
    raw.includes("ev") ||
    raw === "ev" ||
    raw.includes("battery")
  );
}

/** Top-left slot index — screenshot: blue + white when active, dark gray + muted when empty. */
function SlotIndexBadge({
  index,
  mode,
}: {
  index: number;
  mode: "active" | "muted";
}) {
  const n = index + 1;
  return (
    <span
      className={cn(
        "absolute left-3 top-3 z-[1] flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold tabular-nums",
        mode === "active"
          ? "bg-primary text-primary-foreground"
          : "bg-zinc-700 text-zinc-300 dark:bg-[#3f424c] dark:text-zinc-400",
      )}
      aria-hidden
    >
      {n}
    </span>
  );
}

type Props = {
  ids: string[];
  variantsById: Map<string, CatalogueVariant>;
  /** Cached `GET …/models/{slug}` payloads keyed by catalogue variant UUID. */
  modelDetailByVariantId: Partial<Record<string, CatalogueModel>>;
  bestValueId: string | null;
  onRemove: (variantId: string) => void;
  onRequestAdd: (slotIndex: number) => void;
};

export function CompareSlots({
  ids,
  variantsById,
  modelDetailByVariantId,
  bestValueId,
  onRemove,
  onRequestAdd,
}: Props) {
  const slots = Array.from({ length: COMPARE_MAX_SLOTS }, (_, i) => ids[i] ?? null);

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
      {slots.map((variantId, idx) => (
        <div key={idx} className="min-w-0">
          {variantId ? (
            <FilledSlotCard
              slotIndex={idx}
              variant={variantsById.get(variantId)}
              modelDetail={modelDetailByVariantId[variantId]}
              showBest={bestValueId === variantId}
              onRemove={() => onRemove(variantId)}
            />
          ) : (
            <EmptySlotCard slotIndex={idx} onClick={() => onRequestAdd(idx)} />
          )}
        </div>
      ))}
    </div>
  );
}

function FilledSlotCard({
  slotIndex,
  variant,
  modelDetail,
  showBest,
  onRemove,
}: {
  slotIndex: number;
  variant: CatalogueVariant | undefined;
  modelDetail: CatalogueModel | undefined;
  showBest: boolean;
  onRemove: () => void;
}) {
  // Wait for segment resolution + tray row; optional model-detail fetch fills `modelDetail` first.
  if (!variant && !modelDetail) {
    return (
      <div
        className={cn(
          "relative flex min-h-[120px] items-center gap-3 rounded-xl border border-primary bg-card px-4 py-4 pl-11",
          "dark:bg-[#15161f]",
        )}
      >
        <SlotIndexBadge index={slotIndex} mode="active" />
        <Loader2 className="h-5 w-5 shrink-0 animate-spin text-muted-foreground" aria-hidden />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  const titleLine = compareTrayTitleLine(variant, modelDetail);
  const subtitle = compareTraySubtitle(variant, modelDetail);
  const price = compareTrayPrice(variant, modelDetail);
  const thumb = compareTrayThumb(variant, modelDetail);

  const showEvBadge = Boolean(variant) && !showBest && isEvVariant(variant);

  return (
    <div
      className={cn(
        "relative flex min-h-[132px] w-full overflow-hidden rounded-xl border border-primary bg-card",
        "dark:bg-[#15161f]",
      )}
    >
      <SlotIndexBadge index={slotIndex} mode="active" />
      <button
        type="button"
        onClick={onRemove}
        className={cn(
          "absolute right-2 top-2 z-[2] inline-flex h-7 w-7 items-center justify-center rounded-full",
          "border border-border/80 bg-background/95 text-muted-foreground shadow-sm backdrop-blur-sm",
          "transition hover:bg-muted hover:text-foreground",
          "dark:border-white/10 dark:bg-black/45",
        )}
        aria-label="Remove from compare"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <div className="flex min-h-[124px] w-full flex-col sm:min-h-[132px] sm:flex-row">
        <div
          className={cn(
            "relative flex min-h-[96px] w-full shrink-0 items-stretch justify-center sm:w-[40%] sm:max-w-[176px] sm:min-h-0",
            "bg-zinc-900/30 dark:bg-zinc-950/50",
          )}
        >
          {thumb ? (
            <div className="relative h-full min-h-[96px] w-full sm:min-h-0">
              <Image
                src={thumb}
                alt=""
                fill
                className="object-contain p-2 sm:p-1.5"
                sizes="(max-width:640px) 100vw, 11rem"
              />
            </div>
          ) : (
            <div className="flex h-full min-h-[88px] w-full items-center justify-center sm:min-h-0">
              <Car className="h-9 w-9 text-muted-foreground/35" aria-hidden />
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1.5 px-3 pb-3 pt-9 sm:gap-2 sm:px-3 sm:pb-3 sm:pt-2.5 sm:pr-10">
          <div className="space-y-0.5">
            <p className="font-display text-sm font-bold leading-tight text-foreground">
              {titleLine || "—"}
            </p>
            <p className="text-[11px] leading-snug text-muted-foreground line-clamp-2">{subtitle}</p>
          </div>

          <div className="space-y-0">
            {price != null ? (
              <>
                <p className="text-base font-bold tracking-tight text-primary">{formatINR(price)}</p>
                <p className="text-[10px] text-muted-foreground">Ex-showroom</p>
              </>
            ) : (
              <p className="text-sm font-semibold text-muted-foreground">Price on request</p>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {showBest ? (
              <Badge
                variant="default"
                className={cn(
                  "rounded-md border-0 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  "bg-primary/15 text-primary",
                  "dark:bg-[#1e3a5f]/90 dark:text-sky-300",
                )}
              >
                Best value
              </Badge>
            ) : null}
            {showEvBadge ? (
              <Badge
                className={cn(
                  "rounded-md border-0 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  "bg-emerald-500/12 text-emerald-800",
                  "dark:bg-emerald-950/70 dark:text-emerald-300",
                )}
              >
                EV option
              </Badge>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptySlotCard({
  slotIndex,
  onClick,
}: {
  slotIndex: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex min-h-[120px] w-full items-center gap-4 rounded-xl border border-dashed bg-card px-4 py-4 pl-11 text-left transition",
        "border-zinc-400/50 hover:border-zinc-500/70 dark:border-zinc-600/55 dark:bg-[#15161f] dark:hover:border-zinc-500/70",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <SlotIndexBadge index={slotIndex} mode="muted" />

      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-dashed border-primary",
          "text-primary",
          "group-hover:border-primary/90 group-hover:bg-primary/5",
        )}
      >
        <Plus className="h-5 w-5" strokeWidth={2.5} aria-hidden />
      </span>

      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-sm font-semibold text-foreground">Add another variant</p>
        <p className="text-xs leading-relaxed text-muted-foreground">Search and add a variant</p>
      </div>
    </button>
  );
}
