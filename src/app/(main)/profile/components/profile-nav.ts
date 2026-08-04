import {
  Clock3,
  Heart,
  Package,
  RefreshCcw,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export interface ProfileNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  showBadge?: boolean;
}

export const PROFILE_NAV: ProfileNavItem[] = [
  { href: "/profile", label: "My Profile", icon: UserRound },
  { href: "/profile/orders", label: "Orders", icon: Package, showBadge: true },
  { href: "/profile/order-history", label: "Order History", icon: Clock3 },
  { href: "/profile/wishlist", label: "Wishlist", icon: Heart },
  { href: "/profile/refunds", label: "Refund and Return", icon: RefreshCcw },
];

export function getProfilePageMeta(pathname: string): {
  title: string;
  crumb: string;
} {
  if (pathname.startsWith("/profile/orders")) {
    return { title: "Orders", crumb: "Orders" };
  }
  if (pathname.startsWith("/profile/order-history")) {
    return { title: "Order History", crumb: "Order History" };
  }
  if (pathname.startsWith("/profile/wishlist")) {
    return { title: "Wishlist", crumb: "Wishlist" };
  }
  if (pathname.startsWith("/profile/refunds")) {
    return { title: "Refund and Return", crumb: "Refund and Return" };
  }
  return { title: "My Profile", crumb: "My Profile" };
}
