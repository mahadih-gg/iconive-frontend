"use client";

import { motion, useReducedMotion } from "motion/react";
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

const EASE = [0.22, 1, 0.36, 1] as const;

const underlineVariants = {
  rest: { scaleX: 0 },
  active: { scaleX: 1 },
} as const;

const MotionLink = motion.create(Link);

interface NavDesktopProps {
  onShopEnter: () => void;
  onShopLeave: () => void;
  shopOpen: boolean;
  tone?: "default" | "glass";
}

function isActive(pathname: string, match: readonly string[]) {
  return match.some((m) => (m === "/" ? pathname === "/" || pathname === "/home" : pathname.startsWith(m)));
}

export function NavDesktop({
  onShopEnter,
  onShopLeave,
  shopOpen,
  tone = "default",
}: NavDesktopProps) {
  const pathname = usePathname() ?? "/";
  const isGlass = tone === "glass";
  const prefersReducedMotion = useReducedMotion();

  return (
    <nav className="mx-auto hidden items-center gap-4 lg:flex">
      {NAV_LINKS.map((link) => {
        const active = isActive(pathname, link.match);
        const isAccent = "accent" in link && link.accent;
        const isShop = "hasDropdown" in link && link.hasDropdown;
        const isHighlighted = active || (isShop && shopOpen) || isAccent;

        return (
          <MotionLink
            key={link.href}
            href={link.href}
            onMouseEnter={isShop ? onShopEnter : undefined}
            onMouseLeave={isShop ? onShopLeave : undefined}
            initial="rest"
            animate={isHighlighted ? "active" : "rest"}
            whileHover="active"
            className={cn(
              "relative inline-flex pb-1 text-sm tracking-wide uppercase transition-colors duration-300",
              isGlass
                ? isHighlighted
                  ? "text-primary"
                  : "text-white/90 hover:text-primary"
                : isHighlighted
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
            )}
          >
            {link.label}
            <motion.span
              aria-hidden
              variants={underlineVariants}
              transition={{
                duration: prefersReducedMotion ? 0.12 : 0.32,
                ease: EASE,
              }}
              className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-primary"
            />
          </MotionLink>
        );
      })}
    </nav>
  );
}

export { isActive, NAV_LINKS };

