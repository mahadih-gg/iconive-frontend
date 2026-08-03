"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";

import { BlogSection } from "@/components/common/BlogSection";
import { ChooseYourStyle } from "@/components/common/ChooseYourStyle";
import { CustomerReviews } from "@/components/common/CustomerReviews";
import { FaqSection } from "@/components/common/FaqSection";
import { ForWholesellers } from "@/components/common/ForWholesellers";
import { HeroSection } from "@/components/common/HeroSection";
import { ProductCarouselSection } from "@/components/common/ProductCarouselSection";
import { SpecialCollection } from "@/components/common/SpecialCollection";
import { SubscribeSection } from "@/components/common/SubscribeSection";
import { TrustMarkersSection } from "@/components/common/TrustMarkersSection";
import { WhyChooseUs } from "@/components/common/WhyChooseUs";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";
import { HERO_VIDEOS } from "@/utils/constants";

interface HomeViewProps {
  heroVideos?: readonly string[];
}

const GENTS_CATEGORY_ID = "6432a3f8bc1e9c4115b67db5";
const GENTS_PRODUCTS_HREF = `/products?category=${GENTS_CATEGORY_ID}&topbanner=1`;

function getCategoryId(product: { category?: string | { _id: string; name: string } }) {
  if (typeof product.category === "string") return product.category;
  if (product.category && typeof product.category === "object") return product.category._id;
  return "";
}

export function HomeView({ heroVideos = HERO_VIDEOS }: HomeViewProps) {
  const { topSelling, trending, offers, stock, isLoading } = useFeaturedProducts();

  const collectionProducts = (offers.length > 0 ? offers : topSelling).slice(0, 8);
  const mensProducts = [...stock, ...topSelling, ...trending]
    .filter((product, index, list) => {
      const isGents = getCategoryId(product) === GENTS_CATEGORY_ID;
      const isFirst = list.findIndex((item) => item._id === product._id) === index;
      return isGents && isFirst;
    })
    .slice(0, 8);
  const mensFallback =
    mensProducts.length > 0 ? mensProducts : topSelling.slice(0, 8);

  return (
    <div>
      <HeroSection videos={heroVideos} />
      <ChooseYourStyle />
      <TrustMarkersSection />

      <ProductCarouselSection
        label="Our Bestsellers"
        heading="Our Best Selling wigs"
        paragraph="Loved by thousands. Handpicked for you."
        products={topSelling.slice(0, 8)}
        isLoading={isLoading}
        viewAllHref="/products"
      />
      <ProductCarouselSection
        label="Just In"
        heading="Trending"
        paragraph="Styles everyone is loving right now."
        products={trending.slice(0, 8)}
        isLoading={isLoading}
        viewAllHref="/products"
        className="pt-0"
      />

      <SpecialCollection
        heading="Men’s Hair Replacement System"
        paragraph="Explore our exceptional selection of premium wigs designed to provide a flawless fit and timeless style for men of all ages"
        bannerTitle="Men’s Collection"
        bannerHighlight="Gents"
        bannerSrc="/Image/ImagesPage/gents.webp"
        bannerHref={GENTS_PRODUCTS_HREF}
        products={mensFallback}
        isLoading={isLoading}
        viewAllHref={GENTS_PRODUCTS_HREF}
      />

      <ForWholesellers />

      <SpecialCollection
        heading="Featured Pieces"
        bannerTitle="Special Collection of"
        bannerHighlight="2026"
        bannerSrc="/Image/ImagesPage/ladies.webp"
        bannerHref="/offers"
        products={collectionProducts}
        isLoading={isLoading}
        viewAllHref="/offers"
      />
      <WhyChooseUs />
      <CustomerReviews />
      <BlogSection />
      <FaqSection />
      <SubscribeSection />

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
