"use client";

import { PlusIcon, SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { ConfirmDeleteDialog } from "@/components/admin/shared/ConfirmDeleteDialog";
import { RowActions } from "@/components/admin/shared/RowActions";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAdminCategories,
  useAdminProducts,
} from "@/hooks/admin/useAdminResources";
import { useAdminSheet } from "@/hooks/admin/useAdminSheet";
import type { ProductFormValues } from "@/lib/validations/admin/productSchema";
import type { AdminProduct } from "@/types/admin";
import { slugify } from "@/utils/slugify";

import { ProductForm } from "./ProductForm";

const ALL_CATEGORIES = "all";

const createDefaults: ProductFormValues = {
  name: "",
  slug: "",
  description: "",
  categoryId: "",
  subCategoryId: "",
  media: [],
  variants: [],
  price: 0,
  discountType: "percentage",
  discount: 0,
  stock: 0,
  thumbnail: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  ogImage: "",
  isFeatured: false,
  available: true,
};

function toFormValues(product: AdminProduct): ProductFormValues {
  const variants =
    product.variants?.length
      ? product.variants
      : (product.addons ?? []).map((addon) => ({
        label: addon.name,
        value: addon.value,
        price: addon.price ?? 0,
        stock: 0,
        mediaType: "image" as const,
        image: "",
        videoUrl: "",
      }));

  const media =
    product.media?.length
      ? product.media
      : product.images.map((url) => ({ type: "image" as const, url }));

  return {
    name: product.name,
    slug: product.slug || slugify(product.name),
    description: product.description ?? "",
    categoryId: product.categoryId,
    subCategoryId: product.subCategoryId ?? "",
    media,
    variants,
    price: product.price,
    discountType: product.discountType ?? "percentage",
    discount: product.discount ?? 0,
    stock: product.stock,
    thumbnail: product.thumbnail ?? product.images[0] ?? "",
    metaTitle: product.metaTitle ?? "",
    metaDescription: product.metaDescription ?? "",
    metaKeywords: product.metaKeywords ?? "",
    ogImage: product.ogImage ?? "",
    isFeatured: product.isFeatured,
    available: product.available,
  };
}

function buildImages(values: ProductFormValues): string[] {
  const fromMedia = values.media
    .filter((item) => item.type === "image" && item.url)
    .map((item) => item.url);
  const images = [values.thumbnail, ...fromMedia].filter(Boolean) as string[];
  return [...new Set(images)];
}

export function ProductsView() {
  const {
    items,
    isLoading,
    create,
    update,
    remove,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAdminProducts();
  const { items: categories } = useAdminCategories();
  const { isOpen, mode, id, openCreate, openEdit, close } = useAdminSheet();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES);

  const editingItem = useMemo(
    () => (mode === "edit" && id ? items.find((item) => item._id === id) : undefined),
    [items, mode, id],
  );

  const categoryMap = useMemo(
    () => new Map(categories.map((category) => [category._id, category.name])),
    [categories],
  );

  const topLevelCategories = useMemo(
    () => categories.filter((category) => category.parentId === null),
    [categories],
  );

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((product) => {
      const matchesSearch =
        !query || product.name.toLowerCase().includes(query);
      const matchesCategory =
        categoryFilter === ALL_CATEGORIES ||
        product.categoryId === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [items, search, categoryFilter]);

  async function handleSubmit(values: ProductFormValues) {
    const images = buildImages(values);
    const variants = values.variants.map((variant) => ({
      label: variant.label,
      value: variant.value || undefined,
      price: variant.price,
      stock: variant.stock,
      mediaType: variant.mediaType,
      image: variant.mediaType === "image" ? variant.image || undefined : undefined,
      videoUrl:
        variant.mediaType === "video" ? variant.videoUrl || undefined : undefined,
    }));

    const media = values.media.filter(
      (item): item is { type: "image" | "youtube"; url: string } =>
        Boolean(item.type && item.url),
    );

    const payload: Partial<AdminProduct> = {
      name: values.name,
      slug: values.slug || slugify(values.name),
      description: values.description || undefined,
      price: values.price,
      discountType: values.discountType,
      discount: values.discount || 0,
      images,
      media,
      thumbnail: values.thumbnail || images[0] || undefined,
      categoryId: values.categoryId,
      subCategoryId: values.subCategoryId || undefined,
      stock: values.stock,
      isFeatured: values.isFeatured,
      available: values.available,
      variants,
      addons: variants.map((variant) => ({
        name: variant.label,
        value: variant.value ?? "",
        price: variant.price,
      })),
      metaTitle: values.metaTitle || undefined,
      metaDescription: values.metaDescription || undefined,
      metaKeywords: values.metaKeywords || undefined,
      ogImage: values.ogImage || undefined,
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
        title="Products"
        description="Manage catalog products, pricing, and inventory"
        actions={
          <Button onClick={openCreate} className="rounded-none">
            <PlusIcon data-icon="inline-start" />
            Add product
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            className="rounded-none pl-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full rounded-none sm:w-52">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_CATEGORIES}>All categories</SelectItem>
            {topLevelCategories.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AdminDataTable
        columns={[
          {
            key: "name",
            header: "Product",
            cell: (row) => (
              <div className="flex flex-col gap-1">
                <span className="font-medium">{row.name}</span>
                {row.isFeatured ? (
                  <Badge variant="secondary" className="w-fit rounded-none">
                    Featured
                  </Badge>
                ) : null}
              </div>
            ),
          },
          {
            key: "category",
            header: "Category",
            hideOnMobile: true,
            cell: (row) => categoryMap.get(row.categoryId) ?? "—",
          },
          {
            key: "price",
            header: "Price",
            cell: (row) => `$${row.price.toFixed(2)}`,
          },
          {
            key: "stock",
            header: "Stock",
            hideOnMobile: true,
            cell: (row) => row.stock,
          },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <StatusBadge status={row.available ? "active" : "inactive"} />
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
        data={filteredItems}
        isLoading={isLoading}
        emptyTitle="No products found"
        emptyDescription="Adjust filters or add a new product."
      />

      <AdminFormSheet
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) close();
        }}
        title={mode === "edit" ? "Edit product" : "New product"}
        description={
          mode === "edit"
            ? "Update product details, pricing, and availability."
            : "Add a new product to the catalog."
        }
        formId="admin-product-form"
        mode={mode}
        isSubmitting={isCreating || isUpdating}
        contentClassName="w-full sm:max-w-[80%]"
      >
        <ProductForm
          formId="admin-product-form"
          key={editingItem?._id ?? "create"}
          defaultValues={editingItem ? toFormValues(editingItem) : createDefaults}
          categories={categories}
          onSubmit={handleSubmit}
        />
      </AdminFormSheet>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="Delete product?"
        description="This product will be permanently removed from the catalog."
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
