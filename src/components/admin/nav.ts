import {
  BadgePercent,
  FileText,
  FolderTree,
  Handshake,
  HelpCircle,
  ImageIcon,
  LayoutDashboard,
  MessageSquareQuote,
  Package,
  Settings,
  ShoppingBag,
  Store,
  Tags,
  Users,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface AdminNavGroup {
  label: string;
  items: AdminNavItem[];
}

export const ADMIN_NAV: AdminNavGroup[] = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Catalog",
    items: [
      {
        href: "/admin/parent-categories",
        label: "Parent Categories",
        icon: FolderTree,
      },
      { href: "/admin/categories", label: "Categories", icon: Tags },
      { href: "/admin/products", label: "Products", icon: Package },
      { href: "/admin/offers", label: "Offers", icon: BadgePercent },
      { href: "/admin/hero-banners", label: "Hero Banners", icon: ImageIcon },
    ],
  },
  {
    label: "Sales",
    items: [
      { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
      {
        href: "/admin/customize-orders",
        label: "Customize Orders",
        icon: Wand2,
      },
    ],
  },
  {
    label: "Wholesale",
    items: [
      { href: "/admin/wholesale/sellers", label: "Sellers", icon: Store },
      {
        href: "/admin/wholesale/inquiries",
        label: "Inquiries",
        icon: MessageSquareQuote,
      },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/blog", label: "Blog", icon: FileText },
      { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
      { href: "/admin/reviews", label: "Reviews", icon: MessageSquareQuote },
      { href: "/admin/affiliates", label: "Affiliates", icon: Handshake },
    ],
  },
  {
    label: "People",
    items: [{ href: "/admin/customers", label: "Customers", icon: Users }],
  },
  {
    label: "System",
    items: [{ href: "/admin/settings", label: "Settings", icon: Settings }],
  },
];

export function getAdminPageTitle(pathname: string): string {
  if (pathname === "/admin") return "Dashboard";
  for (const group of ADMIN_NAV) {
    for (const item of group.items) {
      if (item.href === pathname) return item.label;
    }
  }
  return "Admin";
}
