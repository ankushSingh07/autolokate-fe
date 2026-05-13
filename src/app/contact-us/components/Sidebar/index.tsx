import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { contactCards, faqs, socials } from "./constants";

export function Sidebar() {
  return (
    <div className="flex flex-col gap-5">
      {/* Contact Information */}
      <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-app-soft sm:p-7">
        <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
          Contact Information
        </h3>

        <ul className="mt-5 space-y-5">
          {contactCards.map(({ key, Icon, iconBg, iconColor, label, primary, secondary, href }) => (
            <li key={key} className="flex items-start gap-3.5">
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                  iconBg,
                  iconColor,
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-0.5 block truncate text-[14px] font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {primary}
                  </a>
                ) : (
                  <p className="mt-0.5 text-[14px] font-semibold text-foreground">{primary}</p>
                )}
                {secondary ? (
                  <p className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">
                    {secondary}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-border/60 pt-5">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Follow Us
          </p>
          <div className="mt-3 flex items-center gap-2">
            {socials.map(({ label, href, Icon, hoverColor }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-background text-muted-foreground transition-all",
                  "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
                  hoverColor,
                )}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Common Questions */}
      <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-app-soft sm:p-7">
        <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
          Common Questions
        </h3>

        <div className="mt-3">
          {faqs.map((item, i) => (
            <details
              key={item.q}
              className={cn(
                "group border-b border-border/70 py-3.5 [&[open]>summary>svg]:rotate-180",
                i === faqs.length - 1 && "border-b-0",
              )}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[13.5px] font-semibold text-foreground">
                <span>{item.q}</span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                  aria-hidden
                />
              </summary>
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-4 border-t border-border/60 pt-4 text-center">
          <Link
            href="/about-us#offers"
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary transition-colors hover:underline"
          >
            View all How-To Guides
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
