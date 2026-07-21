import type { ReactNode } from "react";

import { Footer } from "@/components/global/footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
