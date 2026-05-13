"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { YoutubeIcon } from "@/layouts/Footer/constants";
import { YT_EMBED_URL, YT_THUMBNAIL, YT_VIDEO_URL } from "./constants";

export function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative bg-secondary/40 py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="theme-dark-only absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_15%,rgba(59,130,246,0.10),transparent_55%)]" />
        <div className="theme-light-only absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_25%_18%,rgba(59,130,246,0.06),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-app-soft">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div className="flex flex-col justify-center gap-5 p-7 sm:p-9 lg:p-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Watch Video
              </span>
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-[2rem]">
                How to Connect
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-sky-500 bg-clip-text text-transparent">
                  Autolokate QR
                </span>
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                Step-by-step guide to set up your Autolokate QR and connect instantly.
              </p>

              <div className="pt-1">
                <Button size="lg" asChild>
                  <a href={YT_VIDEO_URL} target="_blank" rel="noopener noreferrer">
                    <YoutubeIcon className="h-4 w-4" aria-hidden />
                    Watch on YouTube
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative isolate min-h-[260px] overflow-hidden bg-zinc-950 sm:min-h-[320px] lg:min-h-[360px]">
              {playing ? (
                <iframe
                  key="yt-iframe"
                  src={YT_EMBED_URL}
                  title="Autolokate QR — How to use"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Play Autolokate QR walkthrough"
                  className="group absolute inset-0 flex items-center justify-center"
                >
                  <Image
                    src={YT_THUMBNAIL}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span
                    className="absolute inset-0 bg-gradient-to-br from-zinc-950/65 via-zinc-950/35 to-zinc-950/55"
                    aria-hidden
                  />
                  <span
                    aria-hidden
                    className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-primary shadow-[0_18px_44px_-14px_rgba(0,0,0,0.6)] ring-4 ring-white/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-white sm:h-24 sm:w-24"
                  >
                    <Play className="ml-1 h-8 w-8 fill-current sm:h-10 sm:w-10" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
