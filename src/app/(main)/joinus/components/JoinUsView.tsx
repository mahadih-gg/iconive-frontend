"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  BadgePercent,
  Clapperboard,
  Scissors,
  Users,
} from "lucide-react";
import { useForm } from "react-hook-form";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contactSchema";
import { cn } from "@/lib/utils";

const fieldClassName =
  "rounded-none border-primary-dark/20 bg-white shadow-none focus-visible:border-primary focus-visible:ring-primary/30";

const labelClassName =
  "font-heading mb-1.5 text-[11px] font-semibold tracking-[0.16em] text-primary-dark uppercase";

const PROGRAMS = [
  {
    id: "everybody",
    label: "For Everybody",
    title: "Referral Program",
    description:
      "Get up to 20% off on your next order by successfully referring three friends!",
    image: "/Image/joinus/join1.webp",
    badge: "/Image/joinus/20p.png",
    icon: Users,
    reverse: false,
  },
  {
    id: "influence",
    label: "For Creators",
    title: "For Content Creators",
    description:
      "Share Iconive products with your audience and grow with exclusive affiliate benefits.",
    image: "/Image/joinus/join2.webp",
    icon: Clapperboard,
    reverse: true,
  },
  {
    id: "style",
    label: "For Stylists",
    title: "For Stylists",
    description:
      "Partner with Iconive as a stylist and offer premium hair systems to your clients.",
    image: "/Image/joinus/join3.webp",
    icon: Scissors,
    reverse: false,
  },
] as const;

function JoinDialog({
  open,
  onOpenChange,
  programTitle,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  programTitle: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    // Affiliate signup currently routes through contact inquiry UX
    console.info("Affiliate join request", { program: programTitle, ...values });
    toast.success("Thanks! We will contact you soon.");
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) reset();
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-none border-primary-dark/20 bg-[#fffcf8] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Join Affiliate Program</DialogTitle>
          <DialogDescription>
            Applying for <span className="font-medium text-foreground">{programTitle}</span>.
            Tell us a little about yourself and we&apos;ll get back to you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="join-name" className={labelClassName}>
              Name
            </Label>
            <Input
              id="join-name"
              placeholder="Your full name"
              className={fieldClassName}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="join-email" className={labelClassName}>
              Email
            </Label>
            <Input
              id="join-email"
              type="email"
              placeholder="you@example.com"
              className={fieldClassName}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="join-phone" className={labelClassName}>
              Phone
            </Label>
            <Input
              id="join-phone"
              placeholder="+880 1XXX XXXXXX"
              className={fieldClassName}
              {...register("phone")}
            />
          </div>

          <div>
            <Label htmlFor="join-message" className={labelClassName}>
              Tell us about yourself
            </Label>
            <Textarea
              id="join-message"
              rows={4}
              placeholder="Your platform, audience, or how you'd like to partner…"
              className={cn(fieldClassName, "min-h-24")}
              {...register("message")}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-none"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="rounded-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner className="size-4" /> : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function JoinUsView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeProgram, setActiveProgram] = useState<string>(PROGRAMS[0].title);

  function openJoin(programTitle: string) {
    setActiveProgram(programTitle);
    setDialogOpen(true);
  }

  return (
    <div className="w-full pb-16">
      <div className="relative w-full overflow-hidden">
        <Image
          src="/Image/joinus/joinus.webp"
          alt="Join Iconive affiliate programs"
          width={1600}
          height={500}
          className="h-auto max-h-70 w-full object-cover sm:max-h-90 lg:max-h-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              Partner with us
            </p>
            <h1 className="font-heading mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Iconive Affiliate Programs
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
              <BreadcrumbPage>Join Us</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="border-2 border-primary-dark/20 bg-[#fffcf8] p-5 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
                Free to join
              </p>
              <h2 className="font-heading mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Built for creators, stylists & fans
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Calling all hair lovers! If you are an influencer, a hairstylist, a
                makeup artist or a beauty & fashion content creator on social media,
                the Iconive Affiliate Program might be for you. This program is
                completely free to join.
              </p>
            </div>
            <div className="flex items-center gap-2 border border-primary-dark/15 bg-[#f3eee6]/60 px-4 py-3 text-sm text-primary-dark">
              <BadgePercent className="size-4 shrink-0" />
              <span className="font-medium">Earn rewards & exclusive perks</span>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-heading mb-3 text-[11px] font-semibold tracking-[0.16em] text-primary-dark uppercase">
              Select a Program
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {PROGRAMS.map((program) => (
                <Button
                  key={program.id}
                  asChild
                  variant="ctaOutline"
                  size="ctaSm"
                  className="border-primary-dark text-primary-dark hover:bg-primary-dark/10"
                  iconMotion="right"
                >
                  <a href={`#${program.id}`}>
                    {program.label}
                    <ArrowRight data-slot="button-arrow" className="size-3.5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-4 lg:px-8">
        {PROGRAMS.map((program) => {
          const Icon = program.icon;
          return (
            <section
              key={program.id}
              id={program.id}
              className="scroll-mt-24 border-2 border-primary-dark/20 bg-[#fffcf8]"
            >
              <div
                className={cn(
                  "grid items-stretch lg:grid-cols-2",
                  program.reverse && "lg:[&>div:first-child]:order-2",
                )}
              >
                <div className="relative min-h-56 overflow-hidden bg-[#f3eee6] sm:min-h-72 lg:min-h-full">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
                  <div className="mb-3 inline-flex size-10 items-center justify-center bg-primary/15 text-primary-dark">
                    <Icon className="size-5" />
                  </div>
                  <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
                    {program.label}
                  </p>
                  <h3 className="font-heading mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {program.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {program.description}
                  </p>

                  {"badge" in program && program.badge && (
                    <div className="mt-5">
                      <Image
                        src={program.badge}
                        alt="20% off"
                        width={180}
                        height={100}
                        className="h-auto w-36 sm:w-44"
                      />
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="cta"
                    size="ctaSm"
                    className="mt-6 w-fit"
                    onClick={() => openJoin(program.title)}
                  >
                    Join Now
                  </Button>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <JoinDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        programTitle={activeProgram}
      />
    </div>
  );
}
