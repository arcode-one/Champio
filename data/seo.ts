import type { Metadata } from "next";
import { absoluteUrl, siteUrl, withBasePath } from "@/data/site-url";

export const siteName = "Champio";
export const defaultTitle = "Шампиньоны оптом от производителя — Champio";
export const defaultDescription =
  "Свежие шампиньоны оптом от производителя Champio: круглогодичный выпуск, три калибра, холодовая цепь и регулярные B2B-поставки из Екатеринбурга.";
export const ogImage = {
  url: absoluteUrl("/og.png"),
  width: 1200,
  height: 630,
  alt: "Champio — шампиньоны оптом от производителя",
};

const sharedKeywords = [
  "шампиньоны оптом",
  "шампиньоны от производителя",
  "свежие шампиньоны",
  "поставки шампиньонов",
  "производитель шампиньонов",
  "шампиньоны Екатеринбург",
  "шампиньоны для HoReCa",
  "шампиньоны для торговых сетей",
];

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = path === "/" ? defaultTitle : `${title} — ${siteName}`;

  return {
    title,
    description,
    keywords: [...new Set([...keywords, ...sharedKeywords])],
    alternates: {
      canonical: url,
      languages: {
        "ru-RU": url,
        "x-default": url,
      },
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName,
      locale: "ru_RU",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage.url],
    },
  };
}

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

export function createOrganizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteName,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/icon-512.png"),
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: ogImage.url,
          width: ogImage.width,
          height: ogImage.height,
        },
        description: defaultDescription,
        email: "sales@champio.ru",
        telephone: "+7-800-550-18-70",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Екатеринбург",
          addressRegion: "Свердловская область",
          addressCountry: "RU",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Уральский федеральный округ",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "оптовые продажи",
            telephone: "+7-800-550-18-70",
            email: "sales@champio.ru",
            availableLanguage: "Russian",
            areaServed: "RU",
          },
          {
            "@type": "ContactPoint",
            contactType: "логистика",
            email: "logistics@champio.ru",
            availableLanguage: "Russian",
            areaServed: "RU",
          },
        ],
        knowsAbout: [
          "Выращивание шампиньонов",
          "Оптовые поставки свежих шампиньонов",
          "Холодовая логистика",
          "Калибровка и упаковка грибов",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteName,
        description: defaultDescription,
        inLanguage: "ru-RU",
        publisher: { "@id": organizationId },
      },
    ],
  };
}

type PageSchemaInput = {
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  breadcrumbs?: Array<{ name: string; path: string }>;
  extra?: Record<string, unknown>[];
};

export function createPageSchema({
  path,
  title,
  description,
  type = "WebPage",
  breadcrumbs = [],
  extra = [],
}: PageSchemaInput) {
  const url = absoluteUrl(path);
  const pageId = `${url}#webpage`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": type,
      "@id": pageId,
      url,
      name: title,
      description,
      inLanguage: "ru-RU",
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: ogImage.url,
        width: ogImage.width,
        height: ogImage.height,
      },
    },
  ];

  if (breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    });
  }

  graph.push(...extra);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function createProductListSchema(
  products: ReadonlyArray<{
    title: string;
    size: string;
    image: string;
    description: string;
    formats: string;
  }>,
) {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl("/products")}#products`,
    name: "Свежие шампиньоны Champio",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: `Шампиньоны Champio ${product.title}`,
        description: product.description,
        image: absoluteUrl(product.image),
        category: "Свежие шампиньоны оптом",
        brand: { "@id": organizationId },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Калибр",
            value: product.size,
          },
          {
            "@type": "PropertyValue",
            name: "Форматы поставки",
            value: product.formats,
          },
        ],
      },
    })),
  };
}

export const manifestPath = withBasePath("/manifest.webmanifest");
