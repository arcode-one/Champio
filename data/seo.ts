import type { Metadata } from "next";
import { absoluteUrl, canonicalUrl, indexingEnabled, withBasePath } from "@/data/site-url";
import { company } from "@/data/company";
import { seoPages, type SeoPath } from "@/data/seo-pages";
import { imageDimensions } from "@/data/image-dimensions";

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

type PageMetadataInput = {
  title: string;
  description: string;
  path: SeoPath;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = canonicalUrl(path);
  const socialTitle = `${title} — ${siteName}`;

  return {
    title: { absolute: socialTitle },
    description,
    robots: pageRobots,
    alternates: {
      canonical: url,
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

export const pageRobots: Metadata["robots"] = {
  index: indexingEnabled,
  follow: true,
  googleBot: {
    index: indexingEnabled,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const organizationId = `${canonicalUrl()}#organization`;
export const websiteId = `${canonicalUrl()}#website`;

export function createOrganizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteName,
        url: canonicalUrl(),
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
        email: company.salesEmail,
        telephone: company.telephone,
        address: {
          "@type": "PostalAddress",
          addressLocality: company.city,
          addressRegion: company.region,
          addressCountry: "RU",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: company.deliveryRegion,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            "@id": `${canonicalUrl()}#sales`,
            url: canonicalUrl("/contacts"),
            contactType: "оптовые продажи",
            telephone: company.telephone,
            email: company.salesEmail,
            availableLanguage: "Russian",
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "08:00",
              closes: "20:00",
            },
          },
          {
            "@type": "ContactPoint",
            contactType: "логистика",
            email: company.logisticsEmail,
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
        url: canonicalUrl(),
        name: siteName,
        description: defaultDescription,
        inLanguage: "ru-RU",
        publisher: { "@id": organizationId },
      },
    ],
  };
}

type PageSchemaInput = {
  path: SeoPath;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  breadcrumbs?: Array<{ name: string; path: string }>;
  extra?: Record<string, unknown>[];
  mainEntityId?: string;
  hasPartIds?: string[];
};

export function createPageSchema({
  path,
  title,
  description,
  type = "WebPage",
  breadcrumbs = [],
  extra = [],
  mainEntityId,
  hasPartIds = [],
}: PageSchemaInput) {
  const url = canonicalUrl(path);
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
      publisher: { "@id": organizationId },
      ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
      ...(hasPartIds.length ? { hasPart: hasPartIds.map((id) => ({ "@id": id })) } : {}),
      ...(breadcrumbs.length ? { breadcrumb: { "@id": `${url}#breadcrumbs` } } : {}),
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": `${url}#primaryimage`,
        url: absoluteUrl(seoPages[path].image),
        contentUrl: absoluteUrl(seoPages[path].image),
        ...imageDimensions[seoPages[path].image],
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
        item: canonicalUrl(item.path),
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
    "@id": `${canonicalUrl("/products")}#products`,
    name: "Свежие шампиньоны Champio",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "@id": `${canonicalUrl("/products")}#${product.title.toLowerCase()}`,
        url: `${canonicalUrl("/products")}#${product.title.toLowerCase()}`,
        name: `Шампиньоны Champio ${product.title}`,
        description: product.description,
        image: absoluteUrl(product.image),
        category: "Свежие шампиньоны оптом",
        brand: { "@id": organizationId },
        manufacturer: { "@id": organizationId },
        mainEntityOfPage: { "@id": `${canonicalUrl("/products")}#webpage` },
        size: product.size,
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

export function createSupplyServiceSchema() {
  return {
    "@type": "Service",
    "@id": `${canonicalUrl("/partners")}#supply`,
    url: canonicalUrl("/partners"),
    name: "Оптовые поставки шампиньонов Champio",
    serviceType: "Регулярные B2B-поставки свежих шампиньонов",
    description: "Подбор калибра, упаковки и графика поставок для торговых сетей, дистрибьюторов, HoReCa и пищевых производств. Холодовая цепь 0–4°C.",
    provider: { "@id": organizationId },
    areaServed: { "@type": "AdministrativeArea", name: company.deliveryRegion },
    audience: { "@type": "BusinessAudience", audienceType: "Торговые сети, дистрибьюторы, HoReCa и пищевые производства" },
    mainEntityOfPage: { "@id": `${canonicalUrl("/partners")}#webpage` },
  };
}

export function createFaqSchema(items: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@type": "FAQPage",
    "@id": `${canonicalUrl("/partners")}#faq`,
    url: `${canonicalUrl("/partners")}#faq`,
    inLanguage: "ru-RU",
    isPartOf: { "@id": `${canonicalUrl("/partners")}#webpage` },
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export const manifestPath = withBasePath("/manifest.webmanifest");
