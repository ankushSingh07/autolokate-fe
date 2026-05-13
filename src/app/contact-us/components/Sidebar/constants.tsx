import type { ComponentType, SVGProps } from "react";
import { Mail, MapPin, type LucideIcon } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/layouts/Footer/constants";

/** Inline WhatsApp glyph — lucide doesn't ship one. Sized via parent. */
export function WhatsAppIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M19.05 4.91A10 10 0 0 0 3.04 17.4L2 22l4.72-1.04A10 10 0 1 0 19.05 4.91Zm-7.06 15.41h-.01a8.32 8.32 0 0 1-4.24-1.16l-.3-.18-2.8.62.62-2.73-.2-.31a8.34 8.34 0 1 1 6.93 3.76Zm4.57-6.24c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24a7.65 7.65 0 0 1-1.41-1.76c-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.13-.15.17-.25.25-.42.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.87-.2-.5-.41-.43-.57-.43h-.49a.94.94 0 0 0-.68.32c-.23.25-.89.87-.89 2.12s.91 2.46 1.04 2.62c.13.17 1.79 2.74 4.34 3.84.61.26 1.08.42 1.45.54.61.19 1.16.16 1.6.1.49-.07 1.48-.6 1.69-1.18.21-.59.21-1.09.15-1.19-.06-.11-.23-.17-.49-.3Z" />
    </svg>
  );
}

type IconLike = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

export interface ContactCard {
  key: string;
  Icon: IconLike;
  iconBg: string;
  iconColor: string;
  label: string;
  primary: string;
  secondary?: string;
  href?: string;
}

export const contactCards: ContactCard[] = [
  {
    key: "email",
    Icon: Mail,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-500",
    label: "Email Us",
    primary: "contact@autolokate.com",
    href: "mailto:contact@autolokate.com",
  },
  {
    key: "whatsapp",
    Icon: WhatsAppIcon,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-500",
    label: "WhatsApp Support",
    primary: "+91 906 252 4516",
    href: "https://wa.me/919062524516",
  },
  {
    key: "office",
    Icon: MapPin,
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-500",
    label: "Office Location",
    primary: "E 90 / 91 Chanakya Place",
    secondary: "Delhi · 110059",
  },
];

export interface SocialItem {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  hoverColor: string;
}

export const socials: SocialItem[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: InstagramIcon,
    hoverColor: "hover:text-pink-500",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@IndianDriveGuide",
    Icon: YoutubeIcon,
    hoverColor: "hover:text-red-500",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    Icon: FacebookIcon,
    hoverColor: "hover:text-sky-600",
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "How do I reset my password?",
    a: "We sign you in with a one-time OTP sent to your phone — no password to remember. If you can't access your number anymore, email contact@autolokate.com from your registered email and we'll help you regain access.",
  },
  {
    q: "Can I use Autolokate offline?",
    a: "Most management features need a connection to sync, but vehicle records and saved emergency contacts remain readable offline once cached on your device.",
  },
  {
    q: "How do I get a QR code for my vehicle?",
    a: "QR is fully optional. You can generate a free digital QR from your dashboard, or order a premium weather-resistant plate. Either works the same way — what's shown on scan is entirely controlled by you.",
  },
  {
    q: "Is my personal data safe?",
    a: "Yes. We follow privacy-first principles: data is encrypted at rest and in transit, sharing is opt-in per feature, and you can delete your data from your account at any time.",
  },
];
