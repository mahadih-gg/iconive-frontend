"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Palette,
  Ruler,
  Sparkles,
  Waves,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PATHS = [
  {
    href: "/blog/wearing-and-size-guide",
    image: "/Image/guidemale/male.webp",
    label: "Gentlemen",
    title: "For Gentlemen",
    description:
      "Size, density, and style guidance for men's hair systems — from first fit to everyday wear.",
  },
  {
    href: "/blog/basic-guide-to-choosing-your-wig",
    image: "/Image/guidefemale/female.webp",
    label: "Ladies",
    title: "For Ladies",
    description:
      "Texture, color, and wearing tips for women's wigs — choose a look that feels natural and confident.",
  },
] as const;

const QUICK_GUIDES = [
  {
    href: "/blog/basic-guide-to-choosing-your-wig",
    icon: BookOpen,
    title: "Basic Guide",
    text: "Fundamentals of choosing and caring for your Iconive wig.",
  },
  {
    href: "/blog/base-and-hair-guide",
    icon: Sparkles,
    title: "Base & Hair",
    text: "Compare mono, lace, silk, and remy or virgin hair options.",
  },
  {
    href: "/blog/wearing-and-size-guide",
    icon: Ruler,
    title: "Wearing & Size",
    text: "Measure correctly and wear for comfort and a natural finish.",
  },
  {
    href: "/blog/hair-wave-curl-and-density-guide",
    icon: Waves,
    title: "Wave & Density",
    text: "Match curl, wave, and density to your preferred coverage.",
  },
  {
    href: "/blog/find-your-perfect-shade",
    icon: Palette,
    title: "Color Guide",
    text: "Find the shade family that flatters your tone and style.",
  },
] as const;

export function GuidemeView() {
  return (
    <div className="w-full pb-16">
      <div className="border-b border-primary-dark/10 bg-[#fffcf8]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Guide Me</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-2xl">
            <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
              Personal guidance
            </p>
            <h1 className="font-heading mt-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Guide Me
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Start with who you&apos;re shopping for, then explore our guides on
              fit, base, density, and color to find your perfect Iconive look.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
              Step 01
            </p>
            <h2 className="font-heading mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
              Choose your path
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {PATHS.map((path) => (
            <Link
              key={path.title}
              href={path.href}
              className="group border-2 border-primary-dark/20 bg-[#fffcf8] transition-transform duration-500 hover:-translate-y-0.5"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#f3eee6]">
                <Image
                  src={path.image}
                  alt={path.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
                    {path.label}
                  </p>
                  <h3 className="font-heading mt-1 text-2xl font-semibold tracking-tight text-white">
                    {path.title}
                  </h3>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {path.description}
                </p>
                <span className="font-heading mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-primary-dark transition-colors group-hover:text-primary">
                  Start this guide
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 sm:mt-14">
          <div className="mb-5">
            <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
              Step 02
            </p>
            <h2 className="font-heading mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
              Browse by topic
            </h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Jump into a specific guide if you already know what you need help
              with.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {QUICK_GUIDES.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className={cn(
                    "group flex flex-col border-2 border-primary-dark/20 bg-[#fffcf8] p-4 transition-colors hover:border-primary",
                  )}
                >
                  <span className="mb-3 inline-flex size-9 items-center justify-center bg-primary/15 text-primary-dark">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">
                    {guide.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {guide.text}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-primary-dark uppercase transition-colors group-hover:text-primary">
                    Read
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-10 border-2 border-primary-dark/20 bg-[#fffcf8] px-5 py-8 text-center sm:mt-12 sm:px-10 sm:py-10">
          <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
            Still deciding?
          </p>
          <h2 className="font-heading mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Explore the full journal
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Browse every Iconive guide in one place, or shop the collection when
            you&apos;re ready.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
            <Button asChild variant="cta" size="ctaSm" iconMotion="right">
              <Link href="/blog">
                Explore Full Guides
                <ArrowRight data-slot="button-arrow" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ctaOutline"
              size="ctaSm"
              className="border-primary-dark text-primary-dark hover:bg-primary-dark/10"
            >
              <Link href="/products">Shop Wigs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
