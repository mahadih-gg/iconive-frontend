"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import type { AdminCustomizeOrder } from "@/types/admin";

const STATUSES = ["new", "in_progress", "quoted", "completed", "cancelled"] as const;

const editSchema = z.object({
  status: z.enum(STATUSES),
  adminNotes: z.string().optional(),
});

const createSchema = editSchema.extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  baseMaterial: z.string().min(1, "Base material is required"),
  hairMaterial: z.string().optional(),
  hairDirection: z.string().optional(),
  notes: z.string().optional(),
});

export type CustomizeOrderFormValues = z.infer<typeof createSchema>;

interface CustomizeOrderFormProps {
  formId: string;
  mode: "create" | "edit";
  defaultValues: CustomizeOrderFormValues;
  request?: AdminCustomizeOrder;
  onSubmit: (values: CustomizeOrderFormValues) => void | Promise<void>;
}

export function CustomizeOrderForm({
  formId,
  mode,
  defaultValues,
  request,
  onSubmit,
}: CustomizeOrderFormProps) {
  const schema = mode === "create" ? createSchema : editSchema;

  const form = useForm<CustomizeOrderFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {mode === "edit" && request ? (
        <FieldGroup className="gap-4">
          <FieldTitle>Request details</FieldTitle>
          <dl className="grid gap-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="text-right font-medium">{request.name}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="text-right">{request.email}</dd>
            </div>
            {request.phone ? (
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="text-right">{request.phone}</dd>
              </div>
            ) : null}
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Base material</dt>
              <dd className="text-right">{request.baseMaterial}</dd>
            </div>
            {request.hairMaterial ? (
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Hair material</dt>
                <dd className="text-right">{request.hairMaterial}</dd>
              </div>
            ) : null}
            {request.hairDirection ? (
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Hair direction</dt>
                <dd className="text-right">{request.hairDirection}</dd>
              </div>
            ) : null}
            {request.notes ? (
              <>
                <FieldSeparator />
                <div className="flex flex-col gap-1">
                  <dt className="text-muted-foreground">Customer notes</dt>
                  <dd className="text-sm leading-relaxed">{request.notes}</dd>
                </div>
              </>
            ) : null}
          </dl>
        </FieldGroup>
      ) : null}

      <FieldGroup>
        {mode === "create" ? (
          <>
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="customize-name">Name</FieldLabel>
              <Input
                id="customize-name"
                aria-invalid={!!form.formState.errors.name}
                {...form.register("name")}
              />
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>
            <Field data-invalid={!!form.formState.errors.email}>
              <FieldLabel htmlFor="customize-email">Email</FieldLabel>
              <Input
                id="customize-email"
                type="email"
                aria-invalid={!!form.formState.errors.email}
                {...form.register("email")}
              />
              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="customize-phone">Phone</FieldLabel>
              <Input id="customize-phone" {...form.register("phone")} />
            </Field>
            <Field data-invalid={!!form.formState.errors.baseMaterial}>
              <FieldLabel htmlFor="customize-base-material">Base material</FieldLabel>
              <Input
                id="customize-base-material"
                aria-invalid={!!form.formState.errors.baseMaterial}
                {...form.register("baseMaterial")}
              />
              <FieldError>{form.formState.errors.baseMaterial?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="customize-hair-material">Hair material</FieldLabel>
              <Input id="customize-hair-material" {...form.register("hairMaterial")} />
            </Field>
            <Field>
              <FieldLabel htmlFor="customize-hair-direction">Hair direction</FieldLabel>
              <Input id="customize-hair-direction" {...form.register("hairDirection")} />
            </Field>
            <Field>
              <FieldLabel htmlFor="customize-notes">Customer notes</FieldLabel>
              <Textarea id="customize-notes" rows={3} {...form.register("notes")} />
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
                      {status.replaceAll("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{form.formState.errors.status?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.adminNotes}>
          <FieldLabel htmlFor="customize-admin-notes">Admin notes</FieldLabel>
          <Textarea
            id="customize-admin-notes"
            rows={3}
            aria-invalid={!!form.formState.errors.adminNotes}
            {...form.register("adminNotes")}
          />
          <FieldError>{form.formState.errors.adminNotes?.message}</FieldError>
        </Field>
      </FieldGroup>
    </form>
  );
}
