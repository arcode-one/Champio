import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/seo/StructuredData";
import { ActionLink } from "@/components/ui/ActionLink";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icons";
import {
	companyFacts,
	partnerTypes,
	productionStages,
	products,
} from "@/data/site";
import { withBasePath } from "@/data/site-url";
import { createPageMetadata, createPageSchema } from "@/data/seo";

const pageTitle = "Шампиньоны оптом от производителя";
const pageDescription =
	"Свежие шампиньоны оптом от производителя Champio: стабильный объём круглый год, контроль качества и холодовая доставка для сетей, HoReCa и производств.";

export const metadata: Metadata = createPageMetadata({
	title: pageTitle,
	description: pageDescription,
	path: "/",
	keywords: ["купить шампиньоны оптом", "оптовая продажа шампиньонов"],
});

const tickerMessages = [
	"Свежесть в масштабе",
	"От грибницы до отгрузки",
	"Сбор под вашу заявку",
	"Стабильный объём круглый год",
	"Холодовая цепь без разрывов",
	"Контроль каждой партии",
];

const heroDescription =
	"Контролируем каждый этап — от климата в камере до температуры при доставке. Чтобы сети и производства получали стабильный объём точно в срок.";

export default function Home() {
	return (
		<>
			<StructuredData
				data={createPageSchema({
					path: "/",
					title: pageTitle,
					description: pageDescription,
				})}
			/>
			<section className="home-hero">
				<div className="home-hero__media">
					<picture>
						<source
							media="(max-width: 640px)"
							srcSet={withBasePath("/images/champio-home-hero-bright-production.webp")}
						/>
						<img
							src={withBasePath("/images/champio-home-hero-bright-production.webp")}
							alt="Оптовая отгрузка свежих шампиньонов с производства Champio"
							fetchPriority="high"
						/>
					</picture>
				</div>
				<div className="home-hero__shade" />

				<div className="home-hero__content container">
					<div className="home-hero__eyebrow">
						<span className="home-hero__status-dot" />
						Круглогодичное производство · B2B
					</div>

					<div className="home-hero__headline">
						<h1
							className="home-hero__title"
							aria-label="Шампиньоны оптом от производителя"
						>
							<span className="text-mask">
								<span data-hero-word>Шампиньоны</span>
							</span>
							<span className="text-mask">
								<span data-hero-word>оптом от</span>
							</span>
							<span className="text-mask">
								<span data-hero-word>производителя</span>
							</span>
						</h1>
						<p className="home-hero__mobile-copy" data-hero-copy>
							{heroDescription}
						</p>
					</div>

					<div className="home-hero__bottom" data-hero-copy>
						<p>{heroDescription}</p>
						<ActionLink href="/partners" variant="light">
							Стать партнёром
						</ActionLink>
					</div>
				</div>

				<div className="home-hero__scroll" aria-hidden="true">
					<span>ЛИСТАЙТЕ</span>
					<i />
				</div>
			</section>

			<div className="ticker" aria-hidden="true">
				<div className="ticker__track">
					{[0, 1].map((copy) => (
						<div className="ticker__group" key={copy}>
							{tickerMessages.map((message) => (
								<span key={`${copy}-${message}`}>
									{message} <i>✦</i>
								</span>
							))}
						</div>
					))}
				</div>
			</div>

			<section className="intro section section--paper">
				<div className="intro__grid container">
					<div className="intro__index">[ 01 — О компании ]</div>
					<div className="intro__content">
						<h2 className="display-title" data-reveal>
							Свежесть, которая
							<br />
							<em>выдерживает масштаб.</em>
						</h2>
						<div className="intro__copy" data-reveal>
							<p>
								Champio — технологичное производство шампиньонов для крупных
								покупателей. Мы планируем урожай под контракт, соблюдаем калибр
								и сохраняем холодовую цепь до точки приёмки.
							</p>
							<ActionLink href="/about" variant="outline">
								Узнать о Champio
							</ActionLink>
						</div>
					</div>
				</div>

				<div className="facts container" data-reveal-group>
					{companyFacts.map((fact, index) => (
						<article className="fact" key={fact.label}>
							<span className="fact__index">0{index + 1}</span>
							<p className="fact__value">
								{index < 3 ? (
									<span data-counter={fact.value}>{fact.value}</span>
								) : (
									<span>{fact.value}</span>
								)}
								<sup>{fact.suffix}</sup>
							</p>
							<p className="fact__label">{fact.label}</p>
						</article>
					))}
				</div>
			</section>

			<section className="facility-feature section section--forest">
				<div className="facility-feature__header container">
					<span className="eyebrow eyebrow--light">
						Производство полного цикла
					</span>
					<p data-reveal>
						Независимые климатические камеры позволяют собирать урожай волнами и
						держать стабильный объём поставок круглый год.
					</p>
				</div>

				<div className="facility-feature__media" data-parallax>
					<img
						src={withBasePath("/images/champio-full-cycle-chambers.webp")}
						alt="Независимые климатические камеры Champio с урожаем на разных стадиях цикла"
						loading="lazy"
					/>
					<div className="facility-feature__caption-shell container">
						<div className="facility-feature__caption">
							<p>
								Контролируемая среда
								<br />
								для стабильного урожая
							</p>
						</div>
					</div>
				</div>

				<div className="facility-feature__footer container">
					<h3 data-reveal>
						Точный климат.
						<br />
						Предсказуемый результат.
					</h3>
					<ActionLink href="/production" variant="light">
						Как устроено производство
					</ActionLink>
				</div>
			</section>

			<section className="process section section--cream">
				<div className="section-heading container">
					<span className="eyebrow">От грибницы до клиента</span>
					<h2 className="display-title" data-reveal>
						Один процесс.
						<br />
						<em>Четыре точки контроля.</em>
					</h2>
				</div>

				<div className="process__list container" data-reveal-group>
					<div className="process__line">
						<div className="process__line-fill" />
					</div>
					{productionStages.map((stage) => (
						<article className="process-card" key={stage.number}>
							<span className="process-card__number">{stage.number}</span>
							<h3>{stage.title}</h3>
							<p>{stage.text}</p>
						</article>
					))}
				</div>
			</section>

			<section className="product-showcase section section--moss">
				<div className="product-showcase__heading container">
					<div>
						<span className="eyebrow eyebrow--light">Продукция</span>
						<h2 className="display-title display-title--light" data-reveal>
							Три калибра.
							<br />
							<em>Один стандарт свежести.</em>
						</h2>
					</div>
					<p data-reveal>
						Подбираем формат, упаковку и график под категорийную матрицу
						партнёра. Партии сопровождаются маркировкой и данными по сбору.
					</p>
				</div>

				<div className="product-showcase__body container">
					<div className="product-showcase__media" data-parallax>
						<img
							src={withBasePath("/images/champio-product.png")}
							alt="Шампиньоны Champio разных калибров в транспортной и потребительской упаковке"
							loading="lazy"
						/>
					</div>

					<div className="product-list">
						{products.map((product) => (
							<Link className="product-row" href="/products" key={product.code}>
								<div>
									<h3>{product.title}</h3>
									<p>{product.size}</p>
								</div>
								<ArrowIcon className="product-row__arrow" />
							</Link>
						))}
					</div>
				</div>
			</section>

			<section className="b2b section section--ink">
				<div className="b2b__top container">
					<span className="eyebrow eyebrow--light">Крупный опт</span>
					<p data-reveal>
						Сначала разбираемся в вашей логистике и требованиях к категории.
						Затем фиксируем спецификацию и берём регулярность на себя.
					</p>
				</div>

				<div className="b2b__title container">
					<span className="text-mask">
						<span data-reveal>Вы планируете спрос.</span>
					</span>
					<span className="text-mask">
						<span data-reveal>
							<em>Мы обеспечиваем продукт.</em>
						</span>
					</span>
				</div>

				<div className="b2b__grid container" data-reveal-group>
					{partnerTypes.map((type) => (
						<article className="partner-type" key={type}>
							<CheckIcon />
							<h3>{type}</h3>
						</article>
					))}
				</div>

				<div className="b2b__action container">
					<ActionLink href="/partners" variant="light">
						Условия для партнёров
					</ActionLink>
				</div>
			</section>

			<section className="cold-chain section section--paper">
				<div className="cold-chain__grid container">
					<div className="cold-chain__content">
						<span className="eyebrow">Логистика свежести</span>
						<h2 className="display-title" data-reveal>
							Собрали сегодня.
							<br />
							<em>Отгрузили сегодня.</em>
						</h2>
						<p data-reveal>
							После сортировки продукт поступает в зону быстрого охлаждения.
							Температура партии фиксируется при комплектации и передаче
							перевозчику.
						</p>
						<ul className="check-list" data-reveal-group>
							<li>
								<CheckIcon /> Сбор под подтверждённую заявку
							</li>
							<li>
								<CheckIcon /> Предохлаждение перед отгрузкой
							</li>
							<li>
								<CheckIcon /> Рефрижераторная доставка
							</li>
							<li>
								<CheckIcon /> Маркировка каждой партии
							</li>
						</ul>
						<ActionLink href="/partners" variant="outline">
							Обсудить маршрут
						</ActionLink>
					</div>

					<div className="cold-chain__media" data-parallax>
						<img
							src={withBasePath("/images/champio-fresh-logistics.webp")}
							alt="Ящики с шампиньонами Champio на охлаждаемой линии комплектации"
							loading="lazy"
						/>
						<div className="cold-chain__metric">
							<strong>0 – 4°C</strong>
							<span>
								от камеры
								<br />
								до приёмки
							</span>
						</div>
					</div>
				</div>
			</section>

			<section className="quality-teaser section section--cream">
				<div className="quality-teaser__grid container">
					<div className="quality-teaser__media" data-parallax>
						<img
							src={withBasePath("/images/champio-quality-control.webp")}
							alt="Ручной контроль качества шампиньонов Champio на производственной линии"
							loading="lazy"
						/>
					</div>
					<div className="quality-teaser__content">
						<span className="eyebrow">Контроль качества</span>
						<h2 className="display-title" data-reveal>
							Каждую партию
							<br />
							<em>можно проследить.</em>
						</h2>
						<p data-reveal>
							Проверяем внешний вид, калибр, температуру и целостность упаковки.
							По запросу передаём документы и данные по конкретной отгрузке.
						</p>
						<ActionLink href="/quality" variant="outline">
							Система качества
						</ActionLink>
					</div>
				</div>
			</section>

			<section className="closing-cta">
				<div className="closing-cta__inner container">
					<span className="eyebrow eyebrow--light">Начнём с потребности</span>
					<h2 data-reveal>
						Нужны стабильные
						<br />
						поставки шампиньонов?
					</h2>
					<div className="closing-cta__bottom" data-reveal>
						<p>Расскажите о ваших объёмах, регионе и требованиях к упаковке.</p>
						<ActionLink href="/contacts" variant="light">
							Запросить предложение
						</ActionLink>
					</div>
				</div>
			</section>
		</>
	);
}
