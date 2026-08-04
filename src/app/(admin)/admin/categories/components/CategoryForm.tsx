"use client";

import { useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  categoryFormSchema,
  type CategoryFormValues,
} from "@/lib/validations/admin/categorySchema";
import type { AdminCategory } from "@/types/admin";
import { slugify } from "@/utils/slugify";

const NONE_PARENT = "__none__";

interface CategoryFormProps {
  formId: string;
  defaultValues: CategoryFormValues;
  parentOptions?: AdminCategory[];
  /** Hide parent select — used for top-level parent category management */
  hideParentSelect?: boolean;
  onSubmit: (values: CategoryFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function CategoryForm({
  formId,
  defaultValues,
  parentOptions = [],
  hideParentSelect = false,
  onSubmit,
  isSubmitting,
}: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  });

  const nameValue = form.watch("name");
  const parentId = form.watch("parentId");
  const imageValue = form.watch("image");

  useEffect(() => {
    form.setValue("slug", slugify(nameValue ?? ""), {
      shouldDirty: true,
      shouldValidate: form.formState.isSubmitted,
    });
  }, [nameValue, form]);

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.image}>
          <FieldLabel>Image</FieldLabel>
          <ImageUploadField
            value={imageValue}
            onChange={(value) =>
              form.setValue("image", value, { shouldValidate: true })
            }
            disabled={isSubmitting}
            label="Upload category image"
          />
          <FieldError>{form.formState.errors.image?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.name}>
          <FieldLabel htmlFor="category-name">Name</FieldLabel>
          <Input
            id="category-name"
            className="rounded-none"
            aria-invalid={!!form.formState.errors.name}
            {...form.register("name")}
          />
          <FieldError>{form.formState.errors.name?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.slug}>
          <FieldLabel htmlFor="category-slug">Slug</FieldLabel>
          <Input
            id="category-slug"
            className="rounded-none bg-muted"
            readOnly
            aria-readonly="true"
            aria-invalid={!!form.formState.errors.slug}
            {...form.register("slug")}
          />
          <FieldDescription>Auto-generated from the name</FieldDescription>
          <FieldError>{form.formState.errors.slug?.message}</FieldError>
        </Field>

        {!hideParentSelect ? (
          <Field data-invalid={!!form.formState.errors.parentId}>
            <FieldLabel htmlFor="category-parent">Parent category</FieldLabel>
            <Select
              value={parentId || NONE_PARENT}
              onValueChange={(value) =>
                form.setValue("parentId", value === NONE_PARENT ? "" : value)
              }
            >
              <SelectTrigger
                id="category-parent"
                className="w-full rounded-none"
              >
                <SelectValue placeholder="Top-level category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={NONE_PARENT}>None (top-level)</SelectItem>
                  {parentOptions.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError>{form.formState.errors.parentId?.message}</FieldError>
          </Field>
        ) : null}

        <Field data-invalid={!!form.formState.errors.sortOrder}>
          <FieldLabel htmlFor="category-sort-order">Sort order</FieldLabel>
          <Input
            id="category-sort-order"
            type="number"
            min={0}
            className="rounded-none"
            aria-invalid={!!form.formState.errors.sortOrder}
            {...form.register("sortOrder")}
          />
          <FieldError>{form.formState.errors.sortOrder?.message}</FieldError>
        </Field>

        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="category-active">Active</FieldLabel>
          </FieldContent>
          <Switch
            id="category-active"
            checked={form.watch("isActive")}
            onCheckedChange={(checked) => form.setValue("isActive", checked)}
          />
        </Field>
      </FieldGroup>
    </form>
  );
}
