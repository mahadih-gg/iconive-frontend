"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  CONTACT_EMAIL,
  SOCIAL_LINKS,
} from "@/components/global/navbar/nav-data";

const SHOP_LINKS = [
  { href: "/products", label: "Shop All" },
  { href: "/offers", label: "Offers" },
  { href: "/customize", label: "Customize" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/guideme", label: "Guide Me" },
  { href: "/blog", label: "Blog" },
] as const;

const POLICY_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/return", label: "Return and Refund" },
  { href: "/shipping", label: "Shipping Policy" },
] as const;

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/shippingPartner", label: "Shipping Partners" },
  { href: "/paymentMethod", label: "Payment Methods" },
  { href: "/faq", label: "FAQ" },
  { href: "/joinus", label: "Join Us" },
  { href: "/repair", label: "Repair" },
] as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-white/65 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-[#1a1714] text-white">
      <div className="border-b border-white/10 bg-[#fffcf8]">
        <div className="mx-auto max-w-7xl">
          <div className="relative hidden w-full md:block">
            <Image
              src="/Image/banner/payment-banner.jpg"
              alt="Accepted payment methods"
              width={1400}
              height={120}
              className="h-auto w-full"
            />
          </div>
          <div className="relative block w-full md:hidden">
            <Image
              src="/Image/banner/payment-banner-sm.jpg"
              alt="Accepted payment methods"
              width={600}
              height={200}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,0.8fr)] lg:gap-8 xl:gap-12">
          <div>
            <Link href="/" className="inline-block">
              <h3 className="font-brand text-2xl font-semibold tracking-[0.08em] text-white">
                ICONIVE
              </h3>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              Premium human hair wigs and systems crafted for a natural look,
              lasting comfort, and everyday confidence.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  Office — 4th floor, house-92, road-15, sector-14, Uttara,
                  Dhaka-1230.
                  <br />
                  Factory — Gouripur, Ashulia, Savar, Dhaka, Bangladesh.
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-primary"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-primary" />
                <a
                  href="https://wa.me/message/PIZLMGBXCLUUN1"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
                Follow us
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SOCIAL_LINKS.map(({ href, Icon, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex size-10 items-center justify-center border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Policies" links={POLICY_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center text-xs text-white/45 sm:flex-row sm:text-left lg:px-8 sm:text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="text-white/70 transition-colors hover:text-primary">
              Iconive Wigs
            </Link>
            . All rights reserved.
          </p>
          <p>
            Developed by{" "}
            <Link
              href="https://vizuaal.com"
              className="text-white/70 transition-colors hover:text-primary"
              target="_blank"
              rel="noreferrer"
            >
              Vizuaal
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
