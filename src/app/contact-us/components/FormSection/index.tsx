import { ContactForm } from "../ContactForm";
import { Sidebar } from "../Sidebar";

export function FormSection() {
  return (
    <section className="relative bg-secondary/40 py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="theme-dark-only absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_15%,rgba(59,130,246,0.10),transparent_55%)]" />
        <div className="theme-light-only absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_25%_18%,rgba(59,130,246,0.06),transparent_55%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-10 lg:px-8">
        <ContactForm />
        <Sidebar />
      </div>
    </section>
  );
}
