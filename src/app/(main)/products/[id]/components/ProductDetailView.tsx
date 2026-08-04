"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";

import { ProductCarouselSection } from "@/components/common/ProductCarouselSection";
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
import { getReviewStats, PRODUCT_REVIEWS } from "@/data/reviews";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";
import { useProduct } from "@/hooks/useProduct";
import { useWishlist } from "@/hooks/useWishlist";
import type { CartAddon } from "@/types/cart.type";
import type { Product } from "@/types/product.type";
import {
  COLOR_OPTIONS,
  DENSITY_OPTIONS,
  getCategoryId,
  getCategoryLabel,
  getDiscountedPrice,
  getGallery,
  getProductImage,
  LENGTH_OPTIONS,
  SIZE_OPTIONS,
} from "@/utils/product-options";

import { ProductGallery } from "./ProductGallery";
import { ProductPurchasePanel } from "./ProductPurchasePanel";
import { ProductReviews } from "./ProductReviews";

function getRelatedProducts(
  product: Product,
  pools: Product[],
  fallback: Product[],
) {
  const categoryId = getCategoryId(product);
  const related = pools.filter((item, index, list) => {
    if (item._id === product._id) return false;
    const isFirst = list.findIndex((p) => p._id === item._id) === index;
    if (!isFirst) return false;
    if (!categoryId) return true;
    return getCategoryId(item) === categoryId;
  });

  if (related.length > 0) return related.slice(0, 8);

  return fallback
    .filter((item, index, list) => {
      if (item._id === product._id) return false;
      return list.findIndex((p) => p._id === item._id) === index;
    })
    .slice(0, 8);
}

export function ProductDetailView() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const { data: product, isLoading } = useProduct(id);
  const { formatPrice } = useCurrency();
  const { addToCart, removeFromCart, items } = useCart();
  const { isAuthenticated } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const {
    topSelling,
    trending,
    stock,
    isLoading: isFeaturedLoading,
  } = useFeaturedProducts();

  const reviewStats = useMemo(() => getReviewStats(PRODUCT_REVIEWS), []);

  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<CartAddon[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedLength, setSelectedLength] = useState(0);
  const [selectedDensity, setSelectedDensity] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  useEffect(() => {
    setQuantity(1);
    setSelectedAddOns([]);
    setActiveImage(0);
    setSelectedColor(0);
    setSelectedLength(0);
    setSelectedDensity(0);
    setSelectedSize(0);
  }, [id]);

  const gallery = useMemo(
    () => (product ? getGallery(product) : []),
    [product],
  );

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    const discounted = getDiscountedPrice(product);
    const addOnTotal = selectedAddOns.reduce(
      (sum, a) => sum + Number(a.price ?? 0),
      0,
    );
    return discounted + addOnTotal;
  }, [product, selectedAddOns]);

  const totalPrice = unitPrice * quantity;
  const inCart = items.some((i) => i.product === id);
  const inWishlist = isInWishlist(id);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getRelatedProducts(
      product,
      [...stock, ...topSelling, ...trending],
      trending.length > 0 ? trending : topSelling,
    );
  }, [product, stock, topSelling, trending]);

  const topSellingProducts = useMemo(
    () =>
      topSelling
        .filter((item) => item._id !== id)
        .slice(0, 8),
    [topSelling, id],
  );

  function handleAddOnToggle(addon: CartAddon) {
    setSelectedAddOns((prev) => {
      const selected = prev.some((a) => a.name === addon.name);
      if (selected) return prev.filter((a) => a.name !== addon.name);
      return [...prev, addon];
    });
  }

  function handleCartToggle() {
    if (!product) return;
    if (inCart) {
      removeFromCart(product._id);
      return;
    }

    const image = gallery[activeImage] ?? getProductImage(product);
    const sizeAddon: CartAddon = {
      name: "Cap Size",
      value: SIZE_OPTIONS[selectedSize],
    };

    addToCart({
      product: product._id,
      name: product.name,
      price: unitPrice,
      amount: quantity,
      image: String(image),
      color: COLOR_OPTIONS[selectedColor]?.label,
      length: LENGTH_OPTIONS[selectedLength],
      density: DENSITY_OPTIONS[selectedDensity],
      addons: [...selectedAddOns, sizeAddon],
    });
  }

  function handleWishlistToggle() {
    if (inWishlist) removeFromWishlist(id);
    else addToWishlist(id);
  }

  if (isLoading || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <Skeleton className="mb-6 h-4 w-64" />
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-3">
            <Skeleton className="aspect-square w-full" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const discount = Number(product.discount ?? 0);
  const categoryLabel = getCategoryLabel(product);
  const stickyImage =
    gallery[activeImage] ?? getProductImage(product);

  return (
    <div className="pb-20 lg:pb-0">
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
              <BreadcrumbLink asChild>
                <Link href="/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products">{categoryLabel}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 max-w-48 sm:max-w-xs">
                {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="flex flex-col gap-8">
            <ProductGallery
              images={gallery}
              activeIndex={activeImage}
              onActiveChange={setActiveImage}
              alt={product.name}
              discount={discount}
            />
            <ProductReviews productName={product.name} />
          </div>
          <ProductPurchasePanel
            product={product}
            gallery={gallery}
            onActiveImageChange={setActiveImage}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
            selectedLength={selectedLength}
            onLengthChange={setSelectedLength}
            selectedDensity={selectedDensity}
            onDensityChange={setSelectedDensity}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
            selectedAddOns={selectedAddOns}
            onAddOnToggle={handleAddOnToggle}
            quantity={quantity}
            onQuantityChange={setQuantity}
            unitPrice={unitPrice}
            totalPrice={totalPrice}
            reviewAverage={reviewStats.average}
            reviewCount={reviewStats.total}
            inCart={inCart}
            inWishlist={inWishlist}
            isAuthenticated={isAuthenticated}
            onCartToggle={handleCartToggle}
            onWishlistToggle={handleWishlistToggle}
          />
        </div>
      </div>

      <ProductCarouselSection
        label="Complete The Look"
        heading="You May Also Like"
        paragraph="Handpicked pieces that pair beautifully with your selection."
        products={relatedProducts}
        isLoading={isFeaturedLoading}
        viewAllHref="/products"
      />

      <ProductCarouselSection
        label="Our Bestsellers"
        heading="Top Selling Wigs"
        paragraph="Loved by thousands. Handpicked for you."
        products={topSellingProducts}
        isLoading={isFeaturedLoading}
        viewAllHref="/products"
        className="pt-0"
      />

      {/* Mobile sticky buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary-dark/15 bg-background/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="relative size-12 shrink-0 overflow-hidden bg-[#f3eee6]">
            <Image
              src={stickyImage}
              alt=""
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-sm font-semibold text-foreground">
              {product.name}
            </p>
            <p className="text-sm font-semibold text-primary-dark">
              {formatPrice(totalPrice)}
            </p>
          </div>
          <Button
            type="button"
            variant="cta"
            size="ctaSm"
            onClick={handleCartToggle}
            className="shrink-0"
          >
            <ShoppingCart className="size-4" />
            {inCart ? "Remove" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
}
