"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const COLLECTIONS = [
  {
    href: "/products?category=6432a3f8bc1e9c4115b67db5&topbanner=1",
    image: "/Image/navi/malenav.webp",
    label: "Gents Wigs",
  },
  {
    href: "/products?category=6432eb5a9e5f9a8abde960e0&topbanner=2",
    image: "/Image/navi/femalenav.webp",
    label: "Ladies Wigs",
  },
  {
    href: "/products?category=64343a704fb336001b129958&topbanner=3",
    image: "/Image/navi/rawnav.webp",
    label: "Raw Hair",
  },
  {
    href: "/products?category=64343aaf4fb336001b12995c&topbanner=4",
    image: "/Image/navi/accnav.webp",
    label: "Accessories",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

interface ShopDropdownProps {
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onNavigate: () => void;
}

export function ShopDropdown({ open, onEnter, onLeave, onNavigate }: ShopDropdownProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="shop-dropdown"
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -10, clipPath: "inset(0 0 100% 0)" }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }
          }
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -6, clipPath: "inset(0 0 100% 0)" }
          }
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.35, ease: EASE }}
          className="absolute left-0 z-50 mt-0 w-full origin-top bg-white shadow-lg"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <div className="grid grid-cols-1 md:grid-cols-4">
            {COLLECTIONS.map((item, index) => (
              <motion.div
                key={item.href}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.12 : 0.32,
                  delay: prefersReducedMotion ? 0 : 0.06 + index * 0.05,
                  ease: EASE,
                }}
              >
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="block border-b border-border p-4 transition-colors hover:bg-muted md:border-b-0 md:border-r md:last:border-r-0"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      initial={prefersReducedMotion ? false : { scale: 1.06 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.55,
                        delay: prefersReducedMotion ? 0 : 0.08 + index * 0.05,
                        ease: EASE,
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        className="object-cover"
                        sizes="25vw"
                      />
                    </motion.div>
                  </div>
                  <p className="mt-3 text-sm text-foreground md:text-base">{item.label}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
