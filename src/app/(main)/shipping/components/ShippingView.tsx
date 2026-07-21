"use client";

import { ContentPage } from "@/components/common/ContentPage";

export function ShippingView() {
  return (
    <ContentPage title="Shipping Policy">
      <p>
        Iconive ships internationally. Processing typically takes 15–20 business days before
        dispatch. Delivery time varies by destination.
      </p>
      <h2 className="pt-4 text-base font-bold">Free Shipping</h2>
      <p>Orders over $250 may qualify for free international shipping.</p>
      <h2 className="pt-4 text-base font-bold">Tracking</h2>
      <p>
        Once your order ships, tracking details are provided where available through our
        shipping partners.
      </p>
      <h2 className="pt-4 text-base font-bold">Customs</h2>
      <p>
        International customers are responsible for any customs duties or import taxes
        imposed by their country.
      </p>
    </ContentPage>
  );
}
