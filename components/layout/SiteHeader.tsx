"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowIcon, MushroomMark } from "@/components/ui/Icons";
import { navigation } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  function handleHomeClick(event: React.MouseEvent<HTMLAnchorElement>) {
    setMenuOpen(false);

    if (pathname !== "/") return;

    event.preventDefault();
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <header
      className={`site-header${scrolled ? " site-header--scrolled" : ""}${
        menuOpen ? " site-header--menu-open" : ""
      }`}
    >
      <div className="site-header__inner container">
        <Link className="site-logo" href="/" aria-label="Champio — на главную" onClick={handleHomeClick}>
          <MushroomMark className="site-logo__mark" />
          <span className="site-logo__word">Champio</span>
        </Link>

        <nav className="site-header__nav" aria-label="Основная навигация">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`site-header__nav-link${isActive ? " site-header__nav-link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link className="site-header__contact" href="/contacts">
          <span>Обсудить поставки</span>
          <span className="site-header__contact-icon" aria-hidden="true">
            <ArrowIcon />
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="mobile-menu" id="mobile-menu" aria-hidden={!menuOpen}>
        <nav className="mobile-menu__nav" aria-label="Мобильная навигация">
          <Link className="mobile-menu__link" href="/" onClick={handleHomeClick}>
            <span>00</span>Главная
          </Link>
          {navigation.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                className={`mobile-menu__link${isActive ? " mobile-menu__link--active" : ""}`}
                href={item.href}
                key={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <span>0{index + 1}</span>{item.label}
              </Link>
            );
          })}
          <Link className="mobile-menu__link" href="/contacts" onClick={() => setMenuOpen(false)}>
            <span>06</span>Контакты
          </Link>
        </nav>
        <div className="mobile-menu__meta">
          <p>Оптовые поставки свежих шампиньонов</p>
          <a href="mailto:sales@champio.ru">sales@champio.ru</a>
        </div>
      </div>
    </header>
  );
}
