"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";

import { BlogSection } from "@/components/common/BlogSection";
import { ChooseYourStyle } from "@/components/common/ChooseYourStyle";
import { CustomerReviews } from "@/components/common/CustomerReviews";
import { FaqSection } from "@/components/common/FaqSection";
import { ForWholesellers } from "@/components/common/ForWholesellers";
import { HeroSection } from "@/components/common/HeroSection";
import { SpecialCollection } from "@/components/common/SpecialCollection";
import { SubscribeSection } from "@/components/common/SubscribeSection";
import { TopSelling } from "@/components/common/TopSelling";
import { Trending } from "@/components/common/Trending";
import { TrustMarkersSection } from "@/components/common/TrustMarkersSection";
import { WhyChooseUs } from "@/components/common/WhyChooseUs";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";
import { HERO_VIDEOS } from "@/utils/constants";

interface HomeViewProps {
  heroVideos?: readonly string[];
}

export function HomeView({ heroVideos = HERO_VIDEOS }: HomeViewProps) {
  const { topSelling, trending, offers, isLoading } = useFeaturedProducts();

  return (
    <div>
      <HeroSection videos={heroVideos} />
      <ChooseYourStyle />
      <TrustMarkersSection />

      <TopSelling products={topSelling.slice(0, 8)} isLoading={isLoading} />
      <Trending products={trending.slice(0, 8)} isLoading={isLoading} />

      <ForWholesellers />
      <SpecialCollection
        products={(offers.length > 0 ? offers : topSelling).slice(0, 8)}
        isLoading={isLoading}
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
