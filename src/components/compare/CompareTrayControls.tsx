"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPARE_MAX_SLOTS } from "@/components/compare/constants";
import { cn } from "@/lib/utils";

type Props = {
  /** Number of variants currently in the compare tray (0–COMPARE_MAX_SLOTS). */
  selectedCount: number;
  /** Clears selection and syncs URL to the bare compare route. */
  onClearTray: () => void;
  className?: string;
};

/**
 * Tray status + clear — matches legacy Autolokate compare hero (`compare-view.tsx`).
 */
export function CompareTrayControls({ selectedCount, onClearTray, className }: Props) {
  return (
    <div className={cn("flex shrink-0 flex-wrap items-center gap-3", className)}>
      <div
        className="inline-flex items-center gap-2 rounded-full border border-border/90 bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm ring-1 ring-border/40 dark:border-border dark:bg-card/90"
        role="status"
        aria-live="polite"
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
        Tray: {selectedCount}/{COMPARE_MAX_SLOTS} selected
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9 gap-2 rounded-full px-4 font-semibold"
        onClick={onClearTray}
        disabled={selectedCount === 0}
      >
        <Trash2 aria-hidden />
        Clear tray
      </Button>
    </div>
  );
}
