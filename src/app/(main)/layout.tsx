import type { ReactNode } from "react";

import { CartDrawer } from "@/components/global/cart-drawer";
import { Footer } from "@/components/global/footer";
import { Navbar } from "@/components/global/navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      {children}
      <Footer />
    </>
  );
}
