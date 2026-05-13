export interface PhilosophyItem {
  title: string;
  body: string;
}

export const philosophy: PhilosophyItem[] = [
  {
    title: "Free core safety features for everyone.",
    body: "We believe essential safety tools should be accessible to all, not locked behind paywalls.",
  },
  {
    title: "QR is optional, not forced.",
    body: "Our platform works perfectly without QR codes. They're an enhancement, not a requirement.",
  },
  {
    title: "Vehicle-first identity.",
    body: "We organize around your vehicle, making it easier to manage multiple cars and their needs.",
  },
  {
    title: "Privacy-first design.",
    body: "All features are opt-in. You control what information is shared, when, and with whom.",
  },
];

export const importantInfo: PhilosophyItem[] = [
  {
    title: "Autolokate does not replace emergency services.",
    body: "In any emergency situation, always contact official emergency services (police, ambulance, fire department) first. Autolokate is a complement that helps notify your trusted contacts.",
  },
  {
    title: "No government integration.",
    body: "Autolokate is not affiliated with, endorsed by, or integrated with any government agency, RTO, or official vehicle registration system. All information shown is owner-provided and voluntary.",
  },
  {
    title: "User responsibility.",
    body: "Users are responsible for the accuracy of information they provide and for maintaining their emergency contacts. Autolokate enables communication but does not guarantee the safety of emergency response.",
  },
  {
    title: "Privacy and consent.",
    body: "All features require explicit user consent. Emergency contacts must accept requests. Visibility settings are controlled per vehicle. You can disable features at any time.",
  },
];
