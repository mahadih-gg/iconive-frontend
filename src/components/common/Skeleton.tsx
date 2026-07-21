import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="mx-auto flex w-40 flex-col overflow-hidden md:w-52">
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="mt-3 h-4 w-3/4 self-center" />
      <Skeleton className="mt-2 h-4 w-1/2 self-center" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
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
