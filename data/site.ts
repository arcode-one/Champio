export const navigation = [
	{ href: "/about", label: "О компании" },
	{ href: "/production", label: "Производство" },
	{ href: "/products", label: "Продукция" },
	{ href: "/quality", label: "Качество" },
	{ href: "/partners", label: "Партнёрам" },
] as const;

export const products = [
	{
		code: "01",
		title: "Mini",
		size: "20–35 мм",
		image: "/images/champio-mini.webp",
		imageAlt: "Мелкие шампиньоны Mini в крафтовом лотке",
		description:
			"Плотный закрытый гриб для фасовки, HoReCa и готовых блюд. Стабильный калибр в каждой партии.",
		formats: "3 кг · 5 кг · потребительская фасовка",
	},
	{
		code: "02",
		title: "Standard",
		size: "35–50 мм",
		image: "/images/champio-standard.webp",
		imageAlt: "Шампиньоны Standard в транспортном ящике",
		description:
			"Универсальный шампиньон с ровной белой шляпкой. Основной формат для федеральной и региональной розницы.",
		formats: "3 кг · 5 кг · 10 кг",
	},
	{
		code: "03",
		title: "Grande",
		size: "50–70 мм",
		image: "/images/champio-grande-crate.webp",
		imageAlt: "Крупные шампиньоны Grande в деревянном ящике",
		description:
			"Крупный отборный гриб для ресторанных сетей, гриля и специализированных продуктовых линеек.",
		formats: "2 кг · 3 кг · 5 кг",
	},
] as const;

export const productionStages = [
	{
		number: "01",
		title: "Компост и мицелий",
		text: "Формируем питательную среду и контролируем однородность загрузки до начала цикла.",
	},
	{
		number: "02",
		title: "Климат",
		text: "Автоматика управляет температурой, влажностью и CO₂ в каждой камере отдельно.",
	},
	{
		number: "03",
		title: "Сбор",
		text: "Снимаем грибы вручную волнами и сортируем по калибру непосредственно в день сбора.",
	},
	{
		number: "04",
		title: "Холодная цепь",
		text: "Быстро охлаждаем, комплектуем партии и отправляем заказ в рефрижераторе.",
	},
] as const;

export const companyFacts = [
	{ value: "18", suffix: " т", label: "проектная мощность в сутки" },
	{ value: "24", suffix: "/ 7", label: "контроль климата и производства" },
	{ value: "7", suffix: " дней", label: "отгрузка без выходных" },
	{ value: "0 – 4", suffix: "°C", label: "температура холодной цепи" },
] as const;

export const partnerTypes = [
	"Федеральные торговые сети",
	"Региональные дистрибьюторы",
	"HoReCa и фабрики-кухни",
	"Пищевые производства",
] as const;
