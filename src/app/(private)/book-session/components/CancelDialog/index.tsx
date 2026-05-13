"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserBookingSummary } from "@/lib/booking/types";

export interface CancelDialogProps {
  /** Booking under review, or `null` when the dialog should be closed. */
  target: UserBookingSummary | null;
  onClose: () => void;
  onConfirm: () => void;
  /** Render a spinner while the request is in flight. */
  loading?: boolean;
}

/**
 * Confirmation dialog for cancelling a booking. Decoupled from the table so
 * either side can rerender independently.
 */
export function CancelDialog({
  target,
  onClose,
  onConfirm,
  loading,
}: CancelDialogProps) {
  return (
    <Dialog open={target !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancel this booking?</DialogTitle>
          <DialogDescription>
            {target
              ? `${target.slotDate || "—"} · ${target.slotStartLabel || "—"}. Refunds follow platform rules if applicable.`
              : null}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
            Keep booking
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                Cancelling…
              </>
            ) : (
              "Yes, cancel"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
