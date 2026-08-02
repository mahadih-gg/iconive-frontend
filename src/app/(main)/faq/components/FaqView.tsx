"use client";

import { ContentPage } from "@/components/common/ContentPage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/data/faqs";

export function FaqView() {
  return (
    <ContentPage title="FAQ">
      <Accordion type="single" collapsible className="w-full">
        {FAQS.map((item, index) => (
          <AccordionItem key={item.question} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ContentPage>
  );
}
