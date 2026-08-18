# Champio

Многостраничный корпоративный сайт производителя шампиньонов для крупного опта.

## Стек

- React 19
- Next.js 16 / Vinext
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
и каталога продукции.

Адрес сайта задаётся через `NEXT_PUBLIC_SITE_URL`. Коды подтверждения поисковых
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
GITHUB_PAGES=true npm run build:pages
```

Готовые статические файлы появятся в папке `out/`. При сборке на GitHub адрес
сайта и путь репозитория подставляются автоматически. После привязки своего
поддомена перезапустите workflow, чтобы обновились метаданные сайта, sitemap и
robots.txt.

## Структура

- `app/` — маршруты, метаданные и страницы
- `components/` — layout, UI, формы и GSAP-анимации
- `data/` — навигация и данные разделов
- `styles/` — токены, базовые стили, БЭМ-блоки и адаптив
- `public/images/` — локальные изображения проекта

Форма заявки работает в демонстрационном режиме. Для реального проекта обработчик в `components/forms/LeadForm.tsx` нужно подключить к CRM, почтовому сервису или API.
