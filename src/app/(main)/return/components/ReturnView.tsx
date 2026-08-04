"use client";

import { ContentPage } from "@/components/common/ContentPage";

export function ReturnView() {
  return (
    <ContentPage
      title="Return and Refund"
      eyebrow="Legal"
      description="Conditions and steps for returning or exchanging an Iconive product."
    >
      <p>
        We want you to love your Iconive wig. If you need to return or exchange
        an item, please review the conditions below.
      </p>

      <h2>Eligibility</h2>
      <p>
        Returns may be accepted within the stated return window for unused
        products in original condition and packaging. Customized items may not
        be eligible for return.
      </p>

      <h2>Process</h2>
      <p>
        Contact support at{" "}
        <a href="mailto:info@iconivewigs.com">info@iconivewigs.com</a> with
        your order details. Approved returns will receive refund or exchange
        instructions.
      </p>

      <h2>Refunds</h2>
      <p>
        Refunds are issued to the original payment method after inspection.
        Shipping fees may be non-refundable unless the return is due to our
        error.
      </p>
    </ContentPage>
  );
}
