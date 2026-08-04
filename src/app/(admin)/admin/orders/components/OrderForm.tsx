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
import { formatCurrency } from "@/utils/formatters";
import type { AdminOrder } from "@/types/admin";

const ORDER_STATUSES = [
  "payment_pending",
  "order_received",
  "processing",
  "shipped",
  "received",
  "cancelled",
] as const;

const PAYMENT_STATUSES = ["pending", "paid", "refunded"] as const;

const editSchema = z.object({
  status: z.enum(ORDER_STATUSES),
  paymentStatus: z.enum(PAYMENT_STATUSES),
  trackingStep: z.enum(ORDER_STATUSES),
  deliveryCharge: z.coerce.number().min(0),
  note: z.string().optional(),
});

const createSchema = editSchema.extend({
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Enter a valid email"),
  total: z.coerce.number().min(0),
});

export type OrderFormValues = z.infer<typeof createSchema>;

interface OrderFormProps {
  mode: "create" | "edit";
  defaultValues: OrderFormValues;
  order?: AdminOrder;
  onSubmit: (values: OrderFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

function statusLabel(value: string) {
  return value.replaceAll("_", " ");
}

export function OrderForm({
  mode,
  defaultValues,
  order,
  onSubmit,
  isSubmitting,
}: OrderFormProps) {
  const schema = mode === "create" ? createSchema : editSchema;

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {mode === "edit" && order ? (
        <FieldGroup className="gap-4">
          <FieldTitle>Customer</FieldTitle>
          <dl className="grid gap-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="text-right font-medium">{order.customerName}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="text-right">{order.customerEmail}</dd>
            </div>
          </dl>

          <FieldSeparator>Line items</FieldSeparator>
          <ul className="flex flex-col gap-3">
            {order.orderItems.map((item) => (
              <li
                key={item._id}
                className="flex items-start justify-between gap-3 border border-border p-3 text-sm"
              >
                <div className="min-w-0">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-muted-foreground">Qty {item.quantity}</p>
                </div>
                <p className="shrink-0 font-medium">
                  {formatCurrency(item.price * item.quantity, order.currency)}
                </p>
              </li>
            ))}
          </ul>

          {order.shippingAddress ? (
            <>
              <FieldSeparator>Shipping address</FieldSeparator>
              <address className="not-italic text-sm leading-relaxed text-muted-foreground">
                {order.shippingAddress.street}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </address>
            </>
          ) : null}
        </FieldGroup>
      ) : null}

      <FieldGroup>
        {mode === "create" ? (
          <>
            <Field data-invalid={!!form.formState.errors.customerName}>
              <FieldLabel htmlFor="order-customer-name">Customer name</FieldLabel>
              <Input
                id="order-customer-name"
                aria-invalid={!!form.formState.errors.customerName}
                {...form.register("customerName")}
              />
              <FieldError>{form.formState.errors.customerName?.message}</FieldError>
            </Field>
            <Field data-invalid={!!form.formState.errors.customerEmail}>
              <FieldLabel htmlFor="order-customer-email">Customer email</FieldLabel>
              <Input
                id="order-customer-email"
                type="email"
                aria-invalid={!!form.formState.errors.customerEmail}
                {...form.register("customerEmail")}
              />
              <FieldError>{form.formState.errors.customerEmail?.message}</FieldError>
            </Field>
            <Field data-invalid={!!form.formState.errors.total}>
              <FieldLabel htmlFor="order-total">Total</FieldLabel>
              <Input
                id="order-total"
                type="number"
                min={0}
                step="0.01"
                aria-invalid={!!form.formState.errors.total}
                {...form.register("total")}
              />
              <FieldError>{form.formState.errors.total?.message}</FieldError>
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
                  {ORDER_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {statusLabel(status)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{form.formState.errors.status?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.paymentStatus}>
          <FieldLabel>Payment status</FieldLabel>
          <Controller
            name="paymentStatus"
            control={form.control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {statusLabel(status)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{form.formState.errors.paymentStatus?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.trackingStep}>
          <FieldLabel>Tracking step</FieldLabel>
          <Controller
            name="trackingStep"
            control={form.control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select tracking step" />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {statusLabel(status)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{form.formState.errors.trackingStep?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.deliveryCharge}>
          <FieldLabel htmlFor="order-delivery-charge">Delivery charge</FieldLabel>
          <Input
            id="order-delivery-charge"
            type="number"
            min={0}
            step="0.01"
            aria-invalid={!!form.formState.errors.deliveryCharge}
            {...form.register("deliveryCharge")}
          />
          <FieldError>{form.formState.errors.deliveryCharge?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.note}>
          <FieldLabel htmlFor="order-note">Note</FieldLabel>
          <Textarea
            id="order-note"
            rows={3}
            aria-invalid={!!form.formState.errors.note}
            {...form.register("note")}
          />
          <FieldError>{form.formState.errors.note?.message}</FieldError>
        </Field>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
          {mode === "create" ? "Create order" : "Save changes"}
        </Button>
      </FieldGroup>
    </form>
  );
}
