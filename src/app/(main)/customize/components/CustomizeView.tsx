"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { customProductsService } from "@/services/customProducts.service";

const BASE_MATERIALS = [
  "Mono Base",
  "Lace Base",
  "Skin Base",
  "Silk Base",
  "Mix Base",
];
const HAIR_MATERIALS = [
  "Remy Hair",
  "Virgin Hair",
  "Synthetic Hair",
  "Remy + Synthetic Mixed",
];
const HAIR_DIRECTIONS = [
  "Free style",
  "Left parting",
  "Right parting",
  "Center parting",
  "Left crown",
  "Right crown",
  "Center crown",
  "Brush back",
];

const fieldClassName =
  "rounded-none border-primary-dark/20 bg-white shadow-none focus-visible:border-primary focus-visible:ring-primary/30";

const labelClassName =
  "font-heading mb-1.5 text-[11px] font-semibold tracking-[0.16em] text-primary-dark uppercase";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-destructive">{message}</p>;
}

function SectionCard({
  label,
  title,
  children,
  className,
}: {
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "border-2 border-primary-dark/20 bg-[#fffcf8] p-4 sm:p-6",
        className,
      )}
    >
      <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
        {label}
      </p>
      <h2 className="font-heading mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function OptionChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "inline-flex min-h-10 items-center justify-center border px-3.5 py-2 text-xs font-medium tracking-wide transition-colors",
        selected
          ? "border-primary bg-primary/15 text-primary-dark"
          : "border-primary-dark/20 bg-white text-foreground hover:border-primary-dark",
      )}
    >
      {label}
    </button>
  );
}

export function CustomizeView() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    baseMaterial?: string;
  }>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    baseMaterial: "",
    hairMaterial: "",
    hairDirection: "",
    notes: "",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: typeof errors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "Enter a valid email";
    if (!form.baseMaterial) nextErrors.baseMaterial = "Select a base material";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error("Please fill required fields");
      return;
    }

    try {
      setLoading(true);
      await customProductsService.create(form);
      toast.success("Custom request submitted");
      setForm({
        name: "",
        email: "",
        phone: "",
        baseMaterial: "",
        hairMaterial: "",
        hairDirection: "",
        notes: "",
      });
      setErrors({});
    } catch {
      toast.error("Could not submit custom request");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full pb-16">
      <div className="relative w-full overflow-hidden">
        <Image
          src="/Image/custom/custombanner.webp"
          alt="Customize your wig"
          width={1600}
          height={420}
          className="h-auto max-h-[280px] w-full object-cover sm:max-h-[360px] lg:max-h-[420px]"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              Made for you
            </p>
            <h1 className="font-heading mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Customize Your Wig
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-8">
        <Breadcrumb className="mb-6 sm:mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Customize</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8 xl:gap-10"
        >
          <div className="flex flex-col gap-5 sm:gap-6">
            <SectionCard label="Step 01" title="Contact Details">
              <div>
                <Label htmlFor="name" className={labelClassName}>
                  Full Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  className={fieldClassName}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
                <FieldError message={errors.name} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email" className={labelClassName}>
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={fieldClassName}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                  <FieldError message={errors.email} />
                </div>
                <div>
                  <Label htmlFor="phone" className={labelClassName}>
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+880 1XXX XXXXXX"
                    className={fieldClassName}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard label="Step 02" title="Wig Specifications">
              <div>
                <p className={labelClassName}>Base Material *</p>
                <div className="flex flex-wrap gap-2">
                  {BASE_MATERIALS.map((opt) => (
                    <OptionChip
                      key={opt}
                      label={opt}
                      selected={form.baseMaterial === opt}
                      onClick={() => update("baseMaterial", opt)}
                    />
                  ))}
                </div>
                <FieldError message={errors.baseMaterial} />
              </div>

              <div>
                <p className={labelClassName}>Hair Material</p>
                <div className="flex flex-wrap gap-2">
                  {HAIR_MATERIALS.map((opt) => (
                    <OptionChip
                      key={opt}
                      label={opt}
                      selected={form.hairMaterial === opt}
                      onClick={() => update("hairMaterial", opt)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className={labelClassName}>Hair Direction</p>
                <div className="flex flex-wrap gap-2">
                  {HAIR_DIRECTIONS.map((opt) => (
                    <OptionChip
                      key={opt}
                      label={opt}
                      selected={form.hairDirection === opt}
                      onClick={() => update("hairDirection", opt)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className={labelClassName}>
                  Additional Notes
                </Label>
                <Textarea
                  id="notes"
                  rows={4}
                  placeholder="Length, density, color, or anything else we should know…"
                  className={cn(fieldClassName, "min-h-24")}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </div>
            </SectionCard>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="border-2 border-primary-dark/20 bg-[#fffcf8] p-4 sm:p-6">
              <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
                Request Summary
              </p>
              <h2 className="font-heading mt-1 text-xl font-semibold tracking-tight">
                Ready to submit?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Share your preferences and we&apos;ll prepare a custom quote
                tailored to your look.
              </p>

              <dl className="mt-5 space-y-3 border-t border-primary-dark/15 pt-4 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Base</dt>
                  <dd className="text-right font-medium">
                    {form.baseMaterial || "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Hair</dt>
                  <dd className="text-right font-medium">
                    {form.hairMaterial || "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Direction</dt>
                  <dd className="text-right font-medium">
                    {form.hairDirection || "—"}
                  </dd>
                </div>
              </dl>

              <Button
                type="submit"
                variant="cta"
                size="ctaSm"
                className="mt-6 w-full"
                disabled={loading}
              >
                {loading ? (
                  <Spinner className="size-4" />
                ) : (
                  "Submit Custom Request"
                )}
              </Button>

              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                We typically respond within 1–2 business days.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
