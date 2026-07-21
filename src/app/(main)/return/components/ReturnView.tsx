"use client";

import { ContentPage } from "@/components/common/ContentPage";

export function ReturnView() {
  return (
    <ContentPage title="Return and Refund Policy">
      <p>
        We want you to love your Iconive wig. If you need to return or exchange an item,
        please review the conditions below.
      </p>
      <h2 className="pt-4 text-base font-bold">Eligibility</h2>
      <p>
        Returns may be accepted within the stated return window for unused products in
        original condition and packaging. Customized items may not be eligible for return.
      </p>
      <h2 className="pt-4 text-base font-bold">Process</h2>
      <p>
        Contact support at info@iconivewigs.com with your order details. Approved returns
        will receive refund or exchange instructions.
      </p>
      <h2 className="pt-4 text-base font-bold">Refunds</h2>
      <p>
        Refunds are issued to the original payment method after inspection. Shipping fees
        may be non-refundable unless the return is due to our error.
      </p>
    </ContentPage>
  );
}
