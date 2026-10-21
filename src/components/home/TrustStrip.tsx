import { getContent } from "@/i18n/server";
import { Container } from "@/components/ui/Container";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { Tag } from "@/components/ui/Tag";

/** Experience statement + a slow, subtle technology marquee. Pure CSS animation. */
export async function TrustStrip() {
  const { technologies, copy } = await getContent();
  return (
    <section aria-label={copy.ui.experienceAria} className="overflow-hidden border-b border-line bg-[#0a1324]">
      <Container className="flex flex-col items-start gap-[18px] py-6 lg:h-[88px] lg:flex-row lg:items-center lg:gap-[34px] lg:py-0">
        <p className="min-w-max text-body font-extrabold">
          <span className="text-label">{copy.ui.technologies}</span>
        </p>
        <div className="w-full flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
          <ul className="flex w-max animate-[marquee_26s_linear_infinite] gap-[18px]">
            {[0, 1].map((round) =>
              technologies.map((tech) => (
                <li key={`${round}-${tech}`} aria-hidden={round === 1 || undefined}>
                  <Tag variant="chip">{tech}</Tag>
                </li>
              )),
            )}
          </ul>
        </div>
        <MotionToggle labels={{ pause: copy.ui.motionPause, play: copy.ui.motionPlay }} />
      </Container>
    </section>
  );
}
