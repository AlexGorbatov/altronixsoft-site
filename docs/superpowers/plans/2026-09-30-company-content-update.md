# Company Content Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Перевести сайт с «основатель + AI» на «инженерная компания»: переписать тексты, добавить секции Industries и Engagement models, убрать личный портрет и «16+ years».

**Architecture:** Контент живёт в `src/data/*.ts`, секции — серверные компоненты в `src/components/home/`, собираются в `src/app/page.tsx`. Новые секции повторяют паттерны существующих (`Section`, `SectionHeading`, `CardRow`, `SpotlightCard`, `Tag`, `AnimatedReveal`). Никаких новых зависимостей и Next-специфичных API.

**Tech Stack:** Next.js 16.3.7 (App Router), React 19, Tailwind CSS 4, TypeScript, ESLint.

**Spec:** `docs/superpowers/specs/2026-09-30-company-content-update-design.md`

## Заметки для исполнителя

- **Тестового фреймворка в проекте нет** (в `package.json` только `dev`, `build`, `start`, `lint`). Вместо TDD проверяем каждый шаг командами `npx tsc --noEmit`, `npm run lint`, `grep`, а в конце `npm run build` и просмотром в браузере. Не добавляйте тестовый фреймворк ради этой задачи.
- `AGENTS.md` просит читать `node_modules/next/dist/docs/`, но такой папки в этой установке нет. Мы не используем новые Next API, только обычные серверные компоненты по образцу существующих. Перед началом достаточно открыть `src/components/home/Services.tsx` и сравнить.
- **Коммиты:** шаги «Commit» выполняйте только если пользователь разрешил коммитить. Иначе пропустите их и оставьте изменения в рабочем дереве. Всегда добавляйте файлы поимённо, а не `git add -A`: в дереве лежат несвязанные удаления `docs/banner.svg`, `docs/logo.svg`, `docs/screenshots/*` — их не трогать.
- **Отклонение от спецификации (согласовать с пользователем):** в `ProcessJourney` (`id="approach"`) уже есть eyebrow «How we work». Поэтому пункт меню «How we work» ведёт на него, а новая секция моделей сотрудничества получает eyebrow «Ways to work together» и `id="engagement"`, стоит сразу после и в меню не дублируется. Меню остаётся из 5 пунктов, как в спецификации.

## Карта файлов

| Файл | Действие | Ответственность |
|---|---|---|
| `src/data/site.ts` | Изменить | title/description; убрать `photo` и `role` у `founder` |
| `src/components/home/Hero.tsx` | Изменить | eyebrow, lead, плашки |
| `src/components/home/TrustStrip.tsx` | Изменить | убрать «16+ years» |
| `src/data/services.ts` | Изменить | порядок и номера услуг |
| `src/components/home/Services.tsx` | Изменить | заголовок секции |
| `src/data/industries.ts` | Создать | данные индустрий |
| `src/components/home/Industries.tsx` | Создать | секция Industries |
| `src/data/projects.ts` | Изменить | `role` → `contribution`, описание Labs |
| `src/components/home/SelectedWork.tsx` | Изменить | заголовок, подпись «Our contribution» |
| `src/data/engagement.ts` | Создать | данные моделей сотрудничества |
| `src/components/home/EngagementModels.tsx` | Создать | секция Ways to work together |
| `src/data/company.ts` | Изменить | принципы + модель «core team + network» |
| `src/components/home/Company.tsx` | Изменить | страница компании без портрета |
| `src/components/ui/ImagePlaceholder.tsx` | Удалить | больше не используется |
| `src/data/navigation.ts` | Изменить | новое меню |
| `src/app/page.tsx` | Изменить | порядок секций |
| `README.md` | Изменить | описание, убрать пункт про фото |

---

### Task 1: Метаданные сайта

**Files:**
- Modify: `src/data/site.ts:4-8`

- [ ] **Step 1: Заменить title и description**

В `src/data/site.ts` заменить

```ts
  title: "Altronix Software — Practical AI & Software Engineering",
  description:
    "Altronix Software builds practical AI solutions, reliable custom software and modern integrations for real business systems.",
```

на

