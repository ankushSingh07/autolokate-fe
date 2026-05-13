/** Normalised brand row used by the home + listing pages. */
export interface CatalogueBrand {
  id?: string;
  name: string;
  brand_name: string;
  slug: string;
  brand_slug: string;
  logo_url?: string | null;
  vehicle_category?: string | null;
  [key: string]: unknown;
}

/** Normalised model row from `/v1/catalogue/models` / `/v1/catalogue/trending`. */
export interface CatalogueModel {
  id?: string;
  slug: string;
  name: string;
  model_name: string;
  model_slug: string;
  brand_name?: string;
  brand_slug?: string;
  fuel_type?: string;
  fuel_types: string[];
  starting_price?: number | null;
  min_price?: number | null;
  max_price?: number | null;
  hero_image_url?: string | null;
  body_type?: string | null;
  [key: string]: unknown;
}
