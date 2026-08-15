import type { Metadata } from "next";
import "./globals.css";
import { AppMotion } from "@/components/animations/AppMotion";
import { FloatingArcodeCta } from "@/components/layout/FloatingArcodeCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://champio-corporate.ntcoder-1.chatgpt.site"),
  title: {
    default: "Champio — производство свежих шампиньонов",
    template: "%s — Champio",
  },
  description:
    "Круглогодичное производство свежих шампиньонов и стабильные оптовые поставки для торговых сетей, дистрибьюторов и HoReCa.",
  openGraph: {
    title: "Champio — свежие шампиньоны для большого рынка",
    description:
      "Технологичное производство и регулярные оптовые поставки свежих шампиньонов.",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/images/champio-hero.png", width: 1586, height: 992 }],
  },
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon-light.svg?v=2" type="image/svg+xml" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-dark.svg?v=2" type="image/svg+xml" media="(prefers-color-scheme: dark)" />
        <link rel="shortcut icon" href="/favicon.svg?v=2" type="image/svg+xml" />
      </head>
      <body id="top">
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
