"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

import { ProductCard } from "@/components/common/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import type { Category } from "@/types/category.type";
import { cn } from "@/utils/cn";

const BANNERS: Record<number, string> = {
  0: "/Image/image_c/Collections.jpg",
  1: "/Image/image_c/malecollection.webp",
  2: "/Image/image_c/femaleCollections.webp",
  3: "/Image/image_c/Rawhair.webp",
  4: "/Image/image_c/Accessories.webp",
};

export function ProductsView() {
  const router = useRouter();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const {
    products,
    isLoading,
    topBanner,
    setTopBanner,
    expandedCategory,
    setExpandedCategory,
    selectCategory,
    toggleSubcategory,
    filters,
  } = useProducts();

  const selectedSubs = (filters.subcategories as string[]) ?? [];

  return (
    <div className="w-full">
      <div className="relative w-full">
        <Image
          src={BANNERS[topBanner] ?? BANNERS[1]}
          alt="Category banner"
          width={1600}
          height={400}
          className="h-auto w-full"
          priority
        />
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-6 px-4 lg:flex-row lg:px-8">
        <aside className="w-full shrink-0 lg:w-64">
          <div className="rounded bg-muted p-4">
            <p className="mb-4 text-lg font-bold uppercase">Categories</p>
            {categoriesLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="mb-3 h-10 w-full" />
                ))
              : (categories as Category[]).map((category, index) => {
                  const subs =
                    (category.subcategories as Category[] | undefined) ??
                    category.subCategories ??
                    [];
                  const isOpen = expandedCategory === category._id;
                  return (
                    <div
                      key={category._id}
                      className="cursor-pointer border-t border-border py-4"
                      onClick={() => selectCategory(category._id, index + 1)}
                    >
                      <div className="flex items-center text-foreground">
                        <p className="mb-0 text-base text-muted-foreground">
                          {category.name}
                        </p>
                        <button
                          type="button"
                          className="ml-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCategory(isOpen ? "" : category._id);
                            setTopBanner(isOpen ? 0 : index + 1);
                          }}
                        >
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {isOpen && (
                        <div className="pt-2 text-muted-foreground">
                          {subs.map((sub) => (
                            <div
                              key={sub._id}
                              className="my-3 flex items-center pl-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSubcategory(sub._id);
                              }}
                            >
                              <Checkbox
                                checked={selectedSubs.includes(sub._id)}
                                onCheckedChange={() => toggleSubcategory(sub._id)}
                              />
                              <p
                                className={cn(
                                  "my-auto ml-3 text-sm hover:text-primary",
                                )}
                              >
                                {sub.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
          </div>
          <div className="mt-4 hidden overflow-hidden rounded-lg md:block">
            <button type="button" onClick={() => router.push("/offers")} className="w-full">
              <Image
                src="/Image/image_c/sidebar.svg"
                alt="Offers"
                width={260}
                height={400}
                className="h-auto w-full"
              />
            </button>
          </div>
        </aside>

        <div className="flex-1 pt-4 lg:pl-8 lg:pt-0">
          <div className="mx-auto flex flex-wrap justify-center gap-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-72 w-40 md:w-52" />
                ))
              : products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    className="w-[45%] md:w-52"
                  />
                ))}
            {!isLoading && products.length === 0 && (
              <p className="py-16 text-muted-foreground">
                Select a category to view products
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
