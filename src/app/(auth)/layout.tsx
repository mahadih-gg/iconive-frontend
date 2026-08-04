"use client";

import type { ReactNode } from "react";

import { CartDrawer } from "@/components/global/cart-drawer";
import { Navbar } from "@/components/global/navbar";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      {children}
    </>
  );
}
