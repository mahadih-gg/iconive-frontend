"use client";

import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SubscribeSectionProps {
  className?: string;
  backgroundSrc?: string;
}

export function SubscribeSection({
  className,
  backgroundSrc = "/Image/ImagesPage/subscribe-bg.webp",
}: SubscribeSectionProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      // Newsletter API not wired yet — acknowledge for UX
      await new Promise((resolve) => setTimeout(resolve, 400));
      toast.success("You're subscribed! Check your inbox for your discount.");
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={cn("bg-background pb-14 sm:pb-16", className)}>
      <div className="relative mx-auto px-4 overflow-hidden border border-primary-dark/20">
        <Image
          src={backgroundSrc}
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority={false}
          aria-hidden
        />

        <div className="relative z-10 flex flex-col items-center px-5 py-14 text-center sm:px-10 sm:py-16 md:py-20">
          <SectionHeader
            className="mb-8 sm:mb-10"
            label="Subscribe & Save"
            heading="Subscribe & Get"
            heading2="Instant Discount!"
            isHeading2Br
            paragraph="Subscribe to our newsletter and be the first to know about new arrivals, updates and beauty tips."
          />

          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-xl flex-col overflow-hidden  bg-white sm:flex-row"
          >
            <label className="relative flex min-w-0 flex-1 items-center">
              <span className="pointer-events-none absolute left-4 text-primary-dark/70">
                <Mail className="size-4.5" aria-hidden />
              </span>
              <span className="sr-only">Email address</span>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                autoComplete="email"
                required
                className="h-12 rounded-none border-border-primary bg-transparent pl-11 shadow-none focus-visible:border-transparent focus-visible:ring-0 md:h-14 md:text-sm border-2 border-primary-dark/20 border-r-0"
              />
            </label>

            <Button
              type="submit"
              variant="cta"
              size="cta"
              iconMotion="right"
              disabled={isSubmitting}
              className="h-12 shrink-0 rounded-none px-6 sm:h-auto sm:px-7"
            >
              {isSubmitting ? "Subscribing…" : "Subscribe Now"}
              <ArrowRight className="size-4" data-slot="button-arrow" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
