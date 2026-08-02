"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  MessageCircle,
  Twitter,
  Youtube,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/profile.php?id=100087712010768", Icon: Facebook },
  { href: "https://wa.me/+8801601162155", Icon: MessageCircle },
  { href: "https://www.instagram.com/iconivewigs/", Icon: Instagram },
  { href: "https://twitter.com/Iconivewigs", Icon: Twitter },
  { href: "https://youtube.com/@IconiveWigs?si=m5ojSW2u4XrFVUCE", Icon: Youtube },
  {
    href: "https://www.linkedin.com/company/99836837/admin/feed/posts/?feedType=following",
    Icon: Linkedin,
  },
] as const;

const POLICIES = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/return", label: "Return and Refund" },
  { href: "/shipping", label: "Shipping Policy" },
] as const;

const PROFILE_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/shippingPartner", label: "Our Shipping Partners" },
  { href: "/paymentMethod", label: "Payment methods" },
  { href: "/faq", label: "FAQ" },
] as const;

export function Footer() {
  return (
    <footer className="w-full bg-[#2a2a2a]">
      <div className="w-full">
        <div className="mx-auto max-w-7xl border-b border-border bg-white pb-8">
          <div className="relative hidden w-full md:block">
            <Image
              src="/Image/banner/payment-banner.jpg"
              alt="Payment method"
              width={1400}
              height={120}
              className="h-auto w-full"
            />
          </div>
          <div className="relative block w-full md:hidden">
            <Image
              src="/Image/banner/payment-banner-sm.jpg"
              alt="Payment method"
              width={600}
              height={200}
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-8 px-4 py-10 lg:flex-row lg:px-8">
          <div className="my-4 text-center lg:my-auto lg:w-1/3 lg:text-left">
            <h3 className="font-heading text-xl font-bold text-muted-foreground">ICONIVE</h3>
            <p className="mt-4 flex flex-col items-center gap-1 text-sm text-muted-foreground lg:flex-row lg:items-start">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
              <span>
                Office- 4th floor, house-92, road-15, sector-14, Uttara, Dhaka-1230.
                Factory- Gouripur, Ashulia, Savar, Dhaka, Bangladesh.
              </span>
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
              {SOCIAL_LINKS.map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Icon className="h-4 w-4" />
                  </Button>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="mx-auto text-center lg:text-right">
              <h6 className="pb-3 font-bold text-white">Our Policies</h6>
              {POLICIES.map((item) => (
                <Link key={item.href} href={item.href} className="block no-underline">
                  <p className="text-sm text-muted-foreground hover:text-white">{item.label}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="mx-auto mt-4 text-center lg:mt-0 lg:text-right">
              <h6 className="pb-3 font-bold text-white">Our Profile</h6>
              {PROFILE_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="block no-underline">
                  <p className="text-sm text-muted-foreground hover:text-white">{item.label}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black py-3 text-center text-white">
        <p className="m-0 mx-auto text-center text-sm">
          <span className="mr-2 text-white/50">
            © All Rights Reserved by{" "}
            <Link href="/" className="text-white no-underline">
              Iconive Wigs
            </Link>
          </span>
          |
          <span className="ml-2 text-white/50">
            Developed by{" "}
            <a
              href="https://web.facebook.com/codecatio"
              className="text-white no-underline"
              target="_blank"
              rel="noreferrer"
            >
              Codecat.io
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
