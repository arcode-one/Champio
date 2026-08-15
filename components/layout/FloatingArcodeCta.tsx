"use client";

import { useEffect, useState } from "react";

export function FloatingArcodeCta() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterCtaVisible, setIsFooterCtaVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      setIsVisible(window.scrollY > window.innerHeight);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const footerCta = document.querySelector(".site-footer__arcode-cta");
    if (!footerCta) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterCtaVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(footerCta);
    return () => observer.disconnect();
  }, []);

  const showFloating = isVisible && !isFooterCtaVisible;

  return (
    <a
      className={`floating-arcode-cta${showFloating ? " floating-arcode-cta--visible" : ""}`}
      href="https://arcode-dev.ru/"
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!showFloating}
      tabIndex={showFloating ? 0 : -1}
    >
      Хочу такой же сайт
    </a>
  );
}
