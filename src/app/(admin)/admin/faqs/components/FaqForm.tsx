"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { AdminFaq } from "@/types/admin";

const schema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  sortOrder: z.coerce.number().int().min(0, "Sort order must be 0 or greater"),
  isActive: z.boolean(),
});

export type FaqFormValues = z.infer<typeof schema>;

export const emptyFaqFormValues: FaqFormValues = {
  question: "",
  answer: "",
  sortOrder: 1,
  isActive: true,
};

export function toFaqFormValues(faq: AdminFaq): FaqFormValues {
  return {
    question: faq.question,
    answer: faq.answer,
    sortOrder: faq.sortOrder,
    isActive: faq.isActive,
  };
}

interface FaqFormProps {
  formId: string;
  defaultValues: FaqFormValues;
  onSubmit: (values: FaqFormValues) => void | Promise<void>;
}

export function FaqForm({
  formId,
  defaultValues,
  onSubmit,
}: FaqFormProps) {
  const form = useForm<FaqFormValues>({
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
        <Field data-invalid={!!form.formState.errors.question}>
          <FieldLabel htmlFor="faq-question">Question</FieldLabel>
          <Input
            id="faq-question"
            aria-invalid={!!form.formState.errors.question}
            {...form.register("question")}
          />
          <FieldError>{form.formState.errors.question?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.answer}>
          <FieldLabel htmlFor="faq-answer">Answer</FieldLabel>
          <Textarea
            id="faq-answer"
            rows={5}
            aria-invalid={!!form.formState.errors.answer}
            {...form.register("answer")}
          />
          <FieldError>{form.formState.errors.answer?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.sortOrder}>
          <FieldLabel htmlFor="faq-sort-order">Sort order</FieldLabel>
          <Input
            id="faq-sort-order"
            type="number"
            min={0}
            aria-invalid={!!form.formState.errors.sortOrder}
            {...form.register("sortOrder")}
          />
          <FieldError>{form.formState.errors.sortOrder?.message}</FieldError>
        </Field>

        <Field orientation="horizontal">
          <FieldLabel htmlFor="faq-active">Active</FieldLabel>
          <Controller
            name="isActive"
            control={form.control}
            render={({ field }) => (
              <Switch
                id="faq-active"
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
