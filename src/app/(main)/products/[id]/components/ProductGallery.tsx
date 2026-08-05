"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";

import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  activeIndex: number;
  onActiveChange: (index: number) => void;
  alt: string;
  discount?: number;
}

const ZOOM_SCALE = 2.4;

export function ProductGallery({
  images,
  activeIndex,
  onActiveChange,
  alt,
  discount = 0,
}: ProductGalleryProps) {
  const activeImage = images[activeIndex] ?? images[0] ?? "/Image/logo/logo.png";
  const [isZooming, setIsZooming] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    setOrigin({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  function handleMouseEnter() {
    setIsZooming(true);
  }

  function handleMouseLeave() {
    setIsZooming(false);
    setOrigin({ x: 50, y: 50 });
  }

  return (
    <div className="flex flex-col gap-3 bg-[#f3eee6] p-3 sm:p-4 md:p-5">
      <div
        className="relative aspect-square w-full overflow-hidden bg-white cursor-zoom-in"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <Image
          key={activeImage}
          src={activeImage}
          alt={alt}
          fill
          priority
          className={cn(
            "object-cover transition-transform duration-200 ease-out will-change-transform",
            isZooming && "duration-75",
          )}
          style={{
            transform: isZooming ? `scale(${ZOOM_SCALE})` : "scale(1)",
            transformOrigin: `${origin.x}% ${origin.y}%`,
          }}
          sizes="(max-width: 1024px) 100vw, 50vw"
          draggable={false}
        />
        {discount > 0 ? (
          <span className="font-heading pointer-events-none absolute top-3 left-3 z-10 bg-primary px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary-foreground uppercase">
            OFF {discount}%
          </span>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => onActiveChange(index)}
              aria-label={`View image ${index + 1}`}
              aria-pressed={activeIndex === index}
              className={cn(
                "relative aspect-square overflow-hidden border-2 bg-white transition-colors",
                activeIndex === index
                  ? "border-primary"
                  : "border-transparent hover:border-primary-dark/40",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
