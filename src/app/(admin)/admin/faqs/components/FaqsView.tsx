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
import { useAdminFaqs } from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";

import { emptyFaqFormValues, FaqForm, type FaqFormValues, toFaqFormValues } from "./FaqForm";

export function FaqsView() {
  const { items, isLoading, create, update, remove, isCreating, isUpdating, isDeleting } =
    useAdminFaqs();
  const sheet = useAdminSheet();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const editingItem =
    sheet.mode === "edit" && sheet.id
      ? items.find((item) => item._id === sheet.id)
      : undefined;

  async function handleSubmit(values: FaqFormValues) {
    const payload = {
      question: values.question,
      answer: values.answer,
      sortOrder: values.sortOrder,
      isActive: values.isActive,
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

  const sortedItems = [...items].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="FAQs"
        description="Manage frequently asked questions"
        actions={
          <Button onClick={sheet.openCreate}>
            <PlusIcon data-icon="inline-start" />
            New FAQ
          </Button>
        }
      />

      <AdminDataTable
        columns={[
          {
            key: "sortOrder",
            header: "#",
            className: "w-12",
            cell: (row) => row.sortOrder,
          },
          {
            key: "question",
            header: "Question",
            cell: (row) => (
              <span className="line-clamp-2 font-medium">{row.question}</span>
            ),
          },
          {
            key: "answer",
            header: "Answer",
            hideOnMobile: true,
            cell: (row) => (
              <span className="line-clamp-2 text-muted-foreground">
                {row.answer}
              </span>
            ),
          },
          {
            key: "isActive",
            header: "Status",
            cell: (row) => (
              <StatusBadge status={row.isActive ? "active" : "pending"} />
            ),
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
        data={sortedItems}
        isLoading={isLoading}
        emptyTitle="No FAQs"
        emptyDescription="Add your first FAQ to help customers."
        mobileCard={(row) => (
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">#{row.sortOrder}</p>
                <p className="font-medium">{row.question}</p>
              </div>
              <StatusBadge status={row.isActive ? "active" : "pending"} />
            </div>
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {row.answer}
            </p>
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
        title={sheet.mode === "create" ? "New FAQ" : "Edit FAQ"}
        description={
          sheet.mode === "create"
            ? "Add a new frequently asked question."
            : "Update question, answer, or display order."
        }
        formId="admin-faq-form"
        mode={sheet.mode}
        isSubmitting={isCreating || isUpdating}
      >
        <FaqForm
          formId="admin-faq-form"
          key={`${sheet.mode}-${sheet.id ?? "new"}`}
          defaultValues={
            editingItem ? toFaqFormValues(editingItem) : emptyFaqFormValues
          }
          onSubmit={handleSubmit}
        />
      </AdminFormSheet>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete FAQ?"
        description="This FAQ will be permanently removed."
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
