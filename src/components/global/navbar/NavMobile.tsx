"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUiStore } from "@/store/ui.store";
import { cn } from "@/utils/cn";

import { NAV_LINKS, isActive } from "./NavDesktop";

interface NavMobileProps {
  onShopClick: () => void;
}

export function NavMobile({ onShopClick }: NavMobileProps) {
  const pathname = usePathname() ?? "/";
  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen);
  const openMobileMenu = useUiStore((s) => s.openMobileMenu);
  const closeMobileMenu = useUiStore((s) => s.closeMobileMenu);

  return (
    <Sheet
      open={mobileMenuOpen}
      onOpenChange={(open) => (open ? openMobileMenu() : closeMobileMenu())}
    >
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-3">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.match);
            if ("hasDropdown" in link && link.hasDropdown) {
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    onShopClick();
                    closeMobileMenu();
                  }}
                  className={cn(
                    "text-left text-sm font-medium uppercase",
                    active ? "text-primary" : "text-foreground",
                  )}
                >
                  {link.label}
                </button>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={cn(
                  "text-sm font-medium uppercase",
                  active ? "text-primary" : "text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
