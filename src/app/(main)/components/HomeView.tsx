"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";

import { ChooseYourStyle } from "@/components/common/ChooseYourStyle";
import { CustomerReviews } from "@/components/common/CustomerReviews";
import { ForWholesellers } from "@/components/common/ForWholesellers";
import { HeroSection } from "@/components/common/HeroSection";
import { ProductCard } from "@/components/common/ProductCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TopSelling } from "@/components/common/TopSelling";
import { WhyChooseUs } from "@/components/common/WhyChooseUs";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";

export function HomeView() {
  const { topSelling, trending, isLoading } = useFeaturedProducts();

  return (
    <div>
      <HeroSection />
      <ChooseYourStyle />

      <TopSelling products={topSelling.slice(0, 8)} isLoading={isLoading} />

      <section className="mx-auto max-w-7xl px-4 py-8">
        <SectionHeader
          className="mb-6"
          label="Just In"
          heading="Trending"
          paragraph="Styles everyone is loving right now."
        />
        <div className="flex flex-wrap justify-center gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-44" />
            ))
            : trending.slice(0, 8).map((p) => (
              <ProductCard key={p._id} product={p} className="w-[47%] md:w-56" />
            ))}
        </div>
      </section>

      <ForWholesellers />
      <WhyChooseUs />
      <CustomerReviews />

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
