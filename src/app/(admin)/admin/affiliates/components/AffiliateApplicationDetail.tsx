"use client";

import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { FieldGroup, FieldSeparator, FieldTitle } from "@/components/ui/field";
import type { AdminAffiliateApplication } from "@/types/admin";
import { formatAdminDate } from "@/utils/formatters";

interface AffiliateApplicationDetailProps {
  application: AdminAffiliateApplication;
}

export function AffiliateApplicationDetail({
  application,
}: AffiliateApplicationDetailProps) {
  return (
    <FieldGroup className="gap-4">
      <div className="flex items-center justify-between gap-3">
        <FieldTitle>Application details</FieldTitle>
        <StatusBadge status={application.status} />
      </div>

      <dl className="grid gap-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Name</dt>
          <dd className="text-right font-medium">{application.name}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Email</dt>
          <dd className="text-right">{application.email}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Phone</dt>
          <dd className="text-right">{application.phone ?? "—"}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Program</dt>
          <dd className="text-right">{application.program}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Submitted</dt>
          <dd className="text-right">
            {formatAdminDate(application.createdAt)}
          </dd>
        </div>

        <FieldSeparator />

        <div className="flex flex-col gap-1.5">
          <dt className="text-muted-foreground">Message</dt>
          <dd className="rounded-none border border-border bg-muted/30 p-3 leading-relaxed whitespace-pre-wrap">
            {application.message}
          </dd>
        </div>
      </dl>
    </FieldGroup>
  );
}
