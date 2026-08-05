"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";

import { getAdminPageTitle } from "@/components/admin/nav";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAdminAuth();
  const title = getAdminPageTitle(pathname);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  function handleLogout() {
    logout();
    setIsLogoutOpen(false);
    router.replace("/admin/login");
  }

  return (
    <>
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLogoutOpen(true)}
          >
            <LogOutIcon data-icon="inline-start" />
            Logout
          </Button>
        </div>
      </header>

      <ConfirmDialog
        open={isLogoutOpen}
        onOpenChange={setIsLogoutOpen}
        title="Log out?"
        description="Are you sure you want to log out of the admin panel?"
        confirmLabel="Logout"
        onConfirm={handleLogout}
      />
    </>
  );
}
