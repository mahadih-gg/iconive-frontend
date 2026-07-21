"use client";

import Image from "next/image";

import { ContentPage } from "@/components/common/ContentPage";

export function PaymentMethodView() {
  return (
    <ContentPage title="Payment Methods">
      <p>
        We accept secure payments through our payment partners. You can complete checkout
        using supported online payment options shown at checkout.
      </p>
      <div className="relative my-6 w-full">
        <Image
          src="/Image/banner/payment-banner.jpg"
          alt="Payment methods"
          width={1200}
          height={200}
          className="hidden h-auto w-full md:block"
        />
        <Image
          src="/Image/banner/payment-banner-sm.jpg"
          alt="Payment methods"
          width={600}
          height={200}
          className="h-auto w-full md:hidden"
        />
      </div>
      <p>
        For payment issues, contact info@iconivewigs.com with your order reference.
      </p>
    </ContentPage>
  );
}
