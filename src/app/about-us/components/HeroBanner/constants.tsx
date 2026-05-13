import { Car, Phone, ShieldCheck, Users, type LucideIcon } from "lucide-react";

export interface HeroPillar {
  Icon: LucideIcon;
  label: string;
  caption: string;
}

export const heroPillars: HeroPillar[] = [
  { Icon: ShieldCheck, label: "Privacy", caption: "Opt-in by default, always" },
  { Icon: Car, label: "Vehicle", caption: "Records, expenses, history" },
  { Icon: Users, label: "Community", caption: "Trips and trusted circles" },
  { Icon: Phone, label: "Emergency", caption: "Notify the people who matter" },
];

export const ABOUT_HERO_BG = {
  dark: "/images/home_banner_dark.png",
  light: "/images/home_banner_light.png",
};
