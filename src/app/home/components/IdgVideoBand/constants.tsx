import { IDG_FEATURE_COPY, IDG_HOME_VIDEOS, INDIAN_DRIVE_GUIDE_CHANNEL_URL } from "@/lib/idg";

export const IDG_VIDEO_BAND_COPY = {
  fullTitle: IDG_FEATURE_COPY.title,
  headlinePrefix: "Indian Drive Guide",
  /** The word painted in primary blue. */
  headlineEm: "real-world",
  headlineSuffix: "driving in India",
  paragraphs: [
    "Walkthroughs, road-safety explainers, maintenance checks, and everyday driving judgement — filmed for Indian roads and traffic.",
    "Every video on the official Indian Drive Guide channel helps you get practical context before you shortlist or book a test drive.",
  ] as const,
  eyebrow: "Indian Drive Guide · video",
  primaryCta: {
    label: "Subscribe on YouTube",
    href: INDIAN_DRIVE_GUIDE_CHANNEL_URL,
  },
  secondaryCta: {
    label: "Media hub",
    href: "/media",
  },
  /** Bottom overlay pill on the framed player. */
  overlay: {
    label: "Latest driving guide",
    duration: "12:48",
  },
  videoId: IDG_HOME_VIDEOS.driveGuideFeature,
} as const;
