"use client";

import { useMemo } from "react";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { RowActions } from "@/components/admin/shared/RowActions";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { useAdminCustomers } from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";
import { formatAdminDate } from "@/utils/formatters";

import { CustomerDetail } from "./CustomerDetail";

export function CustomersView() {
  const { items, isLoading } = useAdminCustomers();
  const sheet = useAdminSheet();

  const viewingItem = useMemo(
    () =>
      sheet.mode === "view" && sheet.id
        ? items.find((item) => item._id === sheet.id)
        : undefined,
    [items, sheet.id, sheet.mode],
  );

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Customers"
        description="Browse customer accounts and wholesaler status"
      />

      <AdminDataTable
        columns={[
          {
            key: "name",
            header: "Name",
            cell: (row) => (
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-muted-foreground">{row.email}</p>
              </div>
            ),
          },
          {
            key: "phone",
            header: "Phone",
            hideOnMobile: true,
            cell: (row) => row.phone ?? "—",
          },
          {
            key: "isWholeSaler",
            header: "Type",
            cell: (row) =>
              row.isWholeSaler ? (
                <StatusBadge status="approved" />
              ) : (
                <span className="text-sm text-muted-foreground">Retail</span>
              ),
          },
          {
            key: "addressCount",
            header: "Addresses",
            hideOnMobile: true,
            cell: (row) => row.addressCount,
          },
          {
            key: "createdAt",
            header: "Joined",
            hideOnMobile: true,
            cell: (row) => formatAdminDate(row.createdAt),
          },
          {
            key: "actions",
            header: "",
            className: "w-12",
            cell: (row) => (
              <RowActions onView={() => sheet.openView(row._id)} />
            ),
          },
        ]}
        data={items}
        isLoading={isLoading}
        emptyTitle="No customers"
        emptyDescription="Customer records will appear here."
        mobileCard={(row) => (
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-sm text-muted-foreground">{row.email}</p>
              </div>
              {row.isWholeSaler ? (
                <StatusBadge status="approved" />
              ) : (
                <span className="text-sm text-muted-foreground">Retail</span>
              )}
            </div>
            <div className="flex justify-end">
              <RowActions onView={() => sheet.openView(row._id)} />
            </div>
          </div>
        )}
      />

      <AdminFormSheet
        open={sheet.isOpen && sheet.mode === "view"}
        onOpenChange={(open) => {
          if (!open) sheet.close();
        }}
        title="View customer"
        description="Full customer account details."
        mode="view"
        hideSubmit
        cancelLabel="Close"
      >
        {viewingItem ? <CustomerDetail customer={viewingItem} /> : null}
      </AdminFormSheet>
    </div>
  );
}
