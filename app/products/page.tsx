import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/ActionLink";
import { CheckIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { products } from "@/data/site";
import { withBasePath } from "@/data/site-url";

export const metadata: Metadata = {
  title: "Продукция",
  description: "Оптовые поставки свежих шампиньонов Champio в трёх калибрах и разных форматах упаковки.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Продукция"
        title={<>Шампиньоны,<br />готовые к<br />вашей полке</>}
        description="Калибруем, фасуем и маркируем продукт под требования сети, дистрибьютора или производства. Без универсальных решений там, где важна спецификация."
        image="/images/champio-products-hero-calibrated-v3.webp"
        imageAlt="Свежие шампиньоны Champio трёх калибров на современной сортировочной линии"
      />

      <section className="catalog section section--paper">
        <div className="section-heading container">
          <span className="eyebrow">Основной ассортимент</span>
          <h2 className="display-title" data-reveal>Выберите калибр<br /><em>под вашу задачу.</em></h2>
        </div>
        <div className="catalog__grid container" data-reveal-group>
          {products.map((product, index) => (
            <article className="catalog-card" key={product.code}>
              <div className={`catalog-card__visual catalog-card__visual--${index + 1}`}>
                <img src={withBasePath(product.image)} alt={product.imageAlt} loading="lazy" />
                <span>{product.size}</span>
              </div>
              <div className="catalog-card__body">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="catalog-card__format"><strong>Форматы</strong>{product.formats}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="packing section section--cream">
        <div className="packing__heading container">
          <div>
            <span className="eyebrow">Упаковка</span>
            <h2 className="display-title" data-reveal>В вашем формате.<br /><em>В нашем стандарте.</em></h2>
          </div>
          <p data-reveal>Финальную конфигурацию фиксируем в спецификации после тестовой поставки.</p>
        </div>
        <div className="spec-table container" data-reveal>
          <div className="spec-table__row spec-table__row--head"><span>Формат</span><span>Вес</span><span>Для кого</span><span>Особенности</span></div>
          <div className="spec-table__row"><strong>Оборотный ящик</strong><span>3–10 кг</span><span>РЦ, дистрибьюторы</span><span>Минимум упаковки</span></div>
          <div className="spec-table__row"><strong>Крафтовый лоток</strong><span>250–500 г</span><span>Розничные сети</span><span>Готов к выкладке</span></div>
          <div className="spec-table__row"><strong>Flow-pack</strong><span>250–400 г</span><span>Розничные сети</span><span>Стабильный вес</span></div>
          <div className="spec-table__row"><strong>Короб</strong><span>2–5 кг</span><span>HoReCa, производства</span><span>Удобная комплектация</span></div>
        </div>
      </section>

      <section className="product-use section section--moss">
        <div className="product-use__grid container">
          <div className="product-use__content">
            <span className="eyebrow eyebrow--light">Для профессиональной кухни</span>
            <h2 className="display-title display-title--light" data-reveal>Стабильный продукт<br /><em>для стабильного блюда.</em></h2>
            <p data-reveal>Подберём калибр и зрелость под нарезку, жарку, гриль, заморозку или готовую кулинарию.</p>
            <ul className="check-list check-list--light" data-reveal-group>
              <li><CheckIcon /> Ровный выход после обработки</li>
              <li><CheckIcon /> Поставка по производственному графику</li>
              <li><CheckIcon /> Крупная транспортная упаковка</li>
              <li><CheckIcon /> Тестовая партия перед контрактом</li>
            </ul>
            <ActionLink href="/partners" variant="light">Запросить спецификацию</ActionLink>
          </div>
          <div className="product-use__media" data-parallax>
            <img src={withBasePath("/images/champio-professional-kitchen.webp")} alt="Чистые шампиньоны в транспортном ящике на профессиональной кухне" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}
