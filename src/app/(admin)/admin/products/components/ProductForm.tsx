"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ImageIcon,
  PlayIcon,
  PlusIcon,
  Trash2Icon,
  VideoIcon,
} from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import { ImageUploadField } from "@/components/admin/shared/ImageUploadField";
import { RichTextEditor } from "@/components/admin/shared/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TagInput } from "@/components/ui/tag-input";
import { Textarea } from "@/components/ui/textarea";
import {
  productFormSchema,
  type ProductFormValues,
} from "@/lib/validations/admin/productSchema";
import type { AdminCategory } from "@/types/admin";
import { cn } from "@/lib/utils";
import { slugify } from "@/utils/slugify";
import {
  extractYoutubeVideoId,
  getYoutubeThumbnail,
  isValidYoutubeUrl,
  normalizeYoutubeUrl,
} from "@/utils/youtube";

const NONE_SUBCATEGORY = "__none__";

interface ProductFormProps {
  formId: string;
  defaultValues: ProductFormValues;
  categories: AdminCategory[];
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
}

function FormSection({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex flex-col gap-4 border border-border bg-card p-4",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold">{title}</h3>
          {description ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function ProductForm({
  formId,
  defaultValues,
  categories,
  onSubmit,
}: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeError, setYoutubeError] = useState<string | null>(null);

  const nameValue = form.watch("name");
  const categoryId = form.watch("categoryId");
  const subCategoryId = form.watch("subCategoryId");
  const price = form.watch("price") || 0;
  const discount = form.watch("discount") || 0;
  const discountType = form.watch("discountType");
  const media = form.watch("media");
  const description = form.watch("description");

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const {
    fields: mediaFields,
    append: appendMedia,
    remove: removeMedia,
  } = useFieldArray({
    control: form.control,
    name: "media",
  });

  useEffect(() => {
    form.setValue("slug", slugify(nameValue ?? ""), {
      shouldDirty: true,
      shouldValidate: form.formState.isSubmitted,
    });
  }, [nameValue, form]);

  const topLevelCategories = useMemo(
    () => categories.filter((category) => category.parentId === null),
    [categories],
  );

  const subCategories = useMemo(
    () =>
      categories.filter(
        (category) =>
          category.parentId !== null && category.parentId === categoryId,
      ),
    [categories, categoryId],
  );

  const sellingPrice = useMemo(() => {
    if (discountType === "fixed") return Math.max(0, price - discount);
    return Math.max(0, price - (price * discount) / 100);
  }, [price, discount, discountType]);

  function handleAddImageFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      appendMedia({ type: "image", url: reader.result });
    };
    reader.readAsDataURL(file);
  }

  function openYoutubeModal() {
    setYoutubeUrl("");
    setYoutubeError(null);
    setIsYoutubeModalOpen(true);
  }

  function closeYoutubeModal() {
    setIsYoutubeModalOpen(false);
    setYoutubeUrl("");
    setYoutubeError(null);
  }

  function handleAddYoutube(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = youtubeUrl.trim();

    if (!url) {
      setYoutubeError("YouTube URL is required");
      return;
    }

    if (!isValidYoutubeUrl(url)) {
      setYoutubeError("Enter a valid YouTube URL");
      return;
    }

    appendMedia({ type: "youtube", url: normalizeYoutubeUrl(url) });
    closeYoutubeModal();
  }

  return (
    <>
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]"
    >
      <div className="flex flex-col gap-4">
        <FormSection title="Product Information">
          <FieldGroup className="gap-4">
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="product-name">Name</FieldLabel>
              <Input
                id="product-name"
                placeholder="Enter name"
                className="rounded-none"
                aria-invalid={!!form.formState.errors.name}
                {...form.register("name")}
              />
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>

            <Field data-invalid={!!form.formState.errors.slug}>
              <FieldLabel htmlFor="product-slug">Slug</FieldLabel>
              <Input
                id="product-slug"
                placeholder="enter-slug"
                className="rounded-none bg-muted"
                readOnly
                aria-readonly="true"
                aria-invalid={!!form.formState.errors.slug}
                {...form.register("slug")}
              />
              <FieldDescription>Auto-generated from the name</FieldDescription>
              <FieldError>{form.formState.errors.slug?.message}</FieldError>
            </Field>

            <Field data-invalid={!!form.formState.errors.categoryId}>
              <FieldLabel htmlFor="product-category">Category</FieldLabel>
              <Select
                value={categoryId}
                onValueChange={(value) => {
                  form.setValue("categoryId", value, { shouldValidate: true });
                  form.setValue("subCategoryId", "");
                }}
              >
                <SelectTrigger
                  id="product-category"
                  className="w-full rounded-none"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {topLevelCategories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError>
                {form.formState.errors.categoryId?.message}
              </FieldError>
            </Field>

            <Field data-invalid={!!form.formState.errors.subCategoryId}>
              <FieldLabel htmlFor="product-subcategory">Subcategory</FieldLabel>
              <Select
                value={subCategoryId || NONE_SUBCATEGORY}
                onValueChange={(value) =>
                  form.setValue(
                    "subCategoryId",
                    value === NONE_SUBCATEGORY ? "" : value,
                  )
                }
                disabled={subCategories.length === 0}
              >
                <SelectTrigger
                  id="product-subcategory"
                  className="w-full rounded-none"
                >
                  <SelectValue placeholder="Optional subcategory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE_SUBCATEGORY}>None</SelectItem>
                  {subCategories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError>
                {form.formState.errors.subCategoryId?.message}
              </FieldError>
            </Field>

            <Field data-invalid={!!form.formState.errors.description}>
              <FieldLabel htmlFor="product-description">Description</FieldLabel>
              <RichTextEditor
                id="product-description"
                value={description ?? ""}
                onChange={(value) =>
                  form.setValue("description", value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                placeholder="Write product description..."
                aria-invalid={!!form.formState.errors.description}
              />
              <FieldError>
                {form.formState.errors.description?.message}
              </FieldError>
            </Field>
          </FieldGroup>
        </FormSection>

        <FormSection title="Media">
          <input
            ref={imageInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            onChange={handleAddImageFile}
          />
          {mediaFields.length === 0 ? (
            <p className="text-sm text-muted-foreground">No media added yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {mediaFields.map((field, index) => {
                const item = media[index];
                const youtubeId =
                  item?.type === "youtube"
                    ? extractYoutubeVideoId(item.url)
                    : null;
                const youtubeThumb = youtubeId
                  ? getYoutubeThumbnail(youtubeId)
                  : null;

                return (
                  <div
                    key={field.id}
                    className="flex items-start gap-3 border border-border p-3"
                  >
                    {item?.type === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.url}
                        alt={`Media ${index + 1}`}
                        className="size-16 shrink-0 object-cover"
                      />
                    ) : youtubeThumb ? (
                      <div className="relative size-16 shrink-0 overflow-hidden bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={youtubeThumb}
                          alt={`YouTube video ${index + 1}`}
                          className="size-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <PlayIcon className="size-5 fill-white text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex size-16 shrink-0 items-center justify-center bg-muted">
                        <VideoIcon className="size-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {item?.type === "youtube" ? "YouTube Video" : "Image"}
                      </p>
                      {item?.type === "youtube" ? (
                        <Input
                          className="mt-1 rounded-none"
                          value={item.url}
                          onChange={(event) =>
                            form.setValue(
                              `media.${index}.url`,
                              event.target.value,
                              { shouldValidate: true },
                            )
                          }
                          placeholder="https://youtube.com/..."
                        />
                      ) : (
                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          Image added
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="rounded-none text-destructive"
                      onClick={() => removeMedia(index)}
                      aria-label="Remove media"
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-none"
              onClick={() => imageInputRef.current?.click()}
            >
              <PlusIcon data-icon="inline-start" />
              Add Image
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-none"
              onClick={openYoutubeModal}
            >
              <PlusIcon data-icon="inline-start" />
              Add YouTube Video
            </Button>
          </div>
        </FormSection>

        <FormSection
          title="Variants (optional)"
          description="Leave empty if this product has no variants."
          action={
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-none"
              onClick={() =>
                appendVariant({
                  label: "",
                  value: "",
                  price: 0,
                  stock: 0,
                  mediaType: "image",
                  image: "",
                  videoUrl: "",
                })
              }
            >
              <PlusIcon data-icon="inline-start" />
              Add Variant
            </Button>
          }
        >
          {variantFields.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No variants added yet.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {variantFields.map((field, index) => {
                const mediaType = form.watch(`variants.${index}.mediaType`);
                return (
                  <div
                    key={field.id}
                    className="flex flex-col gap-4 border border-border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">
                        Variant {index + 1}
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="rounded-none text-destructive"
                        onClick={() => removeVariant(index)}
                        aria-label={`Remove variant ${index + 1}`}
                      >
                        <Trash2Icon />
                      </Button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        data-invalid={
                          !!form.formState.errors.variants?.[index]?.label
                        }
                      >
                        <FieldLabel htmlFor={`variant-label-${index}`}>
                          Label
                        </FieldLabel>
                        <Input
                          id={`variant-label-${index}`}
                          placeholder="e.g. Color"
                          className="rounded-none"
                          {...form.register(`variants.${index}.label`)}
                        />
                        <FieldError>
                          {
                            form.formState.errors.variants?.[index]?.label
                              ?.message
                          }
                        </FieldError>
                      </Field>

                      <Field>
                        <FieldLabel htmlFor={`variant-value-${index}`}>
                          Value (optional)
                        </FieldLabel>
                        <Input
                          id={`variant-value-${index}`}
                          placeholder="e.g. Red"
                          className="rounded-none"
                          {...form.register(`variants.${index}.value`)}
                        />
                      </Field>

                      <Field
                        data-invalid={
                          !!form.formState.errors.variants?.[index]?.price
                        }
                      >
                        <FieldLabel htmlFor={`variant-price-${index}`}>
                          Price
                        </FieldLabel>
                        <Input
                          id={`variant-price-${index}`}
                          type="number"
                          min={0}
                          step="0.01"
                          className="rounded-none"
                          {...form.register(`variants.${index}.price`)}
                        />
                        <FieldError>
                          {
                            form.formState.errors.variants?.[index]?.price
                              ?.message
                          }
                        </FieldError>
                      </Field>

                      <Field
                        data-invalid={
                          !!form.formState.errors.variants?.[index]?.stock
                        }
                      >
                        <FieldLabel htmlFor={`variant-stock-${index}`}>
                          Stock Qty
                        </FieldLabel>
                        <Input
                          id={`variant-stock-${index}`}
                          type="number"
                          min={0}
                          className="rounded-none"
                          {...form.register(`variants.${index}.stock`)}
                        />
                        <FieldError>
                          {
                            form.formState.errors.variants?.[index]?.stock
                              ?.message
                          }
                        </FieldError>
                      </Field>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-medium">Media</p>
                          <p className="text-xs text-muted-foreground">
                            A variant can have either an image or a video, not
                            both.
                          </p>
                        </div>
                        <div className="flex border border-border">
                          <Button
                            type="button"
                            size="sm"
                            variant={
                              mediaType === "image" ? "default" : "ghost"
                            }
                            className="rounded-none"
                            onClick={() => {
                              form.setValue(
                                `variants.${index}.mediaType`,
                                "image",
                              );
                              form.setValue(`variants.${index}.videoUrl`, "");
                            }}
                          >
                            <ImageIcon data-icon="inline-start" />
                            Image
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant={
                              mediaType === "video" ? "default" : "ghost"
                            }
                            className="rounded-none"
                            onClick={() => {
                              form.setValue(
                                `variants.${index}.mediaType`,
                                "video",
                              );
                              form.setValue(`variants.${index}.image`, "");
                            }}
                          >
                            <VideoIcon data-icon="inline-start" />
                            Video URL
                          </Button>
                        </div>
                      </div>

                      {mediaType === "image" ? (
                        <ImageUploadField
                          variant="dropzone"
                          label="Upload image"
                          value={form.watch(`variants.${index}.image`) ?? ""}
                          onChange={(value) =>
                            form.setValue(`variants.${index}.image`, value)
                          }
                        />
                      ) : (
                        <Input
                          placeholder="https://youtube.com/..."
                          className="rounded-none"
                          {...form.register(`variants.${index}.videoUrl`)}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </FormSection>

        <FormSection title="SEO">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="product-meta-title">Meta Title</FieldLabel>
              <Input
                id="product-meta-title"
                className="rounded-none"
                {...form.register("metaTitle")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="product-meta-description">
                Meta Description
              </FieldLabel>
              <Textarea
                id="product-meta-description"
                rows={3}
                className="rounded-none"
                {...form.register("metaDescription")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="product-meta-keywords">
                Meta Keywords
              </FieldLabel>
              <TagInput
                id="product-meta-keywords"
                value={form.watch("metaKeywords") ?? ""}
                onChange={(value) =>
                  form.setValue("metaKeywords", value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                placeholder="Type a keyword and press Enter"
              />
            </Field>
          </FieldGroup>
        </FormSection>
      </div>

      <div className="flex flex-col gap-4">
        <FormSection title="Pricing">
          <FieldGroup className="gap-4">
            <Field data-invalid={!!form.formState.errors.price}>
              <FieldLabel htmlFor="product-price">Price</FieldLabel>
              <Input
                id="product-price"
                type="number"
                min={0}
                step="0.01"
                className="rounded-none"
                aria-invalid={!!form.formState.errors.price}
                {...form.register("price")}
              />
              <FieldError>{form.formState.errors.price?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="product-discount-type">
                Discount Type
              </FieldLabel>
              <Select
                value={discountType}
                onValueChange={(value: "percentage" | "fixed") =>
                  form.setValue("discountType", value)
                }
              >
                <SelectTrigger
                  id="product-discount-type"
                  className="w-full rounded-none"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed amount</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field data-invalid={!!form.formState.errors.discount}>
              <FieldLabel htmlFor="product-discount">
                {discountType === "fixed" ? "Discount ($)" : "Discount (%)"}
              </FieldLabel>
              <Input
                id="product-discount"
                type="number"
                min={0}
                max={discountType === "percentage" ? 100 : undefined}
                step="0.01"
                className="rounded-none"
                aria-invalid={!!form.formState.errors.discount}
                {...form.register("discount")}
              />
              <FieldError>{form.formState.errors.discount?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>Selling Price</FieldLabel>
              <div className="flex h-9 items-center border border-border bg-muted/40 px-3 text-sm font-medium">
                {sellingPrice.toFixed(2)}
              </div>
            </Field>
          </FieldGroup>
        </FormSection>

        <FormSection title="Inventory">
          <Field data-invalid={!!form.formState.errors.stock}>
            <FieldLabel htmlFor="product-stock">Stock Qty</FieldLabel>
            <Input
              id="product-stock"
              type="number"
              min={0}
              className="rounded-none"
              aria-invalid={!!form.formState.errors.stock}
              {...form.register("stock")}
            />
            <FieldDescription>
              Used when product has no variants.
            </FieldDescription>
            <FieldError>{form.formState.errors.stock?.message}</FieldError>
          </Field>
        </FormSection>

        <FormSection title="Thumbnail Image">
          <ImageUploadField
            variant="dropzone"
            label="Upload image"
            value={form.watch("thumbnail") ?? ""}
            onChange={(value) =>
              form.setValue("thumbnail", value, { shouldValidate: true })
            }
          />
        </FormSection>

        <FormSection title="SEO Open Graph Image">
          <ImageUploadField
            variant="dropzone"
            label="Upload image"
            value={form.watch("ogImage") ?? ""}
            onChange={(value) =>
              form.setValue("ogImage", value, { shouldValidate: true })
            }
          />
        </FormSection>

        <FormSection title="Toggles">
          <FieldGroup className="gap-4">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="product-featured">Featured</FieldLabel>
              </FieldContent>
              <Switch
                id="product-featured"
                checked={form.watch("isFeatured")}
                onCheckedChange={(checked) =>
                  form.setValue("isFeatured", checked)
                }
              />
            </Field>

            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="product-available">Active</FieldLabel>
              </FieldContent>
              <Switch
                id="product-available"
                checked={form.watch("available")}
                onCheckedChange={(checked) =>
                  form.setValue("available", checked)
                }
              />
            </Field>
          </FieldGroup>
        </FormSection>
      </div>
    </form>

    <Dialog
      open={isYoutubeModalOpen}
      onOpenChange={(open) => {
        if (!open) closeYoutubeModal();
        else setIsYoutubeModalOpen(true);
      }}
    >
      <DialogContent className="rounded-none sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add YouTube Video</DialogTitle>
          <DialogDescription>
            Paste a YouTube video URL to add it to product media.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAddYoutube} className="flex flex-col gap-4">
          <Field data-invalid={!!youtubeError}>
            <FieldLabel htmlFor="product-youtube-url">YouTube URL</FieldLabel>
            <Input
              id="product-youtube-url"
              type="url"
              value={youtubeUrl}
              onChange={(event) => {
                setYoutubeUrl(event.target.value);
                if (youtubeError) setYoutubeError(null);
              }}
              placeholder="https://youtube.com/watch?v=..."
              className="rounded-none"
              autoFocus
              aria-invalid={!!youtubeError}
            />
            <FieldError>{youtubeError}</FieldError>
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="rounded-none"
              onClick={closeYoutubeModal}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-none">
              Add video
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
}
