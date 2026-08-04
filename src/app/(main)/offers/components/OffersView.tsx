"use client";

import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/common/ProductCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";
import type { Product } from "@/types/product.type";

function ProductGrid({
  products,
  isLoading,
  emptyTitle,
  emptyText,
}: {
  products: Product[];
  isLoading: boolean;
  emptyTitle: string;
  emptyText: string;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="aspect-3/4 w-full rounded-none" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="border border-primary-dark/15 bg-[#f3eee6]/40 px-5 py-10 text-center">
        <p className="font-heading text-base font-semibold">{emptyTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} className="w-full" />
      ))}
    </div>
  );
}

export function OffersView() {
  const { offers, stock, isLoading } = useFeaturedProducts();

  return (
    <div className="w-full pb-16">
      <div className="relative w-full overflow-hidden">
        <Image
          src="/Image/offer/offer1.webp"
          alt="Iconive offers"
          width={1600}
          height={500}
          className="h-auto max-h-70 w-full object-cover sm:max-h-90 lg:max-h-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              Limited deals
            </p>
            <h1 className="font-heading mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Offers
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-8">
        <Breadcrumb className="mb-6 sm:mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Offers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mb-8 sm:mb-10">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
                Ready to ship
              </p>
              <h2 className="font-heading mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                Stock Products
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Available now from our current inventory.
              </p>
            </div>
            {!isLoading && (
              <p className="text-sm text-muted-foreground">
                {stock.length} products
              </p>
            )}
          </div>

          <ProductGrid
            products={stock}
            isLoading={isLoading}
            emptyTitle="No stock products right now"
            emptyText="Check back soon or browse the full collection."
          />
        </section>

        <section className="border-2 border-primary-dark/20 bg-[#fffcf8] p-4 sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
                Limited time
              </p>
              <h2 className="font-heading mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                Special Offers
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Discounted and featured styles selected for you.
              </p>
            </div>
            {!isLoading && (
              <p className="text-sm text-muted-foreground">
                {offers.length} offers
              </p>
            )}
          </div>

          <ProductGrid
            products={offers}
            isLoading={isLoading}
            emptyTitle="No offers available right now"
            emptyText="Explore our full catalog while we prepare the next drop."
          />

          {!isLoading && offers.length === 0 && (
            <div className="mt-5 flex justify-center">
              <Button asChild variant="cta" size="ctaSm">
                <Link href="/products">Browse All Products</Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
