"use client";

import { useMemo } from "react";
import { normalizeAdvisorResultsToMatches, advisorResultsMeta } from "@/lib/advisor/normalize";
import { usePreferenceFinder } from "./usePreferenceFinder";

/**
 * Derived selector: normalised match-cards + meta (total + AI summary).
 * Read this in the AI-matched results section instead of touching the raw
 * `advisorResults` payload directly.
 */
export function useAdvisorMatches() {
  const { advisorResults, completed } = usePreferenceFinder();
  return useMemo(() => {
    const matches = normalizeAdvisorResultsToMatches(advisorResults);
    const meta = advisorResultsMeta(advisorResults);
    return { matches, meta, completed };
  }, [advisorResults, completed]);
}
