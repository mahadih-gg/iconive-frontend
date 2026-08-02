"use client";

import { Mail } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/utils/cn";

import { NavLinkBar } from "./NavLinkBar";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "./nav-data";

function NavProgressiveBlur() {
  return (
    <div className="nav-progressive-blur pointer-events-none absolute inset-0" aria-hidden>
      <div className="nav-blur-layer" data-blur="1" />
      <div className="nav-blur-layer" data-blur="2" />
      <div className="nav-blur-layer" data-blur="4" />
      <div className="nav-blur-layer" data-blur="8" />
      <div className="nav-blur-layer" data-blur="16" />
      <div className="nav-blur-tint" />
    </div>
  );
}

function AnnouncementBar({ glass = false }: { glass?: boolean }) {
  return (
    <div className={cn("flex", glass ? "bg-black/55" : "bg-[#1a1a1a]")}>
      <p className="mx-auto animate-pulse py-1 text-center text-xs text-white md:text-sm">
        FREE INTERNATIONAL SHIPPING ON ORDER OVER $250!
      </p>
    </div>
  );
}

/** Layer 1 — email left, ICONIVE center, socials right */
function BrandLayer({ glass = false }: { glass?: boolean }) {
  return (
    <div
      className={cn(
        "w-full px-4 py-2 lg:px-28",
        glass
          ? "border-b border-white/10 text-white"
          : "border-b bg-white text-foreground",
      )}
    >
      <div className="relative flex items-center justify-center md:justify-between">
        <div
          className={cn(
            "hidden min-w-0 flex-1 items-center gap-2 md:flex",
            glass ? "text-white/85" : "text-muted-foreground",
          )}
        >
          <Mail className="h-4 w-4 shrink-0" />
          <p className="truncate text-sm font-medium">{CONTACT_EMAIL}</p>
        </div>

        <Link
          href="/"
          className={cn(
            "shrink-0",
            glass ? "text-white" : "text-black",
          )}
        >
          <h1 className="font-heading font-medium tracking-[0.12em] text-2xl sm:text-3xl xl:text-5xl pt-2">
            ICONIVE
          </h1>
        </Link>

        <div
          className={cn(
            "hidden min-w-0 flex-1 items-center justify-end gap-2 md:flex",
            glass ? "text-white/85" : "text-muted-foreground",
          )}
        >
          {SOCIAL_LINKS.map(({ href, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={cn("mx-0.5", glass ? "hover:text-white" : "hover:text-foreground")}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/" || pathname === "/home";
  const prefersReducedMotion = useReducedMotion();
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    if (!isHome) {
      setHeroInView(false);
      return;
    }

    setHeroInView(true);
    const hero = document.getElementById("home-hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px 0px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome, pathname]);

  // Non-home: announcement + 2-layer nav with sticky link row
  if (!isHome) {
    return (
      <>
        <AnnouncementBar />
        <BrandLayer />
        <div className="sticky top-0 z-50 bg-white shadow">
          <NavLinkBar />
        </div>
      </>
    );
  }

  return (
    <>
      {/*
        Glass 2-layer header over hero — absolute so it scrolls away with the page.
        When hero leaves the viewport, the solid sticky bar slides in from the top.
      */}
      <AnimatePresence mode="sync">
        {heroInView ? (
          <motion.header
            key="hero-overlay-nav"
            initial={false}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: "-40%" }
            }
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 z-50"
          >
            <div className="relative">
              <NavProgressiveBlur />
              <div className="relative z-10">
                <AnnouncementBar glass />
                <BrandLayer glass />
                <NavLinkBar tone="glass" />
              </div>
            </div>
          </motion.header>
        ) : (
          <motion.div
            key="sticky-nav"
            initial={prefersReducedMotion ? { opacity: 0 } : { y: "-100%" }}
            animate={prefersReducedMotion ? { opacity: 1 } : { y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-50 bg-white shadow"
          >
            <NavLinkBar />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { CurrencyToggle } from "./CurrencyToggle";
export { NavDesktop } from "./NavDesktop";
export { NavMobile } from "./NavMobile";

