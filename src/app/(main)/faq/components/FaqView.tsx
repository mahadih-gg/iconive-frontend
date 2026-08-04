"use client";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQS } from "@/data/faqs";

export function FaqView() {
  return (
    <div className="w-full pb-16">
      <div className="border-b border-primary-dark/10 bg-[#fffcf8]">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8 lg:px-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>FAQ</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
            Help Center
          </p>
          <h1 className="font-heading mt-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            Quick answers to the questions we hear most often about orders,
            shipping, fit, and more.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10 lg:px-8">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="flex w-full flex-col gap-3"
        >
          {FAQS.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index}`}
              className="border-2 border-primary-dark/20 bg-[#fffcf8] px-4 last:border-b-2 sm:px-5 data-[state=open]:bg-[#fffcf8]"
            >
              <AccordionTrigger className="font-heading text-left text-base font-semibold tracking-tight text-foreground hover:no-underline sm:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 border-2 border-primary-dark/20 bg-[#fffcf8] px-5 py-6 text-center sm:px-8">
          <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
            Still need help?
          </p>
          <h2 className="font-heading mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
            Explore our guides
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Browse sizing and style guides, or review shipping and return
            policies for more detail.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
            <Button asChild variant="cta" size="ctaSm">
              <Link href="/guideme">Guide Me</Link>
            </Button>
            <Button
              asChild
              variant="ctaOutline"
              size="ctaSm"
              className="border-primary-dark text-primary-dark hover:bg-primary-dark/10"
            >
              <Link href="/shipping">Shipping Policy</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
