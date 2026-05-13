import { Check, Clock, ShieldCheck, type LucideIcon } from "lucide-react";

export interface TrustChip {
  icon: LucideIcon;
  label: string;
}

export const TRUST_CHIPS: TrustChip[] = [
  { icon: Clock, label: "15-minute call" },
  { icon: ShieldCheck, label: "Secure checkout" },
  { icon: Check, label: "Advice only" },
];

export const EXPERT_CTA_COPY = {
  eyebrow: "Expert consultation",
  title: "Still deciding? Talk to a car expert",
  body: "Share your shortlist, budget, and city — reviewed by a senior advisor in one structured call. Get honest advice to help you choose with confidence.",
  lockPillLabel: "You'll see the full fee before you pay anything",
  primaryCta: { label: "Book expert session", href: "/book-session" },
  footnote: "One session fee · no obligation until you confirm",
} as const;

/** Theme-aware showroom backdrop images shipped in `public/images/`. */
export const EXPERT_CTA_BACKGROUND = {
  light: "/images/home_session_light.png",
  dark: "/images/home_session_dark.png",
} as const;
