import { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";

import { ProfileView } from "./components/ProfileView";

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <ProfileView />
    </Suspense>
  );
}
