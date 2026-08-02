import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_16px_rgba(23,23,23,0.06)]">
      <Skeleton className="aspect-4/5 w-full rounded-none" />
      <div className="flex flex-col gap-2.5 p-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3.5 w-28" />
        <div className="mt-1 flex items-center justify-between gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-40 md:w-52">
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}

export function RoutePageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4 py-10">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
