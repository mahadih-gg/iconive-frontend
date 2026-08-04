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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

const STATUSES = ["pending", "approved", "rejected"] as const;

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  status: z.enum(STATUSES),
});

export type WholesaleSellerFormValues = z.infer<typeof schema>;

interface WholesaleSellerFormProps {
  defaultValues: WholesaleSellerFormValues;
  onSubmit: (values: WholesaleSellerFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function WholesaleSellerForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Save",
}: WholesaleSellerFormProps) {
  const form = useForm<WholesaleSellerFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.name}>
          <FieldLabel htmlFor="seller-name">Name</FieldLabel>
          <Input
            id="seller-name"
            aria-invalid={!!form.formState.errors.name}
            {...form.register("name")}
          />
          <FieldError>{form.formState.errors.name?.message}</FieldError>
        </Field>
        <Field data-invalid={!!form.formState.errors.email}>
          <FieldLabel htmlFor="seller-email">Email</FieldLabel>
          <Input
            id="seller-email"
            type="email"
            aria-invalid={!!form.formState.errors.email}
            {...form.register("email")}
          />
          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="seller-phone">Phone</FieldLabel>
          <Input id="seller-phone" {...form.register("phone")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="seller-company">Company</FieldLabel>
          <Input id="seller-company" {...form.register("company")} />
        </Field>
        <Field data-invalid={!!form.formState.errors.status}>
          <FieldLabel>Status</FieldLabel>
          <Controller
            name="status"
            control={form.control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{form.formState.errors.status?.message}</FieldError>
        </Field>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
          {submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
}
