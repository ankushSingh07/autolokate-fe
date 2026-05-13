import { VEHICLE_CATEGORIES, type ProfileFormFields } from "@/lib/profile/validation";

export { VEHICLE_CATEGORIES };

/** Shared classnames so every input + select looks identical. */
export const FIELD_INPUT =
  "h-11 w-full rounded-xl border border-border/70 bg-background px-4 text-[0.9375rem] text-foreground shadow-inner outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60";

export const FIELD_INPUT_WITH_ICON =
  "h-11 w-full rounded-xl border border-border/70 bg-background pl-11 pr-4 text-[0.9375rem] text-foreground shadow-inner outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60";

export const FIELD_SELECT =
  "h-11 w-full appearance-none rounded-xl border border-border/70 bg-background pl-4 pr-10 text-[0.9375rem] text-foreground shadow-inner outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60";

export const LABEL = "text-sm font-semibold tracking-tight text-foreground";

export const FIELD_ERROR_BORDER = "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/30";

/** Initial blank state for the form. */
export const EMPTY_FORM: ProfileFormFields = {
  full_name: "",
  phone: "",
  city_id: "",
  budget_min: "",
  budget_max: "",
  preferred_fuel_types: "",
  preferred_body_types: "",
  preferred_vehicle_category: "",
};
