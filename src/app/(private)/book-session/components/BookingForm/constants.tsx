/** Shared input classes — keeps the form visually aligned with ProfileForm. */
export const INPUT_BASE =
  "h-10 w-full rounded-lg border px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60";

/** Light-theme variant: clean border, soft focus ring. */
export const INPUT_LIGHT =
  "border-input bg-background text-foreground focus:border-primary/60 focus:ring-primary/20";

/** Dark-theme variant: slightly stronger border, no shadow. */
export const INPUT_DARK =
  "border-zinc-600/80 bg-zinc-950/95 text-zinc-100 shadow-none focus:border-primary/50 focus:ring-primary/25";

export const FORM_LABEL = "text-xs text-muted-foreground";
