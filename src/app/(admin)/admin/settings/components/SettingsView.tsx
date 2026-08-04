"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useAdminSettings } from "@/hooks/admin/useAdminResources";
import type { AdminSettings } from "@/types/admin";

const schema = z.object({
  deliveryCharge: z.coerce.number().min(0, "Must be 0 or greater"),
  fxRate: z.coerce.number().positive("Must be greater than 0"),
  freeShippingThreshold: z.coerce.number().min(0, "Must be 0 or greater"),
  contactEmail: z.string().email("Enter a valid email"),
  whatsappNumber: z.string().min(1, "WhatsApp number is required"),
  socialLinksText: z.string(),
});

type SettingsFormValues = z.infer<typeof schema>;

function toSocialLinksText(links: AdminSettings["socialLinks"]) {
  return links.map((link) => `${link.label}|${link.href}`).join("\n");
}

function parseSocialLinks(text: string): AdminSettings["socialLinks"] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...hrefParts] = line.split("|");
      return {
        label: label.trim(),
        href: hrefParts.join("|").trim(),
      };
    })
    .filter((link) => link.label && link.href);
}

const emptyFormValues: SettingsFormValues = {
  deliveryCharge: 0,
  fxRate: 1,
  freeShippingThreshold: 0,
  contactEmail: "",
  whatsappNumber: "",
  socialLinksText: "",
};

export function SettingsView() {
  const { settings, isLoading, update, isSaving } = useAdminSettings();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: emptyFormValues,
  });

  useEffect(() => {
    if (!settings) return;
    form.reset({
      deliveryCharge: settings.deliveryCharge,
      fxRate: settings.fxRate,
      freeShippingThreshold: settings.freeShippingThreshold,
      contactEmail: settings.contactEmail,
      whatsappNumber: settings.whatsappNumber,
      socialLinksText: toSocialLinksText(settings.socialLinks),
    });
  }, [settings, form]);

  async function onSubmit(values: SettingsFormValues) {
    const { socialLinksText, ...rest } = values;
    await update({
      ...rest,
      socialLinks: parseSocialLinks(socialLinksText),
    });
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Settings"
          description="Store configuration and contact details"
        />
        <Skeleton className="h-96 w-full rounded-none" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Settings"
        description="Store configuration and contact details"
      />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl border border-border bg-card p-6"
      >
        <FieldSet>
          <FieldLegend>Shipping &amp; pricing</FieldLegend>
          <FieldGroup className="gap-4">
            <Field data-invalid={!!form.formState.errors.deliveryCharge}>
              <FieldLabel htmlFor="settings-delivery-charge">
                Delivery charge
              </FieldLabel>
              <Input
                id="settings-delivery-charge"
                type="number"
                min={0}
                step="0.01"
                aria-invalid={!!form.formState.errors.deliveryCharge}
                {...form.register("deliveryCharge")}
              />
              <FieldError>
                {form.formState.errors.deliveryCharge?.message}
              </FieldError>
            </Field>

            <Field data-invalid={!!form.formState.errors.fxRate}>
              <FieldLabel htmlFor="settings-fx-rate">FX rate</FieldLabel>
              <Input
                id="settings-fx-rate"
                type="number"
                min={0}
                step="0.01"
                aria-invalid={!!form.formState.errors.fxRate}
                {...form.register("fxRate")}
              />
              <FieldError>{form.formState.errors.fxRate?.message}</FieldError>
            </Field>

            <Field data-invalid={!!form.formState.errors.freeShippingThreshold}>
              <FieldLabel htmlFor="settings-free-shipping">
                Free shipping threshold
              </FieldLabel>
              <Input
                id="settings-free-shipping"
                type="number"
                min={0}
                step="0.01"
                aria-invalid={!!form.formState.errors.freeShippingThreshold}
                {...form.register("freeShippingThreshold")}
              />
              <FieldError>
                {form.formState.errors.freeShippingThreshold?.message}
              </FieldError>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet className="mt-8">
          <FieldLegend>Contact</FieldLegend>
          <FieldGroup className="gap-4">
            <Field data-invalid={!!form.formState.errors.contactEmail}>
              <FieldLabel htmlFor="settings-contact-email">
                Contact email
              </FieldLabel>
              <Input
                id="settings-contact-email"
                type="email"
                aria-invalid={!!form.formState.errors.contactEmail}
                {...form.register("contactEmail")}
              />
              <FieldError>
                {form.formState.errors.contactEmail?.message}
              </FieldError>
            </Field>

            <Field data-invalid={!!form.formState.errors.whatsappNumber}>
              <FieldLabel htmlFor="settings-whatsapp">
                WhatsApp number
              </FieldLabel>
              <Input
                id="settings-whatsapp"
                aria-invalid={!!form.formState.errors.whatsappNumber}
                {...form.register("whatsappNumber")}
              />
              <FieldError>
                {form.formState.errors.whatsappNumber?.message}
              </FieldError>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet className="mt-8">
          <FieldLegend>Social links</FieldLegend>
          <FieldGroup className="gap-4">
            <Field data-invalid={!!form.formState.errors.socialLinksText}>
              <FieldLabel htmlFor="settings-social-links">
                Social links
              </FieldLabel>
              <Textarea
                id="settings-social-links"
                rows={5}
                placeholder={"Facebook|https://facebook.com\nInstagram|https://instagram.com"}
                aria-invalid={!!form.formState.errors.socialLinksText}
                {...form.register("socialLinksText")}
              />
              <FieldDescription>
                One link per line in the format Label|href
              </FieldDescription>
              <FieldError>
                {form.formState.errors.socialLinksText?.message}
              </FieldError>
            </Field>
          </FieldGroup>
        </FieldSet>

        <div className="mt-8">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? <Spinner data-icon="inline-start" /> : null}
            Save settings
          </Button>
        </div>
      </form>
    </div>
  );
}
