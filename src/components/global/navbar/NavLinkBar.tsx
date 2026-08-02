"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";

import { CurrencyToggle } from "./CurrencyToggle";
import { NavActions } from "./NavActions";
import { NavDesktop } from "./NavDesktop";
import { NavMobile } from "./NavMobile";
import { ShopDropdown } from "./ShopDropdown";

interface NavLinkBarProps {
  tone?: "default" | "glass";
  className?: string;
}

export function NavLinkBar({ tone = "default", className }: NavLinkBarProps) {
  const [shopOpen, setShopOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  function openShop() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setShopOpen(true);
  }

  function scheduleCloseShop() {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setShopOpen(false);
      closeTimeoutRef.current = null;
    }, 150);
  }

  function closeShop() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setShopOpen(false);
  }

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "mx-auto flex items-center justify-between px-4 py-2 lg:px-28",
          tone === "glass" && "text-white",
        )}
      >
        <div className="flex w-auto items-center gap-2">
          <NavMobile tone={tone} />
          <CurrencyToggle tone={tone} />
        </div>

        <NavDesktop
          shopOpen={shopOpen}
          onShopEnter={openShop}
          onShopLeave={scheduleCloseShop}
          tone={tone}
        />

        <NavActions tone={tone} />
      </div>
      <ShopDropdown
        open={shopOpen}
        onEnter={openShop}
        onLeave={scheduleCloseShop}
        onNavigate={closeShop}
      />
    </div>
  );
}
