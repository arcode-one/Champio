import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  index: string;
  staticImage?: boolean;
};

export function PageHero({
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
        <img src={image} alt={imageAlt} fetchPriority="high" />
      </div>
      <div className="page-hero__shade" />
      <div className="page-hero__content container">
        <div className="page-hero__topline">
          <span>{index}</span>
          <span>{eyebrow}</span>
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
