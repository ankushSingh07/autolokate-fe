"use client";

import { useCallback } from "react";
import { updateProfile } from "@/services/auth";
import type { AuthUser, UpdateProfilePayload } from "@/services/auth/types";
import { useApiMutation, type UseApiMutationOptions } from "@/hooks/useApiMutation";

/**
 * `PATCH /v1/auth/me` — partial update of the signed-in user's profile.
 *
 * @example
 *   const { mutate, isLoading } = useUpdateProfile({
 *     onSuccess: (user) => router.replace("/profile"),
 *   });
 *   await mutate({ full_name: "Ada Lovelace", city_id: "blr" });
 */
export function useUpdateProfile(
  options?: UseApiMutationOptions<AuthUser, UpdateProfilePayload>,
) {
  const fn = useCallback(
    (payload: UpdateProfilePayload) => updateProfile(payload),
    [],
  );
  return useApiMutation<AuthUser, UpdateProfilePayload>(fn, {
    successToast: "Profile updated successfully.",
    ...options,
  });
}
