"use client";

import { StarIcon } from "lucide-react";

import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { FieldGroup, FieldSeparator, FieldTitle } from "@/components/ui/field";
import type { AdminReview } from "@/types/admin";
import { formatAdminDate } from "@/utils/formatters";

interface ReviewDetailProps {
  review: AdminReview;
}

export function ReviewDetail({ review }: ReviewDetailProps) {
  return (
    <FieldGroup className="gap-4">
      <div className="flex items-center justify-between gap-3">
        <FieldTitle>Review details</FieldTitle>
        <StatusBadge status={review.isPublished ? "published" : "pending"} />
      </div>

      <dl className="grid gap-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Reviewer</dt>
          <dd className="text-right font-medium">{review.name}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Verified</dt>
          <dd className="text-right">{review.verified ? "Yes" : "No"}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Rating</dt>
          <dd className="inline-flex items-center justify-end gap-1">
            <StarIcon className="size-3.5 fill-primary text-primary" />
            {review.rating}/5
          </dd>
        </div>
        {review.productId ? (
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">Product ID</dt>
            <dd className="text-right font-mono text-xs">{review.productId}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Submitted</dt>
          <dd className="text-right">{formatAdminDate(review.createdAt)}</dd>
        </div>

        <FieldSeparator />

        <div className="flex flex-col gap-1.5">
          <dt className="text-muted-foreground">Title</dt>
          <dd className="font-medium">{review.title}</dd>
        </div>
        <div className="flex flex-col gap-1.5">
          <dt className="text-muted-foreground">Comment</dt>
          <dd className="rounded-none border border-border bg-muted/30 p-3 leading-relaxed whitespace-pre-wrap">
            {review.comment}
          </dd>
        </div>
      </dl>
    </FieldGroup>
  );
}
