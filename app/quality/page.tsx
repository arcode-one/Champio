import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/ActionLink";
import { CheckIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Качество",
  description: "Контроль качества, прослеживаемость и холодовая цепь Champio.",
};

const controls = [
  ["01", "Среда выращивания", "Параметры компоста и покровной почвы до загрузки."],
  ["02", "Климат камеры", "Температура, влажность и CO₂ в течение всего цикла."],
  ["03", "Сортировка", "Калибр, зрелость, внешний вид и механические повреждения."],
  ["04", "Упаковка", "Вес, целостность, маркировка и соответствие спецификации."],
  ["05", "Отгрузка", "Температура продукта, санитарное состояние и документы."],
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="Качество"
        title={<>Качество<br />начинается<br />до сбора</>}
        description="Проверка готового гриба — только финальная точка. Стабильность партии формируется раньше: в компосте, микроклимате и дисциплине процесса."
        image="/images/champio-quality-hero.webp"
        imageAlt="Ручная проверка качества шампиньонов на производственной линии Champio"
        staticImage
      />

      <section className="quality-system section section--paper">
        <div className="section-heading container">
          <span className="eyebrow">Система контроля</span>
          <h2 className="display-title" data-reveal>Пять уровней.<br /><em>Одна ответственность.</em></h2>
        </div>
        <div className="quality-system__list container" data-reveal-group>
          {controls.map(([number, title, text]) => (
            <article className="quality-control" key={number}>
              <span>{number}</span><h3>{title}</h3><p>{text}</p><CheckIcon />
            </article>
          ))}
        </div>
      </section>

      <section className="traceability section section--moss">
        <div className="traceability__grid container">
          <div className="traceability__media" data-parallax>
            <img src="/images/champio-traceability-inspection.webp" alt="Проверка чистого белого шампиньона перед упаковкой" loading="lazy" />
          </div>
          <div className="traceability__content">
            <span className="eyebrow eyebrow--light">Прослеживаемость</span>
            <h2 className="display-title display-title--light" data-reveal>Знаем историю<br /><em>каждой партии.</em></h2>
            <p data-reveal>Маркировка связывает готовый продукт с камерой выращивания, датой и сменой сбора, результатом сортировки и отгрузкой.</p>
            <dl className="traceability__facts" data-reveal-group>
              <div><dt>Камера и цикл</dt><dd>зафиксированы</dd></div>
              <div><dt>Дата сбора</dt><dd>в маркировке</dd></div>
              <div><dt>Температура</dt><dd>контроль при отгрузке</dd></div>
              <div><dt>Ответственная смена</dt><dd>прослеживается</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="documents section section--cream">
        <div className="documents__grid container">
          <div>
            <span className="eyebrow">Документы</span>
            <h2 className="display-title" data-reveal>Всё необходимое<br /><em>для приёмки.</em></h2>
          </div>
          <div className="documents__content" data-reveal>
            <p>Формируем комплект документов под формат партнёра и требования конкретной отгрузки.</p>
            <ul className="document-list">
              <li><strong>Спецификация продукта</strong><small>калибр, упаковка, маркировка</small></li>
              <li><strong>Сопроводительные документы</strong><small>по партии и поставке</small></li>
              <li><strong>Протоколы контроля</strong><small>по согласованному запросу</small></li>
              <li><strong>Анкета поставщика</strong><small>для процедуры квалификации</small></li>
            </ul>
            <ActionLink href="/contacts" variant="outline">Запросить пакет документов</ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
