"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { City, Country, State } from "country-state-city";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CartItemLine } from "@/components/common/CartItemLine";
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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useCheckout } from "@/hooks/useCheckout";
import { useCurrency } from "@/hooks/useCurrency";
import env from "@/lib/env";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/lib/validations/checkoutSchema";

export function CheckoutView() {
  const { items, total } = useCart();
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
  const cities = useMemo(
    () =>
      countryCode && stateCode
        ? City.getCitiesOfState(countryCode, stateCode)
        : countryCode
          ? City.getCitiesOfCountry(countryCode)
          : [],
    [countryCode, stateCode],
  );

  const deliveryCharge =
    total > 250 * env.fxRate ? 0 : env.deliveryCharge * env.fxRate;

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
      const billing = JSON.parse(stored) as CheckoutFormValues & { state?: string };
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
    await checkout.mutateAsync({
      ...values,
      state: stateCode,
      agreeRefund,
    });
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Button asChild className="mt-6">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-start">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" {...register("address")} />
            {errors.address && (
              <p className="text-xs text-destructive">{errors.address.message}</p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Country</Label>
              <Select
                value={countryCode}
                onValueChange={(value) => {
                  setCountryCode(value);
                  setStateCode("");
                  setValue("country", value);
                  setValue("city", "");
                }}
              >
                <SelectTrigger>
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
              <Label>State</Label>
              <Select
                value={stateCode}
                onValueChange={(value) => {
                  setStateCode(value);
                  setValue("city", "");
                }}
              >
                <SelectTrigger>
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
              <Label>City</Label>
              <Select
                value={watch("city")}
                onValueChange={(value) => setValue("city", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((c) => (
                    <SelectItem key={`${c.name}-${c.latitude}`} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.city && (
                <p className="text-xs text-destructive">{errors.city.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="zip">Postal Code</Label>
              <Input id="zip" {...register("zip")} />
            </div>
          </div>
          <div>
            <Label htmlFor="note">Order Note</Label>
            <Textarea id="note" {...register("note")} />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={agreeRefund}
              onCheckedChange={(v) => setAgreeRefund(Boolean(v))}
              id="refund"
            />
            <Label htmlFor="refund" className="text-sm font-normal">
              I agree to the{" "}
              <Link href="/return" className="underline">
                return policy
              </Link>
            </Label>
          </div>
          <Button type="submit" disabled={checkout.isPending} className="w-full">
            {checkout.isPending ? <Spinner className="h-4 w-4" /> : "Place Order"}
          </Button>
        </form>

        <div>
          <h2 className="mb-4 text-lg font-bold">Order Summary</h2>
          {items.map((item) => (
            <CartItemLine key={item.product} item={item} />
          ))}
          <div className="mt-4 space-y-2 border-t pt-4 font-semibold">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{deliveryCharge === 0 ? "Free" : formatPrice(deliveryCharge)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Total</span>
              <span>{formatPrice(total + deliveryCharge)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
