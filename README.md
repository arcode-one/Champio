# Champio

Многостраничный корпоративный сайт производителя шампиньонов для крупного опта.

## Стек

- React 19
- Next.js 16
- TypeScript
- GSAP + ScrollTrigger
- CSS с БЭМ-именованием

## Страницы

- `/` — главная
- `/about` — о компании
- `/production` — производство
- `/products` — продукция и упаковка
- `/partners` — условия для крупных партнёров
- `/quality` — качество и прослеживаемость
- `/contacts` — контакты и форма заявки

## SEO

Для всех страниц настроены уникальные title, description, canonical, Open Graph
и X/Twitter Card. Проект также публикует `robots.txt`, `sitemap.xml`,
`manifest.webmanifest` и Schema.org JSON-LD для компании, сайта, хлебных крошек
и каталога продукции. Расширенная разметка связывает товары, B2B-поставки,
контакты и видимые вопросы о сотрудничестве. Полный состав, карта запросов,
ограничения и порядок проверки описаны в [SEO.md](SEO.md).

Основной адрес — `https://champio.arcode-dev.ru/`, переопределяется через
`NEXT_PUBLIC_SITE_URL`. Для preview задайте `NEXT_PUBLIC_ALLOW_INDEXING=false`.
Коды подтверждения поисковых
систем можно передать через `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` и
`NEXT_PUBLIC_YANDEX_SITE_VERIFICATION` без правок в исходниках.

## Запуск

Требуется Node.js 22.13 или новее.

```bash
npm install
npm run dev
```

Для production-сборки:

```bash
npm run build
npm run start
```

## GitHub Pages

Проект содержит отдельную статическую сборку и workflow для GitHub Pages.
После загрузки репозитория откройте `Settings → Pages` и выберите источник
`GitHub Actions`. Публикация будет запускаться автоматически при каждом push
в ветку `main`; её также можно запустить вручную на вкладке `Actions`.

Для локальной проверки статического экспорта:

```bash
npm run build:pages
```

Готовые статические файлы появятся в папке `out/`. При сборке на GitHub адрес
сайта берётся из Repository Variable `NEXT_PUBLIC_SITE_URL` (по умолчанию —
`https://champio.arcode-dev.ru`), путь репозитория — из конфигурации Pages.
После смены домена перезапустите workflow. Перед публикацией автоматически
выполняется `npm run test:seo`, проверяющий готовый HTML, микроразметку,
внутренние ссылки, изображения и файлы индексации.

## Структура

- `app/` — маршруты, метаданные и страницы
- `components/` — layout, UI, формы и GSAP-анимации
- `data/` — навигация и данные разделов
- `styles/` — токены, базовые стили, БЭМ-блоки и адаптив
- `public/images/` — локальные изображения проекта

Форма заявки работает в демонстрационном режиме. Для реального проекта обработчик в `components/forms/LeadForm.tsx` нужно подключить к CRM, почтовому сервису или API.
