import { Layers, ListChecks, ShieldCheck } from "lucide-react";
import type { HeroCopy, HeroFeature, TrendingModel } from "./types";

export const HERO_BACKGROUND = {
  dark: "/images/home_banner_dark.png",
  light: "/images/home_banner_light.png",
};

export const HERO_COPY: HeroCopy = {
  eyebrow: "Smart Car Finder",
  headlinePrefix: "Find the right car with",
  headlineHighlight: "confidence.",
  subheading:
    "Compare models, explore variants, and get smart recommendations based on your budget, fuel type, and lifestyle.",
  primaryCta: { label: "Explore Cars", href: "/cars" },
  secondaryCta: { label: "Get Recommendations", href: "/login?next=%2F" },
};

export const HERO_FEATURES: HeroFeature[] = [
  { title: "Live catalogue", body: "Latest models & variants", Icon: Layers },
  { title: "Verified specs", body: "Accurate & up to date", Icon: ShieldCheck },
  { title: "Smart shortlist", body: "Save, compare, decide", Icon: ListChecks },
];

/**
 * Static seed data until a real trending API lands. Brand SVGs from `public/brands`
 * stand in for hero images so the layout reads correctly without remote fetches.
 */
export const TRENDING_MODELS: TrendingModel[] = [
  {
    id: "honda-city",
    href: "/cars/honda-city",
    title: "Honda City",
    subtitle: "Sedan · Petrol",
    imageUrl: "/brands/honda.svg",
    imageAlt: "Honda City",
    priceLabel: "From ₹11.82 L",
  },
  {
    id: "hyundai-creta",
    href: "/cars/hyundai-creta",
    title: "Hyundai Creta",
    subtitle: "SUV · Petrol · Diesel",
    imageUrl: "/brands/hyundai.svg",
    imageAlt: "Hyundai Creta",
    priceLabel: "From ₹11.10 L",
  },
  {
    id: "tata-nexon",
    href: "/cars/tata-nexon",
    title: "Tata Nexon",
    subtitle: "SUV · Petrol · EV",
    imageUrl: "/brands/tata.svg",
    imageAlt: "Tata Nexon",
    priceLabel: "From ₹8.15 L",
  },
];
