"use client";

import Image from "next/image";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const SLIDES = [
  { src: "/Image/banner/banner1.webp", alt: "First slide" },
  { src: "/Image/banner/banner2.webp", alt: "Second slide" },
] as const;

export function HomeCarousel() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      effect="fade"
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
      className="w-full"
    >
      {SLIDES.map((slide) => (
        <SwiperSlide key={slide.src}>
          <div className="relative w-full">
            <Image
              src={slide.src}
              alt={slide.alt}
              width={1920}
              height={700}
              className="h-auto w-full"
              priority
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
