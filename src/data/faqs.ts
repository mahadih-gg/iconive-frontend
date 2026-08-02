export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "How long does shipping take?",
    answer:
      "Processing usually takes 15-20 business days. Delivery time depends on your location and shipping partner.",
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes. International orders over $250 qualify for free shipping.",
  },
  {
    question: "Can I return or exchange a wig?",
    answer:
      "Please see our Return and Refund policy. Unused items may be eligible within the stated return window.",
  },
  {
    question: "How do I choose the right size?",
    answer:
      "Visit our Guide Me and Blog sections for sizing, density, and color guidance.",
  },
  {
    question: "Do you offer wholesale?",
    answer:
      "Yes. Visit the Wholesale section to browse bulk options and submit an inquiry.",
  },
];
