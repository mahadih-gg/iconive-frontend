"use client";

import Image from "next/image";

import { ContentPage } from "@/components/common/ContentPage";

export function ShippingPartnerView() {
  return (
    <ContentPage title="Our Shipping Partners">
      <p>
        Iconive works with trusted international shipping partners to deliver your orders
        safely and reliably.
      </p>
      <div className="my-8 flex flex-wrap justify-center gap-6">
        {["/Image/partners/dhl.png", "/Image/partners/fedex.png", "/Image/partners/ups.png"].map(
          (src) => (
            <div key={src} className="relative h-16 w-32">
              <Image
                src={src}
                alt="Shipping partner"
                fill
                className="object-contain"
                onError={() => undefined}
              />
            </div>
          ),
        )}
      </div>
      <p>
        Tracking information is shared once your order is handed over to the carrier.
      </p>
    </ContentPage>
  );
}
