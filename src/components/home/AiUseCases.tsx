import { aiUseCases } from "@/data/services";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ScrollRegion } from "@/components/ui/ScrollRegion";
import { cn } from "@/lib/utils";

/** Compact AI examples — deliberately a rule-separated strip, not another card grid. */
export function AiUseCases() {
  return (
    <AnimatedReveal className="relative z-[1] mt-[46px]">
      <ScrollRegion
        id="solutions"
        label="AI use cases"
        className="grid grid-cols-2 border-y border-line max-sm:-mr-4 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:pr-4 max-sm:[scrollbar-width:none] lg:grid-cols-[1.2fr_repeat(4,1fr)] [&::-webkit-scrollbar]:hidden"
      >
        <div className="col-span-2 border-b border-line py-6 pr-[18px] max-sm:min-w-[80vw] max-sm:border-b-0 max-sm:border-r lg:col-span-1 lg:border-r lg:border-b-0">
          <h3 className="text-base font-bold">AI use cases</h3>
        </div>
        {aiUseCases.map((useCase, i) => (
          <div
            key={useCase.title}
            className={cn(
              "group border-line px-[18px] py-6 max-sm:min-w-[70vw] max-sm:snap-start max-sm:border-r",
              i % 2 === 0 && "border-r",
              i >= 2 && "max-lg:border-t",
              i < aiUseCases.length - 1 && "lg:border-r",
              i === aiUseCases.length - 1 && "max-sm:border-r-0",
            )}
          >
            <h4 className="text-base font-bold transition-colors group-hover:text-label">
              {useCase.title}
            </h4>
            <p className="mt-2 text-small leading-[1.6] text-muted">{useCase.description}</p>
          </div>
        ))}
      </ScrollRegion>
    </AnimatedReveal>
  );
}
