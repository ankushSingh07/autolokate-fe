import { valueProps } from "./constants";

export function ValueProps() {
  return (
    <section className="border-t border-border/60 bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-border/80 bg-card p-6 shadow-app-soft transition-all duration-200 hover:border-primary/35"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="font-display mt-4 text-base font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
