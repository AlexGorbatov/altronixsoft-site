# Обновление контента сайта: от «основателя + AI» к инженерной компании

Дата: 2026-09-30

## Цель

Сайт должен выглядеть как инженерная компания, а не как персональный бренд основателя и не как AI-студия. Референсы: joidy.co и omisoft.net. Из них берём структуру (индустрии, модели сотрудничества, голос компании), но не берём то, для чего нет реальных данных: цифры, логотипы клиентов, отзывы, имена команды.

## Принятые решения

- **Реальность:** ядро команды плюс проверенные партнёры (core team + trusted network). Число людей и имена не называем.
- **Позиционирование:** инженерный партнёр, AI одна из компетенций. Тэглайн остаётся: «Practical AI. Serious engineering.»
- **Новые секции:** Industries и How we work. Команду, FAQ, отзывы, бейджи и цифры не добавляем.
- **Принцип:** никаких выдуманных фактов. Всё, что на сайте, должно быть правдой.

## Изменения по компонентам

### Hero (`src/components/home/Hero.tsx`)
- Eyebrow: «Engineering partner for product companies».
- Lead: «We design, build and modernize software for real business systems — from custom products and integrations to applied AI — with senior engineers accountable from architecture to production.»
- Плашки `facts`: «EU company · Estonia», «Senior engineers on every project», «Architecture to production». Убираем «Founder-led studio» и «Direct access to the engineers».

### TrustStrip (`src/components/home/TrustStrip.tsx`)
- Вместо «16+ years of enterprise engineering»: «Enterprise-grade engineering». Marquee с технологиями остаётся.

### Services (`src/data/services.ts`)
- Порядок: 01 Custom Software Development, 02 Modernization & Integrations, 03 AI Solutions & Automation. Номера `number` переставляем вслед за порядком.
- Описания без изменений. AI use cases (`aiUseCases`) остаются.

### Industries (новая секция после Services)
Данные в новом `src/data/industries.ts`, компонент `src/components/home/Industries.tsx`. Три карточки из реальных проектов:
- **E-commerce:** commerce-платформы, интеграции, поддержка в production.
- **Product information (PIM):** централизованная информация о продуктах, интеграции и enterprise-процессы.
- **Logistics:** backend, API и операционные процессы.

Внизу строка: «Other complex business systems — let's talk.»

### How we work (новая секция рядом с ProcessJourney)
Данные в новом `src/data/engagement.ts`, компонент `src/components/home/EngagementModels.tsx`. Четыре модели, все подтверждены:
1. **Technical Review:** короткий аудит архитектуры или идеи, результат — рекомендации.
2. **Proof of Value:** небольшой сфокусированный прототип на данных клиента.
3. **Fixed-scope project:** понятный объём, срок и результат.
4. **Dedicated team / augmentation:** инженеры под продукт клиента на постоянной основе или на время.

### Company (`src/components/home/Company.tsx`, `src/data/company.ts`)
- Заголовок: «Senior engineers. Focused by design.»
- Убираем портрет, цитату от первого лица и `ImagePlaceholder` из этого блока.
- Добавляем блок «Core team + trusted network»: ядро отвечает за архитектуру и решения, под проект подключаются проверенные специалисты (backend, frontend, AI/ML, QA, design). Без имён и цифр.
- Принципы: «Senior engineers on every project», «Direct access to the people doing the work», «Responsible for the outcome in production».

### Selected work (`src/components/home/SelectedWork.tsx`, `src/data/projects.ts`)
- Заголовок: «Delivery experience. Reference builds.»
- В карточках подпись «Role» заменяем на «Our contribution». Значения остаются общими («Backend & integration engineering»).
- Описание Labs: AI один из паттернов, а не главный герой.

### Навигация (`src/data/navigation.ts`)
Services → Industries → Work → How we work → Company. Каждый href совпадает с `id` секции. Порядок секций в `src/app/page.tsx` совпадает с порядком в меню.

### Метаданные и прочее
- `src/data/site.ts`: title → «Altronix Software — Software Engineering & Practical AI» (инженерия первой). Description → «Altronix Software designs and builds custom software, modern integrations and practical AI solutions for real business systems.» Поле `founder` больше не отображается в UI.
- `src/components/JsonLd.tsx`: `founder` остаётся как метаданные организации (решение по умолчанию).
- README и `docs/banner.svg` тэглайн уже обновлены.

## Вне объёма
Команда, FAQ, отзывы, логотипы клиентов, бейджи, цифры, новые страницы, многоязычность.

## Проверка
- `npm run build` и `npm run lint` без ошибок.
- Просмотр на localhost в десктопе и на мобильной ширине: все ссылки навигации ведут на существующие якоря, нет горизонтального скролла, новые секции не ломают ритм страницы.
- Текстовая проверка: на странице нет «16+», «Founder-led», портрета и цитаты от первого лица.
- Перед запуском подтвердить формулировки «Our contribution» и «Core team + trusted network».
