"use client";

import Image from "next/image";
import Link from "next/link";

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

interface ShopDropdownProps {
  open: boolean;
  onNavigate: () => void;
}

export function ShopDropdown({ open, onNavigate }: ShopDropdownProps) {
  if (!open) return null;

  return (
    <div className="absolute left-0 z-50 mt-0 grid w-full grid-cols-1 bg-white p-0 shadow-lg md:grid-cols-4">
      {COLLECTIONS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className="border-b border-border p-4 transition-colors hover:bg-muted md:border-b-0 md:border-r md:last:border-r-0"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image src={item.image} alt={item.label} fill className="object-cover" sizes="25vw" />
          </div>
          <p className="mt-3 text-sm text-foreground md:text-base">{item.label}</p>
        </Link>
      ))}
    </div>
  );
}
