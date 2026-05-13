export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: { left: FaqItem[]; right: FaqItem[] } = {
  left: [
    {
      q: "What is Autolokate?",
      a: "Autolokate is a free, privacy-first platform that helps vehicle owners manage their vehicles, share trips and expenses, and stay prepared for emergencies — without giving up control of their data.",
    },
    {
      q: "Is Autolokate free to use?",
      a: "Yes. The core safety and vehicle management features are free for everyone. Optional add-ons like premium QR plates may carry a small one-time cost, but you never need them to use the platform.",
    },
    {
      q: "How does the emergency contact system work?",
      a: "You add trusted contacts who must accept the invitation. If you're in an incident, your contacts can be notified through the channels you've enabled. We never call emergency services on your behalf.",
    },
    {
      q: "What information is shown when someone scans my license plate?",
      a: "Only the fields you've explicitly chosen to share — typically a way to reach you or your contact. Personal data like home address or documents are never shown by default.",
    },
  ],
  right: [
    {
      q: "Do I need a QR code to use Autolokate?",
      a: "No. QR codes are entirely optional. You can use vehicle management, trip sharing, and emergency contacts without ever printing or attaching a QR code.",
    },
    {
      q: "Is my data safe and private?",
      a: "Yes. We follow privacy-first principles: data is encrypted at rest and in transit, sharing is opt-in per feature, and you can delete your data from your account at any time.",
    },
    {
      q: "Does Autolokate replace emergency services?",
      a: "No. Autolokate is never a substitute for the police, ambulance, or fire services. Always contact official emergency services first; we can help you notify trusted people in parallel.",
    },
    {
      q: "Can I use Autolokate offline?",
      a: "Most management features require a connection to sync, but vehicle records and saved contacts remain readable offline once cached on your device.",
    },
  ],
};
