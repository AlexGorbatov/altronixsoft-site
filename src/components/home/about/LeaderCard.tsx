import Image from "next/image";
import type { AboutPerson } from "@/data/company";
import { DevTodo } from "@/components/ui/DevTodo";
import { Tag } from "@/components/ui/Tag";
import { filled, filledItems, todoLabel } from "@/lib/todo";
import { cn } from "@/lib/utils";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** Square portrait with a brand-gradient monogram fallback. */
function Portrait({ person, className }: { person: AboutPerson; className?: string }) {
  const alt = `Portrait of ${person.name}, ${person.role}`;
  if (filled(person.photo)) {
    return (
      <div className={cn("relative aspect-square overflow-hidden rounded-2xl border border-white/15", className)}>
        <Image src={person.photo} alt={alt} fill sizes="(min-width: 768px) 200px, 160px" className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "grid aspect-square place-items-center rounded-2xl border border-white/15 bg-[linear-gradient(135deg,#1c3a78,#4b36fa)] font-extrabold tracking-[0.04em] text-white",
        className,
      )}
    >
      <span aria-hidden="true" className="text-[clamp(28px,6vw,52px)]">
        {initials(person.name)}
      </span>
    </div>
  );
}

function bioText({ intro, clientType, outro }: NonNullable<AboutPerson["bio"]>): string {
  const forClients = filled(clientType) ? ` for ${clientType}` : "";
  return `${intro}${forClients}. ${outro}`;
}

interface LeaderCardProps {
  person: AboutPerson;
  /** Compact variant for additional team members. */
  compact?: boolean;
}

export function LeaderCard({ person, compact = false }: LeaderCardProps) {
  const highlights = filledItems(person.highlights);
  const openTodos = [person.photo, person.linkedinUrl, person.bio?.clientType, ...(person.highlights ?? [])].filter(
    (value) => todoLabel(value),
  );

  return (
    <article
      className={cn(
        "grid gap-5 rounded-2xl border border-line bg-[linear-gradient(135deg,rgba(17,29,53,.92),rgba(17,24,52,.8))] sm:gap-7",
        compact ? "p-5 sm:grid-cols-[96px_1fr]" : "p-6 sm:p-8 md:grid-cols-[200px_1fr]",
      )}
    >
      <Portrait person={person} className={compact ? "w-24" : "w-40 md:w-full"} />

      <div className="min-w-0">
        {!compact && <p className="mono-label text-label">Leadership</p>}
        <h3 className={cn("font-bold tracking-[-0.03em]", compact ? "text-lg" : "mt-2 text-[26px] leading-[1.15]")}>
          {person.name}
        </h3>
        <p className="mt-1 text-sm text-subtle">{person.role}</p>

        {person.bio && (
          <p className={cn("max-w-[68ch] text-muted", compact ? "mt-3 text-small leading-[1.6]" : "mt-4 text-body leading-[1.75]")}>
            {bioText(person.bio)}
          </p>
        )}

        {highlights.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-[7px]" aria-label={`${person.name}: expertise`}>
            {highlights.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        )}

        {filled(person.linkedinUrl) && (
          <a
            href={person.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link mt-3 min-h-11"
            aria-label={`${person.name} on LinkedIn (opens in a new tab)`}
          >
            LinkedIn <span aria-hidden="true">→</span>
          </a>
        )}

        {openTodos.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {openTodos.map((value) => (
              <DevTodo key={value} value={value} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
