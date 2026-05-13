import { ShieldCheck, Sparkles, Users, type LucideIcon } from "lucide-react";

export const HOWTO_HERO_BG = {
  dark: "/images/contach_bg_dark.png",
  light: "/images/contact_bg_light.png",
};

export interface HeroStat {
  Icon: LucideIcon;
  label: string;
  value: string;
}

export const heroStats: HeroStat[] = [
  { Icon: Sparkles, label: "Quick Setup", value: "2 Minutes" },
  { Icon: ShieldCheck, label: "Secure & Private", value: "100% Safe" },
  { Icon: Users, label: "Community", value: "You're not alone" },
];
