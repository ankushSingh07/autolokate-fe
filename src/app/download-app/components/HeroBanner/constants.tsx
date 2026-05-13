export const DOWNLOAD_HERO_BG = {
  dark: "/images/download_bg_dark.png",
  light: "/images/download_bg_light.png",
};

export const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.mycompany.indiandriveguide";
export const IOS_URL = "https://apps.apple.com/in/app/idg-autolokate/id6733244175";

export function GooglePlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden className={className}>
      <path d="M325.3 234.3 104.3 13.3l219.2 126.6-83.7 94.4 85.5 0z" fill="#34A853" />
      <path
        d="M104.3 13.3a36 36 0 0 0-19 31.2v423a36 36 0 0 0 19 31.2L325.3 277.7l-83.6-94.4-137.4-169.9z"
        fill="#4285F4"
      />
      <path d="M325.3 277.7 104.3 498.7l219.2-126.6 83.7-94.4-81.9 0z" fill="#FBBC05" />
      <path
        d="m407.2 277.7 80.7-46.6c19-11 19-39.1 0-50.1l-80.7-46.6-83.6 94.4 83.6 48.9z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" aria-hidden fill="currentColor" className={className}>
      <path d="M318.7 268.7c-.3-36.7 16.4-64.4 50.2-84.8-18.9-27-47.5-41.9-85.2-44.8-35.7-2.8-74.7 21.1-89 21.1-15.1 0-49.7-20.1-76.8-20.1C70.8 141.6 16 184.3 16 271.5c0 25.8 4.7 52.4 14.1 79.7 12.6 36 56.4 124 102.1 122.5 24-.5 40.9-17 72.2-17 30.4 0 46 17 72.7 17 46.1-.7 85.7-80.6 97.7-116.7-64.4-30.4-56.1-89-56.1-87.3zM254.6 96.3c30.9-36.7 28.1-70.1 27.2-82.1-27.4 1.6-59.1 18.7-77.2 39.7-19.9 22.5-31.6 50.3-29.1 81.5 29.7 2.3 56.8-13 79.1-39.1z" />
    </svg>
  );
}
