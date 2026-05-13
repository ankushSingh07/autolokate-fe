import {
  CheckCircle2,
  Infinity as InfinityIcon,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export interface QrEdition {
  id: "two-wheeler" | "four-wheeler";
  label: string;
  image: string;
  imageAlt: string;
  imageWrap: string;
}

export const qrEditions: QrEdition[] = [
  {
    id: "two-wheeler",
    label: "TWO WHEELER",
    image: "/images/qr_b.png",
    imageAlt: "Autolokate QR sticker for two-wheelers",
    imageWrap: "bg-zinc-900 ring-1 ring-white/10",
  },
  {
    id: "four-wheeler",
    label: "FOUR WHEELER",
    image: "/images/qr_c.png",
    imageAlt: "Autolokate QR sticker for four-wheelers",
    imageWrap: "bg-yellow-400 ring-1 ring-yellow-300/40",
  },
];

export interface CtaPerk {
  Icon: LucideIcon;
  label: string;
}

export const ctaPerks: CtaPerk[] = [
  { Icon: Wallet, label: "Free Core App" },
  { Icon: InfinityIcon, label: "Lifetime Validity" },
  { Icon: ShieldCheck, label: "Privacy First" },
];

// Re-exported for type stability if other files want it.
export type { CheckCircle2 };
