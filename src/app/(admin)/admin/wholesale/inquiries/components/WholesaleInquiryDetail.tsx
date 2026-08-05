"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldTitle,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { AdminWholesaleInquiry } from "@/types/admin";
import { formatAdminDate } from "@/utils/formatters";

const replySchema = z.object({
  reply: z.string().min(1, "Reply message is required"),
});

export type WholesaleInquiryReplyValues = z.infer<typeof replySchema>;

interface WholesaleInquiryDetailProps {
  formId: string;
  inquiry: AdminWholesaleInquiry;
  onSubmit: (values: WholesaleInquiryReplyValues) => void | Promise<void>;
}

export function WholesaleInquiryDetail({
  formId,
  inquiry,
  onSubmit,
}: WholesaleInquiryDetailProps) {
  const form = useForm<WholesaleInquiryReplyValues>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      reply: inquiry.reply ?? "",
    },
  });

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <FieldGroup className="gap-4">
        <div className="flex items-center justify-between gap-3">
          <FieldTitle>Inquiry details</FieldTitle>
          <StatusBadge status={inquiry.status} />
        </div>

        <dl className="grid gap-3 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">Name</dt>
            <dd className="text-right font-medium">{inquiry.name}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">Email</dt>
            <dd className="text-right">{inquiry.email}</dd>
          </div>
          {inquiry.phone ? (
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="text-right">{inquiry.phone}</dd>
            </div>
          ) : null}
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">Received</dt>
            <dd className="text-right">{formatAdminDate(inquiry.createdAt)}</dd>
          </div>

          <FieldSeparator />

          <div className="flex flex-col gap-1.5">
            <dt className="text-muted-foreground">Message</dt>
            <dd className="rounded-none border border-border bg-muted/30 p-3 leading-relaxed whitespace-pre-wrap">
              {inquiry.message}
            </dd>
          </div>

          {inquiry.reply && inquiry.repliedAt ? (
            <div className="flex flex-col gap-1.5">
              <dt className="flex items-center justify-between gap-2 text-muted-foreground">
                <span>Previous reply</span>
                <span>{formatAdminDate(inquiry.repliedAt)}</span>
              </dt>
              <dd className="rounded-none border border-border bg-muted/30 p-3 leading-relaxed whitespace-pre-wrap">
                {inquiry.reply}
              </dd>
            </div>
          ) : null}
        </dl>
      </FieldGroup>

      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.reply}>
          <FieldLabel htmlFor="inquiry-reply">
            {inquiry.reply ? "Update reply" : "Reply"}
          </FieldLabel>
          <Textarea
            id="inquiry-reply"
            rows={5}
            placeholder="Write a reply to this inquiry..."
            aria-invalid={!!form.formState.errors.reply}
            className="rounded-none"
            {...form.register("reply")}
          />
          <FieldError>{form.formState.errors.reply?.message}</FieldError>
        </Field>
      </FieldGroup>
    </form>
  );
}
