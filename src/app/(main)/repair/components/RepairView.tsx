"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export function RepairView() {
  return (
    <div className="w-full pb-16">
      <div className="relative w-full overflow-hidden">
        <Image
          src="/Image/repair/repairbanner.webp"
          alt="Iconive wig repair service"
          width={1600}
          height={420}
          className="h-auto max-h-70 w-full object-cover sm:max-h-90 lg:max-h-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              Care & maintenance
            </p>
            <h1 className="font-heading mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Wig Repair Service
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8 lg:px-8">
        <Breadcrumb className="mb-6 sm:mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Repair</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="border-2 border-primary-dark/20 bg-[#fffcf8] p-5 sm:p-8">
          <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
            Service
          </p>
          <h2 className="font-heading mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Extend the life of your hair system
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Iconive repair services can help with base repair, restyling
            guidance, and maintenance recommendations so your piece stays
            comfortable and natural-looking for longer.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Contact us with photos of your wig and a short description of the
            issue. We will advise on repair options and an estimated timeline.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="relative aspect-4/3 overflow-hidden border border-primary-dark/15 bg-[#f3eee6]">
              <Image
                src="/Image/repair/repair1.png"
                alt="Wig repair example"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-4/3 overflow-hidden border border-primary-dark/15 bg-[#f3eee6]">
              <Image
                src="/Image/repair/repair2.png"
                alt="Wig maintenance example"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 border-t border-primary-dark/15 pt-6 sm:flex-row sm:gap-3">
            <Button asChild variant="cta" size="ctaSm">
              <a href="mailto:info@iconivewigs.com">Email Repair Request</a>
            </Button>
            <Button
              asChild
              variant="ctaOutline"
              size="ctaSm"
              className="border-primary-dark text-primary-dark hover:bg-primary-dark/10"
            >
              <Link href="/faq">View FAQ</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
