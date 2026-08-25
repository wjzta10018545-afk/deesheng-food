import type { Metadata } from "next";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deesheng.food"),
  title: {
    default: "Deesheng Food | HALAL Korean Sauce Manufacturer & OEM Supplier",
    template: "%s | Deesheng Food",
  },
  description:
    "HALAL-certified Qingdao manufacturer and OEM supplier of Korean sauces, gochujang, kimchi, chili powder, dry seasonings and frozen vegetables for global B2B buyers.",
  keywords: [
    "Korean sauce manufacturer",
    "Korean sauce OEM",
    "private label gochujang",
    "halal sauce supplier",
    "kimchi supplier China",
    "Korean chili powder wholesale",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deesheng.food",
    siteName: "Deesheng Food",
    title: "Deesheng Food | HALAL Korean Sauce Manufacturer",
    description:
      "Certificate-backed Korean sauces, gochujang and OEM/private-label support with direct export contact from Qingdao, China.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Deesheng Food — HALAL Korean Sauce Manufacturer and OEM Supplier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deesheng Food | HALAL Korean Sauce Manufacturer",
    description:
      "Certificate-backed Korean sauces, gochujang, seasonings and private-label manufacturing.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png?v=2", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico?v=2", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
