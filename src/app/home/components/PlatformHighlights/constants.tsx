import {
  Headphones,
  Layers,
  ListChecks,
  MapPin,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface HighlightItem {
  key: string;
  icon: LucideIcon;
  title: string;
  body: string;
  cta: { href: string; label: string };
}

export const ABOUT_CARD_COPY = {
  eyebrow: "About Autolokate",
  description:
    "Structured data and honest comparisons stay default; optional human help is here when spreadsheets stop being enough — no dealer pressure baked into the UI.",
  primaryCta: { label: "How we work", href: "/about-us" },
  secondaryCta: { label: "Contact", href: "/contact-us" },
} as const;

export const ABOUT_CARD_BACKGROUND = {
  light: "/images/home_footer_light.png",
  dark: "/images/home_footer_dark.png",
} as const;

export const ABOUT_STAT_ICONS = {
  listings: ListChecks,
  brands: ShieldCheck,
  cities: MapPin,
} as const;

export const HIGHLIGHTS_FALLBACK_BODY = {
  ai: "Answer a few smart questions on city, body style, fuel, and budget. We rank real models so your shortlist stays practical and relevant.",
  decision:
    "Compare mileage, features, pricing, and ownership cues side by side so you can evaluate models without endless tab switching.",
  expert:
    "When you narrow it down to a few options, book a short advisor session for practical, unbiased guidance before you decide.",
} as const;

export const HIGHLIGHT_ITEMS: HighlightItem[] = [
  {
    key: "ai",
    icon: Sparkles,
    title: "AI-guided shortlist",
    body: HIGHLIGHTS_FALLBACK_BODY.ai,
    cta: { href: "/#preference-finder-stepper", label: "Use the questionnaire" },
  },
  {
    key: "compare",
    icon: Layers,
    title: "Decision clarity",
    body: HIGHLIGHTS_FALLBACK_BODY.decision,
    cta: { href: "/shop", label: "Browse the catalogue" },
  },
  {
    key: "expert",
    icon: Headphones,
    title: "Expert backup",
    body: HIGHLIGHTS_FALLBACK_BODY.expert,
    cta: { href: "/book-session", label: "Book a session" },
  },
];
