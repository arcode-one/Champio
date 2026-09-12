import Link from "next/link";
import { navigation } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav className="site-footer__nav container" aria-label="Разделы сайта">
        <Link href="/">Главная</Link>
        {navigation.map(({ href, label }) => <Link href={href} key={href}>{label}</Link>)}
        <Link href="/contacts">Контакты</Link>
      </nav>
      <div className="site-footer__bottom container">
        <div className="site-footer__center">
          <a
            className="site-footer__arcode-cta"
            href="https://arcode-dev.ru/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Хочу такой же сайт
          </a>
          <p className="site-footer__copyright">
            © 2026 Concept Design &amp; Development —{" "}
            <a href="https://arcode-dev.ru/" target="_blank" rel="noopener noreferrer">ArCode</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
