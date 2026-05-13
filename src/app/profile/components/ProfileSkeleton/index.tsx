import { Skeleton } from "@/components/ui/skeleton";

/** Shimmer placeholder shown while `/v1/auth/me` is loading. */
export function ProfileSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="mb-8 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/95 p-6 shadow-sm sm:p-8">
        <Skeleton className="h-4 w-32" />
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="space-y-2 sm:col-span-2 sm:[&:nth-child(n+3)]:col-span-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end gap-2">
          <Skeleton className="h-11 w-24 rounded-xl" />
          <Skeleton className="h-11 w-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
