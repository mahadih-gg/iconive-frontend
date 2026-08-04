"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { MultiImageUploadField } from "@/components/admin/shared/MultiImageUploadField";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  productFormSchema,
  type ProductFormValues,
} from "@/lib/validations/admin/productSchema";
import type { AdminCategory } from "@/types/admin";

const NONE_SUBCATEGORY = "__none__";

interface ProductFormProps {
  formId: string;
  defaultValues: ProductFormValues;
  categories: AdminCategory[];
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
}

export function ProductForm({
  formId,
  defaultValues,
  categories,
  onSubmit,
}: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const categoryId = form.watch("categoryId");
  const subCategoryId = form.watch("subCategoryId");

  const topLevelCategories = useMemo(
    () => categories.filter((category) => category.parentId === null),
    [categories],
  );

  const subCategories = useMemo(
    () =>
      categories.filter(
        (category) => category.parentId !== null && category.parentId === categoryId,
      ),
    [categories, categoryId],
  );

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.name}>
          <FieldLabel htmlFor="product-name">Name</FieldLabel>
          <Input
            id="product-name"
            className="rounded-none"
            aria-invalid={!!form.formState.errors.name}
            {...form.register("name")}
          />
          <FieldError>{form.formState.errors.name?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.description}>
          <FieldLabel htmlFor="product-description">Description</FieldLabel>
          <Textarea
            id="product-description"
            className="rounded-none"
            rows={4}
            aria-invalid={!!form.formState.errors.description}
            {...form.register("description")}
          />
          <FieldError>{form.formState.errors.description?.message}</FieldError>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.price}>
            <FieldLabel htmlFor="product-price">Price</FieldLabel>
            <Input
              id="product-price"
              type="number"
              min={0}
              step="0.01"
              className="rounded-none"
              aria-invalid={!!form.formState.errors.price}
              {...form.register("price")}
            />
            <FieldError>{form.formState.errors.price?.message}</FieldError>
          </Field>

          <Field data-invalid={!!form.formState.errors.discount}>
            <FieldLabel htmlFor="product-discount">Discount (%)</FieldLabel>
            <Input
              id="product-discount"
              type="number"
              min={0}
              max={100}
              className="rounded-none"
              aria-invalid={!!form.formState.errors.discount}
              {...form.register("discount")}
            />
            <FieldError>{form.formState.errors.discount?.message}</FieldError>
          </Field>
        </div>

        <Field data-invalid={!!form.formState.errors.images}>
          <FieldLabel>Images</FieldLabel>
          <MultiImageUploadField
            value={form.watch("images")}
            onChange={(images) =>
              form.setValue("images", images, { shouldValidate: true })
            }
          />
          <FieldError>{form.formState.errors.images?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.categoryId}>
          <FieldLabel htmlFor="product-category">Category</FieldLabel>
          <Select
            value={categoryId}
            onValueChange={(value) => {
              form.setValue("categoryId", value);
              form.setValue("subCategoryId", "");
            }}
          >
            <SelectTrigger id="product-category" className="w-full rounded-none">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {topLevelCategories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError>{form.formState.errors.categoryId?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.subCategoryId}>
          <FieldLabel htmlFor="product-subcategory">Subcategory</FieldLabel>
          <Select
            value={subCategoryId || NONE_SUBCATEGORY}
            onValueChange={(value) =>
              form.setValue(
                "subCategoryId",
                value === NONE_SUBCATEGORY ? "" : value,
              )
            }
            disabled={subCategories.length === 0}
          >
            <SelectTrigger id="product-subcategory" className="w-full rounded-none">
              <SelectValue placeholder="Optional subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NONE_SUBCATEGORY}>None</SelectItem>
              {subCategories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError>{form.formState.errors.subCategoryId?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.stock}>
          <FieldLabel htmlFor="product-stock">Stock</FieldLabel>
          <Input
            id="product-stock"
            type="number"
            min={0}
            className="rounded-none"
            aria-invalid={!!form.formState.errors.stock}
            {...form.register("stock")}
          />
          <FieldError>{form.formState.errors.stock?.message}</FieldError>
        </Field>

        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="product-featured">Featured</FieldLabel>
          </FieldContent>
          <Checkbox
            id="product-featured"
            checked={form.watch("isFeatured")}
            onCheckedChange={(checked) =>
              form.setValue("isFeatured", checked === true)
            }
          />
        </Field>

        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="product-available">Available</FieldLabel>
          </FieldContent>
          <Switch
            id="product-available"
            checked={form.watch("available")}
            onCheckedChange={(checked) => form.setValue("available", checked)}
          />
        </Field>
      </FieldGroup>
    </form>
  );
}
