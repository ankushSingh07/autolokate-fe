import { Clock, ShieldCheck, Users, type LucideIcon } from "lucide-react";

export const CONTACT_HERO_BG = {
  dark: "/images/contach_bg_dark.png",
  light: "/images/contact_bg_light.png",
};

export interface HeroStat {
  Icon: LucideIcon;
  label: string;
  value: string;
}

export const heroStats: HeroStat[] = [
  { Icon: Clock, label: "Response Time", value: "Within 24 Hours" },
  { Icon: Users, label: "Community", value: "80K+ Users" },
  { Icon: ShieldCheck, label: "Support", value: "Always Free" },
];
