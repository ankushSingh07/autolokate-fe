"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Car,
  ChevronDown,
  Fuel,
  IndianRupee,
  Loader2,
  MapPin,
  Phone,
  SquarePen,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUpdateProfile } from "@/hooks/auth";
import {
  MAX_CITY_ID,
  MAX_NAME,
  type ProfileFieldKey,
  type ProfileFormFields,
  type ProfileValidationErrors,
  validateProfileForm,
} from "@/lib/profile/validation";
import type { AuthUser, UpdateProfilePayload } from "@/services/auth/types";
import {
  EMPTY_FORM,
  FIELD_ERROR_BORDER,
  FIELD_INPUT,
  FIELD_INPUT_WITH_ICON,
  FIELD_SELECT,
  LABEL,
  VEHICLE_CATEGORIES,
} from "./constants";

interface ProfileFormProps {
  user: AuthUser;
  /** Callback after a successful save — typically `refetch` on the parent's user query. */
  onSaved?: (user: AuthUser) => void;
}

/**
 * Editable profile form rendered on the `/profile` page. Pre-fills from the
 * supplied `user`, validates client-side, and persists via `useUpdateProfile`.
 */
export function ProfileForm({ user, onSaved }: ProfileFormProps) {
  const router = useRouter();

  const initial = useMemo<ProfileFormFields>(
    () => ({
      full_name: user.full_name ?? "",
      phone: user.phone ?? "",
      city_id: user.city_id ?? "",
      budget_min: user.budget_min != null ? String(user.budget_min) : "",
      budget_max: user.budget_max != null ? String(user.budget_max) : "",
      preferred_fuel_types: Array.isArray(user.preferred_fuel_types)
        ? user.preferred_fuel_types.join(", ")
        : "",
      preferred_body_types: Array.isArray(user.preferred_body_types)
        ? user.preferred_body_types.join(", ")
        : "",
      preferred_vehicle_category: (() => {
        const raw = user.preferred_vehicle_category?.trim().toLowerCase() ?? "";
        return VEHICLE_CATEGORIES.includes(raw as (typeof VEHICLE_CATEGORIES)[number])
          ? raw
          : "";
      })(),
    }),
    [user],
  );

  const [form, setForm] = useState<ProfileFormFields>(initial);
  const [errors, setErrors] = useState<ProfileValidationErrors>({});

  // Re-seed when the user object swaps in (e.g. after a refetch).
  useEffect(() => {
    setForm(initial);
    setErrors({});
  }, [initial]);

  const update = useUpdateProfile({
    successToast: "Profile updated successfully.",
    onSuccess: (next) => onSaved?.(next),
  });

  function clearError(key: ProfileFieldKey) {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const cp = { ...prev };
      delete cp[key];
      return cp;
    });
  }

  function patch<K extends ProfileFieldKey>(key: K, value: ProfileFormFields[K]) {
    clearError(key);
    setForm((prev) => ({ ...prev, [key]: value }));
  }


  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const checked = validateProfileForm(form);
    if (!checked.ok) {
      setErrors(checked.errors);
      const first = Object.values(checked.errors)[0];
      toast.error(first ?? "Check the highlighted fields.");
      return;
    }
    setErrors({});

    const phoneCompact = form.phone.trim().replace(/\s/g, "");
    const minRaw = form.budget_min.trim();
    const maxRaw = form.budget_max.trim();

    const payload: UpdateProfilePayload = {
      full_name: form.full_name.trim() || undefined,
      phone: phoneCompact || undefined,
      city_id: form.city_id.trim() || null,
      budget_min: minRaw ? Number(minRaw) : null,
      budget_max: maxRaw ? Number(maxRaw) : null,
      preferred_fuel_types: checked.fuelPayload,
      preferred_body_types: checked.bodyPayload,
      preferred_vehicle_category:
        form.preferred_vehicle_category.trim().toLowerCase() || null,
    };

    void update.mutate(payload);
  }

  const saving = update.isLoading;

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      {/* Hero */}
      <div className="mb-8 flex items-center gap-3 sm:gap-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-inner sm:h-11 sm:w-11">
          <SquarePen className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-[1.75rem]">
            Edit profile
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Update your details synced with your account profile.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border/60 bg-card/95 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.25)] sm:rounded-[1.35rem]"
      >
        {/* ─── Account ────────────────────────────── */}
        <section className="space-y-5 px-5 py-6 sm:px-7 sm:py-7">
          <SectionHeading icon={User} label="Account" />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Full name"
              htmlFor="full_name"
              error={errors.full_name}
              span={2}
            >
              <input
                id="full_name"
                autoComplete="name"
                maxLength={MAX_NAME}
                placeholder="e.g. Rahul Sharma"
                aria-invalid={Boolean(errors.full_name)}
                disabled={saving}
                className={cn(FIELD_INPUT, errors.full_name && FIELD_ERROR_BORDER)}
                value={form.full_name}
                onChange={(e) => patch("full_name", e.target.value)}
              />
            </Field>

            <Field label="Phone" htmlFor="phone" error={errors.phone} span={2}>
              <div className="relative">
                <Phone
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={22}
                  placeholder="e.g. +91 88765 43210"
                  aria-invalid={Boolean(errors.phone)}
                  disabled={saving}
                  className={cn(FIELD_INPUT_WITH_ICON, errors.phone && FIELD_ERROR_BORDER)}
                  value={form.phone}
                  onChange={(e) => patch("phone", e.target.value)}
                />
              </div>
            </Field>
          </div>
        </section>

        <div className="h-px bg-border/60" />

        {/* ─── Driving preferences ───────────────── */}
        <section className="space-y-5 px-5 py-6 sm:px-7 sm:py-7">
          <SectionHeading icon={Car} label="Driving preferences" />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="City ID"
              htmlFor="city_id"
              error={errors.city_id}
              hint="Matches your marketplace city identifier when set."
            >
              <div className="relative">
                <MapPin
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <input
                  id="city_id"
                  maxLength={MAX_CITY_ID}
                  placeholder="Catalogue ref"
                  aria-invalid={Boolean(errors.city_id)}
                  disabled={saving}
                  className={cn(
                    FIELD_INPUT_WITH_ICON,
                    errors.city_id && FIELD_ERROR_BORDER,
                  )}
                  value={form.city_id}
                  onChange={(e) => patch("city_id", e.target.value)}
                />
              </div>
            </Field>

            <Field
              label="Vehicle category"
              htmlFor="preferred_vehicle_category"
              error={errors.preferred_vehicle_category}
            >
              <div className="relative">
                <select
                  id="preferred_vehicle_category"
                  aria-invalid={Boolean(errors.preferred_vehicle_category)}
                  disabled={saving}
                  className={cn(
                    FIELD_SELECT,
                    errors.preferred_vehicle_category && FIELD_ERROR_BORDER,
                  )}
                  value={form.preferred_vehicle_category}
                  onChange={(e) => patch("preferred_vehicle_category", e.target.value)}
                >
                  <option value="">Not specified</option>
                  {VEHICLE_CATEGORIES.map((c) => (
                    <option key={c} value={c} className="capitalize">
                      {c[0].toUpperCase() + c.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
              </div>
            </Field>

            <Field
              label="Budget min (₹)"
              htmlFor="budget_min"
              error={errors.budget_min}
            >
              <div className="relative">
                <IndianRupee
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <input
                  id="budget_min"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Minimum"
                  aria-invalid={Boolean(errors.budget_min)}
                  disabled={saving}
                  className={cn(
                    FIELD_INPUT_WITH_ICON,
                    errors.budget_min && FIELD_ERROR_BORDER,
                  )}
                  value={form.budget_min}
                  onChange={(e) => patch("budget_min", e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </Field>

            <Field
              label="Budget max (₹)"
              htmlFor="budget_max"
              error={errors.budget_max}
            >
              <div className="relative">
                <IndianRupee
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <input
                  id="budget_max"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Maximum"
                  aria-invalid={Boolean(errors.budget_max)}
                  disabled={saving}
                  className={cn(
                    FIELD_INPUT_WITH_ICON,
                    errors.budget_max && FIELD_ERROR_BORDER,
                  )}
                  value={form.budget_max}
                  onChange={(e) => patch("budget_max", e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </Field>

            <Field
              label="Preferred fuels"
              htmlFor="preferred_fuel_types"
              error={errors.preferred_fuel_types}
              span={2}
            >
              <div className="relative">
                <Fuel
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <input
                  id="preferred_fuel_types"
                  placeholder="Eg:- petrol, electric, diesel, hybrid, cng"
                  aria-invalid={Boolean(errors.preferred_fuel_types)}
                  disabled={saving}
                  className={cn(
                    FIELD_INPUT_WITH_ICON,
                    errors.preferred_fuel_types && FIELD_ERROR_BORDER,
                  )}
                  value={form.preferred_fuel_types}
                  onChange={(e) => patch("preferred_fuel_types", e.target.value)}
                />
              </div>
            </Field>

            <Field
              label="Preferred body styles"
              htmlFor="preferred_body_types"
              error={errors.preferred_body_types}
              span={2}
            >
              <input
                id="preferred_body_types"
                placeholder="Eg:- suv, hatchback"
                aria-invalid={Boolean(errors.preferred_body_types)}
                disabled={saving}
                className={cn(
                  FIELD_INPUT,
                  errors.preferred_body_types && FIELD_ERROR_BORDER,
                )}
                value={form.preferred_body_types}
                onChange={(e) => patch("preferred_body_types", e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* ─── Sticky-ish footer ─────────────────── */}
        <div className="flex flex-col-reverse gap-2 border-t border-border/60 bg-muted/25 px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:gap-2.5 sm:px-7 sm:py-4">
          <Button
            type="button"
            variant="ghost"
            className="h-11 rounded-xl"
            onClick={() => router.push("/")}
            disabled={saving}
            asChild={false}
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="h-11 rounded-xl px-6 text-base font-semibold shadow-md"
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                Saving…
              </>
            ) : (
              "Save profile"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─────────────────────────────────────────────
// Internal helpers — kept local since only the
// form uses them.

interface SectionHeadingProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

function SectionHeading({ icon: Icon, label }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-2 border-b border-border/55 pb-2">
      <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{label}</p>
    </div>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  span?: 1 | 2;
  children: React.ReactNode;
}

function Field({ label, htmlFor, hint, error, span = 1, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", span === 2 && "sm:col-span-2")}>
      <label htmlFor={htmlFor} className={LABEL}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-rose-500">{error}</p>
      ) : hint ? (
        <p className="text-xs leading-snug text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
