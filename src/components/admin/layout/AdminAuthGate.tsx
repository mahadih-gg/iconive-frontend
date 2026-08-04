"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { AdminShell } from "@/components/admin/layout/AdminShell";
import { Spinner } from "@/components/ui/spinner";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";

interface AdminAuthGateProps {
  children: ReactNode;
}

export function AdminAuthGate({ children }: AdminAuthGateProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isHydrated, hydrate } = useAdminAuth();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated && !isLoginPage) {
      router.replace("/admin/login");
    }
    if (isAuthenticated && isLoginPage) {
      router.replace("/admin");
    }
  }, [isAuthenticated, isHydrated, isLoginPage, router]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
