"use client";

import { ContentPage } from "@/components/common/ContentPage";

export function TermsView() {
  return (
    <ContentPage
      title="Terms & Conditions"
      eyebrow="Legal"
      description="Please read these terms carefully before placing an order with Iconive."
    >
      <p>
        By accessing and using Iconive Hair Wigs, you agree to these terms and
        conditions. Please read them carefully before placing an order.
      </p>

      <h2>Orders & Payments</h2>
      <p>
        All orders are subject to acceptance and availability. Prices and
        promotions may change without notice. Payment must be completed through
        our approved payment methods.
      </p>

      <h2>Product Information</h2>
      <p>
        We strive for accuracy in product descriptions and images. Slight
        variations in color or texture may occur due to natural hair
        characteristics and display settings.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Iconive is not liable for indirect or consequential damages arising from
        use of our products beyond the remedies stated in our return policy.
      </p>
    </ContentPage>
  );
}
