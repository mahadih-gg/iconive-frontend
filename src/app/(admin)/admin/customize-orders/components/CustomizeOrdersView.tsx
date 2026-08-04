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
import { useAdminCustomizeOrders } from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";
import { formatAdminDate } from "@/utils/formatters";
import type { AdminCustomizeOrder } from "@/types/admin";

import {
  CustomizeOrderForm,
  type CustomizeOrderFormValues,
} from "./CustomizeOrderForm";

const DEFAULT_FORM_VALUES: CustomizeOrderFormValues = {
  name: "",
  email: "",
  phone: "",
  baseMaterial: "",
  hairMaterial: "",
  hairDirection: "",
  notes: "",
  status: "new",
  adminNotes: "",
};

export function CustomizeOrdersView() {
  const {
    items,
    isLoading,
    create,
    update,
    remove,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAdminCustomizeOrders();
  const sheet = useAdminSheet();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const editingRequest = useMemo(
    () =>
      sheet.mode === "edit" && sheet.id
        ? items.find((item) => item._id === sheet.id)
        : undefined,
    [items, sheet.id, sheet.mode],
  );

  const columns: AdminColumn<AdminCustomizeOrder>[] = [
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
      key: "baseMaterial",
      header: "Base material",
      cell: (row) => row.baseMaterial,
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

  async function handleSubmit(values: CustomizeOrderFormValues) {
    if (sheet.mode === "create") {
      await create({
        name: values.name,
        email: values.email,
        phone: values.phone,
        baseMaterial: values.baseMaterial,
        hairMaterial: values.hairMaterial,
        hairDirection: values.hairDirection,
        notes: values.notes,
        status: values.status,
        adminNotes: values.adminNotes,
      });
    } else if (sheet.mode === "edit" && sheet.id) {
      await update(sheet.id, {
        status: values.status,
        adminNotes: values.adminNotes,
      });
    }
    sheet.close();
  }

  const formDefaults: CustomizeOrderFormValues = editingRequest
    ? {
        name: editingRequest.name,
        email: editingRequest.email,
        phone: editingRequest.phone ?? "",
        baseMaterial: editingRequest.baseMaterial,
        hairMaterial: editingRequest.hairMaterial ?? "",
        hairDirection: editingRequest.hairDirection ?? "",
        notes: editingRequest.notes ?? "",
        status: editingRequest.status,
        adminNotes: editingRequest.adminNotes ?? "",
      }
    : DEFAULT_FORM_VALUES;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Customize Orders"
        description="Review and manage custom wig requests"
        actions={
          <Button onClick={() => sheet.openCreate()}>
            <PlusIcon data-icon="inline-start" />
            Add request
          </Button>
        }
      />

      <AdminDataTable
        columns={columns}
        data={items}
        isLoading={isLoading}
        emptyTitle="No customize requests"
        emptyDescription="Custom wig requests from customers will show up here."
      />

      <AdminFormSheet
        open={sheet.isOpen}
        onOpenChange={(open) => {
          if (!open) sheet.close();
        }}
        title={sheet.mode === "create" ? "Create request" : "Edit request"}
        description={
          sheet.mode === "edit"
            ? "Update status and internal notes for this request."
            : "Add a dummy customize request."
        }
        formId="admin-customize-order-form"
        mode={sheet.mode}
        isSubmitting={isCreating || isUpdating}
      >
        <CustomizeOrderForm
          formId="admin-customize-order-form"
          key={`${sheet.mode}-${sheet.id ?? "new"}`}
          mode={sheet.mode ?? "create"}
          defaultValues={formDefaults}
          request={editingRequest}
          onSubmit={handleSubmit}
        />
      </AdminFormSheet>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="Delete request?"
        description="This customize request will be permanently removed."
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
