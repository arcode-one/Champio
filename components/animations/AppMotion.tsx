"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AppMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      document.documentElement.classList.add("is-reduced-motion");
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-word]",
        { yPercent: 115 },
        { yPercent: 0, duration: 0.95, stagger: 0.07, ease: "expo.out" },
      );

      gsap.fromTo(
        "[data-hero-copy]",
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.25,
          ease: "power4.out",
        },
      );

      gsap.fromTo(
        ".site-header",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.2, ease: "power2.out" },
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power4.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });

      // Photos open from the bottom edge once, instead of fading in like the text.
      gsap.utils
        .toArray<HTMLElement>(
          ".product-showcase__media, .cold-chain__media, .quality-teaser__media, .product-use__media, .traceability__media, .contact-map__visual",
        )
        .forEach((media) => {
          gsap.fromTo(
            media,
            { clipPath: "inset(0% 0% 100% 0% round 20px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 20px)",
              duration: 1.1,
              ease: "power3.inOut",
              scrollTrigger: { trigger: media, start: "top 85%", once: true },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-reveal-group]")
        .forEach((group) => {
          gsap.fromTo(
            Array.from(group.children),
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.06,
              ease: "power4.out",
              scrollTrigger: { trigger: group, start: "top 84%", once: true },
            },
          );
        });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((frame) => {
        const image = frame.querySelector("img");
        if (!image) return;

        const subtle = ["subtle", "hero"].includes(frame.dataset.parallax ?? "");
        const movement = subtle ? 1 : 5;

        gsap.fromTo(
          image,
          { yPercent: -movement, scale: subtle ? 1.01 : 1.07 },
          {
            yPercent: movement,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );
      });

      const processFill = document.querySelector(".process__line-fill");
      if (processFill) {
        gsap.fromTo(
          processFill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".process__list",
              start: "top 75%",
              end: "bottom 65%",
              scrub: true,
            },
          },
        );
      }

      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((element) => {
        const target = Number(element.dataset.counter);
        if (Number.isNaN(target)) return;

        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
          onUpdate: () => {
            element.textContent = Math.round(state.value).toString();
          },
        });
      });
    });

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [pathname]);

  return <>{children}</>;
}
