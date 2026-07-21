import { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";

import { ProductsView } from "./components/ProductsView";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <ProductsView />
    </Suspense>
  );
}
