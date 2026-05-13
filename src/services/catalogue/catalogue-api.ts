"use client";

import { endpoints } from "@/lib/api/endpoints";
import { dedupedRequest } from "@/lib/api/dedupe-cache";
import { ApiService } from "@/services/api.service";
import {
  normalizeBrand,
  normalizeModel,
  readArray,
  unbox,
} from "@/lib/catalogue/normalize";
import type { CatalogueBrand, CatalogueModel } from "@/lib/catalogue/types";

/** Shared cache window for "stable" catalogue reads (brands, trending, etc.). */
const CATALOGUE_TTL_MS = 5 * 60_000;

/**
 * GET /v1/catalogue/brands — list every brand the catalogue knows about.
 * Used by the marketplace stats card and the brand grid. The response is
 * deduped + cached for 5 minutes so multiple components reading marketplace
 * stats only trigger one network call per page lifetime.
 */
export async function getBrands(): Promise<CatalogueBrand[]> {
  return dedupedRequest("catalogue:brands", CATALOGUE_TTL_MS, async () => {
    const res = await ApiService.get<unknown>(endpoints.catalogue.brands, {
      withAuth: false,
    });
    const rows = readArray<unknown>(unbox(res.data));
    return rows.map(normalizeBrand);
  });
}

/** GET /v1/catalogue/trending — top picks for the hero trending rail. */
export async function getTrendingModels(): Promise<CatalogueModel[]> {
  return dedupedRequest("catalogue:trending", CATALOGUE_TTL_MS, async () => {
    const res = await ApiService.get<unknown>(endpoints.catalogue.trending, {
      withAuth: false,
    });
    const rows = readArray<unknown>(unbox(res.data));
    return rows.map(normalizeModel);
  });
}

/** GET /v1/catalogue/models — supports optional filter params. */
export async function getModels(
  params?: Record<string, string>,
): Promise<CatalogueModel[]> {
  const res = await ApiService.get<unknown>(endpoints.catalogue.models, {
    params,
    withAuth: false,
  });
  const rows = readArray<unknown>(unbox(res.data));
  return rows.map(normalizeModel);
}

/** GET /v1/catalogue/search?q=… — combined results across models/brands/variants. */
export async function searchCatalogue(query: string): Promise<CatalogueModel[]> {
  const res = await ApiService.get<unknown>(endpoints.catalogue.search, {
    params: { q: query },
    withAuth: false,
  });
  const payload = unbox(res.data);
  if (Array.isArray(payload)) return payload.map(normalizeModel);
  if (payload && typeof payload === "object") {
    const p = payload as Record<string, unknown>;
    return readArray<unknown>(p.models).map(normalizeModel);
  }
  return [];
}
