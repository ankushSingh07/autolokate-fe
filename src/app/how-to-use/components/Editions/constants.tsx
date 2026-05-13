export interface QrEdition {
  id: "black" | "yellow";
  name: string;
  image: string;
  imageAlt: string;
  badges: string[];
  description: string;
  imageWrap: string;
}

export const qrEditions: QrEdition[] = [
  {
    id: "black",
    name: "Black Edition",
    image: "/images/qr_b.png",
    imageAlt: "Autolokate Black Edition QR sticker",
    badges: ["TWO-WHEELER", "COMPACT"],
    description:
      "Perfectly sized for helmets, visors, or side panels. Discreet yet scannable from a comfortable distance.",
    imageWrap: "bg-zinc-900 ring-1 ring-white/10",
  },
  {
    id: "yellow",
    name: "Yellow Edition",
    image: "/images/qr_c.png",
    imageAlt: "Autolokate Yellow Edition QR sticker",
    badges: ["FOUR-WHEELER", "HIGH-VIS"],
    description:
      "Designed for windshields. Call or message space for police and parking-related requests.",
    imageWrap: "bg-yellow-400 ring-1 ring-yellow-300/40",
  },
];
