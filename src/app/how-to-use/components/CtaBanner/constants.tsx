import {
  CheckCircle2,
  Infinity as InfinityIcon,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export interface CtaPerk {
  Icon: LucideIcon;
  label: string;
}

export const ctaPerks: CtaPerk[] = [
  { Icon: Wallet, label: "Free App Logic" },
  { Icon: InfinityIcon, label: "Lifetime Validity" },
  { Icon: ShieldCheck, label: "No Subscription" },
];

export type { CheckCircle2 };
