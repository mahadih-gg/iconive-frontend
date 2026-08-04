"use client";

import { useMemo, useState } from "react";
import { PlusIcon } from "lucide-react";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { ConfirmDeleteDialog } from "@/components/admin/shared/ConfirmDeleteDialog";
import { RowActions } from "@/components/admin/shared/RowActions";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useAdminCategories,
  useAdminOffers,
  useAdminProducts,
} from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";
import {
  fromDatetimeLocalValue,
  toDatetimeLocalValue,
} from "@/lib/admin/datetime";
import type { OfferFormValues } from "@/lib/validations/admin/offerSchema";
import type { AdminOffer } from "@/types/admin";

import { OfferForm } from "./OfferForm";

const createDefaults: OfferFormValues = {
  title: "",
  productIds: [],
  categoryIds: [],
  subCategoryIds: [],
  discountType: "percentage",
  discount: 10,
  startsAt: "",
  endsAt: "",
  isActive: true,
  bannerImage: "",
};

function getOfferProductIds(offer: AdminOffer): string[] {
  if (offer.productIds?.length) return offer.productIds;
  if (offer.productId) return [offer.productId];
  return [];
}

function toFormValues(offer: AdminOffer): OfferFormValues {
  return {
    title: offer.title,
    productIds: getOfferProductIds(offer),
    categoryIds: offer.categoryIds ?? [],
    subCategoryIds: offer.subCategoryIds ?? [],
    discountType: offer.discountType ?? "percentage",
    discount: offer.discountPercent,
    startsAt: toDatetimeLocalValue(offer.startsAt),
    endsAt: toDatetimeLocalValue(offer.endsAt),
    isActive: offer.isActive,
    bannerImage: offer.bannerImage ?? "",
  };
}

function formatDateRange(startsAt: string, endsAt: string): string {
  const start = new Date(startsAt).toLocaleDateString();
  const end = new Date(endsAt).toLocaleDateString();
  return `${start} – ${end}`;
}

function formatOfferTargets(
  offer: AdminOffer,
  productMap: Map<string, string>,
  categoryMap: Map<string, string>,
): string {
  const labels: string[] = [];

  for (const id of getOfferProductIds(offer)) {
    const name = productMap.get(id);
    if (name) labels.push(name);
  }

  for (const id of offer.categoryIds ?? []) {
    const name = categoryMap.get(id);
    if (name) labels.push(name);
  }

  for (const id of offer.subCategoryIds ?? []) {
    const name = categoryMap.get(id);
    if (name) labels.push(name);
  }

  if (labels.length === 0) return "No targets";
  if (labels.length <= 2) return labels.join(", ");
  return `${labels.slice(0, 2).join(", ")} +${labels.length - 2}`;
}

export function OffersView() {
  const {
    items,
    isLoading,
    create,
    update,
    remove,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAdminOffers();
  const { items: products } = useAdminProducts();
  const { items: categories } = useAdminCategories();
  const { isOpen, mode, id, openCreate, openEdit, close } = useAdminSheet();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const editingItem = useMemo(
    () => (mode === "edit" && id ? items.find((item) => item._id === id) : undefined),
    [items, mode, id],
  );

  const productMap = useMemo(
    () => new Map(products.map((product) => [product._id, product.name])),
    [products],
  );

  const categoryMap = useMemo(
    () => new Map(categories.map((category) => [category._id, category.name])),
    [categories],
  );

  async function handleSubmit(values: OfferFormValues) {
    const payload: Partial<AdminOffer> = {
      title: values.title,
      productIds: values.productIds,
      productId: values.productIds[0],
      categoryIds: values.categoryIds,
      subCategoryIds: values.subCategoryIds,
      discountType: values.discountType,
      discountPercent: values.discount,
      startsAt: fromDatetimeLocalValue(values.startsAt),
      endsAt: fromDatetimeLocalValue(values.endsAt),
      isActive: values.isActive,
      bannerImage: values.bannerImage || undefined,
    };

    if (mode === "edit" && id) {
      await update(id, payload);
    } else {
      await create(payload);
    }

    close();
  }

  async function handleDelete() {
    if (!deleteId) return;
    await remove(deleteId);
    setDeleteId(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Offers"
        description="Manage promotional offers and discounts"
        actions={
          <Button onClick={openCreate} className="rounded-none">
            <PlusIcon data-icon="inline-start" />
            Add offer
          </Button>
        }
      />

      <AdminDataTable
        columns={[
          {
            key: "title",
            header: "Offer",
            cell: (row) => (
              <div className="flex flex-col gap-1">
                <span className="font-medium">{row.title}</span>
                <span className="text-xs text-muted-foreground">
                  {formatOfferTargets(row, productMap, categoryMap)}
                </span>
              </div>
            ),
          },
          {
            key: "discount",
            header: "Discount",
            cell: (row) => (
              <Badge variant="secondary" className="rounded-none">
                {(row.discountType ?? "percentage") === "fixed"
                  ? `$${row.discountPercent}`
                  : `${row.discountPercent}%`}
              </Badge>
            ),
          },
          {
            key: "dates",
            header: "Period",
            hideOnMobile: true,
            cell: (row) => formatDateRange(row.startsAt, row.endsAt),
          },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <StatusBadge status={row.isActive ? "active" : "inactive"} />
            ),
          },
          {
            key: "actions",
            header: "",
            className: "w-12 text-right",
            cell: (row) => (
              <RowActions
                onEdit={() => openEdit(row._id)}
                onDelete={() => setDeleteId(row._id)}
              />
            ),
          },
        ]}
        data={items}
        isLoading={isLoading}
        emptyTitle="No offers yet"
        emptyDescription="Create a promotional offer for products or categories."
      />

      <AdminFormSheet
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) close();
        }}
        title={mode === "edit" ? "Edit offer" : "New offer"}
        description={
          mode === "edit"
            ? "Update offer details and schedule."
            : "Set up a new promotional offer."
        }
        formId="admin-offer-form"
        mode={mode}
        isSubmitting={isCreating || isUpdating}
      >
        <OfferForm
          formId="admin-offer-form"
          key={editingItem?._id ?? "create"}
          defaultValues={editingItem ? toFormValues(editingItem) : createDefaults}
          products={products}
          categories={categories}
          onSubmit={handleSubmit}
        />
      </AdminFormSheet>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="Delete offer?"
        description="This offer will be permanently removed."
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
