import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/ActionLink";
import { DiagonalArrowIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { withBasePath } from "@/data/site-url";

export const metadata: Metadata = {
  title: "Производство",
  description: "Полный цикл выращивания, сортировки, охлаждения и отгрузки шампиньонов Champio.",
};

const fullStages = [
  ["01", "Подготовка компоста", "Проверяем структуру, влажность и однородность питательной среды до загрузки в тоннели."],
  ["02", "Засев мицелия", "Равномерно распределяем мицелий и создаём условия для активного освоения субстрата."],
  ["03", "Инкубация", "Поддерживаем стабильную температуру внутри компоста и контролируем развитие по каждой камере."],
  ["04", "Формирование урожая", "Управляем влажностью, температурой и содержанием CO₂, задавая волны плодоношения."],
  ["05", "Ручной сбор", "Собираем грибы в нужной стадии зрелости, сразу разделяя их по калибру и качеству."],
  ["06", "Охлаждение и отгрузка", "Быстро снимаем полевое тепло, комплектуем заказ и передаём его в холодовую логистику."],
];

export default function ProductionPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Производство"
        title={<>Микроклимат,<br />превращённый<br />в систему</>}
        description="Каждая камера Champio — отдельная управляемая среда. Мы видим параметры цикла в реальном времени и планируем сбор ещё до появления первой волны."
        image="/images/champio-production-hero-controlled-microclimate-v3.webp"
        imageAlt="Независимые климатические камеры Champio с вентиляцией и системой контроля микроклимата"
      />

      <section className="production-lead section section--cream">
        <div className="production-lead__grid container">
          <span className="eyebrow">Полный цикл</span>
          <h2 className="display-title" data-reveal>
            Не ускоряем природу.<br /><em>Создаём ей условия.</em>
          </h2>
          <p data-reveal>
            Урожай шампиньонов зависит от десятков взаимосвязанных параметров.
            Автоматика держит среду стабильной, а технологи корректируют сценарий
            под состояние компоста и динамику каждой волны.
          </p>
        </div>
        <div className="production-metrics container" data-reveal-group>
          <article><strong>±0,3°C</strong><span>точность контроля температуры</span></article>
          <article><strong>60 сек</strong><span>интервал считывания параметров</span></article>
          <article><strong>100%</strong><span>камер в единой системе мониторинга</span></article>
        </div>
      </section>

      <section className="stage-list section section--paper">
        <div className="section-heading container">
          <span className="eyebrow">Этапы цикла</span>
          <h2 className="display-title" data-reveal>Путь продукта<br /><em>по шагам.</em></h2>
        </div>
        <div className="stage-list__rows container" data-reveal-group>
          {fullStages.map(([number, title, text]) => (
            <article className="stage-row" key={number}>
              <span className="stage-row__number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <DiagonalArrowIcon className="stage-row__symbol" />
            </article>
          ))}
        </div>
      </section>

      <section className="production-photo section--forest">
        <div className="production-photo__media" data-parallax>
          <img
            src={withBasePath("/images/champio-independent-climate-chambers.webp")}
            alt="Независимые климатические камеры Champio на разных стадиях производственного цикла"
            loading="lazy"
          />
        </div>
        <div className="production-photo__overlay container">
          <strong data-reveal>
            <span>Непрерывный ритм</span>
            <span>без сезонных пауз</span>
          </strong>
          <p data-reveal>Камеры работают независимо: одна готовится к загрузке, другая формирует урожай, третья отдаёт волну на сбор.</p>
        </div>
      </section>

      <section className="technology section section--ink">
        <div className="technology__heading container">
          <span className="eyebrow eyebrow--light">Инфраструктура</span>
          <h2 className="display-title display-title--light" data-reveal>Технология работает<br /><em>на свежесть.</em></h2>
        </div>
        <div className="technology__grid container" data-reveal-group>
          <article><h3>Изолированные камеры</h3><p>Разные стадии цикла не влияют друг на друга.</p></article>
          <article><h3>Сенсоры климата</h3><p>Температура, влажность и CO₂ видны онлайн.</p></article>
          <article><h3>Быстрое охлаждение</h3><p>Полевое тепло снимается сразу после сортировки.</p></article>
          <article><h3>Потоковая маркировка</h3><p>Партия связана с датой, камерой и сменой сбора.</p></article>
        </div>
        <div className="technology__action container">
          <ActionLink href="/quality" variant="light">Как контролируем качество</ActionLink>
        </div>
      </section>
    </>
  );
}
