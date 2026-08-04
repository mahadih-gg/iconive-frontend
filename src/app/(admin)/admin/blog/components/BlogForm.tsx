"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { AdminBlogPost } from "@/types/admin";

const schema = z.object({
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  image: z.string().min(1, "Image URL is required"),
  slug: z.string().min(1, "Slug is required"),
  body: z.string().min(1, "Body is required"),
  published: z.boolean(),
});

export type BlogFormValues = z.infer<typeof schema>;

export const emptyBlogFormValues: BlogFormValues = {
  category: "",
  title: "",
  excerpt: "",
  image: "",
  slug: "",
  body: "",
  published: false,
};

export function toBlogFormValues(post: AdminBlogPost): BlogFormValues {
  return {
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    slug: post.slug,
    body: post.body.join("\n\n"),
    published: post.published,
  };
}

interface BlogFormProps {
  defaultValues: BlogFormValues;
  onSubmit: (values: BlogFormValues) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function BlogForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting,
}: BlogFormProps) {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function handleSubmit(values: BlogFormValues) {
    await onSubmit(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-6"
    >
      <FieldGroup className="gap-4">
        <Field data-invalid={!!form.formState.errors.category}>
          <FieldLabel htmlFor="blog-category">Category</FieldLabel>
          <Input
            id="blog-category"
            aria-invalid={!!form.formState.errors.category}
            {...form.register("category")}
          />
          <FieldError>{form.formState.errors.category?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.title}>
          <FieldLabel htmlFor="blog-title">Title</FieldLabel>
          <Input
            id="blog-title"
            aria-invalid={!!form.formState.errors.title}
            {...form.register("title")}
          />
          <FieldError>{form.formState.errors.title?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.excerpt}>
          <FieldLabel htmlFor="blog-excerpt">Excerpt</FieldLabel>
          <Textarea
            id="blog-excerpt"
            rows={3}
            aria-invalid={!!form.formState.errors.excerpt}
            {...form.register("excerpt")}
          />
          <FieldError>{form.formState.errors.excerpt?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.image}>
          <FieldLabel htmlFor="blog-image">Image URL</FieldLabel>
          <Input
            id="blog-image"
            aria-invalid={!!form.formState.errors.image}
            {...form.register("image")}
          />
          <FieldError>{form.formState.errors.image?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.slug}>
          <FieldLabel htmlFor="blog-slug">Slug</FieldLabel>
          <Input
            id="blog-slug"
            aria-invalid={!!form.formState.errors.slug}
            {...form.register("slug")}
          />
          <FieldError>{form.formState.errors.slug?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.body}>
          <FieldLabel htmlFor="blog-body">Body</FieldLabel>
          <Textarea
            id="blog-body"
            rows={8}
            aria-invalid={!!form.formState.errors.body}
            {...form.register("body")}
          />
          <FieldDescription>
            Separate paragraphs with a blank line. Each block becomes a body
            section.
          </FieldDescription>
          <FieldError>{form.formState.errors.body?.message}</FieldError>
        </Field>

        <Field orientation="horizontal">
          <FieldLabel htmlFor="blog-published">Published</FieldLabel>
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

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
          Save
        </Button>
      </div>
    </form>
  );
}
