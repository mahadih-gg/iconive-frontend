"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { href: "/", label: "HOME", match: ["/", "/home"] },
  { href: "/products", label: "SHOP", match: ["/products", "/catagory"], hasDropdown: true },
  { href: "/guideme", label: "GUIDE ME", match: ["/guideme"] },
  { href: "/customize", label: "CUSTOMIZE", match: ["/customize"] },
  { href: "/offers", label: "OFFERS", match: ["/offers"] },
  { href: "/joinus", label: "JOIN US", match: ["/joinus"] },
  { href: "/blog", label: "BLOG", match: ["/blog"] },
  { href: "/wholesale", label: "WHOLESALE", match: ["/wholesale"], accent: true },
] as const;

interface NavDesktopProps {
  onShopClick: () => void;
  shopOpen: boolean;
}

function isActive(pathname: string, match: readonly string[]) {
  return match.some((m) => (m === "/" ? pathname === "/" || pathname === "/home" : pathname.startsWith(m)));
}

export function NavDesktop({ onShopClick, shopOpen }: NavDesktopProps) {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="mx-auto hidden items-center gap-4 lg:flex">
      {NAV_LINKS.map((link) => {
        const active = isActive(pathname, link.match);
        if ("hasDropdown" in link && link.hasDropdown) {
          return (
            <button
              key={link.label}
              type="button"
              onClick={onShopClick}
              className={cn(
                "text-sm font-medium uppercase tracking-wide transition-colors",
                active || shopOpen ? "text-primary" : "text-foreground hover:text-primary",
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
            className={cn(
              "text-sm font-medium uppercase tracking-wide transition-colors",
              active ? "text-primary" : "text-foreground hover:text-primary",
              "accent" in link && link.accent && "text-primary",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export { NAV_LINKS, isActive };
