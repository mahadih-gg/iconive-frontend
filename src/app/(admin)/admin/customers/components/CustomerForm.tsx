"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { AdminCustomer } from "@/types/admin";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  isWholeSaler: z.boolean(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  addressCount: z.coerce
    .number()
    .int()
    .min(0, "Address count must be 0 or greater"),
});

export type CustomerFormValues = z.infer<typeof schema>;

export const emptyCustomerFormValues: CustomerFormValues = {
  name: "",
  email: "",
  phone: "",
  role: "user",
  isWholeSaler: false,
  gender: "",
  dateOfBirth: "",
  addressCount: 0,
};

export function toCustomerFormValues(
  customer: AdminCustomer,
): CustomerFormValues {
  return {
    name: customer.name,
    email: customer.email,
    phone: customer.phone ?? "",
    role: customer.role,
    isWholeSaler: customer.isWholeSaler,
    gender: customer.gender ?? "",
    dateOfBirth: customer.dateOfBirth ?? "",
    addressCount: customer.addressCount,
  };
}

interface CustomerFormProps {
  formId: string;
  defaultValues: CustomerFormValues;
  onSubmit: (values: CustomerFormValues) => void | Promise<void>;
}

export function CustomerForm({
  formId,
  defaultValues,
  onSubmit,
}: CustomerFormProps) {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <FieldGroup className="gap-4">
        <Field data-invalid={!!form.formState.errors.name}>
          <FieldLabel htmlFor="customer-name">Name</FieldLabel>
          <Input
            id="customer-name"
            aria-invalid={!!form.formState.errors.name}
            {...form.register("name")}
          />
          <FieldError>{form.formState.errors.name?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.email}>
          <FieldLabel htmlFor="customer-email">Email</FieldLabel>
          <Input
            id="customer-email"
            type="email"
            aria-invalid={!!form.formState.errors.email}
            {...form.register("email")}
          />
          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.phone}>
          <FieldLabel htmlFor="customer-phone">Phone</FieldLabel>
          <Input
            id="customer-phone"
            aria-invalid={!!form.formState.errors.phone}
            {...form.register("phone")}
          />
          <FieldError>{form.formState.errors.phone?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.role}>
          <FieldLabel htmlFor="customer-role">Role</FieldLabel>
          <Input
            id="customer-role"
            aria-invalid={!!form.formState.errors.role}
            {...form.register("role")}
          />
          <FieldError>{form.formState.errors.role?.message}</FieldError>
        </Field>

        <Field orientation="horizontal">
          <FieldLabel htmlFor="customer-wholesaler">Wholesaler</FieldLabel>
          <Controller
            name="isWholeSaler"
            control={form.control}
            render={({ field }) => (
              <Switch
                id="customer-wholesaler"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </Field>

        <Field data-invalid={!!form.formState.errors.gender}>
          <FieldLabel htmlFor="customer-gender">Gender</FieldLabel>
          <Input
            id="customer-gender"
            placeholder="Optional"
            aria-invalid={!!form.formState.errors.gender}
            {...form.register("gender")}
          />
          <FieldError>{form.formState.errors.gender?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.dateOfBirth}>
          <FieldLabel htmlFor="customer-dob">Date of birth</FieldLabel>
          <Input
            id="customer-dob"
            type="date"
            aria-invalid={!!form.formState.errors.dateOfBirth}
            {...form.register("dateOfBirth")}
          />
          <FieldError>{form.formState.errors.dateOfBirth?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.addressCount}>
          <FieldLabel htmlFor="customer-address-count">Address count</FieldLabel>
          <Input
            id="customer-address-count"
            type="number"
            min={0}
            aria-invalid={!!form.formState.errors.addressCount}
            {...form.register("addressCount")}
          />
          <FieldError>{form.formState.errors.addressCount?.message}</FieldError>
        </Field>
      </FieldGroup>
    </form>
  );
}
