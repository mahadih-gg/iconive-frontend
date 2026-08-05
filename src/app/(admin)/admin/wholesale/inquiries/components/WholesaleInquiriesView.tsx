"use client";

import { useMemo } from "react";

import { AdminDataTable, type AdminColumn } from "@/components/admin/shared/AdminDataTable";
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { RowActions } from "@/components/admin/shared/RowActions";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { useAdminWholesaleInquiries } from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";
import { formatAdminDate } from "@/utils/formatters";
import type { AdminWholesaleInquiry } from "@/types/admin";

import {
  WholesaleInquiryDetail,
  type WholesaleInquiryReplyValues,
} from "./WholesaleInquiryDetail";

export function WholesaleInquiriesView() {
  const { items, isLoading, update, isUpdating } = useAdminWholesaleInquiries();
  const sheet = useAdminSheet();

  const viewingInquiry = useMemo(
    () =>
      sheet.mode === "view" && sheet.id
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
        <RowActions onView={() => sheet.openView(row._id)} />
      ),
    },
  ];

  async function handleReply(values: WholesaleInquiryReplyValues) {
    if (!sheet.id || !viewingInquiry) return;

    await update(sheet.id, {
      reply: values.reply.trim(),
      repliedAt: new Date().toISOString(),
      status: viewingInquiry.status === "Closed" ? "Closed" : "Contacted",
    });
    sheet.close();
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Wholesale Inquiries"
        description="Review inbound wholesale interest and send replies"
      />

      <AdminDataTable
        columns={columns}
        data={items}
        isLoading={isLoading}
        emptyTitle="No inquiries yet"
        emptyDescription="Wholesale inquiries from the site will appear here."
      />

      <AdminFormSheet
        open={sheet.isOpen && sheet.mode === "view"}
        onOpenChange={(open) => {
          if (!open) sheet.close();
        }}
        title="View inquiry"
        description="Review the inquiry details and send a reply."
        formId="admin-wholesale-inquiry-reply-form"
        mode="view"
        viewLabel={viewingInquiry?.reply ? "Update Reply" : "Send Reply"}
        cancelLabel="Close"
        isSubmitting={isUpdating}
      >
        {viewingInquiry ? (
          <WholesaleInquiryDetail
            formId="admin-wholesale-inquiry-reply-form"
            key={viewingInquiry._id}
            inquiry={viewingInquiry}
            onSubmit={handleReply}
          />
        ) : null}
      </AdminFormSheet>
    </div>
  );
}
