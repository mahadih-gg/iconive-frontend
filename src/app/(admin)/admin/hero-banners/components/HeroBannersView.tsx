"use client";

import { useMemo, useState } from "react";
import { PlusIcon } from "lucide-react";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { ConfirmDeleteDialog } from "@/components/admin/shared/ConfirmDeleteDialog";
import { RowActions } from "@/components/admin/shared/RowActions";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAdminHeroBanners } from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";
import type { HeroBannerFormValues } from "@/lib/validations/admin/heroBannerSchema";
import type { AdminHeroBanner } from "@/types/admin";

import { HeroBannerForm } from "./HeroBannerForm";

const createDefaults: HeroBannerFormValues = {
  image: "",
  isActive: true,
  sortOrder: 0,
};

function toFormValues(banner: AdminHeroBanner): HeroBannerFormValues {
  return {
    image: banner.image,
    isActive: banner.isActive,
    sortOrder: banner.sortOrder,
  };
}

export function HeroBannersView() {
  const {
    items,
    isLoading,
    create,
    update,
    remove,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAdminHeroBanners();
  const { isOpen, mode, id, openCreate, openEdit, close } = useAdminSheet();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const editingItem = useMemo(
    () => (mode === "edit" && id ? items.find((item) => item._id === id) : undefined),
    [items, mode, id],
  );

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => a.sortOrder - b.sortOrder),
    [items],
  );

  async function handleSubmit(values: HeroBannerFormValues) {
    const payload = {
      image: values.image,
      isActive: values.isActive,
      sortOrder: values.sortOrder,
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
        title="Hero Banners"
        description="Manage homepage hero carousel slides"
        actions={
          <Button onClick={openCreate} className="rounded-none">
            <PlusIcon data-icon="inline-start" />
            Add banner
          </Button>
        }
      />

      <AdminDataTable
        columns={[
          {
            key: "image",
            header: "Preview",
            className: "w-28",
            cell: (row) =>
              row.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={row.image}
                  alt=""
                  className="size-12 object-cover"
                />
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              ),
          },
          {
            key: "sortOrder",
            header: "Order",
            className: "w-24",
            cell: (row) => row.sortOrder,
          },
          {
            key: "status",
            header: "Status",
            className: "w-32",
            cell: (row) => (
              <StatusBadge status={row.isActive ? "active" : "inactive"} />
            ),
          },
          {
            key: "actions",
            header: "",
            className: "w-14 text-right",
            cell: (row) => (
              <RowActions
                onEdit={() => openEdit(row._id)}
                onDelete={() => setDeleteId(row._id)}
              />
            ),
          },
        ]}
        data={sortedItems}
        isLoading={isLoading}
        emptyTitle="No hero banners yet"
        emptyDescription="Add slides for the homepage hero carousel."
      />

      <AdminFormSheet
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) close();
        }}
        title={mode === "edit" ? "Edit hero banner" : "New hero banner"}
        description={
          mode === "edit"
            ? "Update banner image, order, and visibility."
            : "Add a new homepage hero slide."
        }
        formId="admin-hero-banner-form"
        mode={mode}
        isSubmitting={isCreating || isUpdating}
      >
        <HeroBannerForm
          formId="admin-hero-banner-form"
          key={editingItem?._id ?? "create"}
          defaultValues={editingItem ? toFormValues(editingItem) : createDefaults}
          onSubmit={handleSubmit}
        />
      </AdminFormSheet>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="Delete hero banner?"
        description="This slide will be permanently removed from the carousel."
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
