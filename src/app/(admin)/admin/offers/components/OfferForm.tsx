"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  offerFormSchema,
  type OfferFormValues,
} from "@/lib/validations/admin/offerSchema";
import type { AdminProduct } from "@/types/admin";

interface OfferFormProps {
  defaultValues: OfferFormValues;
  products: AdminProduct[];
  onSubmit: (values: OfferFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function OfferForm({
  defaultValues,
  products,
  onSubmit,
  isSubmitting,
}: OfferFormProps) {
  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerFormSchema),
    defaultValues,
  });

  const productId = form.watch("productId");

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.title}>
          <FieldLabel htmlFor="offer-title">Title</FieldLabel>
          <Input
            id="offer-title"
            className="rounded-none"
            aria-invalid={!!form.formState.errors.title}
            {...form.register("title")}
          />
          <FieldError>{form.formState.errors.title?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.productId}>
          <FieldLabel htmlFor="offer-product">Product</FieldLabel>
          <Select
            value={productId}
            onValueChange={(value) => form.setValue("productId", value)}
          >
            <SelectTrigger id="offer-product" className="w-full rounded-none">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product._id} value={product._id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError>{form.formState.errors.productId?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.discountPercent}>
          <FieldLabel htmlFor="offer-discount">Discount (%)</FieldLabel>
          <Input
            id="offer-discount"
            type="number"
            min={1}
            max={100}
            className="rounded-none"
            aria-invalid={!!form.formState.errors.discountPercent}
            {...form.register("discountPercent")}
          />
          <FieldError>{form.formState.errors.discountPercent?.message}</FieldError>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.startsAt}>
            <FieldLabel htmlFor="offer-starts-at">Starts at</FieldLabel>
            <Input
              id="offer-starts-at"
              type="datetime-local"
              className="rounded-none"
              aria-invalid={!!form.formState.errors.startsAt}
              {...form.register("startsAt")}
            />
            <FieldError>{form.formState.errors.startsAt?.message}</FieldError>
          </Field>

          <Field data-invalid={!!form.formState.errors.endsAt}>
            <FieldLabel htmlFor="offer-ends-at">Ends at</FieldLabel>
            <Input
              id="offer-ends-at"
              type="datetime-local"
              className="rounded-none"
              aria-invalid={!!form.formState.errors.endsAt}
              {...form.register("endsAt")}
            />
            <FieldError>{form.formState.errors.endsAt?.message}</FieldError>
          </Field>
        </div>

        <Field data-invalid={!!form.formState.errors.bannerImage}>
          <FieldLabel htmlFor="offer-banner">Banner image URL</FieldLabel>
          <Input
            id="offer-banner"
            className="rounded-none"
            placeholder="/Image/..."
            aria-invalid={!!form.formState.errors.bannerImage}
            {...form.register("bannerImage")}
          />
          <FieldError>{form.formState.errors.bannerImage?.message}</FieldError>
        </Field>

        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="offer-active">Active</FieldLabel>
          </FieldContent>
          <Switch
            id="offer-active"
            checked={form.watch("isActive")}
            onCheckedChange={(checked) => form.setValue("isActive", checked)}
          />
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={isSubmitting} className="rounded-none">
        {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        Save offer
      </Button>
    </form>
  );
}
