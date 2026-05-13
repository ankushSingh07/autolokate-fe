import { BellRing, CarFront, MessageCircle, ScanLine, type LucideIcon } from "lucide-react";

export interface Step {
  Icon: LucideIcon;
  title: string;
  body: string;
  accent: string;
  iconBg: string;
  iconColor: string;
}

export const steps: Step[] = [
  {
    Icon: CarFront,
    title: "Vehicle Owner Setup",
    body: "Install the app, add your vehicle details, and generate your unique QR code in under a minute.",
    accent: "from-primary/30 to-sky-500/20",
    iconBg: "bg-primary/12",
    iconColor: "text-primary",
  },
  {
    Icon: ScanLine,
    title: "Initiating Contact",
    body: "A user scans the QR code or enters the license plate number from the app to reach the owner.",
    accent: "from-primary/30 to-sky-500/20",
    iconBg: "bg-primary/12",
    iconColor: "text-primary",
  },
  {
    Icon: MessageCircle,
    title: "Communication",
    body: "For emergencies, a group chat is initiated. Photos can be shared securely between everyone involved.",
    accent: "from-primary/30 to-sky-500/20",
    iconBg: "bg-primary/12",
    iconColor: "text-primary",
  },
  {
    Icon: BellRing,
    title: "Notification",
    body: "The vehicle owner and added emergency contacts receive an in-app notification instantly.",
    accent: "from-primary/30 to-sky-500/20",
    iconBg: "bg-primary/12",
    iconColor: "text-primary",
  },
];
