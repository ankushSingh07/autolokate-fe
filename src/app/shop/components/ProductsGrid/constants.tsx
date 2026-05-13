export interface PriceTier {
  id: string;
  label: string;
  price: number;
  mrp: number;
}

export interface ShopProduct {
  key: "bike" | "car";
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  ringClass: string;
  badges: string[];
  highlightBadge?: string;
  tiers: PriceTier[];
  bullets: string[];
}

export const products: ShopProduct[] = [
  {
    key: "bike",
    title: "QR Code for Bike",
    description:
      "Sized for two-wheelers: weatherproof vinyl, crisp scan contrast, and a finish that holds up on daily commutes.",
    image: "/images/qr_b.png",
    imageAlt: "Autolokate QR sticker for two-wheelers",
    ringClass: "bg-zinc-900 ring-2 ring-white/15",
    badges: ["TWO-WHEELER"],
    highlightBadge: "POPULAR",
    tiers: [
      { id: "single", label: "Single", price: 299, mrp: 1199 },
      { id: "double", label: "Double", price: 549, mrp: 2198 },
      { id: "triple", label: "Triple", price: 799, mrp: 3297 },
    ],
    bullets: [
      "Compact 2×4 inch design",
      "UV-protected coating",
      "Strong adhesive for curved panels",
      "Works with the free app",
    ],
  },
  {
    key: "car",
    title: "QR Code for Car",
    description:
      "Larger format for four-wheelers: high-visibility yellow field, premium lamination, and a confident windshield presence.",
    image: "/images/qr_c.png",
    imageAlt: "Autolokate QR sticker for cars",
    ringClass: "bg-yellow-400 ring-2 ring-yellow-300/50",
    badges: ["FOUR-WHEELER"],
    highlightBadge: "PREMIUM",
    tiers: [
      { id: "single", label: "Single", price: 499, mrp: 1999 },
      { id: "double", label: "Double", price: 899, mrp: 3998 },
      { id: "triple", label: "Triple", price: 1299, mrp: 5997 },
    ],
    bullets: [
      "High-contrast yellow plate",
      "Scratch-resistant lamination",
      "Tuned for windshields & glass",
      "Private scan-to-chat flow",
    ],
  },
];
