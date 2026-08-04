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
import { CategoryForm } from "@/app/(admin)/admin/categories/components/CategoryForm";
import { useAdminCategories } from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";
import type { CategoryFormValues } from "@/lib/validations/admin/categorySchema";
import type { AdminCategory } from "@/types/admin";
import { slugify } from "@/utils/slugify";

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
    parentId: "",
    isActive: category.isActive,
    sortOrder: category.sortOrder,
  };
}

export function ParentCategoriesView() {
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

  const parentCategories = useMemo(
    () =>
      items
        .filter((category) => category.parentId === null)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [items],
  );

  const editingItem = useMemo(
    () =>
      mode === "edit" && id
        ? parentCategories.find((item) => item._id === id)
        : undefined,
    [parentCategories, mode, id],
  );

  async function handleSubmit(values: CategoryFormValues) {
    const payload = {
      name: values.name,
      slug: values.slug || slugify(values.name),
      image: values.image || undefined,
      parentId: null,
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
        title="Parent Categories"
        description="Manage top-level categories used as parents for subcategories"
        actions={
          <Button onClick={openCreate} className="rounded-none">
            <PlusIcon data-icon="inline-start" />
            Add parent category
          </Button>
        }
      />

      <AdminDataTable
        columns={[
          {
            key: "image",
            header: "Image",
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
              <div className="flex flex-col gap-1">
                <span className="font-medium">{row.name}</span>
                <span className="text-xs text-muted-foreground">{row.slug}</span>
              </div>
            ),
          },
          {
            key: "sortOrder",
            header: "Order",
            hideOnMobile: true,
            cell: (row) => row.sortOrder,
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
        data={parentCategories}
        isLoading={isLoading}
        emptyTitle="No parent categories yet"
        emptyDescription="Create a top-level category first, then add subcategories under Categories."
      />

      <AdminFormSheet
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) close();
        }}
        title={
          mode === "edit" ? "Edit parent category" : "New parent category"
        }
        description={
          mode === "edit"
            ? "Update this top-level category."
            : "Add a new top-level parent category."
        }
        formId="admin-parent-category-form"
        mode={mode}
        isSubmitting={isCreating || isUpdating}
      >
        <CategoryForm
          formId="admin-parent-category-form"
          key={editingItem?._id ?? "create"}
          defaultValues={
            editingItem ? toFormValues(editingItem) : createDefaults
          }
          hideParentSelect
          onSubmit={handleSubmit}
          isSubmitting={isCreating || isUpdating}
        />
      </AdminFormSheet>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="Delete parent category?"
        description="This top-level category will be removed. Subcategories under it may need reassignment."
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
