"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EMAIL_REGEX, ROLES, SUBJECTS } from "./constants";

const FIELD =
  "h-12 w-full rounded-xl border border-border/80 bg-background px-4 text-base text-foreground shadow-inner outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setName("");
    setEmail("");
    setRole("");
    setSubject("");
    setMessage("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const n = name.trim();
    const em = email.trim();
    const m = message.trim();

    if (n.length < 2) return setError("Please enter your full name.");
    if (!EMAIL_REGEX.test(em)) return setError("Please enter a valid email address.");
    if (!role) return setError("Please select who you are.");
    if (!subject) return setError("Please pick a subject for your message.");
    if (m.length < 10) return setError("Please share a bit more (at least 10 characters).");

    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      setSuccess(true);
      reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-auth-card text-card-foreground">
      <div>
        <h2 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-[1.4rem]">
          Get in touch
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us how we can help. We&apos;ll get back to you shortly.
        </p>
      </div>

      {success ? (
        <div className="mt-7 flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-5">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              Thanks for reaching out! We&apos;ll get back to you shortly.
            </p>
            <p className="text-[12.5px] leading-relaxed text-muted-foreground">
              Heads up: this form isn&apos;t connected yet — we logged your interest in preview
              mode.
            </p>
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-1 text-[12.5px] font-semibold text-primary underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </div>
        </div>
      ) : (
        <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                Your Name <span className="text-primary">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={FIELD}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="john@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={FIELD}
                required
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-role" className="text-sm font-medium text-foreground">
                I am a <span className="text-primary">*</span>
              </label>
              <select
                id="contact-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={cn(FIELD, "appearance-none pr-10")}
                required
              >
                <option value="">Select an option</option>
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-subject" className="text-sm font-medium text-foreground">
                Subject <span className="text-primary">*</span>
              </label>
              <select
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={cn(FIELD, "appearance-none pr-10")}
                required
              >
                <option value="">Select a subject</option>
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
              Your Message <span className="text-primary">*</span>
            </label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="How can we help you today?"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
              className="min-h-[140px] w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground shadow-inner outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          {error ? (
            <p className="text-[12.5px] font-medium text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          <Button type="submit" size="lg" disabled={submitting} className="w-full">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                <span>Sending message…</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="h-4 w-4" aria-hidden />
              </>
            )}
          </Button>

          <p className="text-center text-[11.5px] leading-relaxed text-muted-foreground">
            By sending this message, you agree to our{" "}
            <Link
              href="/privacy"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );
}
