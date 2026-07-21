import { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";

import { BlogView } from "./components/BlogView";

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <BlogView />
    </Suspense>
  );
}
