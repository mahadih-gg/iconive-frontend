"use client";

import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";

import { getAdminPageTitle } from "@/components/admin/nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";
import { usePathname } from "next/navigation";

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAdminAuth();
  const title = getAdminPageTitle(pathname);

  function handleLogout() {
    logout();
    router.replace("/admin/login");
  }

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-heading text-sm font-semibold tracking-wide uppercase">
          {title}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden text-sm text-muted-foreground sm:inline">
          {user?.email}
        </span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOutIcon data-icon="inline-start" />
          Logout
        </Button>
      </div>
    </header>
  );
}
