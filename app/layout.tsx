import type { Metadata } from "next";
import "./globals.css";
import { AppMotion } from "@/components/animations/AppMotion";
import { RouteScrollReset } from "@/components/animations/RouteScrollReset";
import { FloatingArcodeCta } from "@/components/layout/FloatingArcodeCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteUrl, withBasePath } from "@/data/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
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
    images: [
      {
        url: `${siteUrl}/images/champio-hero.png`,
        width: 1586,
        height: 992,
      },
    ],
  },
  ...(process.env.GITHUB_PAGES === "true"
    ? {}
    : { other: { "codex-preview": "development" } }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href={withBasePath("/favicon-light.svg?v=2")} type="image/svg+xml" media="(prefers-color-scheme: light)" />
        <link rel="icon" href={withBasePath("/favicon-dark.svg?v=2")} type="image/svg+xml" media="(prefers-color-scheme: dark)" />
        <link rel="shortcut icon" href={withBasePath("/favicon.svg?v=2")} type="image/svg+xml" />
      </head>
      <body id="top">
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
