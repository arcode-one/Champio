/** Canonical page inventory shared by navigation, sitemap and JSON-LD. */
export const seoPages = {
  "/": { label: "Главная", image: "/images/champio-home-hero-bright-production.webp" },
  "/about": { label: "О компании", image: "/images/champio-about-hero-trust-v3.webp" },
  "/production": { label: "Производство", image: "/images/champio-production-hero-controlled-microclimate-v3.webp" },
  "/products": { label: "Продукция", image: "/images/champio-products-hero-calibrated-v3.webp" },
  "/quality": { label: "Качество", image: "/images/champio-quality-hero.webp" },
  "/partners": { label: "Крупным партнёрам", image: "/images/champio-partners-hero.webp" },
  "/contacts": { label: "Контакты", image: "/images/champio-contacts-hero-premium.webp" },
} as const;

export type SeoPath = keyof typeof seoPages;

export const indexablePaths = Object.keys(seoPages) as SeoPath[];
