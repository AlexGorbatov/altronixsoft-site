import { commercialProjects, labs, type CommercialProject } from "@/data/projects";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { CARD_ITEM, CardRow } from "@/components/ui/CardRow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ProjectVisual } from "./ProjectVisual";

function ProjectFacts({ project }: { project: CommercialProject }) {
  const facts = [
    ["Role", project.role],
    ["Environment", project.environment],
    ["Focus", project.focus],
  ];
  return (
    <dl className="mt-5 grid gap-[10px] border-t border-line pt-4 text-[13px]">
      {facts.map(([term, detail]) => (
        <div key={term} className="grid grid-cols-[86px_1fr] gap-3">
          <dt className="font-mono text-[11px] leading-[1.7] font-medium tracking-[0.1em] text-[#8492a8] uppercase">
            {term}
          </dt>
          <dd className="leading-[1.5] text-[#c2ccda]">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SelectedWork() {
  return (
    <Section id="work" tone="deep" labelledBy="work-title">
      <SectionHeading
        id="work-title"
        eyebrow="Selected work"
        title="Enterprise delivery. AI reference builds."
        description="Commercial delivery experience in complex business systems, plus internal reference solutions for modern AI patterns."
      />

      <CardRow label="Commercial project experience">
        {commercialProjects.map((project, i) => (
          <AnimatedReveal key={project.title} delay={(i + 1) as 1 | 2 | 3} className={CARD_ITEM}>
            <SpotlightCard className="flex h-full flex-col rounded-[18px] border border-line bg-[#0d182c] hover:border-[rgba(139, 92, 246,.34)]">
              <ProjectVisual variant={project.visual} />
              <div className="flex flex-1 flex-col p-[22px]">
                <div className="font-mono text-[11px] leading-[1.2] font-medium tracking-[0.1em] text-[#8492a8] uppercase">
                  {project.category}
                </div>
                <h3 className="mt-3 mb-2 text-[19px] font-bold">{project.title}</h3>
                <p className="text-sm leading-[1.6] text-[#9eabbf]">{project.description}</p>
                <ProjectFacts project={project} />
              </div>
            </SpotlightCard>
          </AnimatedReveal>
        ))}
      </CardRow>

      {/* Labs: visually distinct from customer work — dashed border, cyan tint, explicit disclaimer. */}
      <AnimatedReveal className="relative z-[1] mt-[18px]">
        <div className="grid gap-6 rounded-2xl border border-dashed border-[rgba(34, 214, 244,.3)] bg-[linear-gradient(110deg,rgba(26, 124, 251,.08),rgba(139, 92, 246,.08))] p-[22px] sm:p-7 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-base font-extrabold">{labs.name}</h3>
              <span className="mono-label rounded-md border border-[rgba(34, 214, 244,.3)] px-2 py-[5px] text-[11px] text-[#8fdde8]">
                Internal · Not client work
              </span>
            </div>
            <p className="mt-3 max-w-[520px] text-sm leading-[1.65] text-[#a9b5c8]">{labs.description}</p>
            <p className="mt-2 text-[13px] text-[#8290a6]">{labs.note}</p>
          </div>
          <ul className="grid gap-2" aria-label="Altronix Labs reference implementations">
            {labs.projects.map((project) => (
              <li
                key={project.title}
                className="flex items-center justify-between gap-4 rounded-[10px] border border-line bg-white/[.02] px-[14px] py-[11px] text-sm text-[#c4cedb]"
              >
                {project.title}
                <span className="mono-label text-[11px] text-[#8fdde8]">{project.tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedReveal>
    </Section>
  );
}
