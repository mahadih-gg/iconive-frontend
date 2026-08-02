
import { SectionHeader } from "@/components/common/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/data/faqs";
import { cn } from "@/lib/utils";

interface FaqSectionProps {
  className?: string;
}

export function FaqSection({ className }: FaqSectionProps) {
  return (
    <section className={cn("bg-background px-4 py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          className="mb-10 sm:mb-12"
          label="Help Center"
          heading="Frequently Asked Questions"
          paragraph="Quick answers to the questions we hear most often."
        />

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
              className="border border-primary-dark/20 bg-white px-5 last:border-b data-[state=open]:bg-primary/5"
            >
              <AccordionTrigger className="font-heading text-base font-semibold tracking-tight text-foreground hover:no-underline sm:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
