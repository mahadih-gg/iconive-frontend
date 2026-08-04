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
import { useAdminWholesaleInquiries } from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";
import { formatAdminDate } from "@/utils/formatters";
import type { AdminWholesaleInquiry } from "@/types/admin";

import {
  WholesaleInquiryForm,
  type WholesaleInquiryFormValues,
} from "./WholesaleInquiryForm";

const DEFAULT_FORM_VALUES: WholesaleInquiryFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
  status: "Pending",
};

export function WholesaleInquiriesView() {
  const {
    items,
    isLoading,
    create,
    update,
    remove,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAdminWholesaleInquiries();
  const sheet = useAdminSheet();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const editingInquiry = useMemo(
    () =>
      sheet.mode === "edit" && sheet.id
        ? items.find((item) => item._id === sheet.id)
        : undefined,
    [items, sheet.id, sheet.mode],
  );

  const columns: AdminColumn<AdminWholesaleInquiry>[] = [
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
      key: "message",
      header: "Message",
      cell: (row) => (
        <span className="line-clamp-2 max-w-xs text-sm">{row.message}</span>
      ),
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

  async function handleSubmit(values: WholesaleInquiryFormValues) {
    if (sheet.mode === "create") {
      await create({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
        status: values.status,
      });
    } else if (sheet.mode === "edit" && sheet.id) {
      await update(sheet.id, { status: values.status });
    }
    sheet.close();
  }

  const formDefaults: WholesaleInquiryFormValues = editingInquiry
    ? {
        name: editingInquiry.name,
        email: editingInquiry.email,
        phone: editingInquiry.phone ?? "",
        message: editingInquiry.message,
        status: editingInquiry.status,
      }
    : DEFAULT_FORM_VALUES;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Wholesale Inquiries"
        description="Track inbound wholesale interest and follow-ups"
        actions={
          <Button onClick={() => sheet.openCreate()}>
            <PlusIcon data-icon="inline-start" />
            Add inquiry
          </Button>
        }
      />

      <AdminDataTable
        columns={columns}
        data={items}
        isLoading={isLoading}
        emptyTitle="No inquiries yet"
        emptyDescription="Wholesale inquiries from the site will appear here."
      />

      <AdminFormSheet
        open={sheet.isOpen}
        onOpenChange={(open) => {
          if (!open) sheet.close();
        }}
        title={sheet.mode === "create" ? "Create inquiry" : "Update inquiry"}
        description={
          sheet.mode === "edit"
            ? "Review inquiry details and update follow-up status."
            : "Add a dummy wholesale inquiry."
        }
      >
        <WholesaleInquiryForm
          key={`${sheet.mode}-${sheet.id ?? "new"}`}
          mode={sheet.mode ?? "create"}
          defaultValues={formDefaults}
          inquiry={editingInquiry}
          onSubmit={handleSubmit}
          isSubmitting={isCreating || isUpdating}
        />
      </AdminFormSheet>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="Delete inquiry?"
        description="This wholesale inquiry will be permanently removed."
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
