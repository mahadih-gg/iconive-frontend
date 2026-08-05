"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LinkIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type { IconType } from "react-icons";
import { FaFacebook, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { z } from "zod";

import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useAdminSettings } from "@/hooks/admin/useAdminResources";
import type { AdminSettings } from "@/types/admin";

const socialLinkSchema = z.object({
  label: z.string().min(1, "Label is required"),
  href: z.string().url("Enter a valid URL"),
});

const schema = z.object({
  deliveryCharge: z.coerce.number().min(0, "Must be 0 or greater"),
  fxRate: z.coerce.number().positive("Must be greater than 0"),
  freeShippingThreshold: z.coerce.number().min(0, "Must be 0 or greater"),
  contactEmail: z.string().email("Enter a valid email"),
  whatsappNumber: z.string().min(1, "WhatsApp number is required"),
  socialLinks: z.array(socialLinkSchema),
});

type SettingsFormValues = z.infer<typeof schema>;

const SOCIAL_ICONS: { match: RegExp; Icon: IconType }[] = [
  { match: /facebook/i, Icon: FaFacebook },
  { match: /instagram/i, Icon: PiInstagramLogoFill },
  { match: /youtube|youtu\.be/i, Icon: FaYoutube },
  { match: /\bx\b|twitter/i, Icon: FaXTwitter },
  { match: /linkedin/i, Icon: FaLinkedinIn },
  { match: /whatsapp/i, Icon: TbBrandWhatsappFilled },
];

function getSocialIcon(label: string, href = ""): IconType {
  const haystack = `${label} ${href}`;
  return SOCIAL_ICONS.find(({ match }) => match.test(haystack))?.Icon ?? LinkIcon;
}

const emptyFormValues: SettingsFormValues = {
  deliveryCharge: 0,
  fxRate: 1,
  freeShippingThreshold: 0,
  contactEmail: "",
  whatsappNumber: "",
  socialLinks: [],
};

export function SettingsView() {
  const { settings, isLoading, update, isSaving } = useAdminSettings();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: emptyFormValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  useEffect(() => {
    if (!settings) return;
    form.reset({
      deliveryCharge: settings.deliveryCharge,
      fxRate: settings.fxRate,
      freeShippingThreshold: settings.freeShippingThreshold,
      contactEmail: settings.contactEmail,
      whatsappNumber: settings.whatsappNumber,
      socialLinks: settings.socialLinks.map((link) => ({ ...link })),
    });
  }, [settings, form]);

  async function onSubmit(values: SettingsFormValues) {
    const { socialLinks, ...rest } = values;
    await update({
      ...rest,
      socialLinks: socialLinks.map((link) => ({
        label: link.label.trim(),
        href: link.href.trim(),
      })) satisfies AdminSettings["socialLinks"],
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
        className="grid grid-cols-1 xl:grid-cols-2 gap-6"
      >
        <div className="border border-border bg-card p-6">
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
        </div>

        <div className="border border-border bg-card p-6">
          <FieldSet>
            <div className="flex items-center justify-between gap-3">
              <FieldLegend>Social links</FieldLegend>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-none"
                onClick={() => append({ label: "", href: "https://" })}
              >
                <PlusIcon data-icon="inline-start" />
                Add link
              </Button>
            </div>

            <FieldGroup className="gap-4">
              {fields.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No social links yet. Add one to get started.
                </p>
              ) : null}

              {fields.map((field, index) => {
                const label = form.watch(`socialLinks.${index}.label`);
                const href = form.watch(`socialLinks.${index}.href`);
                const Icon = getSocialIcon(label, href);
                const labelError =
                  form.formState.errors.socialLinks?.[index]?.label;
                const hrefError =
                  form.formState.errors.socialLinks?.[index]?.href;

                return (
                  <div
                    key={field.id}
                    className="flex flex-col gap-2 border border-border p-3"
                  >
                    <Field data-invalid={!!labelError}>
                      <FieldLabel htmlFor={`settings-social-label-${index}`}>
                        Label
                      </FieldLabel>
                      <Input
                        id={`settings-social-label-${index}`}
                        placeholder="Facebook"
                        aria-invalid={!!labelError}
                        {...form.register(`socialLinks.${index}.label`)}
                      />
                      <FieldError>{labelError?.message}</FieldError>
                    </Field>

                    <Field data-invalid={!!hrefError}>
                      <FieldLabel htmlFor={`settings-social-href-${index}`}>
                        URL
                      </FieldLabel>
                      <InputGroup
                        className="rounded-none"
                        data-disabled={undefined}
                      >
                        <InputGroupAddon align="inline-start">
                          <Icon aria-hidden />
                        </InputGroupAddon>
                        <InputGroupInput
                          id={`settings-social-href-${index}`}
                          type="url"
                          placeholder="https://"
                          aria-invalid={!!hrefError}
                          {...form.register(`socialLinks.${index}.href`)}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            aria-label={`Remove ${label || "social link"}`}
                            onClick={() => remove(index)}
                          >
                            <Trash2Icon />
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldError>{hrefError?.message}</FieldError>
                    </Field>
                  </div>
                );
              })}
            </FieldGroup>
          </FieldSet>
        </div>

        <div>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? <Spinner data-icon="inline-start" /> : null}
            Save settings
          </Button>
        </div>
      </form>
    </div>
  );
}
