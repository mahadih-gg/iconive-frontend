"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

import { HeroSection } from "@/components/common/HeroSection";
import { ProductCard } from "@/components/common/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";

export function HomeView() {
  const router = useRouter();
  const { topSelling, trending, isLoading } = useFeaturedProducts();

  return (
    <div>
      <HeroSection />

      <div className="mx-auto mb-12 mt-16 max-w-7xl px-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <button
            type="button"
            className="w-full py-8 text-center lg:w-1/2"
            onClick={() =>
              router.push("/products?category=6432a3f8bc1e9c4115b67db5&topbanner=1")
            }
          >
            <div className="relative overflow-hidden">
              <Image
                src="/Image/ImagesPage/Guy.png"
                alt="Gents"
                width={700}
                height={500}
                className="h-auto w-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <h1 className="text-4xl font-bold text-white">GENTS</h1>
              </div>
            </div>
            <h4 className="pb-3 pt-4 font-bold">GENTS</h4>
            <p className="px-3 text-muted-foreground">
              Be confident with any style you like to own from a large variety of styles.
            </p>
          </button>
          <button
            type="button"
            className="w-full py-8 text-center lg:w-1/2"
            onClick={() =>
              router.push("/products?category=6432eb5a9e5f9a8abde960e0&topbanner=2")
            }
          >
            <div className="relative overflow-hidden">
              <Image
                src="/Image/ImagesPage/girl.png"
                alt="Ladies"
                width={700}
                height={500}
                className="h-auto w-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <h1 className="text-4xl font-bold text-white">LADIES</h1>
              </div>
            </div>
            <h4 className="pb-3 pt-4 font-bold">LADIES</h4>
            <p className="px-3 text-muted-foreground">
              Explore yourself, be the glamourous persona you always dreamed of.
            </p>
          </button>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-6 text-center text-2xl font-bold">TOP SELLING</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-72 w-44" />
              ))
            : topSelling.slice(0, 8).map((p) => (
                <ProductCard key={p._id} product={p} className="w-40 md:w-48" />
              ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-6 text-center text-2xl font-bold">TRENDING</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-72 w-44" />
              ))
            : trending.slice(0, 8).map((p) => (
                <ProductCard key={p._id} product={p} className="w-40 md:w-48" />
              ))}
        </div>
      </section>

      <div className="relative mx-auto max-w-7xl px-4 pb-12">
        <div className="hidden overflow-hidden lg:block lg:w-2/3 lg:ml-auto">
          <Image
            src="/Image/ImagesPage/WI.svg"
            alt="Wholesale"
            width={900}
            height={500}
            className="h-auto w-full"
          />
        </div>
        <div className="relative z-10 mt-4 max-w-xl rounded-lg bg-white p-8 shadow-lg lg:absolute lg:left-8 lg:top-1/4 lg:mt-0">
          <h2 className="font-bold">For Wholesellers</h2>
          <p className="py-4 text-sm text-muted-foreground">
            Shop wigs in bulk at discounted prices in our wholesale section. Ideal for
            resellers or stocking up on your favorite styles.
          </p>
          <Link href="/wholesale" className="border-b-2 pb-1 text-muted-foreground no-underline">
            View Wholesale Shop
          </Link>
        </div>
      </div>

      <section className="bg-muted py-10">
        <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
          WHAT PEOPLE ARE SAYING
        </h3>
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4 px-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full max-w-xs rounded bg-white p-6 shadow">
              <div className="mb-2 flex justify-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Amazing quality wigs. Highly recommend Iconive!
              </p>
            </div>
          ))}
        </div>
      </section>

      <FloatingWhatsApp
        phoneNumber="8801601162155"
        accountName="Iconive Wigs"
        avatar="/Image/logo/logo.png"
        statusMessage="Typically replies within minutes"
        chatMessage="Hello! How can we help you?"
      />
    </div>
  );
}
