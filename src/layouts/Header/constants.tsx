import Image from "next/image";
import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Tailwind sizing applied to BOTH theme variants — e.g. `h-8 w-auto sm:h-9`. */
  className?: string;
  /** Hint Next/Image to load immediately (use for above-the-fold logos). */
  priority?: boolean;
}

/**
 * Brand mark — two themed PNGs from autolokate.com.
 * Both <Image> elements always mount; CSS (`theme-dark-only` / `theme-light-only`,
 * defined in globals.css) hides the one that doesn't match the current theme.
 * This avoids any hydration mismatch on theme toggle.
 */
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <>
      <Image
        src="https://autolokate.com/autolokate_dark.png"
        alt="Autolokate"
        width={140}
        height={36}
        priority={priority}
        className={cn("theme-dark-only h-8 w-auto sm:h-9", className)}
      />
      <Image
        src="https://autolokate.com/autolokate_light.png"
        alt="Autolokate"
        width={140}
        height={36}
        priority={priority}
        className={cn("theme-light-only h-8 w-auto sm:h-9", className)}
      />
    </>
  );
}

export function HamburgerIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function CloseIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export function SearchIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="20" y1="20" x2="16.65" y2="16.65" />
    </svg>
  );
}

/**
 * Fallback nav items rendered when `navigationConfig` is empty.
 * Once you populate `src/navigation/config.ts`, the header will use that instead.
 */
export interface HeaderNavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const defaultHeaderNavItems: HeaderNavItem[] = [
  { label: "Dealers", href: "/companies" },
  { label: "Media", href: "/media" },
  { label: "Stories", href: "/blog" },
];

/** Primary auth CTA shown on the right of the header. */
export const headerLoginCta = {
  label: "Log in",
  href: "/auth/login",
};

/** Center search trigger (acts as a SmartSearchBar placeholder until a real one is wired). */
export const headerSearchPrompt = {
  placeholder: "Search models, brands, cities…",
  href: "/search",
};
