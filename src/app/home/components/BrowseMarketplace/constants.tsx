import { Scale, Search, Sparkles, type LucideIcon } from "lucide-react";

export type MarketplaceCardId = "brand" | "compare" | "explore";

export interface MarketplaceCard {
  id: MarketplaceCardId;
  /** Primary icon shown in the top-left tile. */
  icon: LucideIcon;
  title: string;
  body: string;
  cta: { label: string; href: string };
}

/** Three large explainer cards laid out in a single row on `lg`. */
export const MARKETPLACE_CARDS: MarketplaceCard[] = [
  {
    id: "brand",
    icon: Search,
    title: "Search by brand",
    body: "Open the brand directory and browse every model line.",
    cta: { label: "Open Brand", href: "/shop" },
  },
  {
    id: "compare",
    icon: Scale,
    title: "Start compare",
    body: "Pick two or three cars and compare specs, price, and features.",
    cta: { label: "Start Compare", href: "/shop" },
  },
  {
    id: "explore",
    icon: Sparkles,
    title: "Start exploring",
    body: "Launch an AI-based stepper form that builds your shortlist for you.",
    cta: { label: "Start Exploring", href: "" },
  },
];

export interface MarketplaceStat {
  id: "brands" | "listings" | "cities";
  label: string;
}

export const MARKETPLACE_STATS: MarketplaceStat[] = [
  { id: "brands", label: "Brands" },
  { id: "listings", label: "Listings" },
  { id: "cities", label: "Cities" },
];

export const MARKETPLACE_COPY = {
  eyebrow: "Browse the marketplace",
  title: "Find your next car, your way.",
  description:
    "Choose how you want to explore — browse brands, compare cars side by side, or start an AI-guided discovery flow.",
  /** Where to send unauthenticated users when they click "Start Exploring". */
  loginHref: "/auth/login",
} as const;

/** Theme-aware showroom backdrop. Shipped in `public/images/`. */
export const MARKETPLACE_BACKGROUND = {
  light: "/images/home_marketplace_bg_light.png",
  dark: "/images/home_marketplace_bg_dark.png",
} as const;
