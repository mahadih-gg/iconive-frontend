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
  categoryFormSchema,
  type CategoryFormValues,
} from "@/lib/validations/admin/categorySchema";
import type { AdminCategory } from "@/types/admin";

const NONE_PARENT = "__none__";

interface CategoryFormProps {
  defaultValues: CategoryFormValues;
  parentOptions: AdminCategory[];
  onSubmit: (values: CategoryFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function CategoryForm({
  defaultValues,
  parentOptions,
  onSubmit,
  isSubmitting,
}: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  });

  const parentId = form.watch("parentId");

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <FieldGroup>
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
            className="rounded-none"
            aria-invalid={!!form.formState.errors.slug}
            {...form.register("slug")}
          />
          <FieldError>{form.formState.errors.slug?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.image}>
          <FieldLabel htmlFor="category-image">Image URL</FieldLabel>
          <Input
            id="category-image"
            className="rounded-none"
            placeholder="/Image/..."
            aria-invalid={!!form.formState.errors.image}
            {...form.register("image")}
          />
          <FieldError>{form.formState.errors.image?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.parentId}>
          <FieldLabel htmlFor="category-parent">Parent category</FieldLabel>
          <Select
            value={parentId || NONE_PARENT}
            onValueChange={(value) =>
              form.setValue("parentId", value === NONE_PARENT ? "" : value)
            }
          >
            <SelectTrigger id="category-parent" className="w-full rounded-none">
              <SelectValue placeholder="Top-level category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NONE_PARENT}>None (top-level)</SelectItem>
              {parentOptions.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError>{form.formState.errors.parentId?.message}</FieldError>
        </Field>

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

      <Button type="submit" disabled={isSubmitting} className="rounded-none">
        {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        Save category
      </Button>
    </form>
  );
}
