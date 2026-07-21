"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { ProductCard } from "@/components/common/ProductCard";
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
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-center text-3xl font-bold">Wholesale</h1>
      <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
        Shop wigs in bulk at discounted prices. Ideal for resellers or stocking up on
        your favorite styles.
      </p>

      <div className="mb-12 flex flex-wrap justify-center gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-44" />
            ))
          : products.map((p) => (
              <ProductCard key={p._id} product={p} className="w-40 md:w-48" />
            ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-lg space-y-4 text-start"
      >
        <h2 className="text-xl font-bold">Wholesale Inquiry</h2>
        <div>
          <Label htmlFor="name">Name</Label>
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
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" {...register("message")} />
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner className="h-4 w-4" /> : "Submit Inquiry"}
        </Button>
      </form>
    </div>
  );
}
