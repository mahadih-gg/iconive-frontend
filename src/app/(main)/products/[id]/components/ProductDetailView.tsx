"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Clock, Heart, Minus, Plus, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import { useProduct } from "@/hooks/useProduct";
import { useWishlist } from "@/hooks/useWishlist";
import type { CartAddon } from "@/types/cart.type";

export function ProductDetailView() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const { data: product, isLoading } = useProduct(id);
  const { formatPrice } = useCurrency();
  const { addToCart, removeFromCart, items } = useCart();
  const { isAuthenticated } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<CartAddon[]>([]);

  const inCart = items.some((i) => i.product === id);
  const inWishlist = isInWishlist(id);

  const basePrice = useMemo(() => {
    if (!product) return 0;
    const price = Number(product.price ?? 0);
    const discount = Number(product.discount ?? 0);
    const discounted = discount > 0 ? price - (price * discount) / 100 : price;
    const addOnTotal = selectedAddOns.reduce(
      (sum, a) => sum + Number(a.price ?? 0),
      0,
    );
    return discounted + addOnTotal;
  }, [product, selectedAddOns]);

  if (isLoading || !product) {
    return (
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  const image =
    (product.photo as string) ??
    product.image ??
    (Array.isArray(product.images) ? String(product.images[0]) : undefined) ??
    "/Image/logo/logo.png";

  const addOns = (product.addons as CartAddon[] | undefined) ?? [];

  function handleCartToggle() {
    if (inCart) {
      removeFromCart(product!._id);
      return;
    }
    addToCart({
      product: product!._id,
      name: product!.name,
      price: basePrice,
      amount: quantity,
      image: String(image),
      addons: selectedAddOns,
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded">
          <Image src={String(image)} alt={product.name} fill className="object-cover" priority />
        </div>
        <div className="text-start">
          <h1 className="text-2xl font-bold uppercase md:text-3xl">{product.name}</h1>
          <p className="mt-3 text-xl font-bold text-primary">{formatPrice(basePrice)}</p>

          {product.description && (
            <p className="mt-4 text-sm text-muted-foreground">
              {String(product.description)}
            </p>
          )}

          {addOns.length > 0 && (
            <div className="mt-6 space-y-2">
              <p className="font-semibold">Options</p>
              {addOns.map((addon) => {
                const selected = selectedAddOns.some((a) => a.name === addon.name);
                return (
                  <button
                    key={addon.name}
                    type="button"
                    className={`block w-full rounded border px-3 py-2 text-left text-sm ${
                      selected ? "border-primary bg-primary/10" : "border-border"
                    }`}
                    onClick={() =>
                      setSelectedAddOns((prev) =>
                        selected
                          ? prev.filter((a) => a.name !== addon.name)
                          : [...prev, addon],
                      )
                    }
                  >
                    {addon.name}: {addon.value}
                    {addon.price ? ` (+${formatPrice(Number(addon.price))})` : ""}
                  </button>
                );
              })}
            </div>
          )}

          <p className="mt-4 flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            Processing Time:
            <span className="pl-2 font-bold text-foreground">15-20 business days</span>
          </p>
          <p className="pt-2 text-xs text-muted-foreground">
            Processing time does not include delivery time
          </p>

          <p className="my-4 text-lg font-bold text-muted-foreground">
            Total : {formatPrice(basePrice * quantity)}
          </p>

          <div className="mb-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleCartToggle} className="px-8 font-bold">
              <ShoppingCart className="mr-2 h-4 w-4" />
              {inCart ? "REMOVE FROM CART" : "ADD TO CART"}
            </Button>
            {isAuthenticated && (
              <Button
                variant="outline"
                onClick={() =>
                  inWishlist ? removeFromWishlist(id) : addToWishlist(id)
                }
              >
                <Heart
                  className={`mr-2 h-4 w-4 ${inWishlist ? "fill-destructive text-destructive" : ""}`}
                />
                Wishlist
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
