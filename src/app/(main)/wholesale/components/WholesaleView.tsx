"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgePercent, Package, Truck } from "lucide-react";
import { toast } from "sonner";

import { ProductCard } from "@/components/common/ProductCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useWholesale } from "@/hooks/useWholesale";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contactSchema";
import { cn } from "@/lib/utils";

const fieldClassName =
  "rounded-none border-primary-dark/20 bg-white shadow-none focus-visible:border-primary focus-visible:ring-primary/30";

const labelClassName =
  "font-heading mb-1.5 text-[11px] font-semibold tracking-[0.16em] text-primary-dark uppercase";

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

export function WholesaleView() {
  const { isAuthenticated } = useAuth();
  const { products, isLoading, submitInquiry, isSubmitting } = useWholesale();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    if (!isAuthenticated) {
      toast.error("Please login to submit a wholesale inquiry");
      window.location.href = "/login?redirect=wholesale";
      return;
    }
    await submitInquiry(values);
    reset();
  }

  return (
    <div className="w-full pb-16">
      <div className="relative w-full overflow-hidden">
        <Image
          src="/Image/wholesale/wholesalebanner.webp"
          alt="Iconive wholesale"
          width={1600}
          height={500}
          className="h-auto max-h-70 w-full object-cover sm:max-h-90 lg:max-h-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              Bulk pricing
            </p>
            <h1 className="font-heading mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Wholesale
            </h1>
          </div>
        </div>
      </div>

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
              <BreadcrumbPage>Wholesale</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8 border-2 border-primary-dark/20 bg-[#fffcf8] p-5 sm:mb-10 sm:p-8">
          <div className="max-w-2xl">
            <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
              For resellers & stockists
            </p>
            <h2 className="font-heading mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Shop wigs in bulk
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Ideal for resellers or stocking up on your favorite styles. Browse
              wholesale-ready pieces, then send an inquiry for volume pricing and
              support.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: BadgePercent,
                title: "Volume discounts",
                text: "Better rates when you order in quantity.",
              },
              {
                icon: Package,
                title: "Catalog ready",
                text: "Curated styles suited for retail restocking.",
              },
              {
                icon: Truck,
                title: "Dedicated support",
                text: "Our team helps with quotes and fulfillment.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-3 border border-primary-dark/15 bg-[#f3eee6]/60 px-4 py-3"
              >
                <item.icon className="mt-0.5 size-4 shrink-0 text-primary-dark" />
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-8 xl:gap-10">
          <section>
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
                  Catalog
                </p>
                <h2 className="font-heading mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                  Wholesale styles
                </h2>
              </div>
              {!isLoading && (
                <p className="text-sm text-muted-foreground">
                  {products.length} products
                </p>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="aspect-3/4 w-full rounded-none"
                  />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="border-2 border-primary-dark/20 bg-[#fffcf8] px-5 py-12 text-center">
                <p className="font-heading text-lg font-semibold">
                  No wholesale products yet
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Send an inquiry and we&apos;ll help you get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    className="w-full"
                  />
                ))}
              </div>
            )}
          </section>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <SectionCard label="Inquiry" title="Wholesale Inquiry">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Tell us about your business and order needs. We&apos;ll follow up
                with pricing and availability.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name" className={labelClassName}>
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    className={fieldClassName}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

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
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
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
                </div>

                <div>
                  <Label htmlFor="message" className={labelClassName}>
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Estimated quantity, styles of interest, business details…"
                    className={cn(fieldClassName, "min-h-24")}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="cta"
                  size="ctaSm"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Spinner className="size-4" />
                  ) : (
                    "Submit Inquiry"
                  )}
                </Button>

                {!isAuthenticated && (
                  <p className="text-center text-[11px] text-muted-foreground">
                    You&apos;ll be asked to{" "}
                    <Link
                      href="/login?redirect=wholesale"
                      className="font-medium text-primary-dark underline underline-offset-2"
                    >
                      log in
                    </Link>{" "}
                    before submitting.
                  </p>
                )}
              </form>
            </SectionCard>
          </aside>
        </div>
      </div>
    </div>
  );
}
