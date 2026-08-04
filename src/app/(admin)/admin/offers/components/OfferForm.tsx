"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ImageUploadField } from "@/components/admin/shared/ImageUploadField";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  offerFormSchema,
  type OfferFormValues,
} from "@/lib/validations/admin/offerSchema";
import type { AdminCategory, AdminProduct } from "@/types/admin";

interface OfferFormProps {
  formId: string;
  defaultValues: OfferFormValues;
  products: AdminProduct[];
  categories: AdminCategory[];
  onSubmit: (values: OfferFormValues) => void | Promise<void>;
}

export function OfferForm({
  formId,
  defaultValues,
  products,
  categories,
  onSubmit,
}: OfferFormProps) {
  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerFormSchema),
    defaultValues,
  });

  const productIds = form.watch("productIds");
  const categoryIds = form.watch("categoryIds");
  const subCategoryIds = form.watch("subCategoryIds");
  const discountType = form.watch("discountType");

  const topLevelCategories = useMemo(
    () => categories.filter((category) => category.parentId === null),
    [categories],
  );

  const subCategories = useMemo(() => {
    const children = categories.filter((category) => category.parentId !== null);
    if (categoryIds.length === 0) return children;
    return children.filter(
      (category) =>
        category.parentId !== null && categoryIds.includes(category.parentId),
    );
  }, [categories, categoryIds]);

  const productOptions = useMemo(
    () =>
      products.map((product) => ({
        value: product._id,
        label: product.name,
      })),
    [products],
  );

  const categoryOptions = useMemo(
    () =>
      topLevelCategories.map((category) => ({
        value: category._id,
        label: category.name,
      })),
    [topLevelCategories],
  );

  const subCategoryOptions = useMemo(
    () =>
      subCategories.map((category) => ({
        value: category._id,
        label: category.name,
      })),
    [subCategories],
  );

  const targetError =
    form.formState.errors.productIds?.message ||
    form.formState.errors.categoryIds?.message ||
    form.formState.errors.subCategoryIds?.message;

  return (
    <form
      id={formId}
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

        <div className="flex flex-col gap-4">
          <Field data-invalid={!!targetError}>
            <FieldLabel htmlFor="offer-products">Products</FieldLabel>
            <MultiSelect
              id="offer-products"
              options={productOptions}
              value={productIds}
              onChange={(value) =>
                form.setValue("productIds", value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              placeholder="Select products"
              searchPlaceholder="Search products..."
              emptyText="No products found"
              aria-invalid={!!targetError}
            />
          </Field>

          <Field data-invalid={!!targetError}>
            <FieldLabel htmlFor="offer-categories">Categories</FieldLabel>
            <MultiSelect
              id="offer-categories"
              options={categoryOptions}
              value={categoryIds}
              onChange={(value) => {
                form.setValue("categoryIds", value, {
                  shouldDirty: true,
                  shouldValidate: true,
                });

                const allowedParents = new Set(value);
                const nextSubCategoryIds = form
                  .getValues("subCategoryIds")
                  .filter((id) => {
                    const sub = categories.find((item) => item._id === id);
                    return (
                      !sub?.parentId ||
                      allowedParents.size === 0 ||
                      allowedParents.has(sub.parentId)
                    );
                  });

                form.setValue("subCategoryIds", nextSubCategoryIds, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              placeholder="Select categories"
              searchPlaceholder="Search categories..."
              emptyText="No categories found"
              aria-invalid={!!targetError}
            />
          </Field>

          <Field data-invalid={!!targetError}>
            <FieldLabel htmlFor="offer-subcategories">Subcategories</FieldLabel>
            <MultiSelect
              id="offer-subcategories"
              options={subCategoryOptions}
              value={subCategoryIds}
              onChange={(value) =>
                form.setValue("subCategoryIds", value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              placeholder="Select subcategories"
              searchPlaceholder="Search subcategories..."
              emptyText="No subcategories found"
              aria-invalid={!!targetError}
            />
            <FieldDescription>
              Select at least one product, category, or subcategory.
            </FieldDescription>
            <FieldError>{targetError}</FieldError>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="offer-discount-type">Discount Type</FieldLabel>
            <Select
              value={discountType}
              onValueChange={(value: "percentage" | "fixed") =>
                form.setValue("discountType", value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger
                id="offer-discount-type"
                className="w-full rounded-none"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage (%)</SelectItem>
                <SelectItem value="fixed">Fixed amount</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field data-invalid={!!form.formState.errors.discount}>
            <FieldLabel htmlFor="offer-discount">
              {discountType === "fixed" ? "Discount ($)" : "Discount (%)"}
            </FieldLabel>
            <Input
              id="offer-discount"
              type="number"
              min={0.01}
              max={discountType === "percentage" ? 100 : undefined}
              step="0.01"
              className="rounded-none"
              aria-invalid={!!form.formState.errors.discount}
              {...form.register("discount")}
            />
            <FieldError>{form.formState.errors.discount?.message}</FieldError>
          </Field>
        </div>

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
          <FieldLabel>Banner image</FieldLabel>
          <ImageUploadField
            value={form.watch("bannerImage") ?? ""}
            onChange={(value) =>
              form.setValue("bannerImage", value, { shouldValidate: true })
            }
            label="Upload banner"
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
    </form>
  );
}
