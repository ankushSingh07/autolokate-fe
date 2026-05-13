import { Package, Shield, Truck, Zap, type LucideIcon } from "lucide-react";

export const SHOP_HERO_BG = {
  dark: "/images/download_bg_dark.png",
  light: "/images/download_bg_light.png",
};

export interface HeroPerk {
  Icon: LucideIcon;
  label: string;
}

export const heroPerks: HeroPerk[] = [
  { Icon: Zap, label: "Instant alert system" },
  { Icon: Shield, label: "Privacy protected" },
  { Icon: Package, label: "No phone number on display" },
  { Icon: Truck, label: "Tracked delivery" },
];
