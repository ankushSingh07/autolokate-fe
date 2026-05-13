import type { ComponentType, SVGProps } from "react";

/** Minimal brand marks — keep stroke consistent with lucide sizing. */
export function YoutubeIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58Z" />
      <path d="m9.75 15.02 5.5-3.02-5.5-3.02v6.04Z" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M13.5 9H15V6.5c0-.3 0-1 .1-1.4.2-1.5 1.1-2.9 2.4-3.6 1-.6 2.2-.8 3.5-.8V0h-2.2c-2.4 0-4.6 1-5.9 2.9-.7 1-1 2.1-1 3.5V9h-3v4h3v11h4V13h3.1l.2-4h-3.4V7.2c0-.5 0-1 .2-1.4.3-.8 1-1.2 2-1.2.1 0 .8 0 1.5.1V9z" />
    </svg>
  );
}

export function InstagramIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.4 3.4 0 0 0 4 7.4v9.2A3.4 3.4 0 0 0 7.4 20h9.2a3.4 3.4 0 0 0 3.4-3.4V7.4A3.4 3.4 0 0 0 16.6 4H7.6m9.9 1.4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkSection {
  title: string;
  links: FooterLink[];
}

export const footerLinks: FooterLinkSection[] = [
  {
    title: "Platform",
    links: [
      { id: "about", label: "About Us", href: "/about-us" },
      { id: "shop", label: "Shop", href: "/shop" },
      { id: "how-to-use", label: "How to Use", href: "/how-to-use" },
      { id: "download", label: "Download App", href: "/download-app" },
    ],
  },
  {
    title: "Support",
    links: [
      { id: "contact", label: "Contact Us", href: "/contact-us" },
      { id: "try-demo", label: "Try Demo", href: "/" },
      { id: "shipping", label: "Shipping Policy", href: "/shipping-policy" },
      { id: "refunds", label: "Returns & Refunds", href: "/refund-policy" },
    ],
  },
  {
    title: "Legal",
    links: [
      { id: "privacy", label: "Privacy Policy", href: "/privacy" },
      { id: "terms", label: "Terms of Service", href: "/terms" },
      { id: "terms-conditions", label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export interface SocialLink {
  id: "instagram" | "youtube" | "facebook";
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: InstagramIcon,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@IndianDriveGuide",
    Icon: YoutubeIcon,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/",
    Icon: FacebookIcon,
  },
];

export const footerBrand = {
  name: "Autolokate",
  legalName: "Autolokate Software Private Limited",
  tagline:
    "India's premier vehicle management platform. Connect, manage, and protect your vehicles with smart QR technology.",
};

/** Background imagery (light/dark) lives under /public/images. */
export const footerBackground = {
  dark: "/images/footer_bg_dark.png",
  light: "/images/footer_bg_light.png",
};
