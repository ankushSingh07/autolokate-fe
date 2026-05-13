import { FileText, QrCode, Users, type LucideIcon } from "lucide-react";

export interface FeatureCard {
  Icon: LucideIcon;
  title: string;
  body: string;
  badges: string[];
  iconBg: string;
  iconColor: string;
  glow: string;
}

export const featureCards: FeatureCard[] = [
  {
    Icon: FileText,
    title: "Digital Garage",
    body: "Never miss a renewal. Digitize RC, Insurance, and PUC. Get timely alerts for expiry and service due dates.",
    badges: ["EXPIRY REMINDERS", "SERVICE HISTORY", "EXPENSE LOG"],
    iconBg: "bg-blue-500/12",
    iconColor: "text-blue-500",
    glow: "from-blue-500/30 to-sky-500/20",
  },
  {
    Icon: QrCode,
    title: "Autolokate QR",
    body: "Stop displaying your phone number on the dashboard. Use our Autolokate QR Stickers for private parking contact.",
    badges: ["NUMBER HIDDEN", "SCAN TO CHAT", "CALL MASKING"],
    iconBg: "bg-primary/12",
    iconColor: "text-primary",
    glow: "from-primary/30 to-sky-500/20",
  },
  {
    Icon: Users,
    title: "Expert Community",
    body: "Stuck with a car problem? Ask our community of 2M+ owners and mechanics for instant, verified solutions.",
    badges: ["MECHANIC ANSWERS", "DIY GUIDES", "OWNER REVIEWS"],
    iconBg: "bg-primary/12",
    iconColor: "text-primary",
    glow: "from-primary/30 to-sky-500/20",
  },
];
