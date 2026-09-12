import type { ReactNode } from "react";
import Link from "next/link";
import { withBasePath } from "@/data/site-url";
import { seoPages, type SeoPath } from "@/data/seo-pages";
import { imageDimensions } from "@/data/image-dimensions";

type PageHeroProps = {
  path: Exclude<SeoPath, "/">;
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  index: string;
  staticImage?: boolean;
};

export function PageHero({
  path,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  index,
  staticImage = false,
}: PageHeroProps) {
  return (
    <section className={`page-hero page-hero--${index}`}>
      <div
        className={`page-hero__media${staticImage ? " page-hero__media--static" : ""}`}
        data-parallax={staticImage ? undefined : "hero"}
      >
        <img {...imageDimensions[image]} src={withBasePath(image)} alt={imageAlt} fetchPriority="high" />
      </div>
      <div className="page-hero__shade" />
      <div className="page-hero__content container">
        <div className="page-hero__topline">
          <span>{index}</span>
          <nav aria-label="Хлебные крошки" className="breadcrumbs">
            <ol>
              <li><Link href="/">Главная</Link></li>
              <li aria-current="page" title={eyebrow}>{seoPages[path].label}</li>
            </ol>
          </nav>
        </div>
        <div className="page-hero__heading">
          <h1 className="page-hero__title">
            <span className="text-mask">
              <span data-hero-word>{title}</span>
            </span>
          </h1>
          <p className="page-hero__description" data-hero-copy>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
