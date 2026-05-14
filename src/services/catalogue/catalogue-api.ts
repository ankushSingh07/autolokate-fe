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

/**
 * GET /v1/catalogue/brands/{slug} — single brand envelope for brand hub UX.
 */
export async function getBrandDetails(brandSlug: string): Promise<CatalogueBrand | null> {
  const trimmed = brandSlug.trim();
  if (!trimmed) return null;
  try {
    const res = await ApiService.get<unknown>(
      endpoints.catalogue.brandBySlug(trimmed),
      { withAuth: false },
    );
    const payload = unbox(res.data);
    if (!payload) return null;
    return normalizeBrand(payload);
  } catch {
    return null;
  }
}

/**
 * GET /v1/catalogue/brands/{slug}/models — model line-up for a brand catalogue page.
 */
export async function getBrandModels(brandSlug: string): Promise<CatalogueModel[]> {
  const trimmed = brandSlug.trim();
  if (!trimmed) return [];

  const res = await ApiService.get<unknown>(endpoints.catalogue.brandModels(trimmed), {
    withAuth: false,
  });
  const rows = readArray<unknown>(unbox(res.data));
  return rows.map((raw) => {
    const row = normalizeModel(raw);
    if (!row.brand_slug?.trim()) {
      return { ...row, brand_slug: trimmed };
    }
    return row;
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

function readModelsEnvelopeCursor(payload: unknown): string | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
  const meta = (payload as Record<string, unknown>).meta;
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) return null;
  const c = (meta as Record<string, unknown>).next_cursor;
  return typeof c === "string" && c.trim() ? c.trim() : null;
}

export type CatalogueModelsPageResult = {
  models: CatalogueModel[];
  nextCursor: string | null;
};

/**
 * GET /v1/catalogue/models — cursor-paginated index (`meta.next_cursor`).
 * Preserves the full JSON envelope so pagination metadata is not lost (unlike {@link getModels}).
 */
export async function getCatalogueModelsPage(opts: {
  cursor?: string | null;
} = {}): Promise<CatalogueModelsPageResult> {
  const params: Record<string, string> = {};
  if (opts.cursor) params.cursor = opts.cursor;
  const res = await ApiService.get<unknown>(endpoints.catalogue.models, {
    params: Object.keys(params).length ? params : undefined,
    withAuth: false,
  });
  const envelope = res.data;
  let rowsPayload: unknown = envelope;
  if (envelope && typeof envelope === "object" && !Array.isArray(envelope)) {
    const inner = (envelope as Record<string, unknown>).data;
    if (inner !== undefined) rowsPayload = inner;
  }
  const rows = readArray<unknown>(rowsPayload);
  return {
    models: rows.map(normalizeModel),
    nextCursor: readModelsEnvelopeCursor(envelope),
  };
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
