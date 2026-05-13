import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StoreBadgeProps {
  href: string;
  topLabel: string;
  bottomLabel: string;
  icon: ReactNode;
  className?: string;
}

export function StoreBadge({ href, topLabel, bottomLabel, icon, className }: StoreBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${topLabel} ${bottomLabel}`}
      className={cn(
        "group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-2xl px-5",
        "border border-white/15 bg-zinc-950 text-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]",
        "transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-zinc-900",
        "dark:border-white/12 dark:bg-zinc-900 dark:hover:bg-zinc-800",
        "sm:h-[3.75rem] sm:px-6",
        className,
      )}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center sm:h-8 sm:w-8">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-[10px]">
          {topLabel}
        </span>
        <span className="font-display -mt-0.5 text-[15px] font-bold tracking-tight text-white sm:text-[17px]">
          {bottomLabel}
        </span>
      </span>
    </a>
  );
}
