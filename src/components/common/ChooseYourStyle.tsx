import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

import GlareHover from "@/components/GlareHover";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";

const STYLE_CATEGORIES = [
  {
    key: "gents",
    eyebrow: "For Him",
    title: "Gents",
    description: "Be confident with any style you like to own from a large variety of styles.",
    href: "/products?category=6432a3f8bc1e9c4115b67db5&topbanner=1",
    image: "/Image/ImagesPage/gents.webp",
    cta: "Explore Gents",
    ctaVariant: "outline" as const,
  },
  {
    key: "ladies",
    eyebrow: "For Her",
    title: "Ladies",
    description: "Explore yourself, be the glamourous persona you always dreamed of.",
    href: "/products?category=6432eb5a9e5f9a8abde960e0&topbanner=2",
    image: "/Image/ImagesPage/ladies.webp",
    cta: "Explore Ladies",
    ctaVariant: "solid" as const,
  },
] as const;

export function ChooseYourStyle() {
  return (
    <section className="px-4 py-16 sm:py-20 bg-gradient-to-tr from-white to-[#f7f4ef]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          className="mb-10 sm:mb-12"
          label="Made For Every Look"
          heading="Choose Your"
          heading2="Style"
          paragraph="Premium wigs, perfectly crafted for every you."
        />

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {STYLE_CATEGORIES.map((category) => (
            <GlareHover
              key={category.key}
              width="100%"
              height="100%"
              background="transparent"
              borderColor="transparent"
              borderRadius="1rem"
              glareColor="#ffffff"
              glareOpacity={0.4}
              glareSize={280}
              transitionDuration={800}
              className="group min-h-112 border-0 sm:min-h-128"
            >
              <article className="relative min-h-112 w-full overflow-hidden rounded-2xl sm:min-h-128">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/15" />

                <div className="absolute inset-0 z-10 flex flex-col p-6 sm:p-8">
                  <div className="flex h-full max-w-sm flex-col items-start justify-between pt-2">
                    <div>
                      <p className="inline-block font-heading text-xs tracking-[0.22em] text-primary uppercase sm:text-sm">
                        {category.eyebrow}
                      </p>

                      <h3 className="font-heading mt-2 text-4xl font-medium tracking-[0.04em] text-white uppercase sm:text-5xl md:mt-4">
                        {category.title}
                      </h3>

                      <span className="mt-3 block h-px w-12 bg-primary" aria-hidden />
                      <p className="mt-4 max-w-[250px] text-sm leading-relaxed text-white/85 md:mt-8 md:text-base">
                        {category.description}
                      </p>
                    </div>
                    <Button
                      variant={category.ctaVariant === "solid" ? "cta" : "ctaOutline"}
                      size="ctaSm"
                      iconMotion="right"
                      asChild
                    >
                      <Link href={category.href}>
                        {category.cta}
                        <span data-slot="button-arrow" aria-hidden>
                          <BsArrowRight />
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            </GlareHover>
          ))}
        </div>
      </div>
    </section>
  );
}
