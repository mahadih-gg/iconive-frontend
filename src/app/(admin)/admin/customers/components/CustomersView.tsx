"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { ConfirmDeleteDialog } from "@/components/admin/shared/ConfirmDeleteDialog";
import { RowActions } from "@/components/admin/shared/RowActions";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAdminCustomers } from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";

import {
  CustomerForm,
  emptyCustomerFormValues,
  type CustomerFormValues,
  toCustomerFormValues,
} from "./CustomerForm";

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

export function CustomersView() {
  const { items, isLoading, create, update, remove, isCreating, isUpdating, isDeleting } =
    useAdminCustomers();
  const sheet = useAdminSheet();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const editingItem =
    sheet.mode === "edit" && sheet.id
      ? items.find((item) => item._id === sheet.id)
      : undefined;

  async function handleSubmit(values: CustomerFormValues) {
    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone?.trim() || undefined,
      role: values.role,
      isWholeSaler: values.isWholeSaler,
      gender: values.gender?.trim() || undefined,
      dateOfBirth: values.dateOfBirth?.trim() || undefined,
      addressCount: values.addressCount,
    };

    if (sheet.mode === "create") {
      await create(payload);
    } else if (sheet.id) {
      await update(sheet.id, payload);
    }
    sheet.close();
  }

  async function handleDelete() {
    if (!deleteId) return;
    await remove(deleteId);
    setDeleteId(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Customers"
        description="Manage customer accounts and wholesaler status"
        actions={
          <Button onClick={sheet.openCreate}>
            <PlusIcon data-icon="inline-start" />
            New customer
          </Button>
        }
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
            cell: (row) => formatDate(row.createdAt),
          },
          {
            key: "actions",
            header: "",
            className: "w-12",
            cell: (row) => (
              <RowActions
                onEdit={() => sheet.openEdit(row._id)}
                onDelete={() => setDeleteId(row._id)}
              />
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
              <RowActions
                onEdit={() => sheet.openEdit(row._id)}
                onDelete={() => setDeleteId(row._id)}
              />
            </div>
          </div>
        )}
      />

      <AdminFormSheet
        open={sheet.isOpen}
        onOpenChange={(open) => !open && sheet.close()}
        title={sheet.mode === "create" ? "New customer" : "Edit customer"}
        description={
          sheet.mode === "create"
            ? "Add a new customer record."
            : "Update customer profile details."
        }
      >
        <CustomerForm
          key={`${sheet.mode}-${sheet.id ?? "new"}`}
          defaultValues={
            editingItem
              ? toCustomerFormValues(editingItem)
              : emptyCustomerFormValues
          }
          onSubmit={handleSubmit}
          onCancel={sheet.close}
          isSubmitting={isCreating || isUpdating}
        />
      </AdminFormSheet>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete customer?"
        description="This customer record will be permanently removed."
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