```ts
  title: "Altronix Software — Software Engineering & Practical AI",
  description:
    "Altronix Software designs and builds custom software, modern integrations and practical AI solutions for real business systems.",
```

- [ ] **Step 2: Проверить типы**

Run: `npx tsc --noEmit`
Expected: завершается без вывода (exit code 0).

- [ ] **Step 3: Commit**

```bash
git add src/data/site.ts
git commit -m "content: put engineering first in site title and description"
```

---

### Task 2: Hero и TrustStrip

**Files:**
- Modify: `src/components/home/Hero.tsx:9,15,22-25`
- Modify: `src/components/home/TrustStrip.tsx:11`

- [ ] **Step 1: Обновить плашки в Hero**

В `src/components/home/Hero.tsx` заменить

```tsx
const facts = ["Founder-led studio", "EU company · Estonia", "Direct access to the engineers"];
```

на

```tsx
const facts = ["EU company · Estonia", "Senior engineers on every project", "Architecture to production"];
```

- [ ] **Step 2: Обновить eyebrow**

Заменить

```tsx
          <div className="eyebrow">Software engineering & applied AI</div>
```

на

```tsx
          <div className="eyebrow">Engineering partner for product companies</div>
```

- [ ] **Step 3: Обновить lead**

Заменить

```tsx
          <p className={styles.lead}>
            We help companies automate real workflows, build reliable software and modernize existing
            systems — with senior engineers accountable from architecture to production.
          </p>
```

на

```tsx
          <p className={styles.lead}>
            We design, build and modernize software for real business systems — from custom products and
            integrations to applied AI — with senior engineers accountable from architecture to production.
          </p>
```

- [ ] **Step 4: Убрать «16+ years» из TrustStrip**

В `src/components/home/TrustStrip.tsx` заменить

```tsx
          <span className="text-[#8de6f1]">16+ years</span> of enterprise engineering
```

на

```tsx
          <span className="text-[#8de6f1]">Enterprise-grade</span> engineering
```

- [ ] **Step 5: Проверить**

Run: `npx tsc --noEmit && npm run lint`
Expected: оба завершаются без ошибок.

Run: `grep -rn "16+\|Founder-led" src/components/home/Hero.tsx src/components/home/TrustStrip.tsx`
Expected: нет вывода (grep возвращает код 1 — это ожидаемо).

- [ ] **Step 6: Commit**

```bash
git add src/components/home/Hero.tsx src/components/home/TrustStrip.tsx
git commit -m "content: reposition hero as engineering partner, drop personal tenure claim"
```

---

### Task 3: Порядок услуг

**Files:**
- Modify: `src/data/services.ts:10-52`
- Modify: `src/components/home/Services.tsx:19`

- [ ] **Step 1: Переставить услуги**

В `src/data/services.ts` заменить весь массив `services` (от `export const services: Service[] = [` до закрывающей `];`) на:

```ts
export const services: Service[] = [
  {
    id: "software",
    number: "01",
    title: "Custom Software Development",
    description: "Reliable software built around real business processes.",
    capabilities: [
      "SaaS products",
      "Web applications",
      "Internal platforms",
      "APIs",
      "Integrations",
      "MVP to production",
    ],
    cta: { label: "Discuss software development", subject: "Custom software" },
  },
  {
    id: "modernization",
    number: "02",
    title: "Modernization & Integrations",
    description: "Improve existing systems without unnecessary rewrites.",
    capabilities: [
      "Java / Spring modernization",
      "Cloud migration",
      "Enterprise integrations",
      "API architecture",
      "AI enablement",
    ],
    cta: { label: "Discuss modernization", subject: "Modernization" },
  },
  {
    id: "ai",
    number: "03",
    title: "AI Solutions & Automation",
    description: "Practical AI integrated into real workflows and business systems.",
    capabilities: [
      "AI Agents",
      "RAG & Knowledge Systems",
      "Document Automation",
      "Workflow Automation",
      "LLM Integrations",
    ],
    cta: { label: "Discuss AI solutions", subject: "AI solutions" },
  },
];
```

- [ ] **Step 2: Обновить заголовок секции**

