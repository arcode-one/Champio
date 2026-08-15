export function SiteFooter() {
  return (
    <footer className="site-footer">
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
          <nav className="site-footer__legal" aria-label="Юридическая информация">
            <a href="https://arcode-dev.ru/legal.html" target="_blank" rel="noopener noreferrer">Правовая информация</a>
            <a href="https://arcode-dev.ru/privacy.html" target="_blank" rel="noopener noreferrer">Политика ПД</a>
            <a href="https://arcode-dev.ru/consent.html" target="_blank" rel="noopener noreferrer">Согласие ПД</a>
          </nav>
          <p className="site-footer__copyright">
            © 2026 Concept Design &amp; Development —{" "}
            <a href="https://arcode-dev.ru/" target="_blank" rel="noopener noreferrer">ArCode</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
