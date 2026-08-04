"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { City, Country, State } from "country-state-city";
import { ArrowRight, Heart, Lock, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CartItemLine } from "@/components/common/CartItemLine";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useCheckout } from "@/hooks/useCheckout";
import { useCurrency } from "@/hooks/useCurrency";
import env from "@/lib/env";
import { cn } from "@/lib/utils";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/lib/validations/checkoutSchema";
import { getCartLineKey } from "@/utils/cart-line";

const fieldClassName =
  "rounded-none border-primary-dark/20 bg-white shadow-none focus-visible:border-primary focus-visible:ring-primary/30";

const labelClassName =
  "font-heading mb-1.5 text-[11px] font-semibold tracking-[0.16em] text-primary-dark uppercase";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-destructive">{message}</p>;
}

function SectionCard({
  label,
  title,
  children,
  className,
}: {
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "border-2 border-primary-dark/20 bg-[#fffcf8] p-4 sm:p-6",
        className,
      )}
    >
      <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
        {label}
      </p>
      <h2 className="font-heading mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function CheckoutEmptyState() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 lg:px-8">
      <Breadcrumb className="mb-8">
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
            <BreadcrumbPage>Checkout</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="border-2 border-primary-dark/20 bg-[#fffcf8] px-5 py-10 text-center sm:px-10 sm:py-14">
        <div className="mx-auto flex size-14 items-center justify-center bg-primary/15 text-primary-dark sm:size-16">
          <ShoppingBag className="size-7 sm:size-8" aria-hidden />
        </div>

        <p className="font-heading mt-6 text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
          Checkout
        </p>
        <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Your cart is empty
        </h1>
        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
          You don&apos;t have any items ready for checkout yet. Browse our
          collection and add a piece you love to continue.
        </p>

        <ul className="mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-2">
          <li className="flex items-start gap-2.5 border border-primary-dark/15 bg-[#f3eee6]/60 px-4 py-3">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-primary-dark" />
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">
                Find your style
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Explore bestsellers and new arrivals.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2.5 border border-primary-dark/15 bg-[#f3eee6]/60 px-4 py-3">
            <Heart className="mt-0.5 size-4 shrink-0 text-primary-dark" />
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">
                Save favorites
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Wishlist pieces and checkout when ready.
              </p>
            </div>
          </li>
        </ul>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
          <Button asChild variant="cta" size="cta" className="h-12" iconMotion="right">
            <Link href="/products">
              Shop Wigs
              <span data-slot="button-arrow" aria-hidden>
                <ArrowRight />
              </span>
            </Link>
          </Button>
          <Button
            asChild
            variant="ctaOutline"
            size="cta"
            className="h-12 border-primary-dark text-primary-dark hover:bg-primary-dark/10"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CheckoutView() {
  const router = useRouter();
  const { items, total, isHydrated } = useCart();
  const { formatPrice } = useCurrency();
  const { isAuthenticated } = useAuth();
  const checkout = useCheckout();
  const [agreeRefund, setAgreeRefund] = useState(false);
  const [countryCode, setCountryCode] = useState("BD");
  const [stateCode, setStateCode] = useState("");

  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(
    () => (countryCode ? State.getStatesOfCountry(countryCode) : []),
    [countryCode],
  );
  const cities = useMemo(() => {
    if (!countryCode) return [];

    const countryCities = City.getCitiesOfCountry(countryCode) ?? [];

    if (!stateCode) return countryCities;

    const stateCities = City.getCitiesOfState(countryCode, stateCode);
    if (stateCities.length > 0) return stateCities;

    return countryCities.filter((city) => city.stateCode === stateCode);
  }, [countryCode, stateCode]);

  const deliveryCharge =
    total > 250 * env.fxRate ? 0 : env.deliveryCharge * env.fxRate;
  const grandTotal = total + deliveryCharge;
  const itemCount = items.reduce((sum, item) => sum + item.amount, 0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "BD",
      zip: "",
      note: "",
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem("billingInfo");
    if (!stored) return;
    try {
      const billing = JSON.parse(stored) as CheckoutFormValues & {
        state?: string;
      };
      Object.entries(billing).forEach(([key, value]) => {
        if (typeof value === "string") {
          setValue(key as keyof CheckoutFormValues, value);
        }
      });
      if (billing.country) setCountryCode(billing.country);
      if (billing.state) setStateCode(billing.state);
    } catch {
      /* ignore */
    }
  }, [setValue]);

  async function onSubmit(values: CheckoutFormValues) {
    if (!isAuthenticated) {
      localStorage.setItem(
        "billingInfo",
        JSON.stringify({ ...values, state: stateCode }),
      );
      window.location.href = "/login?proceeedToCheckout=true";
      return;
    }

    try {
      await checkout.mutateAsync({
        ...values,
        state: stateCode,
        agreeRefund,
      });
      toast.success("Order placed successfully");
      router.push("/checkout/thank-you");
    } catch {
      /* error toast handled in useCheckout */
    }
  }

  if (!isHydrated) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 sm:py-14 lg:px-8">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  if (items.length === 0 && (checkout.isPending || checkout.isSuccess)) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="font-heading text-sm font-semibold tracking-wide text-primary-dark uppercase">
          {checkout.isSuccess ? "Redirecting…" : "Placing your order…"}
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return <CheckoutEmptyState />;
  }

  return (
    <div className="pb-24 lg:pb-0">
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
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8 sm:mb-10">
          <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
            Secure Checkout
          </p>
          <h1 className="font-heading mt-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            Enter your details below. You have {itemCount} item
            {itemCount === 1 ? "" : "s"} ready to ship.
          </p>
        </div>

        <form
          id="checkout-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 xl:gap-12"
        >
          <div className="flex flex-col gap-5 sm:gap-6">
            <SectionCard label="Step 01" title="Contact Details">
              <div>
                <Label htmlFor="name" className={labelClassName}>
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  className={fieldClassName}
                  {...register("name")}
                />
                <FieldError message={errors.name?.message} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email" className={labelClassName}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={fieldClassName}
                    {...register("email")}
                  />
                  <FieldError message={errors.email?.message} />
                </div>
                <div>
                  <Label htmlFor="phone" className={labelClassName}>
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+880 1XXX XXXXXX"
                    className={fieldClassName}
                    {...register("phone")}
                  />
                  <FieldError message={errors.phone?.message} />
                </div>
              </div>
            </SectionCard>

            <SectionCard label="Step 02" title="Shipping Address">
              <div>
                <Label htmlFor="address" className={labelClassName}>
                  Street Address
                </Label>
                <Textarea
                  id="address"
                  rows={3}
                  placeholder="House, road, area"
                  className={cn(fieldClassName, "min-h-20")}
                  {...register("address")}
                />
                <FieldError message={errors.address?.message} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className={labelClassName}>Country</Label>
                  <Select
                    value={countryCode}
                    onValueChange={(value) => {
                      setCountryCode(value);
                      setStateCode("");
                      setValue("country", value);
                      setValue("city", "");
                    }}
                  >
                    <SelectTrigger className={cn(fieldClassName, "w-full")}>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.isoCode} value={c.isoCode}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className={labelClassName}>State / Region</Label>
                  <Select
                    value={stateCode}
                    onValueChange={(value) => {
                      setStateCode(value);
                      setValue("city", "");
                    }}
                    disabled={states.length === 0}
                  >
                    <SelectTrigger className={cn(fieldClassName, "w-full")}>
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((s) => (
                        <SelectItem key={s.isoCode} value={s.isoCode}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="city" className={labelClassName}>
                    City
                  </Label>
                  {cities.length > 0 ? (
                    <Select
                      value={watch("city")}
                      onValueChange={(value) => setValue("city", value)}
                    >
                      <SelectTrigger className={cn(fieldClassName, "w-full")}>
                        <SelectValue placeholder="City" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((c) => (
                          <SelectItem
                            key={`${c.name}-${c.latitude}`}
                            value={c.name}
                          >
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="city"
                      placeholder="Enter your city"
                      className={fieldClassName}
                      {...register("city")}
                    />
                  )}
                  <FieldError message={errors.city?.message} />
                </div>

                <div>
                  <Label htmlFor="zip" className={labelClassName}>
                    Postal Code
                  </Label>
                  <Input
                    id="zip"
                    placeholder="Optional"
                    className={fieldClassName}
                    {...register("zip")}
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard label="Step 03" title="Order Notes">
              <div>
                <Label htmlFor="note" className={labelClassName}>
                  Special Instructions
                </Label>
                <Textarea
                  id="note"
                  rows={3}
                  placeholder="Delivery notes, gift message, or fit preferences"
                  className={cn(fieldClassName, "min-h-20")}
                  {...register("note")}
                />
              </div>

              <div className="flex items-start gap-3 border border-primary-dark/15 bg-[#f3eee6]/50 px-3 py-3">
                <Checkbox
                  checked={agreeRefund}
                  onCheckedChange={(v) => setAgreeRefund(Boolean(v))}
                  id="refund"
                  className="mt-0.5 rounded-none border-primary-dark/40 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label
                  htmlFor="refund"
                  className="text-sm leading-relaxed font-normal text-foreground"
                >
                  I agree to the{" "}
                  <Link
                    href="/return"
                    className="font-medium text-primary-dark underline underline-offset-2 transition-colors hover:text-primary"
                  >
                    return policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                variant="cta"
                size="cta"
                disabled={checkout.isPending}
                className="hidden h-12 w-full lg:inline-flex"
              >
                {checkout.isPending ? (
                  <Spinner className="size-4" />
                ) : (
                  <>
                    <Lock className="size-4" />
                    Place Order · {formatPrice(grandTotal)}
                  </>
                )}
              </Button>

              {!isAuthenticated ? (
                <p className="text-center text-xs text-muted-foreground">
                  You&apos;ll be asked to sign in before placing your order.
                </p>
              ) : null}
            </SectionCard>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="border-2 border-primary-dark/20 bg-[#fffcf8]">
              <div className="border-b border-primary-dark/15 px-4 py-4 sm:px-5 sm:py-5">
                <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
                  Your Order
                </p>
                <h2 className="font-heading mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Order Summary
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {itemCount} item{itemCount === 1 ? "" : "s"} in your bag
                </p>
              </div>

              <div className="max-h-112 overflow-y-auto px-4 sm:px-5">
                <ul>
                  {items.map((item) => (
                    <li key={getCartLineKey(item)}>
                      <CartItemLine item={item} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 border-t border-primary-dark/15 px-4 py-4 sm:px-5 sm:py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    {formatPrice(total)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium text-foreground">
                    {deliveryCharge === 0
                      ? "Free"
                      : formatPrice(deliveryCharge)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-t border-primary-dark/15 pt-3">
                  <span className="font-heading text-sm font-semibold tracking-wide text-foreground uppercase">
                    Total
                  </span>
                  <span className="text-xl font-semibold text-primary-dark">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Taxes and final shipping may be confirmed at fulfillment.
                  Processing typically takes 15–20 business days.
                </p>
              </div>
            </div>
          </aside>
        </form>
      </div>

      {/* Mobile sticky place-order bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary-dark/15 bg-[#fffcf8]/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-heading text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
              Total
            </p>
            <p className="truncate text-base font-semibold text-primary-dark">
              {formatPrice(grandTotal)}
            </p>
          </div>
          <Button
            type="submit"
            form="checkout-form"
            variant="cta"
            size="ctaSm"
            disabled={checkout.isPending}
            className="shrink-0"
          >
            {checkout.isPending ? (
              <Spinner className="size-4" />
            ) : (
              <>
                <Lock className="size-3.5" />
                Place Order
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