В `src/components/home/Services.tsx` заменить

```tsx
        title="AI, custom software, modernization."
```

на

```tsx
        title="Custom software, modernization, AI."
```

- [ ] **Step 3: Проверить**

Run: `npx tsc --noEmit && npm run lint`
Expected: без ошибок.

- [ ] **Step 4: Commit**

```bash
git add src/data/services.ts src/components/home/Services.tsx
git commit -m "content: lead services with custom software, AI as third capability"
```

---

### Task 4: Секция Industries

**Files:**
- Create: `src/data/industries.ts`
- Create: `src/components/home/Industries.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Создать данные**

Create `src/data/industries.ts`:

```ts
export interface Industry {
  id: string;
  number: string;
  title: string;
  description: string;
  focus: string[];
}

/** Only industries with real delivery experience behind them (see `commercialProjects`). */
export const industries: Industry[] = [
  {
    id: "ecommerce",
    number: "01",
    title: "E-commerce",
    description: "Large-scale commerce backends, production support and complex integrations.",
    focus: ["Commerce backends", "Integrations", "Production support"],
  },
  {
    id: "pim",
    number: "02",
    title: "Product information (PIM)",
    description: "Centralized product information, integrations and enterprise workflows.",
    focus: ["Product data", "Integrations", "Enterprise workflows"],
  },
  {
    id: "logistics",
    number: "03",
    title: "Logistics",
    description: "Backend systems for logistics workflows, APIs and day-to-day operations.",
    focus: ["Operational workflows", "API design", "Cloud"],
  },
];
```

- [ ] **Step 2: Создать компонент**

Create `src/components/home/Industries.tsx`:

```tsx
import { industries } from "@/data/industries";
import { mailto } from "@/data/site";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { CARD_ITEM, CardRow } from "@/components/ui/CardRow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Tag } from "@/components/ui/Tag";

