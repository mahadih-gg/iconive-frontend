"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { AdminReview } from "@/types/admin";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  rating: z.coerce.number().int().min(1).max(5, "Rating must be between 1 and 5"),
  title: z.string().min(1, "Title is required"),
  comment: z.string().min(1, "Comment is required"),
  productId: z.string().optional(),
  verified: z.boolean(),
  isPublished: z.boolean(),
});

export type ReviewFormValues = z.infer<typeof schema>;

export const emptyReviewFormValues: ReviewFormValues = {
  name: "",
  rating: 5,
  title: "",
  comment: "",
  productId: "",
  verified: false,
  isPublished: false,
};

export function toReviewFormValues(review: AdminReview): ReviewFormValues {
  return {
    name: review.name,
    rating: review.rating,
    title: review.title,
    comment: review.comment,
    productId: review.productId ?? "",
    verified: review.verified,
    isPublished: review.isPublished,
  };
}

interface ReviewFormProps {
  formId: string;
  defaultValues: ReviewFormValues;
  onSubmit: (values: ReviewFormValues) => void | Promise<void>;
}

export function ReviewForm({
  formId,
  defaultValues,
  onSubmit,
}: ReviewFormProps) {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <FieldGroup className="gap-4">
        <Field data-invalid={!!form.formState.errors.name}>
          <FieldLabel htmlFor="review-name">Name</FieldLabel>
          <Input
            id="review-name"
            aria-invalid={!!form.formState.errors.name}
            {...form.register("name")}
          />
          <FieldError>{form.formState.errors.name?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.rating}>
          <FieldLabel htmlFor="review-rating">Rating</FieldLabel>
          <Input
            id="review-rating"
            type="number"
            min={1}
            max={5}
            aria-invalid={!!form.formState.errors.rating}
            {...form.register("rating")}
          />
          <FieldDescription>Enter a value from 1 to 5.</FieldDescription>
          <FieldError>{form.formState.errors.rating?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.title}>
          <FieldLabel htmlFor="review-title">Title</FieldLabel>
          <Input
            id="review-title"
            aria-invalid={!!form.formState.errors.title}
            {...form.register("title")}
          />
          <FieldError>{form.formState.errors.title?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.comment}>
          <FieldLabel htmlFor="review-comment">Comment</FieldLabel>
          <Textarea
            id="review-comment"
            rows={4}
            aria-invalid={!!form.formState.errors.comment}
            {...form.register("comment")}
          />
          <FieldError>{form.formState.errors.comment?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.productId}>
          <FieldLabel htmlFor="review-product-id">Product ID</FieldLabel>
          <Input
            id="review-product-id"
            placeholder="Optional"
            aria-invalid={!!form.formState.errors.productId}
            {...form.register("productId")}
          />
          <FieldDescription>
            Link this review to a product, or leave blank.
          </FieldDescription>
          <FieldError>{form.formState.errors.productId?.message}</FieldError>
        </Field>

        <Field orientation="horizontal">
          <FieldLabel htmlFor="review-verified">Verified purchase</FieldLabel>
          <Controller
            name="verified"
            control={form.control}
            render={({ field }) => (
              <Switch
                id="review-verified"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </Field>

        <Field orientation="horizontal">
          <FieldLabel htmlFor="review-published">Published</FieldLabel>
          <Controller
            name="isPublished"
            control={form.control}
            render={({ field }) => (
              <Switch
                id="review-published"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </Field>
      </FieldGroup>
    </form>
  );
}
