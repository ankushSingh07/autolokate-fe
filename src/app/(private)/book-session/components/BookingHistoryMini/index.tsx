"use client";

import { ExternalLink, Loader2, Video, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";
import { canCancelBooking } from "@/lib/booking/normalize";
import type { UserBookingSummary } from "@/lib/booking/types";

function statusBadge(status: string, isDark: boolean): string {
  const s = status.toLowerCase();
  if (s.includes("confirm"))
    return isDark
      ? "text-blue-300 bg-blue-500/15 border-blue-400/30"
      : "text-blue-700 bg-blue-50 border-blue-200";
  if (s.includes("cancel"))
    return isDark
      ? "text-rose-300 bg-rose-500/15 border-rose-400/30"
      : "text-rose-600 bg-rose-50 border-rose-200";
  if (s.includes("pending"))
    return isDark
      ? "text-amber-200 bg-amber-500/15 border-amber-400/30"
      : "text-amber-700 bg-amber-50 border-amber-200";
  return isDark
    ? "text-zinc-300 bg-zinc-500/15 border-zinc-400/30"
    : "text-zinc-600 bg-zinc-100 border-zinc-300";
}

function statusDot(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("confirm")) return "bg-blue-500";
  if (s.includes("cancel")) return "bg-rose-500";
  if (s.includes("pending")) return "bg-amber-400";
  return "bg-zinc-400";
}

export interface BookingHistoryMiniProps {
  bookings: UserBookingSummary[];
  isLoading?: boolean;
  /** When provided, a small "x" appears next to cancellable bookings. */
  onRequestCancel?: (booking: UserBookingSummary) => void;
  /** Id currently being cancelled — used to show a spinner on that row. */
  cancellingId?: string | null;
}

export function BookingHistoryMini({
  bookings,
  isLoading,
  onRequestCancel,
  cancellingId,
}: BookingHistoryMiniProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const rows = bookings.slice(0, 5);

  return (
    <div
      className={cn(
        "rounded-2xl border",
        isDark ? "border-white/10 bg-zinc-900/60" : "border-border bg-card shadow-sm",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between border-b px-4 py-3",
          isDark ? "border-white/10" : "border-border",
        )}
      >
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Booking History
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 px-4 py-5 text-xs text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" aria-hidden />
          Loading your bookings…
        </div>
      ) : rows.length === 0 ? (
        <p className="px-4 py-5 text-xs text-muted-foreground">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[380px] text-xs">
            <thead>
              <tr
                className={cn(
                  "border-b",
                  isDark ? "border-white/5" : "border-border/50",
                )}
              >
                {["Booking ID", "Date", "Status", "Time", ""].map((h, i) => (
                  <th
                    key={`${h}-${i}`}
                    className="px-4 py-2 text-left font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => {
                const cancellable = canCancelBooking(b);
                const isCancelling = cancellingId === b.id;
                return (
                  <tr
                    key={b.id}
                    className={cn(
                      "border-b last:border-0 transition-colors",
                      isDark
                        ? "border-white/5 hover:bg-white/5"
                        : "border-border/30 hover:bg-muted/30",
                    )}
                  >
                    <td className="px-4 py-2.5 font-mono text-foreground/80">
                      <span className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "inline-block h-1.5 w-1.5 shrink-0 rounded-full",
                            statusDot(b.status),
                          )}
                          aria-hidden
                        />
                        {b.id.length > 12 ? `${b.id.slice(0, 12)}…` : b.id}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {b.slotDate || "—"}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={cn(
                          "inline-flex rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                          statusBadge(b.status, isDark),
                        )}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {b.slotStartLabel || "—"}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      {cancellable && onRequestCancel ? (
                        <button
                          type="button"
                          aria-label="Cancel booking"
                          onClick={() => onRequestCancel(b)}
                          disabled={isCancelling}
                          className={cn(
                            "inline-flex h-7 w-7 items-center justify-center rounded-md border text-muted-foreground transition disabled:opacity-50",
                            isDark
                              ? "border-white/10 hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-300"
                              : "border-border hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600",
                          )}
                        >
                          {isCancelling ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                          ) : (
                            <X className="h-3.5 w-3.5" aria-hidden />
                          )}
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {bookings.some((b) => b.meetLink) && (
        <div
          className={cn(
            "border-t px-4 py-3",
            isDark ? "border-white/5" : "border-border/50",
          )}
        >
          {bookings
            .filter((b) => b.meetLink)
            .slice(0, 1)
            .map((b) => (
              <a
                key={b.id}
                href={b.meetLink!}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-primary transition-colors hover:text-primary/80"
              >
                <Video className="h-3.5 w-3.5" aria-hidden />
                Join active session
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            ))}
        </div>
      )}
    </div>
  );
}