export function Industries() {
  return (
    <Section id="industries" labelledBy="industries-title">
      <SectionHeading
        id="industries-title"
        eyebrow="Industries"
        title="Built for complex business systems."
        description="Our delivery experience comes from enterprise environments where integrations, data and reliability matter more than novelty."
      />

      <CardRow label="Industries">
        {industries.map((industry, i) => (
          <AnimatedReveal key={industry.id} delay={(i + 1) as 1 | 2 | 3} className={CARD_ITEM}>
            <SpotlightCard className="flex h-full flex-col rounded-[18px] border border-line bg-[linear-gradient(180deg,rgba(18,31,57,.86),rgba(11,21,40,.86))] p-7 hover:border-[rgba(129,157,255,.28)] hover:shadow-[0_22px_56px_rgba(0,0,0,.18)]">
              <div className="font-mono text-[11px] leading-none font-medium text-[#79dbe7]">{industry.number}</div>
              <h3 className="mt-[18px] mb-[10px] text-2xl leading-[1.15] font-bold tracking-[-0.035em]">
                {industry.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-muted">{industry.description}</p>
              <ul className="mt-[22px] flex flex-wrap gap-[7px]" aria-label="Focus areas">
                {industry.focus.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </AnimatedReveal>
        ))}
      </CardRow>

      <AnimatedReveal className="relative z-[1] mt-8">
        <div className="flex flex-wrap items-center gap-x-4 text-[15px] text-muted">
          <span>Other complex business systems?</span>
          <a href={mailto("Project discussion")} className="text-link min-h-11">
            Let&apos;s talk <span aria-hidden="true">→</span>
          </a>
        </div>
      </AnimatedReveal>
    </Section>
  );
}
```

- [ ] **Step 3: Подключить в page.tsx**

В `src/app/page.tsx` добавить импорт после импорта `Hero` (по алфавиту путей):

```tsx
import { Industries } from "@/components/home/Industries";
```

и вставить `<Industries />` между `<Services />` и `<SelectedWork />`:

```tsx
      <Services />
      <Industries />
      <SelectedWork />
```

- [ ] **Step 4: Проверить**

Run: `npx tsc --noEmit && npm run lint`
Expected: без ошибок.

Run: `curl -s http://localhost:3000 | grep -o 'id="industries"'`
Expected: `id="industries"` (dev-сервер должен быть запущен; если нет, запустите `npm run dev` в отдельном терминале).

- [ ] **Step 5: Commit**

```bash
git add src/data/industries.ts src/components/home/Industries.tsx src/app/page.tsx
git commit -m "feat: add Industries section (E-commerce, PIM, Logistics)"
```

---

### Task 5: Selected work без «я»

**Files:**
- Modify: `src/data/projects.ts`
- Modify: `src/components/home/SelectedWork.tsx`

- [ ] **Step 1: Переименовать поле `role` в `contribution`**

В `src/data/projects.ts`:

В интерфейсе заменить `  role: string;` на `  contribution: string;`.

Во всех трёх проектах заменить ключ `role:` на `contribution:` (значения не менять):

```ts
    contribution: "Backend & integration engineering",
```
(для первых двух проектов) и
```ts
    contribution: "Backend engineering",
```
(для Logistics).

- [ ] **Step 2: Обновить описание Labs**

В `src/data/projects.ts` заменить

```ts
  description:
    "Altronix Labs is used to validate architecture, integration patterns and emerging AI capabilities hands-on.",
```

на

```ts
  description:
    "Altronix Labs is where we validate architecture, integration patterns and emerging technologies, AI included, hands-on.",
```

- [ ] **Step 3: Обновить SelectedWork**

В `src/components/home/SelectedWork.tsx`:

Заменить

```tsx
    ["Role", project.role],
```

на

```tsx
    ["Our contribution", project.contribution],
```

Заменить блок заголовка

```tsx
        title="Enterprise delivery. AI reference builds."
        description="Commercial delivery experience in complex business systems, plus internal reference solutions for modern AI patterns."
```

на

```tsx
        title="Delivery experience. Reference builds."
        description="Commercial delivery experience in complex business systems, plus internal reference solutions for modern engineering and AI patterns."
```

- [ ] **Step 4: Поправить ширину колонки подписи**

Подпись «Our contribution» длиннее прежней «Role». В `ProjectFacts` заменить `grid-cols-[86px_1fr]` на `grid-cols-[112px_1fr]`:

```tsx
        <div key={term} className="grid grid-cols-[112px_1fr] gap-3">
```

- [ ] **Step 5: Проверить**

Run: `npx tsc --noEmit && npm run lint`
Expected: без ошибок (tsc упадёт, если где-то остался `project.role`).

Run: `grep -rn "\.role\b\|role:" src/data/projects.ts src/components/home/SelectedWork.tsx`
Expected: нет вывода.

- [ ] **Step 6: Commit**

```bash
git add src/data/projects.ts src/components/home/SelectedWork.tsx
git commit -m "content: present project experience as company contribution, not personal role"
```

---

### Task 6: Секция моделей сотрудничества

**Files:**
- Create: `src/data/engagement.ts`
- Create: `src/components/home/EngagementModels.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Создать данные**

Create `src/data/engagement.ts`:

```ts
export interface EngagementModel {
  id: string;
  number: string;
  title: string;
  description: string;
  outcome: string;
  cta: { label: string; subject: string };
}

export const engagementModels: EngagementModel[] = [
  {
    id: "review",
    number: "01",
    title: "Technical Review",
    description: "A short, focused look at your architecture, codebase or idea.",
    outcome: "Clear findings and recommendations.",
    cta: { label: "Request a review", subject: "Technical review" },
  },
  {
    id: "proof",
    number: "02",
    title: "Proof of Value",
    description: "A small working prototype on your real data, before a larger investment.",
    outcome: "Evidence the approach works.",
    cta: { label: "Discuss a proof of value", subject: "Proof of value" },
  },
  {
    id: "fixed",
    number: "03",
    title: "Fixed-scope project",
    description: "A defined scope, timeline and result, delivered end to end.",
    outcome: "A production-ready deliverable.",
    cta: { label: "Discuss a project", subject: "Fixed-scope project" },
  },
  {
    id: "team",
    number: "04",
    title: "Dedicated team",
    description: "Senior engineers embedded in your product team, long-term or for a defined period.",
    outcome: "Ongoing engineering capacity.",
    cta: { label: "Discuss a team", subject: "Dedicated team" },
  },
];
```

- [ ] **Step 2: Создать компонент**

Create `src/components/home/EngagementModels.tsx`:

```tsx
import { engagementModels } from "@/data/engagement";
import { mailto } from "@/data/site";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function EngagementModels() {
  return (
    <Section id="engagement" labelledBy="engagement-title">
      <SectionHeading
        id="engagement-title"
        eyebrow="Ways to work together"
        title="Start with a review. Scale with a team."
        description="Pick the format that fits where you are, from a short technical review to a dedicated engineering team."
      />

      <ol className="relative z-[1] grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[18px]">
        {engagementModels.map((model, i) => (
          <li key={model.id}>
            <AnimatedReveal delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="h-full">
              <SpotlightCard className="flex h-full flex-col rounded-[18px] border border-line bg-[linear-gradient(180deg,rgba(18,31,57,.86),rgba(11,21,40,.86))] p-6 hover:border-[rgba(129,157,255,.28)]">
                <div className="font-mono text-[11px] leading-none font-medium text-[#79dbe7]">{model.number}</div>
                <h3 className="mt-4 mb-[10px] text-xl leading-[1.15] font-bold tracking-[-0.03em]">{model.title}</h3>
                <p className="text-sm leading-[1.65] text-muted">{model.description}</p>
                <p className="mt-4 border-t border-line pt-4 text-[13px] leading-[1.55] text-[#c2ccda]">
                  {model.outcome}
                </p>
                <a href={mailto(model.cta.subject)} className="text-link mt-auto min-h-11 self-start pt-3">
                  {model.cta.label} <span aria-hidden="true">→</span>
                </a>
              </SpotlightCard>
            </AnimatedReveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
```

- [ ] **Step 3: Подключить в page.tsx**

В `src/app/page.tsx` добавить импорт рядом с остальными `home/*`:

```tsx
import { EngagementModels } from "@/components/home/EngagementModels";
```

и вставить между `<ProcessJourney />` и `<Company />`:

```tsx
      <ProcessJourney />
      <EngagementModels />
      <Company />
```

Итоговый порядок в `<main>`: Hero, TrustStrip, Services, Industries, SelectedWork, ProcessJourney, EngagementModels, Company, FinalCTA, JsonLd.

- [ ] **Step 4: Проверить**

Run: `npx tsc --noEmit && npm run lint`
Expected: без ошибок.

Run: `curl -s http://localhost:3000 | grep -o 'id="engagement"'`
Expected: `id="engagement"`.

- [ ] **Step 5: Commit**

```bash
git add src/data/engagement.ts src/components/home/EngagementModels.tsx src/app/page.tsx
git commit -m "feat: add engagement models section"
```

---

### Task 7: Company как страница компании

**Files:**
- Modify: `src/data/company.ts`
- Modify: `src/components/home/Company.tsx`
- Modify: `src/data/site.ts:11-17`
- Delete: `src/components/ui/ImagePlaceholder.tsx`

- [ ] **Step 1: Обновить данные компании**

Заменить всё содержимое `src/data/company.ts` на:

```ts
export const principles = [
  {
    title: "Senior engineers on every project",
    description: "Architecture and important technical decisions stay with experienced engineers.",
  },
  {
    title: "Direct access to the people doing the work",
    description: "Clients work directly with the people responsible for delivery.",
  },
  {
    title: "Responsible for the outcome in production",
    description: "We care about the result in production, not simply completing tickets.",
  },
];

/** How the company is staffed. No names or headcount: only roles and responsibilities. */
export const teamModel = [
  {
    title: "Core team",
    description: "Owns architecture, technical decisions and delivery on every project.",
    roles: ["Architecture", "Technical leadership", "Delivery"],
  },
  {
    title: "Trusted network",
    description: "Specialists we have worked with before, brought in when a project needs extra expertise.",
    roles: ["Backend", "Frontend", "AI / ML", "QA", "Design"],
  },
];
```

- [ ] **Step 2: Переписать Company.tsx**

Заменить всё содержимое `src/components/home/Company.tsx` на:

```tsx
import { principles, teamModel } from "@/data/company";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";

export function Company() {
  return (
    <Section id="company" tone="deep" labelledBy="company-title">
      <AnimatedReveal>
        <div className="relative grid gap-10 overflow-hidden rounded-[22px] border border-line bg-[linear-gradient(135deg,rgba(17,29,53,.92),rgba(17,24,52,.8))] p-6 after:pointer-events-none after:absolute after:-top-[120px] after:-right-[100px] after:size-[360px] after:rounded-full after:bg-[rgba(139, 92, 246,.12)] after:blur-[40px] after:content-[''] sm:p-[38px] lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div className="relative z-[1]">
            <div className="eyebrow">Company</div>
            <h2
              id="company-title"
              className="mt-[14px] mb-[18px] text-[34px] leading-[1.08] font-bold tracking-[-0.045em] sm:text-[40px]"
            >
              Senior engineers. Focused by design.
            </h2>
            <p className="text-[15px] leading-[1.72] text-muted">
              Altronix Software is an engineering company built around a small senior core team. We own
              architecture, implementation and client decisions, and bring in trusted specialists when a
              project requires additional expertise.
            </p>
            <p className="mt-4 text-[15px] leading-[1.72] text-ink">
              Clients work directly with the people responsible for the result.
            </p>

            <dl className="mt-7 grid gap-5 border-t border-line pt-6">
              {teamModel.map((group) => (
                <div key={group.title}>
                  <dt className="text-[15px] font-bold text-white">{group.title}</dt>
                  <dd className="mt-1 text-[13px] leading-[1.6] text-[#9ba8bb]">{group.description}</dd>
                  <dd>
                    <ul className="mt-3 flex flex-wrap gap-[7px]" aria-label={`${group.title} roles`}>
                      {group.roles.map((role) => (
                        <li key={role}>
                          <Tag>{role}</Tag>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ol className="relative z-[1] grid content-start gap-3">
            {principles.map((principle, i) => (
              <li key={principle.title} className="rounded-xl border border-line bg-[rgba(5,12,25,.28)] p-[18px] pr-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] font-medium text-[#79dbe7]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[15px] font-bold">{principle.title}</h3>
                </div>
                <p className="mt-2 pl-[26px] text-[13px] leading-[1.55] text-[#93a1b6]">
                  {principle.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </AnimatedReveal>
    </Section>
  );
}
```

- [ ] **Step 3: Убрать фото и роль основателя из конфига**

В `src/data/site.ts` заменить блок

```ts
  founder: {
    name: "Oleksandr Gorbatov",
    role: "Founder, Altronix Software",
    // Drop the photo into /public and set the path, e.g. "/team/oleksandr.jpg".
    // While undefined, a neutral monogram placeholder is shown.
    photo: undefined as string | undefined,
  },
```

на

```ts
  // Used only for structured data (JSON-LD); not shown on the page.
  founder: {
    name: "Oleksandr Gorbatov",
  },
```

- [ ] **Step 4: Удалить неиспользуемый компонент**

Run: `grep -rn "ImagePlaceholder" src`
Expected: единственное совпадение — сам файл `src/components/ui/ImagePlaceholder.tsx` (импорт из `Company.tsx` уже убран).

Run: `git rm -f src/components/ui/ImagePlaceholder.tsx`
Expected: `rm 'src/components/ui/ImagePlaceholder.tsx'`

- [ ] **Step 5: Проверить**

Run: `npx tsc --noEmit && npm run lint`
Expected: без ошибок (`JsonLd.tsx` по-прежнему читает `siteConfig.founder.name`).

Run: `grep -rniE "16\+|I've spent|I&apos;ve|Senior-led|founder\.(photo|role)" src`
Expected: нет вывода.

- [ ] **Step 6: Commit**

```bash
git add src/data/company.ts src/components/home/Company.tsx src/data/site.ts
git commit -m "content: rewrite Company as an engineering company, remove founder portrait and quote"
```
(Удаление `ImagePlaceholder.tsx` уже в индексе после `git rm`.)

---

### Task 8: Навигация

**Files:**
- Modify: `src/data/navigation.ts`

- [ ] **Step 1: Заменить меню**

В `src/data/navigation.ts` заменить массив `navigation` на:

```ts
export const navigation: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Work", href: "#work" },
  { label: "How we work", href: "#approach" },
  { label: "Company", href: "#company" },
];
```

- [ ] **Step 2: Проверить, что все якоря существуют**

Run:
```bash
for id in services industries work approach company; do curl -s http://localhost:3000 | grep -c "id=\"$id\"" | xargs echo "$id:"; done
```
Expected: у каждого id значение `1` (или больше), ни одного `0`.

- [ ] **Step 3: Commit**

```bash
git add src/data/navigation.ts
git commit -m "content: update navigation for Industries and How we work"
```

---

### Task 9: README

**Files:**
- Modify: `README.md:13,15,139`

- [ ] **Step 1: Обновить описание**

В `README.md` строку 13

```md
**The corporate website of [Altronix Software](https://altronixsoft.com) — a focused, senior-led engineering studio.**
```

заменить на

```md
**The corporate website of [Altronix Software](https://altronixsoft.com) — an engineering partner for custom software, integrations and practical AI.**
```

Строку 15

```md
AI solutions & automation · custom software · modernization & integrations.
```

заменить на

```md
Custom software · modernization & integrations · AI solutions & automation.
```

- [ ] **Step 2: Убрать пункт про фото основателя**

Удалить строку 139 целиком:

```md
- [ ] Add the founder photo: pass `src` to `<ImagePlaceholder>` in [`Company.tsx`](src/components/home/Company.tsx) and drop the file into `public/`.
```

- [ ] **Step 3: Проверить**

Run: `grep -n "ImagePlaceholder\|senior-led" README.md`
Expected: нет вывода.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: align README with engineering-company positioning"
```

---

### Task 10: Финальная проверка

**Files:** нет изменений (если проверка находит проблемы, исправить в соответствующем файле и повторить шаг).

- [ ] **Step 1: Линт, типы, сборка**

Run: `npm run lint && npx tsc --noEmit && npm run build`
Expected: все три завершаются успешно; `next build` печатает таблицу маршрутов без ошибок.

- [ ] **Step 2: Поиск устаревших формулировок**

Run:
```bash
grep -rniE "16\+|founder-led|senior-led|I've spent|I&apos;ve spent|Serious software" src README.md
```
Expected: нет вывода. (Совпадение `founder` в `JsonLd.tsx` и `site.ts` допустимо: оно не попадает под этот шаблон.)

- [ ] **Step 3: Просмотр в браузере (десктоп)**

Открыть `http://localhost:3000` во встроенном браузере. Проверить по порядку: Hero (новые eyebrow, lead, плашки; ничего не обрезано), TrustStrip («Enterprise-grade engineering»), Services (Custom software первой), Industries (3 карточки и строка «Other complex business systems?»), Selected work (подпись «Our contribution» не ломает строку), ProcessJourney (sticky-скролл работает как раньше), Ways to work together (4 карточки), Company (нет портрета и цитаты, есть Core team / Trusted network), Final CTA.

Кликнуть каждый пункт меню: Services, Industries, Work, How we work, Company. Каждый должен прокрутить к своей секции.

Затем прочитать консоль браузера (`read_console_messages`, только ошибки). Expected: ошибок нет.

- [ ] **Step 4: Просмотр в браузере (мобильная ширина)**

Переключить вьюпорт на mobile (375×812) и перезагрузить. Проверить: нет горизонтального скролла страницы (`document.documentElement.scrollWidth <= window.innerWidth`), карточки Industries листаются горизонтально, карточки Ways to work together идут в один столбец, мобильное меню содержит те же 5 пунктов. После проверки вернуть вьюпорт на desktop.

- [ ] **Step 5: Итог**

Если всё чисто, сообщить пользователю результат и перечислить отклонение из раздела «Заметки для исполнителя» (eyebrow «Ways to work together», пункт меню «How we work» ведёт на существующую секцию). Если были правки после шагов 1–4, закоммитить их отдельным коммитом `fix: ...`.
