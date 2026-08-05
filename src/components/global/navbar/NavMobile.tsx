"use client";

import { Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { CONTACT_EMAIL, SOCIAL_LINKS } from "./nav-data";

interface NavMobileProps {
  tone?: "default" | "glass";
}

export function NavMobile({ tone = "default" }: NavMobileProps) {
  const pathname = usePathname() ?? "/";
  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen);
  const openMobileMenu = useUiStore((s) => s.openMobileMenu);
  const closeMobileMenu = useUiStore((s) => s.closeMobileMenu);
  const isGlass = tone === "glass";

  return (
    <Sheet
      open={mobileMenuOpen}
      onOpenChange={(open) => (open ? openMobileMenu() : closeMobileMenu())}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "lg:hidden",
            isGlass && "text-white hover:bg-white/10 hover:text-white",
          )}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-75 gap-0 p-0">
        <SheetHeader className="border-b border-border px-5 py-5 text-left">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="font-brand text-3xl font-medium tracking-[0.12em] text-foreground"
          >
            ICONIVE
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-2 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-4 shrink-0" />
            <span className="truncate">{CONTACT_EMAIL}</span>
          </a>
        </SheetHeader>

        <nav className="flex flex-1 flex-col gap-1 px-5 py-6">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.match);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={cn(
                  "py-2 text-sm font-medium tracking-wide uppercase transition-colors",
                  active ? "text-primary" : "text-foreground hover:text-primary",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border px-5 py-5">
          <p className="mb-3 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Follow Us
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {SOCIAL_LINKS.map(({ href, Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
