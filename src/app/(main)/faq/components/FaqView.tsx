"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContentPage } from "@/components/common/ContentPage";

const FAQS = [
  {
    q: "How long does shipping take?",
    a: "Processing usually takes 15-20 business days. Delivery time depends on your location and shipping partner.",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes. International orders over $250 qualify for free shipping.",
  },
  {
    q: "Can I return or exchange a wig?",
    a: "Please see our Return and Refund policy. Unused items may be eligible within the stated return window.",
  },
  {
    q: "How do I choose the right size?",
    a: "Visit our Guide Me and Blog sections for sizing, density, and color guidance.",
  },
  {
    q: "Do you offer wholesale?",
    a: "Yes. Visit the Wholesale section to browse bulk options and submit an inquiry.",
  },
] as const;

export function FaqView() {
  return (
    <ContentPage title="FAQ">
      <Accordion type="single" collapsible className="w-full">
        {FAQS.map((item, index) => (
          <AccordionItem key={item.q} value={`item-${index}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ContentPage>
  );
}
