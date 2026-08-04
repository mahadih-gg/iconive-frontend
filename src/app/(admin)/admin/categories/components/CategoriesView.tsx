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
import { useAdminCategories } from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";
import type { CategoryFormValues } from "@/lib/validations/admin/categorySchema";
import type { AdminCategory } from "@/types/admin";
import { slugify } from "@/utils/slugify";

import { CategoryForm } from "./CategoryForm";

const createDefaults: CategoryFormValues = {
  name: "",
  slug: "",
  image: "",
  parentId: "",
  isActive: true,
  sortOrder: 0,
};

function toFormValues(category: AdminCategory): CategoryFormValues {
  return {
    name: category.name,
    slug: category.slug || slugify(category.name),
    image: category.image ?? "",
    parentId: category.parentId ?? "",
    isActive: category.isActive,
    sortOrder: category.sortOrder,
  };
}

export function CategoriesView() {
  const {
    items,
    isLoading,
    create,
    update,
    remove,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAdminCategories();
  const { isOpen, mode, id, openCreate, openEdit, close } = useAdminSheet();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const editingItem = useMemo(
    () => (mode === "edit" && id ? items.find((item) => item._id === id) : undefined),
    [items, mode, id],
  );

  const parentOptions = useMemo(
    () =>
      items.filter(
        (category) =>
          category.parentId === null && category._id !== editingItem?._id,
      ),
    [items, editingItem],
  );

  const categoryMap = useMemo(
    () => new Map(items.map((category) => [category._id, category.name])),
    [items],
  );

  async function handleSubmit(values: CategoryFormValues) {
    const payload = {
      name: values.name,
      slug: values.slug || slugify(values.name),
      image: values.image || undefined,
      parentId: values.parentId || null,
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
        title="Categories"
        description="Manage categories and subcategories. Use Parent Categories for top-level items."
        actions={
          <Button onClick={openCreate} className="rounded-none">
            <PlusIcon data-icon="inline-start" />
            Add category
          </Button>
        }
      />

      <AdminDataTable
        columns={[
          {
            key: "image",
            header: "Image",
            className: "w-16",
            cell: (row) =>
              row.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={row.image}
                  alt={row.name}
                  className="size-10 object-cover"
                />
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              ),
          },
          {
            key: "name",
            header: "Name",
            cell: (row) => (
              <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate font-medium">{row.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {row.slug}
                </span>
              </div>
            ),
          },
          {
            key: "parent",
            header: "Parent",
            className: "w-36",
            hideOnMobile: true,
            cell: (row) =>
              row.parentId ? (
                categoryMap.get(row.parentId) ?? "—"
              ) : (
                <Badge variant="outline" className="rounded-none">
                  Top-level
                </Badge>
              ),
          },
          {
            key: "sortOrder",
            header: "Order",
            className: "w-20",
            hideOnMobile: true,
            cell: (row) => row.sortOrder,
          },
          {
            key: "status",
            header: "Status",
            className: "w-28",
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
        data={items}
        isLoading={isLoading}
        emptyTitle="No categories yet"
        emptyDescription="Create your first category to organize products."
      />

      <AdminFormSheet
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) close();
        }}
        title={mode === "edit" ? "Edit category" : "New category"}
        description={
          mode === "edit"
            ? "Update category details and visibility."
            : "Add a new category or subcategory."
        }
        formId="admin-category-form"
        mode={mode}
        isSubmitting={isCreating || isUpdating}
      >
        <CategoryForm
          formId="admin-category-form"
          key={editingItem?._id ?? "create"}
          defaultValues={editingItem ? toFormValues(editingItem) : createDefaults}
          parentOptions={parentOptions}
          onSubmit={handleSubmit}
          isSubmitting={isCreating || isUpdating}
        />
      </AdminFormSheet>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="Delete category?"
        description="This category will be permanently removed. Products linked to it may need reassignment."
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
