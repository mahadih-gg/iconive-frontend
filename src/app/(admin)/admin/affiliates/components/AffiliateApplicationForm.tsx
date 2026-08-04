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
import type { AdminAffiliateApplication } from "@/types/admin";

const STATUSES = ["pending", "approved", "rejected"] as const;

const editSchema = z.object({
  status: z.enum(STATUSES),
});

const createSchema = editSchema.extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  program: z.string().min(1, "Program is required"),
});

export type AffiliateApplicationFormValues = z.infer<typeof createSchema>;

interface AffiliateApplicationFormProps {
  mode: "create" | "edit";
  defaultValues: AffiliateApplicationFormValues;
  application?: AdminAffiliateApplication;
  programOptions: string[];
  onSubmit: (values: AffiliateApplicationFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function AffiliateApplicationForm({
  mode,
  defaultValues,
  application,
  programOptions,
  onSubmit,
  isSubmitting,
}: AffiliateApplicationFormProps) {
  const schema = mode === "create" ? createSchema : editSchema;

  const form = useForm<AffiliateApplicationFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {mode === "edit" && application ? (
        <FieldGroup className="gap-4">
          <FieldTitle>Application details</FieldTitle>
          <dl className="grid gap-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="text-right font-medium">{application.name}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="text-right">{application.email}</dd>
            </div>
            {application.phone ? (
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="text-right">{application.phone}</dd>
              </div>
            ) : null}
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Program</dt>
              <dd className="text-right">{application.program}</dd>
            </div>
            <FieldSeparator />
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground">Message</dt>
              <dd className="leading-relaxed">{application.message}</dd>
            </div>
          </dl>
        </FieldGroup>
      ) : null}

      <FieldGroup>
        {mode === "create" ? (
          <>
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="application-name">Name</FieldLabel>
              <Input
                id="application-name"
                aria-invalid={!!form.formState.errors.name}
                {...form.register("name")}
              />
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>
            <Field data-invalid={!!form.formState.errors.email}>
              <FieldLabel htmlFor="application-email">Email</FieldLabel>
              <Input
                id="application-email"
                type="email"
                aria-invalid={!!form.formState.errors.email}
                {...form.register("email")}
              />
              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="application-phone">Phone</FieldLabel>
              <Input id="application-phone" {...form.register("phone")} />
            </Field>
            <Field data-invalid={!!form.formState.errors.program}>
              <FieldLabel>Program</FieldLabel>
              <Controller
                name="program"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programOptions.map((program) => (
                        <SelectItem key={program} value={program}>
                          {program}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError>{form.formState.errors.program?.message}</FieldError>
            </Field>
            <Field data-invalid={!!form.formState.errors.message}>
              <FieldLabel htmlFor="application-message">Message</FieldLabel>
              <Textarea
                id="application-message"
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
          {mode === "create" ? "Create application" : "Save changes"}
        </Button>
      </FieldGroup>
    </form>
  );
}
