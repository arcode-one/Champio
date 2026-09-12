import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { StructuredData } from "@/components/seo/StructuredData";
import { CheckIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { partnerTypes } from "@/data/site";
import { createPageMetadata, createPageSchema, createSupplyServiceSchema, createFaqSchema } from "@/data/seo";
import { canonicalUrl } from "@/data/site-url";
import { company } from "@/data/company";
import { partnerFaq } from "@/data/partner-faq";
import Link from "next/link";

const pageTitle = "Оптовые поставки для крупных партнёров";
const pageDescription =
  "Условия регулярных оптовых поставок шампиньонов Champio для торговых сетей, дистрибьюторов, HoReCa и пищевых производств.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/partners",

});

const steps = [
  ["01", "Сверяем потребность", "Регион, недельный объём, калибр, упаковка и окна приёмки."],
  ["02", "Готовим образцы", "Собираем тестовую партию и согласовываем критерии качества."],
  ["03", "Фиксируем условия", "Утверждаем спецификацию, график, маршрут и документы."],
  ["04", "Запускаем поставки", "Назначаем ответственного и контролируем первые отгрузки вместе."],
];

export default function PartnersPage() {
  return (
    <>
      <StructuredData
        data={createPageSchema({
          path: "/partners",
          title: pageTitle,
          description: pageDescription,
          mainEntityId: `${canonicalUrl("/partners")}#supply`,
          hasPartIds: [`${canonicalUrl("/partners")}#faq`],
          extra: [createSupplyServiceSchema(), createFaqSchema(partnerFaq)],
          breadcrumbs: [
            { name: "Главная", path: "/" },
            { name: "Крупным партнёрам", path: "/partners" },
          ],
        })}
      />
      <PageHero
        path="/partners"
        index="05"
        eyebrow="Крупным партнёрам"
        title={<>Поставки<br />шампиньонов<br />для бизнеса</>}
        description="Champio работает только с оптовыми покупателями. Мы проектируем поставку вокруг вашего спроса: от размера гриба до времени прибытия на распределительный центр."
        image="/images/champio-partners-hero.webp"
        imageAlt="Оптовые партии шампиньонов Champio перед погрузкой в рефрижератор"
      />

      <section className="partner-audience section section--paper">
        <div className="section-heading container">
          <span className="eyebrow">С кем работаем</span>
          <h2 className="display-title" data-reveal>Понимаем требования<br /><em>крупного бизнеса.</em></h2>
        </div>
        <div className="partner-audience__grid container" data-reveal-group>
          {partnerTypes.map((type, index) => (
            <article className="audience-card" key={type}>
              <h3>{type}</h3>
              <p>{[
                "EDI, окна РЦ, стабильная спецификация и потребительская фасовка.",
                "Регулярный объём, гибкая комплектация и региональные маршруты.",
                "Калибр под блюдо, крупная тара и частый график свежих поставок.",
                "Прогнозируемое сырьё для нарезки, заморозки и готовых блюд.",
              ][index]}</p>
              <CheckIcon />
            </article>
          ))}
        </div>
      </section>

      <section className="supply-system section section--ink">
        <div className="supply-system__heading container">
          <span className="eyebrow eyebrow--light">Модель поставки</span>
          <h2 className="display-title display-title--light" data-reveal>Не просто отгрузка.<br /><em>Согласованная система.</em></h2>
        </div>
        <div className="supply-system__grid container" data-reveal-group>
          <article><h3>Объём</h3><p>Резервируем мощности под регулярный прогноз.</p></article>
          <article><h3>Спецификация</h3><p>Фиксируем калибр, зрелость, тару и маркировку.</p></article>
          <article><h3>Логистика</h3><p>Согласуем маршруты, окна и температурный режим.</p></article>
          <article><h3>Сопровождение</h3><p>Один менеджер отвечает за весь контракт.</p></article>
        </div>
      </section>

      <section className="onboarding section section--cream">
        <div className="section-heading container">
          <span className="eyebrow">Запуск контракта</span>
          <h2 className="display-title" data-reveal>От первого звонка<br /><em>до первой машины.</em></h2>
        </div>
        <div className="onboarding__steps container" data-reveal-group>
          {steps.map(([number, title, text]) => (
            <article className="onboarding-step" key={number}>
              <span>{number}</span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="supply-spec section section--paper">
        <div className="supply-spec__grid container">
          <div>
            <span className="eyebrow">Базовые условия</span>
            <h2 className="display-title" data-reveal>Что обсудим<br /><em>на старте.</em></h2>
          </div>
          <dl className="definition-list" data-reveal>
            <div><dt>Минимальная партия</dt><dd>от 1 палеты одного калибра</dd></div>
            <div><dt>Частота поставок</dt><dd>от 2 до 7 раз в неделю</dd></div>
            <div><dt>География</dt><dd>{company.deliveryRegion}</dd></div>
            <div><dt>Температурный режим</dt><dd>0–4°C на всём маршруте</dd></div>
            <div><dt>Маркировка</dt><dd>стандартная или под требования сети</dd></div>
            <div><dt>Документы</dt><dd>комплект на каждую поставку</dd></div>
          </dl>
        </div>
      </section>

      <section className="partner-faq section section--cream" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <h2 className="display-title" id="faq-title">Вопросы о поставках<br /><em>шампиньонов оптом.</em></h2>
          <div className="partner-faq__items">
            {partnerFaq.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
          <p className="partner-faq__links">Посмотрите <Link href="/products">калибры и форматы упаковки</Link>, <Link href="/quality">контроль качества</Link> или <Link href="/contacts">свяжитесь с отделом продаж</Link>.</p>
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
