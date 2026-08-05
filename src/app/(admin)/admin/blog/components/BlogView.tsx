"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { ConfirmDeleteDialog } from "@/components/admin/shared/ConfirmDeleteDialog";
import { RowActions } from "@/components/admin/shared/RowActions";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAdminBlog } from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";

import { slugify } from "@/utils/slugify";

import {
  BlogForm,
  emptyBlogFormValues,
  toAdminBlogPayload,
  type BlogFormValues,
  toBlogFormValues,
} from "./BlogForm";

export function BlogView() {
  const { items, isLoading, create, update, remove, isCreating, isUpdating, isDeleting } =
    useAdminBlog();
  const sheet = useAdminSheet();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const editingItem =
    sheet.mode === "edit" && sheet.id
      ? items.find((item) => item._id === sheet.id)
      : undefined;

  async function handleSubmit(values: BlogFormValues) {
    const payload = {
      ...toAdminBlogPayload(values),
      slug: values.slug || slugify(values.title),
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
        title="Blog"
        description="Write and publish blog posts with the rich text editor"
        actions={
          <Button onClick={sheet.openCreate}>
            <PlusIcon data-icon="inline-start" />
            New post
          </Button>
        }
      />

      <AdminDataTable
        columns={[
          {
            key: "title",
            header: "Title",
            cell: (row) => (
              <div className="min-w-0">
                <p className="font-medium">{row.title}</p>
                {row.featured ? (
                  <p className="text-xs text-muted-foreground">Featured</p>
                ) : null}
              </div>
            ),
          },
          {
            key: "category",
            header: "Category",
            hideOnMobile: true,
            cell: (row) => row.category,
          },
          {
            key: "author",
            header: "Author",
            hideOnMobile: true,
            cell: (row) => row.author,
          },
          {
            key: "slug",
            header: "Slug",
            hideOnMobile: true,
            cell: (row) => (
              <span className="text-muted-foreground">{row.slug}</span>
            ),
          },
          {
            key: "published",
            header: "Status",
            cell: (row) => (
              <StatusBadge status={row.published ? "published" : "pending"} />
            ),
          },
          {
            key: "actions",
            header: "",
            className: "w-12",
            cell: (row) => (
              <RowActions
                onEdit={() => sheet.openEdit(row._id)}
                onDelete={() => setDeleteId(row._id)}
              />
            ),
          },
        ]}
        data={items}
        isLoading={isLoading}
        emptyTitle="No blog posts"
        emptyDescription="Create your first blog post to get started."
        mobileCard={(row) => (
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{row.title}</p>
                <p className="text-sm text-muted-foreground">
                  {row.category}
                  {row.author ? ` · ${row.author}` : ""}
                </p>
              </div>
              <StatusBadge status={row.published ? "published" : "pending"} />
            </div>
            <div className="flex justify-end">
              <RowActions
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
        title={sheet.mode === "create" ? "New blog post" : "Edit blog post"}
        description={
          sheet.mode === "create"
            ? "Write a new article with the rich text editor."
            : "Update content, cover, and publishing options."
        }
        formId="admin-blog-form"
        mode={sheet.mode}
        isSubmitting={isCreating || isUpdating}
        contentClassName="sm:max-w-2xl"
        createLabel="Create post"
        updateLabel="Save changes"
      >
        <BlogForm
          formId="admin-blog-form"
          key={`${sheet.mode}-${sheet.id ?? "new"}`}
          defaultValues={
            editingItem ? toBlogFormValues(editingItem) : emptyBlogFormValues
          }
          onSubmit={handleSubmit}
        />
      </AdminFormSheet>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete blog post?"
        description="This post will be permanently removed from the blog."
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
