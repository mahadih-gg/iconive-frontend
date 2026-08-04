"use client";

import { useState } from "react";
import { PlusIcon, StarIcon } from "lucide-react";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { ConfirmDeleteDialog } from "@/components/admin/shared/ConfirmDeleteDialog";
import { RowActions } from "@/components/admin/shared/RowActions";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAdminReviews } from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";

import {
  emptyReviewFormValues,
  ReviewForm,
  type ReviewFormValues,
  toReviewFormValues,
} from "./ReviewForm";

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      <StarIcon className="size-3.5 fill-primary text-primary" />
      {rating}
    </span>
  );
}

export function ReviewsView() {
  const { items, isLoading, create, update, remove, isCreating, isUpdating, isDeleting } =
    useAdminReviews();
  const sheet = useAdminSheet();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const editingItem =
    sheet.mode === "edit" && sheet.id
      ? items.find((item) => item._id === sheet.id)
      : undefined;

  async function handleSubmit(values: ReviewFormValues) {
    const payload = {
      name: values.name,
      rating: values.rating,
      title: values.title,
      comment: values.comment,
      productId: values.productId?.trim() || undefined,
      verified: values.verified,
      isPublished: values.isPublished,
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
        title="Reviews"
        description="Moderate customer reviews and publishing status"
        actions={
          <Button onClick={sheet.openCreate}>
            <PlusIcon data-icon="inline-start" />
            New review
          </Button>
        }
      />

      <AdminDataTable
        columns={[
          {
            key: "name",
            header: "Reviewer",
            cell: (row) => (
              <div>
                <p className="font-medium">{row.name}</p>
                {row.verified ? (
                  <p className="text-xs text-muted-foreground">Verified</p>
                ) : null}
              </div>
            ),
          },
          {
            key: "rating",
            header: "Rating",
            cell: (row) => <RatingStars rating={row.rating} />,
          },
          {
            key: "title",
            header: "Title",
            hideOnMobile: true,
            cell: (row) => (
              <span className="line-clamp-1">{row.title}</span>
            ),
          },
          {
            key: "isPublished",
            header: "Status",
            cell: (row) => (
              <StatusBadge
                status={row.isPublished ? "published" : "pending"}
              />
            ),
          },
          {
            key: "actions",
            header: "",
            className: "w-12",
            cell: (row) => (
              <RowActions
                editLabel="Moderate"
                onEdit={() => sheet.openEdit(row._id)}
                onDelete={() => setDeleteId(row._id)}
              />
            ),
          },
        ]}
        data={items}
        isLoading={isLoading}
        emptyTitle="No reviews"
        emptyDescription="Customer reviews will appear here for moderation."
        mobileCard={(row) => (
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-sm">{row.title}</p>
              </div>
              <StatusBadge
                status={row.isPublished ? "published" : "pending"}
              />
            </div>
            <RatingStars rating={row.rating} />
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {row.comment}
            </p>
            <div className="flex justify-end">
              <RowActions
                editLabel="Moderate"
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
        title={sheet.mode === "create" ? "New review" : "Moderate review"}
        description={
          sheet.mode === "create"
            ? "Add a customer review manually."
            : "Update review content and publishing status."
        }
        formId="admin-review-form"
        mode={sheet.mode}
        isSubmitting={isCreating || isUpdating}
      >
        <ReviewForm
          formId="admin-review-form"
          key={`${sheet.mode}-${sheet.id ?? "new"}`}
          defaultValues={
            editingItem
              ? toReviewFormValues(editingItem)
              : emptyReviewFormValues
          }
          onSubmit={handleSubmit}
        />
      </AdminFormSheet>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete review?"
        description="This review will be permanently removed."
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
