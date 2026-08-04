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
import { useAdminOrders } from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";
import { formatAdminDate, formatCurrency } from "@/utils/formatters";
import type { AdminOrder } from "@/types/admin";

import { OrderForm, type OrderFormValues } from "./OrderForm";

const DEFAULT_FORM_VALUES: OrderFormValues = {
  customerName: "",
  customerEmail: "",
  status: "payment_pending",
  paymentStatus: "pending",
  trackingStep: "payment_pending",
  total: 0,
  deliveryCharge: 0,
  note: "",
};

export function OrdersView() {
  const { items, isLoading, create, update, remove, isCreating, isUpdating, isDeleting } =
    useAdminOrders();
  const sheet = useAdminSheet();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const editingOrder = useMemo(
    () => (sheet.mode === "edit" && sheet.id ? items.find((o) => o._id === sheet.id) : undefined),
    [items, sheet.id, sheet.mode],
  );

  const columns: AdminColumn<AdminOrder>[] = [
    {
      key: "id",
      header: "ID",
      className: "font-mono text-xs",
      cell: (row) => row._id.slice(-8),
    },
    {
      key: "customerName",
      header: "Customer",
      cell: (row) => row.customerName,
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "paymentStatus",
      header: "Payment",
      hideOnMobile: true,
      cell: (row) => <StatusBadge status={row.paymentStatus} />,
    },
    {
      key: "total",
      header: "Total",
      cell: (row) => formatCurrency(row.total, row.currency),
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

  async function handleSubmit(values: OrderFormValues) {
    if (sheet.mode === "create") {
      await create({
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        status: values.status,
        paymentStatus: values.paymentStatus,
        trackingStep: values.trackingStep,
        total: values.total,
        subtotal: Math.max(values.total - values.deliveryCharge, 0),
        deliveryCharge: values.deliveryCharge,
        discount: 0,
        currency: "USD",
        orderItems: [],
        note: values.note,
      });
    } else if (sheet.mode === "edit" && sheet.id) {
      await update(sheet.id, {
        status: values.status,
        paymentStatus: values.paymentStatus,
        trackingStep: values.trackingStep,
        deliveryCharge: values.deliveryCharge,
        note: values.note,
      });
    }
    sheet.close();
  }

  const formDefaults: OrderFormValues = editingOrder
    ? {
        customerName: editingOrder.customerName,
        customerEmail: editingOrder.customerEmail,
        status: editingOrder.status as OrderFormValues["status"],
        paymentStatus: editingOrder.paymentStatus as OrderFormValues["paymentStatus"],
        trackingStep: editingOrder.trackingStep as OrderFormValues["trackingStep"],
        total: editingOrder.total,
        deliveryCharge: editingOrder.deliveryCharge,
        note: editingOrder.note ?? "",
      }
    : DEFAULT_FORM_VALUES;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Orders"
        description="Manage customer orders and fulfillment"
        actions={
          <Button onClick={() => sheet.openCreate()}>
            <PlusIcon data-icon="inline-start" />
            Add order
          </Button>
        }
      />

      <AdminDataTable
        columns={columns}
        data={items}
        isLoading={isLoading}
        emptyTitle="No orders yet"
        emptyDescription="Orders will appear here once customers checkout."
      />

      <AdminFormSheet
        open={sheet.isOpen}
        onOpenChange={(open) => {
          if (!open) sheet.close();
        }}
        title={sheet.mode === "create" ? "Create order" : "Edit order"}
        description={
          sheet.mode === "edit"
            ? "Update fulfillment status and delivery details."
            : "Add a dummy order for testing."
        }
        formId="admin-order-form"
        mode={sheet.mode}
        isSubmitting={isCreating || isUpdating}
      >
        <OrderForm
          formId="admin-order-form"
          key={`${sheet.mode}-${sheet.id ?? "new"}`}
          mode={sheet.mode ?? "create"}
          defaultValues={formDefaults}
          order={editingOrder}
          onSubmit={handleSubmit}
        />
      </AdminFormSheet>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="Delete order?"
        description="This order will be permanently removed from the admin list."
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
