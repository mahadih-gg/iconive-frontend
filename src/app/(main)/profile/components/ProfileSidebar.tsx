"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { useProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";

import { PROFILE_NAV } from "./profile-nav";

export function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();
  const { profile } = useProfile();
  const { orders } = useOrders();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const displayName = profile?.name ?? user?.name ?? "Account";
  const initial = displayName?.[0]?.toUpperCase() ?? "U";

  function isActive(href: string) {
    if (href === "/profile") return pathname === "/profile";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function handleLogout() {
    logout();
    setIsLogoutOpen(false);
    router.push("/");
  }

  return (
    <>
      <aside className="w-full border-2 border-primary-dark/20 bg-[#fffcf8] lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-col items-center px-5 pt-8 pb-4">
          <div className="flex size-20 items-center justify-center bg-primary text-primary-foreground shadow-sm sm:size-24">
            <span className="font-heading text-3xl font-bold">{initial}</span>
          </div>
          <h2 className="font-heading mt-4 text-center text-lg font-semibold tracking-tight">
            {displayName}
          </h2>
        </div>

        <nav className="px-2 pb-4" aria-label="Profile sections">
          {PROFILE_NAV.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex w-full items-center gap-3 border-t border-primary-dark/10 px-4 py-3.5 text-sm transition-colors",
                  active
                    ? "font-semibold text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                <span className="flex-1 text-left">{item.label}</span>
                {item.showBadge && orders.length > 0 && (
                  <span className="inline-flex min-w-5 items-center justify-center bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                    {orders.length}
                  </span>
                )}
                {active && (
                  <span
                    className="absolute inset-y-2 right-0 w-1 bg-primary"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}

          <Button
            variant="ghost"
            className="mt-2 w-full justify-start gap-3 rounded-none px-4 text-muted-foreground hover:text-foreground"
            onClick={() => setIsLogoutOpen(true)}
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </nav>
      </aside>

      <ConfirmDialog
        open={isLogoutOpen}
        onOpenChange={setIsLogoutOpen}
        title="Log out?"
        description="Are you sure you want to log out of your account?"
        confirmLabel="Logout"
        onConfirm={handleLogout}
      />
    </>
  );
}
