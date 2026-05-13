import { Crown, Leaf, Shield, Zap, type LucideIcon } from "lucide-react";

export interface ValueProp {
  Icon: LucideIcon;
  title: string;
  body: string;
}

export const valueProps: ValueProp[] = [
  {
    Icon: Shield,
    title: "Privacy first",
    body: "You choose what scanners see — no public phone number required.",
  },
  {
    Icon: Zap,
    title: "Alerts that matter",
    body: "Parking nudges and time-sensitive messages without exposing your identity.",
  },
  {
    Icon: Leaf,
    title: "Built to last",
    body: "Outdoor-ready materials engineered for heat, rain, and daily wear.",
  },
  {
    Icon: Crown,
    title: "No subscription",
    body: "Pay once for the sticker; the companion app stays free for core safety.",
  },
];
