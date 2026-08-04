"use client";

import { ContentPage } from "@/components/common/ContentPage";

export function PrivacyView() {
  return (
    <ContentPage
      title="Privacy Policy"
      eyebrow="Legal"
      description="How Iconive collects, uses, and protects your personal information."
    >
      <p>
        Iconive Hair Wigs respects your privacy. This policy explains how we
        collect, use, and protect your personal information when you use our
        website and services.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We may collect name, email, phone, shipping address, payment-related
        details, and browsing information necessary to process orders and
        improve our services.
      </p>

      <h2>How We Use Information</h2>
      <p>
        Information is used to fulfill orders, provide customer support, send
        order updates, and improve our products and website experience.
      </p>

      <h2>Data Protection</h2>
      <p>
        We take reasonable measures to protect your data. Payment processing is
        handled by trusted third-party providers.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions, contact us at{" "}
        <a href="mailto:info@iconivewigs.com">info@iconivewigs.com</a>.
      </p>
    </ContentPage>
  );
}
