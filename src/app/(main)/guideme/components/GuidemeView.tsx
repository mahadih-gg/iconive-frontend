"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function GuidemeView() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">Guide Me</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Link href="/blog?show=3" className="group text-center no-underline">
          <div className="relative aspect-[4/3] overflow-hidden rounded">
            <Image
              src="/Image/guidemale/male.webp"
              alt="Guide for men"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <h3 className="mt-4 font-bold text-foreground">For Gentlemen</h3>
          <p className="text-sm text-muted-foreground">
            Size, density, and style guidance for men&apos;s systems.
          </p>
        </Link>
        <Link href="/blog?show=3" className="group text-center no-underline">
          <div className="relative aspect-[4/3] overflow-hidden rounded">
            <Image
              src="/Image/guidefemale/female.webp"
              alt="Guide for women"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <h3 className="mt-4 font-bold text-foreground">For Ladies</h3>
          <p className="text-sm text-muted-foreground">
            Texture, color, and wearing tips for women&apos;s wigs.
          </p>
        </Link>
      </div>
      <div className="mt-10 text-center">
        <Button asChild>
          <Link href="/blog">Explore Full Guides</Link>
        </Button>
      </div>
    </div>
  );
}
