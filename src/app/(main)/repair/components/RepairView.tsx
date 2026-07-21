"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ContentPage } from "@/components/common/ContentPage";

export function RepairView() {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <Image
          src="/Image/repair/repairbanner.webp"
          alt="Repair service"
          width={1600}
          height={420}
          className="h-auto w-full"
          priority
        />
      </div>
      <ContentPage title="Wig Repair Service">
        <p>
          Extend the life of your hair system with Iconive repair services. Our team can help
          with base repair, restyling guidance, and maintenance recommendations.
        </p>
        <p>
          Contact us with photos of your wig and a short description of the issue. We will
          advise on repair options and estimated timeline.
        </p>
        <Button asChild className="mt-4">
          <Link href="/joinus">Contact Us</Link>
        </Button>
      </ContentPage>
    </div>
  );
}
