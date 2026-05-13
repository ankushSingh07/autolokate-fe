import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/layouts/Header/constants";
import styles from "./footer.module.css";
import {
  footerBackground,
  footerBrand,
  footerLinks,
  socialLinks,
} from "./constants";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        styles.footer,
        "relative isolate z-[1] overflow-hidden",
        className,
      )}
    >
      <div className={styles.bgWrap} aria-hidden="true">
        <Image
          src={footerBackground.light}
          alt=""
          fill
          sizes="100vw"
          className={cn(styles.bgImage, "theme-light-only opacity-100")}
        />
        <Image
          src={footerBackground.dark}
          alt=""
          fill
          sizes="100vw"
          className={cn(styles.bgImage, "theme-dark-only opacity-100")}
        />
        <div className={styles.bgFade} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-3 sm:px-6 sm:pt-16 sm:pb-4">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 lg:gap-y-12">
          <div className="min-w-0 lg:col-span-5">
            <Link
              href="/"
              aria-label={`${footerBrand.name} home`}
              className="inline-flex items-center text-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Logo className="h-7 w-auto sm:h-8" />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
              {footerBrand.tagline}
            </p>
            <ul
              aria-label="Social links"
              className="mt-6 flex flex-wrap gap-2.5"
            >
              {socialLinks.map(({ id, label, href, Icon }) => (
                <li key={id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={styles.socialIcon}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid min-w-0 gap-10 sm:grid-cols-3 lg:col-span-7 lg:gap-8 lg:pl-4">
            {footerLinks.map((section) => (
              <div key={section.title} className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-foreground sm:text-xs">
                  {section.title}
                </p>
                <ul className="mt-4 space-y-0.5">
                  {section.links.map((item) => (
                    <li key={`${section.title}-${item.id}`}>
                      <Link
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={
                          item.external ? "noreferrer noopener" : undefined
                        }
                        className="-mx-1 inline-flex flex-wrap items-center gap-2 rounded-md px-1 py-2 text-sm text-muted-foreground transition hover:bg-secondary/60 hover:text-foreground sm:py-1.5"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-4 pb-0 sm:mt-12 sm:pt-5">
          <div className="flex flex-col items-center justify-between gap-2.5 text-center text-xs leading-snug text-muted-foreground sm:flex-row sm:gap-3 sm:text-left sm:text-sm">
            <p className="shrink-0">
              © {year} {footerBrand.legalName}.
            </p>
            <p className="shrink-0">
              Made with <span aria-hidden>❤️</span> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
