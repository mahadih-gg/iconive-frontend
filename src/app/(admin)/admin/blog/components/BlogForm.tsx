"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { ImageUploadField } from "@/components/admin/shared/ImageUploadField";
import { RichTextEditor } from "@/components/admin/shared/RichTextEditor";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TagInput } from "@/components/ui/tag-input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { AdminBlogPost } from "@/types/admin";
import { slugify } from "@/utils/slugify";

function hasRichTextContent(html: string): boolean {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 0;
}

const schema = z.object({
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  image: z.string().min(1, "Cover image is required"),
  slug: z.string().min(1, "Slug is required"),
  author: z.string().min(1, "Author is required"),
  tags: z.string(),
  featured: z.boolean(),
  body: z
    .string()
    .refine(hasRichTextContent, { message: "Content is required" }),
  published: z.boolean(),
});

export type BlogFormValues = z.infer<typeof schema>;

export const emptyBlogFormValues: BlogFormValues = {
  category: "",
  title: "",
  excerpt: "",
  image: "",
  slug: "",
  author: "Iconive",
  tags: "",
  featured: false,
  body: "",
  published: false,
};

function parseTags(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function FormSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
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
      <div className="min-w-0">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function toBlogFormValues(post: AdminBlogPost): BlogFormValues {
  return {
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    slug: post.slug,
    author: post.author,
    tags: post.tags.join(", "),
    featured: post.featured,
    body: post.body,
    published: post.published,
  };
}

export function toAdminBlogPayload(values: BlogFormValues) {
  return {
    category: values.category.trim(),
    title: values.title.trim(),
    excerpt: values.excerpt.trim(),
    image: values.image,
    slug: values.slug.trim(),
    author: values.author.trim(),
    tags: parseTags(values.tags),
    featured: values.featured,
    body: values.body,
    published: values.published,
  };
}

interface BlogFormProps {
  formId: string;
  defaultValues: BlogFormValues;
  onSubmit: (values: BlogFormValues) => void | Promise<void>;
}

export function BlogForm({
  formId,
  defaultValues,
  onSubmit,
}: BlogFormProps) {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const titleValue = form.watch("title");

  useEffect(() => {
    form.setValue("slug", slugify(titleValue ?? ""), {
      shouldDirty: true,
      shouldValidate: form.formState.isSubmitted,
    });
  }, [titleValue, form]);

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]"
    >
      <div className="flex flex-col gap-4">
        <FormSection
          title="Post Information"
          description="Title, slug, and summary for the article."
        >
          <FieldGroup className="gap-4">
            <Field data-invalid={!!form.formState.errors.title}>
              <FieldLabel htmlFor="blog-title">Title</FieldLabel>
              <Input
                id="blog-title"
                placeholder="Enter title"
                className="rounded-none"
                aria-invalid={!!form.formState.errors.title}
                {...form.register("title")}
              />
              <FieldError>{form.formState.errors.title?.message}</FieldError>
            </Field>

            <Field data-invalid={!!form.formState.errors.slug}>
              <FieldLabel htmlFor="blog-slug">Slug</FieldLabel>
              <Input
                id="blog-slug"
                placeholder="enter-slug"
                className="rounded-none bg-muted"
                readOnly
                aria-readonly="true"
                aria-invalid={!!form.formState.errors.slug}
                {...form.register("slug")}
              />
              <FieldDescription>Auto-generated from the title</FieldDescription>
              <FieldError>{form.formState.errors.slug?.message}</FieldError>
            </Field>
          </FieldGroup>
        </FormSection>

        <FormSection
          title="Content"
          description="Write the full article with the rich text editor."
        >
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel htmlFor="blog-body">Body</FieldLabel>
                <RichTextEditor
                  id="blog-body"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder="Write your blog post..."
                  editorClassName="min-h-64"
                  aria-invalid={!!fieldState.error}
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
        </FormSection>
      </div>

      <div className="flex flex-col gap-4">

        <FormSection title="Category and Author">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={!!form.formState.errors.category}>
              <FieldLabel htmlFor="blog-category">Category</FieldLabel>
              <Input
                id="blog-category"
                placeholder="Basics"
                className="rounded-none"
                aria-invalid={!!form.formState.errors.category}
                {...form.register("category")}
              />
              <FieldError>
                {form.formState.errors.category?.message}
              </FieldError>
            </Field>

            <Field data-invalid={!!form.formState.errors.author}>
              <FieldLabel htmlFor="blog-author">Author</FieldLabel>
              <Input
                id="blog-author"
                placeholder="Iconive"
                className="rounded-none"
                aria-invalid={!!form.formState.errors.author}
                {...form.register("author")}
              />
              <FieldError>
                {form.formState.errors.author?.message}
              </FieldError>
            </Field>
          </div>

          <Field data-invalid={!!form.formState.errors.excerpt}>
            <FieldLabel htmlFor="blog-excerpt">Excerpt</FieldLabel>
            <Textarea
              id="blog-excerpt"
              rows={3}
              className="rounded-none"
              placeholder="Short summary for cards and SEO"
              aria-invalid={!!form.formState.errors.excerpt}
              {...form.register("excerpt")}
            />
            <FieldError>{form.formState.errors.excerpt?.message}</FieldError>
          </Field>

          <Field data-invalid={!!form.formState.errors.tags}>
            <FieldLabel htmlFor="blog-tags">Tags</FieldLabel>
            <TagInput
              id="blog-tags"
              value={form.watch("tags") ?? ""}
              onChange={(value) =>
                form.setValue("tags", value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              placeholder="Add tags..."
            />
            <FieldDescription>
              Press Enter or comma to add a tag
            </FieldDescription>
            <FieldError>{form.formState.errors.tags?.message}</FieldError>
          </Field>
        </FormSection>

        <FormSection title="Cover Image">
          <Field data-invalid={!!form.formState.errors.image}>
            <ImageUploadField
              variant="dropzone"
              label="Upload cover"
              value={form.watch("image")}
              onChange={(value) =>
                form.setValue("image", value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            />
            <FieldError>{form.formState.errors.image?.message}</FieldError>
          </Field>
        </FormSection>

        <FormSection
          title="Publishing"
          description="Visibility and homepage placement."
        >
          <FieldGroup className="gap-4">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="blog-featured">Featured</FieldLabel>
                <FieldDescription>
                  Show in homepage journal highlights
                </FieldDescription>
              </FieldContent>
              <Controller
                name="featured"
                control={form.control}
                render={({ field }) => (
                  <Switch
                    id="blog-featured"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </Field>

            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="blog-published">Published</FieldLabel>
                <FieldDescription>
                  Visible when published
                </FieldDescription>
              </FieldContent>
              <Controller
                name="published"
                control={form.control}
                render={({ field }) => (
                  <Switch
                    id="blog-published"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </Field>
          </FieldGroup>
        </FormSection>
      </div>
    </form>
  );
}
