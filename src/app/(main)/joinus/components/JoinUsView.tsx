"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contactSchema";

function JoinDialog({ triggerLabel }: { triggerLabel: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    // Affiliate signup currently routes through contact inquiry UX
    console.info("Affiliate join request", values);
    toast.success("Thanks! We will contact you soon.");
    reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-6 px-8 shadow">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Affiliate Program</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
          </div>
          <div>
            <Label htmlFor="message">Tell us about yourself</Label>
            <Textarea id="message" {...register("message")} />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner className="h-4 w-4" /> : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function JoinUsView() {
  return (
    <div>
      <div className="w-full">
        <Image
          src="/Image/joinus/joinus.webp"
          alt="Join us"
          width={1600}
          height={500}
          className="h-auto w-full"
          priority
        />
      </div>
      <div className="mx-auto max-w-5xl px-4 py-10 text-start">
        <h2 className="mb-4 mt-4 text-2xl font-bold">Iconive Affiliate Programs</h2>
        <p>
          Calling all hair lovers! If you are an influencer, a hairstylist, a makeup artist
          or a beauty & fashion content creator on social media, the Iconive Affiliate
          Program might be for you! This program is completely free to join.
        </p>
        <h3 className="mt-8 font-bold">Select a Program:</h3>
        <div className="flex flex-col gap-4 py-3 lg:flex-row lg:gap-8">
          <a href="#everybody" className="no-underline">
            <Button variant="secondary" className="px-8 shadow">
              FOR EVERYBODY
            </Button>
          </a>
          <a href="#influnce" className="no-underline">
            <Button variant="secondary" className="px-8 shadow">
              FOR content creators
            </Button>
          </a>
          <a href="#style" className="no-underline">
            <Button variant="secondary" className="px-8 shadow">
              FOR stylists
            </Button>
          </a>
        </div>
      </div>

      <section id="everybody" className="bg-muted">
        <div className="mx-auto flex max-w-5xl flex-col-reverse gap-8 px-4 py-12 lg:flex-row">
          <div className="my-auto w-full text-start lg:w-1/2">
            <h4 className="font-bold">Referral Program:</h4>
            <p className="mb-6">
              Get up to 20% off on your next order by successfully referring three friends!
            </p>
            <Image src="/Image/joinus/20p.png" alt="20% off" width={220} height={120} />
            <JoinDialog triggerLabel="JOIN NOW" />
          </div>
          <div className="relative w-full lg:w-1/2">
            <Image
              src="/Image/joinus/join1.webp"
              alt="Referral"
              width={500}
              height={400}
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section id="influnce" className="bg-background">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 lg:flex-row">
          <div className="relative w-full lg:w-1/2">
            <Image
              src="/Image/joinus/join2.webp"
              alt="Creators"
              width={500}
              height={400}
              className="h-auto w-full"
            />
          </div>
          <div className="my-auto w-full text-start lg:w-1/2">
            <h4 className="font-bold">For Content Creators</h4>
            <p className="mb-6">
              Share Iconive products with your audience and grow with exclusive affiliate
              benefits.
            </p>
            <JoinDialog triggerLabel="JOIN NOW" />
          </div>
        </div>
      </section>

      <section id="style" className="bg-muted">
        <div className="mx-auto flex max-w-5xl flex-col-reverse gap-8 px-4 py-12 lg:flex-row">
          <div className="my-auto w-full text-start lg:w-1/2">
            <h4 className="font-bold">For Stylists</h4>
            <p className="mb-6">
              Partner with Iconive as a stylist and offer premium hair systems to your
              clients.
            </p>
            <JoinDialog triggerLabel="JOIN NOW" />
          </div>
          <div className="relative w-full lg:w-1/2">
            <Image
              src="/Image/joinus/join3.webp"
              alt="Stylists"
              width={500}
              height={400}
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
