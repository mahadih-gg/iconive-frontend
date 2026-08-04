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
  FieldSeparator,
  FieldTitle,
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
import { Textarea } from "@/components/ui/textarea";
import type { AdminWholesaleInquiry } from "@/types/admin";

const STATUSES = ["Pending", "Contacted", "Closed"] as const;

const editSchema = z.object({
  status: z.enum(STATUSES),
});

const createSchema = editSchema.extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export type WholesaleInquiryFormValues = z.infer<typeof createSchema>;

interface WholesaleInquiryFormProps {
  mode: "create" | "edit";
  defaultValues: WholesaleInquiryFormValues;
  inquiry?: AdminWholesaleInquiry;
  onSubmit: (values: WholesaleInquiryFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function WholesaleInquiryForm({
  mode,
  defaultValues,
  inquiry,
  onSubmit,
  isSubmitting,
}: WholesaleInquiryFormProps) {
  const schema = mode === "create" ? createSchema : editSchema;

  const form = useForm<WholesaleInquiryFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {mode === "edit" && inquiry ? (
        <FieldGroup className="gap-4">
          <FieldTitle>Inquiry details</FieldTitle>
          <dl className="grid gap-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="text-right font-medium">{inquiry.name}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="text-right">{inquiry.email}</dd>
            </div>
            {inquiry.phone ? (
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="text-right">{inquiry.phone}</dd>
              </div>
            ) : null}
            <FieldSeparator />
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground">Message</dt>
              <dd className="leading-relaxed">{inquiry.message}</dd>
            </div>
          </dl>
        </FieldGroup>
      ) : null}

      <FieldGroup>
        {mode === "create" ? (
          <>
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="inquiry-name">Name</FieldLabel>
              <Input
                id="inquiry-name"
                aria-invalid={!!form.formState.errors.name}
                {...form.register("name")}
              />
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>
            <Field data-invalid={!!form.formState.errors.email}>
              <FieldLabel htmlFor="inquiry-email">Email</FieldLabel>
              <Input
                id="inquiry-email"
                type="email"
                aria-invalid={!!form.formState.errors.email}
                {...form.register("email")}
              />
              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="inquiry-phone">Phone</FieldLabel>
              <Input id="inquiry-phone" {...form.register("phone")} />
            </Field>
            <Field data-invalid={!!form.formState.errors.message}>
              <FieldLabel htmlFor="inquiry-message">Message</FieldLabel>
              <Textarea
                id="inquiry-message"
                rows={4}
                aria-invalid={!!form.formState.errors.message}
                {...form.register("message")}
              />
              <FieldError>{form.formState.errors.message?.message}</FieldError>
            </Field>
          </>
        ) : null}

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
          {mode === "create" ? "Create inquiry" : "Save changes"}
        </Button>
      </FieldGroup>
    </form>
  );
}
