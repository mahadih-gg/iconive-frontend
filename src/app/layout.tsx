import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";

import { Providers } from "@/app/providers";

import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iconivewigs.com"),
  title: {
    default: "Iconive Hair Wigs",
    template: "%s | Iconive Hair Wigs",
  },
  description:
    "A leading manufacturer & wig store of high-quality wigs for both men and women.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${raleway.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
