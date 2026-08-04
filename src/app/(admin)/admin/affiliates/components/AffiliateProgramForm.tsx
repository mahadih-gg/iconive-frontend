"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  label: z.string().min(1, "Label is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image URL is required"),
  isActive: z.boolean(),
});

export type AffiliateProgramFormValues = z.infer<typeof schema>;

interface AffiliateProgramFormProps {
  defaultValues: AffiliateProgramFormValues;
  onSubmit: (values: AffiliateProgramFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function AffiliateProgramForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Save",
}: AffiliateProgramFormProps) {
  const form = useForm<AffiliateProgramFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.label}>
          <FieldLabel htmlFor="program-label">Label</FieldLabel>
          <Input
            id="program-label"
            aria-invalid={!!form.formState.errors.label}
            {...form.register("label")}
          />
          <FieldError>{form.formState.errors.label?.message}</FieldError>
        </Field>
        <Field data-invalid={!!form.formState.errors.title}>
          <FieldLabel htmlFor="program-title">Title</FieldLabel>
          <Input
            id="program-title"
            aria-invalid={!!form.formState.errors.title}
            {...form.register("title")}
          />
          <FieldError>{form.formState.errors.title?.message}</FieldError>
        </Field>
        <Field data-invalid={!!form.formState.errors.description}>
          <FieldLabel htmlFor="program-description">Description</FieldLabel>
          <Textarea
            id="program-description"
            rows={4}
            aria-invalid={!!form.formState.errors.description}
            {...form.register("description")}
          />
          <FieldError>{form.formState.errors.description?.message}</FieldError>
        </Field>
        <Field data-invalid={!!form.formState.errors.image}>
          <FieldLabel htmlFor="program-image">Image URL</FieldLabel>
          <Input
            id="program-image"
            aria-invalid={!!form.formState.errors.image}
            {...form.register("image")}
          />
          <FieldError>{form.formState.errors.image?.message}</FieldError>
        </Field>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="program-active">Active</FieldLabel>
          <Controller
            name="isActive"
            control={form.control}
            render={({ field }) => (
              <Switch
                id="program-active"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </Field>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
          {submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
}
