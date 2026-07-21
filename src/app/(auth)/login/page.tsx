import { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";

import { LoginView } from "./components/LoginView";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <LoginView />
    </Suspense>
  );
}
