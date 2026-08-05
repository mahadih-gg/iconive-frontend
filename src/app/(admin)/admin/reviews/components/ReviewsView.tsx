"use client";

import { useMemo } from "react";
import { StarIcon } from "lucide-react";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { RowActions } from "@/components/admin/shared/RowActions";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { useAdminReviews } from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";

import { ReviewDetail } from "./ReviewDetail";

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      <StarIcon className="size-3.5 fill-primary text-primary" />
      {rating}
    </span>
  );
}

export function ReviewsView() {
  const { items, isLoading } = useAdminReviews();
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
        title="Reviews"
        description="Browse and review customer feedback"
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
              <RowActions onView={() => sheet.openView(row._id)} />
            ),
          },
        ]}
        data={items}
        isLoading={isLoading}
        emptyTitle="No reviews"
        emptyDescription="Customer reviews will appear here."
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
        title="View review"
        description="Full customer review details."
        mode="view"
        hideSubmit
        cancelLabel="Close"
      >
        {viewingItem ? <ReviewDetail review={viewingItem} /> : null}
      </AdminFormSheet>
    </div>
  );
}
