import { imageDimensions } from "@/data/image-dimensions";
import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { StructuredData } from "@/components/seo/StructuredData";
import { PageHero } from "@/components/ui/PageHero";
import { withBasePath } from "@/data/site-url";
import { createPageMetadata, createPageSchema, organizationId } from "@/data/seo";
import { company } from "@/data/company";

const pageTitle = "Контакты отдела оптовых продаж";
const pageDescription =
  "Контакты Champio: телефон и email отдела оптовых продаж свежих шампиньонов, логистика и производство в Екатеринбурге.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/contacts",

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
          mainEntityId: organizationId,
          breadcrumbs: [
            { name: "Главная", path: "/" },
            { name: "Контакты", path: "/contacts" },
          ],
        })}
      />
      <PageHero
        path="/contacts"
        index="06"
        eyebrow="Контакты"
        title={<>Контакты<br />отдела продаж<br />Champio</>}
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
            <article><span>Отдел продаж</span><a href={`tel:${company.telephone}`}>{company.telephoneDisplay}</a><p>{company.salesHours}</p></article>
            <article><span>Электронная почта</span><a href={`mailto:${company.salesEmail}`}>{company.salesEmail}</a><p>Ответим в течение рабочего дня</p></article>
            <article><span>Производство</span><strong>{company.city}</strong><p>{company.region}</p></article>
            <article><span>Для перевозчиков</span><a href={`mailto:${company.logisticsEmail}`}>{company.logisticsEmail}</a><p>Слоты и документы на въезд</p></article>
          </div>
        </div>
      </section>

      <section className="contact-map section--ink">
        <div className="contact-map__grid container">
          <div className="contact-map__visual">
            <img {...imageDimensions["/images/champio-geography-ural.webp"]} src={withBasePath("/images/champio-geography-ural.webp")}
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
