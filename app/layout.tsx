import type { Metadata } from "next";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deesheng.food"),
  title: {
    default: "Korean Sauce Manufacturer & Food OEM China | Deesheng",
    template: "%s | Deesheng Food",
  },
  description:
    "Korean sauce, kimchi, chili seasoning and frozen vegetable manufacturer in Qingdao, China. B2B wholesale, OEM and private-label supply for global buyers.",
  keywords: [
    "global food supply solutions",
    "food OEM manufacturer China",
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
    url: "https://deesheng.food/",
    siteName: "Deesheng Food",
    title: "Korean Sauce Manufacturer & Food OEM China | Deesheng",
    description:
      "Factory-direct Korean sauces, kimchi, chili seasonings and frozen vegetables with OEM and private-label support from Qingdao, China.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Deesheng Food — Global Food Supply and OEM Manufacturer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Korean Sauce Manufacturer & Food OEM China | Deesheng",
    description:
      "Factory-direct Korean sauces, kimchi, seasonings and frozen vegetables for B2B buyers.",
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
        <GoogleAnalytics />
      </body>
    </html>
  );
}
