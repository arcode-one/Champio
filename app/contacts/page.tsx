import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { StructuredData } from "@/components/seo/StructuredData";
import { PageHero } from "@/components/ui/PageHero";
import { withBasePath } from "@/data/site-url";
import { createPageMetadata, createPageSchema } from "@/data/seo";

const pageTitle = "Контакты отдела оптовых продаж";
const pageDescription =
  "Контакты Champio: телефон и email отдела оптовых продаж свежих шампиньонов, логистика и производство в Екатеринбурге.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/contacts",
  keywords: ["Champio контакты", "заказать шампиньоны оптом"],
});

export default function ContactsPage() {
  return (
    <>
      <StructuredData
        data={createPageSchema({
          path: "/contacts",
          title: pageTitle,
          description: pageDescription,
          type: "ContactPage",
          breadcrumbs: [
            { name: "Главная", path: "/" },
            { name: "Контакты", path: "/contacts" },
          ],
        })}
      />
      <PageHero
        index="06"
        eyebrow="Контакты"
        title={<>Давайте<br />сверим вашу<br />потребность</>}
        description="Назовите объём, регион и формат продукта. Команда Champio предложит рабочую конфигурацию поставки и подготовит тестовую партию."
        image="/images/champio-contacts-hero-premium.webp"
        imageAlt="Специалисты Champio согласовывают поставку свежих шампиньонов в зоне холодовой отгрузки"
      />

      <section className="contact-details section section--cream">
        <div className="contact-details__grid container">
          <div className="contact-details__heading">
            <span className="eyebrow">Связаться</span>
            <h2 className="display-title" data-reveal>Удобным для вас<br /><em>способом.</em></h2>
          </div>
          <div className="contact-cards" data-reveal-group>
            <article><span>Отдел продаж</span><a href="tel:+78005501870">8 800 550-18-70</a><p>Пн–Вс, 08:00–20:00</p></article>
            <article><span>Электронная почта</span><a href="mailto:sales@champio.ru">sales@champio.ru</a><p>Ответим в течение рабочего дня</p></article>
            <article><span>Производство</span><strong>Екатеринбург</strong><p>Свердловская область</p></article>
            <article><span>Для перевозчиков</span><a href="mailto:logistics@champio.ru">logistics@champio.ru</a><p>Слоты и документы на въезд</p></article>
          </div>
        </div>
      </section>

      <section className="contact-map section--ink">
        <div className="contact-map__grid container">
          <div className="contact-map__visual">
            <img
              src={withBasePath("/images/champio-geography-ural.webp")}
              alt="Рефрижератор на маршруте из Екатеринбурга по Уралу"
              loading="lazy"
              draggable={false}
            />
          </div>
          <div className="contact-map__content">
            <span className="eyebrow eyebrow--light">География</span>
            <h2 data-reveal>Регулярные<br />поставки из<br />Екатеринбурга по<br />Уралу</h2>
            <p data-reveal>Маршруты по Свердловской области и в соседние регионы рассчитываем с учётом объёма, частоты и окна приёмки.</p>
          </div>
        </div>
      </section>

      <section className="form-section section--forest">
        <div className="form-section__wrap container">
          <LeadForm title="Запросите расчёт поставки" />
        </div>
      </section>
    </>
  );
}
