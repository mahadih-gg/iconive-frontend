"use client";

import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { FieldGroup, FieldSeparator, FieldTitle } from "@/components/ui/field";
import { formatEnumLabel } from "@/lib/admin/labels";
import type { AdminCustomer } from "@/types/admin";
import { formatAdminDate } from "@/utils/formatters";

interface CustomerDetailProps {
  customer: AdminCustomer;
}

export function CustomerDetail({ customer }: CustomerDetailProps) {
  return (
    <FieldGroup className="gap-4">
      <div className="flex items-center justify-between gap-3">
        <FieldTitle>Customer details</FieldTitle>
        {customer.isWholeSaler ? (
          <StatusBadge status="approved" />
        ) : (
          <span className="text-sm text-muted-foreground">Retail</span>
        )}
      </div>

      <dl className="grid gap-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Name</dt>
          <dd className="text-right font-medium">{customer.name}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Email</dt>
          <dd className="text-right">{customer.email}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Phone</dt>
          <dd className="text-right">{customer.phone ?? "—"}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Role</dt>
          <dd className="text-right">{formatEnumLabel(customer.role)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Wholesaler</dt>
          <dd className="text-right">{customer.isWholeSaler ? "Yes" : "No"}</dd>
        </div>

        <FieldSeparator />

        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Gender</dt>
          <dd className="text-right">
            {customer.gender ? formatEnumLabel(customer.gender) : "—"}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Date of birth</dt>
          <dd className="text-right">
            {customer.dateOfBirth
              ? formatAdminDate(customer.dateOfBirth)
              : "—"}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Addresses</dt>
          <dd className="text-right">{customer.addressCount}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Joined</dt>
          <dd className="text-right">{formatAdminDate(customer.createdAt)}</dd>
        </div>
      </dl>
    </FieldGroup>
  );
}
