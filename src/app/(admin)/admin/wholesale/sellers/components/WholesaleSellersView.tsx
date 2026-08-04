"use client";

import { useMemo, useState } from "react";
import { PlusIcon } from "lucide-react";

import { AdminDataTable, type AdminColumn } from "@/components/admin/shared/AdminDataTable";
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { ConfirmDeleteDialog } from "@/components/admin/shared/ConfirmDeleteDialog";
import { RowActions } from "@/components/admin/shared/RowActions";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAdminWholesaleSellers } from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";
import { formatAdminDate } from "@/utils/formatters";
import type { AdminWholesaleSeller } from "@/types/admin";

import {
  WholesaleSellerForm,
  type WholesaleSellerFormValues,
} from "./WholesaleSellerForm";

const DEFAULT_FORM_VALUES: WholesaleSellerFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "pending",
};

export function WholesaleSellersView() {
  const {
    items,
    isLoading,
    create,
    update,
    remove,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAdminWholesaleSellers();
  const sheet = useAdminSheet();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const editingSeller = useMemo(
    () =>
      sheet.mode === "edit" && sheet.id
        ? items.find((item) => item._id === sheet.id)
        : undefined,
    [items, sheet.id, sheet.mode],
  );

  const columns: AdminColumn<AdminWholesaleSeller>[] = [
    {
      key: "name",
      header: "Name",
      cell: (row) => row.name,
    },
    {
      key: "email",
      header: "Email",
      hideOnMobile: true,
      cell: (row) => row.email,
    },
    {
      key: "phone",
      header: "Phone",
      hideOnMobile: true,
      cell: (row) => row.phone ?? "—",
    },
    {
      key: "company",
      header: "Company",
      cell: (row) => row.company ?? "—",
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "createdAt",
      header: "Created",
      hideOnMobile: true,
      cell: (row) => formatAdminDate(row.createdAt),
    },
    {
      key: "actions",
      header: "",
      className: "w-12 text-right",
      cell: (row) => (
        <RowActions
          onEdit={() => sheet.openEdit(row._id)}
          onDelete={() => setDeleteId(row._id)}
        />
      ),
    },
  ];

  async function handleSubmit(values: WholesaleSellerFormValues) {
    if (sheet.mode === "create") {
      await create(values);
    } else if (sheet.mode === "edit" && sheet.id) {
      await update(sheet.id, values);
    }
    sheet.close();
  }

  const formDefaults: WholesaleSellerFormValues = editingSeller
    ? {
        name: editingSeller.name,
        email: editingSeller.email,
        phone: editingSeller.phone ?? "",
        company: editingSeller.company ?? "",
        status: editingSeller.status,
      }
    : DEFAULT_FORM_VALUES;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Wholesale Sellers"
        description="Approve and manage wholesale partner accounts"
        actions={
          <Button onClick={() => sheet.openCreate()}>
            <PlusIcon data-icon="inline-start" />
            Add seller
          </Button>
        }
      />

      <AdminDataTable
        columns={columns}
        data={items}
        isLoading={isLoading}
        emptyTitle="No wholesale sellers"
        emptyDescription="Registered wholesale sellers will appear here."
      />

      <AdminFormSheet
        open={sheet.isOpen}
        onOpenChange={(open) => {
          if (!open) sheet.close();
        }}
        title={sheet.mode === "create" ? "Add seller" : "Edit seller"}
        description="Manage wholesale seller contact details and approval status."
        formId="admin-wholesale-seller-form"
        mode={sheet.mode}
        isSubmitting={isCreating || isUpdating}
      >
        <WholesaleSellerForm
          formId="admin-wholesale-seller-form"
          key={`${sheet.mode}-${sheet.id ?? "new"}`}
          defaultValues={formDefaults}
          onSubmit={handleSubmit}
        />
      </AdminFormSheet>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="Delete seller?"
        description="This wholesale seller will be permanently removed."
        isLoading={isDeleting}
        onConfirm={async () => {
          if (!deleteId) return;
          await remove(deleteId);
          setDeleteId(null);
        }}
      />
    </div>
  );
}
