"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ImageUploadField } from "@/components/admin/shared/ImageUploadField";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  heroBannerFormSchema,
  type HeroBannerFormValues,
} from "@/lib/validations/admin/heroBannerSchema";

interface HeroBannerFormProps {
  formId: string;
  defaultValues: HeroBannerFormValues;
  onSubmit: (values: HeroBannerFormValues) => void | Promise<void>;
}

export function HeroBannerForm({
  formId,
  defaultValues,
  onSubmit,
}: HeroBannerFormProps) {
  const form = useForm<HeroBannerFormValues>({
    resolver: zodResolver(heroBannerFormSchema),
    defaultValues,
  });

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
            value={form.watch("image")}
            onChange={(value) =>
              form.setValue("image", value, { shouldValidate: true })
            }
            label="Upload banner"
          />
          <FieldError>{form.formState.errors.image?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.sortOrder}>
          <FieldLabel htmlFor="hero-banner-sort-order">Sort order</FieldLabel>
          <Input
            id="hero-banner-sort-order"
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
            <FieldLabel htmlFor="hero-banner-active">Active</FieldLabel>
          </FieldContent>
          <Switch
            id="hero-banner-active"
            checked={form.watch("isActive")}
            onCheckedChange={(checked) => form.setValue("isActive", checked)}
          />
        </Field>
      </FieldGroup>
    </form>
  );
}
