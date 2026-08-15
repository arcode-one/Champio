import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/ActionLink";
import { PageHero } from "@/components/ui/PageHero";
import { companyFacts } from "@/data/site";
import { withBasePath } from "@/data/site-url";

export const metadata: Metadata = {
  title: "О компании",
  description: "Champio — технологичное производство свежих шампиньонов для крупных оптовых покупателей.",
};

const values = [
  { title: "Предсказуемость", text: "Планируем загрузку камер и сбор под контрактные объёмы партнёров." },
  { title: "Открытость", text: "Показываем, как устроен процесс, и даём данные по каждой партии." },
  { title: "Дисциплина", text: "Соблюдаем спецификацию, окно отгрузки и температурный режим." },
  { title: "Развитие", text: "Улучшаем урожайность и упаковку без компромиссов для свежести." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="О компании"
        title={<>Производство,<br />которому<br />доверяют</>}
        description="Champio соединяет точность современного производства с вниманием к живому продукту — чтобы крупные покупатели получали стабильность без потери свежести."
        image="/images/champio-about-hero-trust-v3.webp"
        imageAlt="Специалисты Champio вместе проверяют данные урожая у климатической камеры"
      />

      <section className="inner-intro section section--paper">
        <div className="inner-intro__grid container">
          <span className="eyebrow">Кто мы</span>
          <div>
            <h2 className="display-title" data-reveal>
              Производство, где<br /><em>живой процесс стал точным.</em>
            </h2>
            <div className="inner-intro__copy" data-reveal>
              <p>
                Шампиньон растёт по своим законам. Наша задача — создать для него
                правильную среду, а для партнёра — управляемый результат. Поэтому
                биология у нас работает вместе с автоматикой, планированием и логистикой.
              </p>
              <p>
                Мы строим Champio как долгосрочного поставщика: с понятной системой
                качества, честной коммуникацией и готовностью адаптировать продукт
                под конкретную категорийную стратегию.
              </p>
            </div>
          </div>
        </div>

        <div className="facts facts--inner container" data-reveal-group>
          {companyFacts.map((fact, index) => (
            <article className="fact" key={fact.label}>
              <span className="fact__index">0{index + 1}</span>
              <p className="fact__value"><span>{fact.value}</span><sup>{fact.suffix}</sup></p>
              <p className="fact__label">{fact.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-image section--forest">
        <div className="editorial-image__media" data-parallax>
          <img
            src={withBasePath("/images/champio-about-careful-harvest.webp")}
            alt="Ручной сбор одного зрелого шампиньона на производстве Champio"
            loading="lazy"
          />
        </div>
        <div className="editorial-image__quote container" data-reveal>
          <span>Наша позиция</span>
          <blockquote>
            «Большой объём не должен делать продукт безликим. Каждая партия всё равно начинается с одного аккуратно собранного гриба».
          </blockquote>
        </div>
      </section>

      <section className="values section section--cream">
        <div className="section-heading container">
          <span className="eyebrow">Принципы Champio</span>
          <h2 className="display-title" data-reveal>На чём строим<br /><em>партнёрство.</em></h2>
        </div>
        <div className="values__grid container" data-reveal-group>
          {values.map((value) => (
            <article className="value-card" key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="responsibility section section--paper">
        <div className="responsibility__grid container">
          <div>
            <span className="eyebrow">Ответственное производство</span>
            <h2 className="display-title" data-reveal>Используем ресурсы<br /><em>осмысленно.</em></h2>
          </div>
          <div className="responsibility__content" data-reveal>
            <p>
              Замкнутая система полива, повторное использование оборотной тары и
              точное управление климатом помогают снижать лишние потери на каждом цикле.
            </p>
            <ul className="lined-list">
              <li>Контроль расхода воды по камерам</li>
              <li>Сортировка и переработка органических остатков</li>
              <li>Оборотная транспортная упаковка</li>
              <li>Оптимизация маршрутов отгрузки</li>
            </ul>
            <ActionLink href="/production" variant="outline">Посмотреть производство</ActionLink>
          </div>
        </div>
      </section>

      <section className="inner-cta">
        <div className="inner-cta__content container">
          <span className="eyebrow eyebrow--light">Champio для бизнеса</span>
          <h2 data-reveal>Давайте расти<br />вместе.</h2>
          <ActionLink href="/partners" variant="light">Условия партнёрства</ActionLink>
        </div>
      </section>
    </>
  );
}
