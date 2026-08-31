import type { Metadata, Viewport } from "next";
import "@fontsource-variable/onest";
import "./globals.css";
import { AppMotion } from "@/components/animations/AppMotion";
import { RouteScrollReset } from "@/components/animations/RouteScrollReset";
import { FloatingArcodeCta } from "@/components/layout/FloatingArcodeCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StructuredData } from "@/components/seo/StructuredData";
import { siteUrl, withBasePath } from "@/data/site-url";
import {
  createOrganizationGraph,
  defaultDescription,
  defaultTitle,
  manifestPath,
  ogImage,
  siteName,
} from "@/data/seo";

const verification: Metadata["verification"] = {
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : {}),
  ...(process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION
    ? { yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION }
    : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: defaultTitle,
    template: "%s — Champio",
  },
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Пищевое производство",
  referrer: "origin-when-cross-origin",
  manifest: manifestPath,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: withBasePath("/favicon.ico"), sizes: "48x48" },
      {
        url: withBasePath("/favicon-light.svg?v=2"),
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: withBasePath("/favicon-dark.svg?v=2"),
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: [{ url: withBasePath("/favicon.svg?v=2"), type: "image/svg+xml" }],
    apple: [
      {
        url: withBasePath("/apple-touch-icon.png"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "black-translucent",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    locale: "ru_RU",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage.url],
  },
  other: {
    "geo.region": "RU-SVE",
    "geo.placename": "Екатеринбург",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f0e7" },
    { media: "(prefers-color-scheme: dark)", color: "#172018" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body id="top">
        <StructuredData data={createOrganizationGraph()} />
        <RouteScrollReset />
        <a className="skip-link" href="#content">Перейти к содержимому</a>
        <SiteHeader />
        <AppMotion>
          <main id="content">{children}</main>
        </AppMotion>
        <SiteFooter />
        <FloatingArcodeCta />
      </body>
    </html>
  );
}
