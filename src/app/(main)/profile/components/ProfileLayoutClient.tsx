"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";

export function ProfileLayoutClient({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/login");
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}
