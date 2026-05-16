"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useIsAuthenticated } from "@/hooks/auth";
import { useVehiclePreference } from "@/hooks/preferences";
import { DEFAULT_VEHICLE_CATEGORY } from "@/lib/preferences";
import { getHeaderNavigationItems } from "@/navigation";
import { AvatarMenu } from "./AvatarMenu";
import {
  CloseIcon,
  Logo,
  defaultHeaderNavItems,
  headerLoginCta,
  headerSearchPrompt,
  type HeaderNavItem,
} from "./constants";

export type HeaderVariant = "default" | "premium";

interface HeaderProps {
  /**
   * `default` — glass background with bottom border (recommended for most pages).
   * `premium` — transparent at the top of the page, fades into glass on scroll.
   *             Use over hero imagery (e.g. landing page).
   */
  variant?: HeaderVariant;
  className?: string;
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function resolveNavItems(): HeaderNavItem[] {
  const fromConfig = getHeaderNavigationItems();
  if (fromConfig.length > 0) {
    return fromConfig.map((item) => ({
      label: item.label,
      href: item.href,
      external: item.external,
    }));
  }
  return defaultHeaderNavItems;
}

/** Pill-shaped "search trigger" — mirrors Autolokate's center SmartSearchBar visually. */
function SearchTrigger({ className }: { className?: string }) {
  return (
    <Link
      href={headerSearchPrompt.href}
      className={cn(
        "flex h-10 w-full max-w-2xl items-center gap-2 rounded-full border border-border/80 bg-card/90 pl-4 pr-3 text-left text-sm text-muted-foreground shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-foreground/15 hover:bg-card",
        className,
      )}
    >
      <Search className="h-4 w-4 shrink-0" />
      <span className="truncate">{headerSearchPrompt.placeholder}</span>
    </Link>
  );
}

export function Header({ variant = "default", className }: HeaderProps) {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const [compactSearchOpen, setCompactSearchOpen] = useState(false);
  const vehiclePreference = useVehiclePreference();
  const navItems = useMemo(() => {
    const raw = resolveNavItems();
    const pref = vehiclePreference.value ?? DEFAULT_VEHICLE_CATEGORY;
    return raw.map((item) =>
      item.useVehicleCompareHref ? { ...item, href: `/${pref}/compare` } : item,
    );
  }, [vehiclePreference.value]);
  const isPremium = variant === "premium";
  // `null` while the auth state is still hydrating — render a placeholder to
  // reserve space and avoid a "Log in" → avatar flash on first paint.
  const authed = useIsAuthenticated();

  useEffect(() => {
    setOpen(false);
    setCompactSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors",
        isPremium && !scrolled
          ? "bg-transparent"
          : "border-b border-border/70 bg-background/80 shadow-[0_8px_32px_-12px_rgba(24,24,27,0.08)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/72",
        className,
      )}
    >
      <div className="mx-auto flex min-h-14 max-w-7xl items-center gap-3 px-5 py-3.5 sm:min-h-16 sm:gap-4 sm:px-8 sm:py-4 lg:px-10">
        <Link
          href="/"
          aria-label="Autolokate home"
          className="flex shrink-0 items-center rounded-lg text-foreground outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Logo className="h-8 w-auto sm:h-9" priority />
        </Link>

        <div className="hidden min-w-0 flex-1 justify-center px-4 lg:flex">
          <SearchTrigger />
        </div>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 xl:flex"
        >
          {navItems.map((item) => {
            const compareNav = item.useVehicleCompareHref === true;
            const active =
              pathname === item.href ||
              (!compareNav && item.href !== "/" && pathname?.startsWith(`${item.href}/`)) ||
              (compareNav &&
                (pathname === "/cars/compare" || pathname === "/bikes/compare"));
            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer noopener" : undefined}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground",
                  active && "bg-primary/15 text-primary shadow-sm",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex min-h-10 items-center gap-1.5 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 shrink-0 rounded-lg sm:h-10 sm:w-10 lg:hidden"
            aria-label="Search"
            aria-expanded={compactSearchOpen}
            aria-controls="header-compact-search"
            onClick={() => setCompactSearchOpen((v) => !v)}
          >
            <Search className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          {authed === null ? (
            // Hydration placeholder — matches the avatar/button footprint so
            // the layout doesn't jump once the auth state resolves.
            <div
              aria-hidden
              className="h-9 w-9 shrink-0 rounded-full bg-muted/40 sm:h-10 sm:w-10"
            />
          ) : authed ? (
            <AvatarMenu />
          ) : (
            <Button
              asChild
              size="sm"
              className="h-8 shrink-0 px-3.5 text-xs font-semibold sm:h-9 sm:px-4 sm:text-sm"
            >
              <Link href={headerLoginCta.href}>{headerLoginCta.label}</Link>
            </Button>
          )}
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border/90 bg-card text-muted-foreground shadow-sm transition hover:border-foreground/15 hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-10 sm:w-10 xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="header-mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {compactSearchOpen ? (
        <div
          id="header-compact-search"
          className="border-t border-border/70 bg-background/95 px-5 py-4 backdrop-blur-md sm:px-8 lg:hidden"
        >
          <SearchTrigger className="bg-card" />
        </div>
      ) : null}

      {open ? (
        <div
          id="header-mobile-menu"
          className="border-t border-border/70 bg-background/95 px-5 py-4 backdrop-blur-md sm:px-8 xl:hidden"
        >
          <div className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const compareNav = item.useVehicleCompareHref === true;
              const active =
                pathname === item.href ||
                (!compareNav && item.href !== "/" && pathname?.startsWith(`${item.href}/`)) ||
                (compareNav &&
                  (pathname === "/cars/compare" || pathname === "/bikes/compare"));
              return (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer noopener" : undefined}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "touch-target rounded-xl px-4 py-3 text-sm font-medium text-foreground/85 transition hover:bg-foreground/5 hover:text-foreground",
                    active && "bg-primary/15 text-primary",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}

/** Glassy/transparent variant used over hero imagery. */
export function PremiumHeader(props: Omit<HeaderProps, "variant">) {
  return <Header {...props} variant="premium" />;
}
