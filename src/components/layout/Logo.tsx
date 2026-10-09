import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Altronix mark: a single ribbon folded into an "A" (vector redraw of the brand artwork).
 * Gradient ids are prefixed per instance so the header and footer copies don't collide.
 */
export function LogoMark({ className }: { className?: string }) {
  const p = useId();

  return (
    <svg viewBox="115 159 1042 902" aria-hidden="true" focusable="false" className={className}>
      <defs>
      <linearGradient id={`${p}gFadeX`} gradientUnits="userSpaceOnUse" x1="400" y1="0" x2="600" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#fff"/></linearGradient>
      <mask id={`${p}mRidge`} maskUnits="userSpaceOnUse" x="115" y="159" width="1042" height="902"><rect x="115" y="159" width="1042" height="902" fill={`url(#${p}gFadeX)`}/></mask>
      <linearGradient id={`${p}gBack`} gradientUnits="userSpaceOnUse" x1="500" y1="230" x2="180" y2="780">
      <stop offset="0" stopColor="#42f2fc"/>
      <stop offset=".45" stopColor="#2fbffb"/>
      <stop offset=".75" stopColor="#1f98fb"/>
      <stop offset="1" stopColor="#1078fb"/>
      </linearGradient>
      <linearGradient id={`${p}gBackR`} gradientUnits="userSpaceOnUse" x1="600" y1="0" x2="860" y2="0">
      <stop offset="0" stopColor="#1aa0fd" stopOpacity="0"/>
      <stop offset="1" stopColor="#0c8ef7" stopOpacity=".95"/>
      </linearGradient>
      <linearGradient id={`${p}gRight`} gradientUnits="userSpaceOnUse" x1="720" y1="305" x2="760" y2="520">
      <stop offset="0" stopColor="#0553c6"/>
      <stop offset=".45" stopColor="#1588fb"/>
      <stop offset="1" stopColor="#3cb8fb"/>
      </linearGradient>
      <linearGradient id={`${p}gRightH`} gradientUnits="userSpaceOnUse" x1="780" y1="560" x2="1100" y2="760">
      <stop offset="0" stopColor="#3ab0fb" stopOpacity="0"/>
      <stop offset=".5" stopColor="#3072fc" stopOpacity=".9"/>
      <stop offset="1" stopColor="#3a4af8"/>
      </linearGradient>
      <linearGradient id={`${p}gStrip`} gradientUnits="userSpaceOnUse" x1="610" y1="380" x2="330" y2="872">
      <stop offset="0" stopColor="#2a5192"/>
      <stop offset=".35" stopColor="#173f8e"/>
      <stop offset=".7" stopColor="#0a37a3"/>
      <stop offset="1" stopColor="#021545"/>
      </linearGradient>
      <linearGradient id={`${p}gWave`} gradientUnits="userSpaceOnUse" x1="115" y1="0" x2="1130" y2="0">
      <stop offset="0" stopColor="#55f2fb"/>
      <stop offset=".133" stopColor="#42d9fc"/>
      <stop offset=".231" stopColor="#34bbfb"/>
      <stop offset=".33" stopColor="#2b95fc"/>
      <stop offset=".43" stopColor="#296ffb"/>
      <stop offset=".527" stopColor="#324ffb"/>
      <stop offset=".675" stopColor="#4148fb"/>
      <stop offset=".82" stopColor="#5a45fc"/>
      <stop offset="1" stopColor="#6a40fd"/>
      </linearGradient>
      <linearGradient id={`${p}gRidge`} gradientUnits="userSpaceOnUse" x1="650" y1="690" x2="740" y2="875">
      <stop offset="0" stopColor="#5fb6fc" stopOpacity=".9"/>
      <stop offset="1" stopColor="#5fb6fc" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id={`${p}gStripShade`} gradientUnits="userSpaceOnUse" x1="483" y1="600" x2="573" y2="652">
      <stop offset="0" stopColor="#041440" stopOpacity="0"/>
      <stop offset="1" stopColor="#041440" stopOpacity=".55"/>
      </linearGradient>
      <linearGradient id={`${p}gUnder`} gradientUnits="userSpaceOnUse" x1="720" y1="870" x2="1060" y2="1040">
      <stop offset="0" stopColor="#1c2b85"/>
      <stop offset=".3" stopColor="#3037d0"/>
      <stop offset=".6" stopColor="#4b36fa"/>
      <stop offset="1" stopColor="#9327fb"/>
      </linearGradient>
      <linearGradient id={`${p}gShade`} gradientUnits="userSpaceOnUse" x1="690" y1="900" x2="970" y2="960">
      <stop offset="0" stopColor="#101c66" stopOpacity=".75"/>
      <stop offset="1" stopColor="#101c66" stopOpacity="0"/>
      </linearGradient>
      </defs>
      <path fillRule="evenodd" fill={`url(#${p}gBack)`} d="M500 232C535 180 585 160 640 160C700 160 752 185 782 232L1112 772L1125 815L690 900L590 985L300 1060C195 1060 115 985 115 890C115 850 135 815 160 765Z M685 462L775 622C730 632 690 650 650 680C590 722 545 765 490 792Z"/>
      <path fillRule="evenodd" fill={`url(#${p}gBackR)`} d="M500 232C535 180 585 160 640 160C700 160 752 185 782 232L1112 772L1125 815L690 900L590 985L300 1060C195 1060 115 985 115 890C115 850 135 815 160 765Z M685 462L775 622C730 632 690 650 650 680C590 722 545 765 490 792Z"/>
      <path fill={`url(#${p}gRight)`} d="M610 375C640 325 685 303 725 303C790 303 850 345 892 412L1112 772L775 625L685 465C660 435 640 410 610 375Z"/>
      <path fill={`url(#${p}gRightH)`} d="M610 375C640 325 685 303 725 303C790 303 850 345 892 412L1112 772L775 625L685 465C660 435 640 410 610 375Z"/>
      <path fill={`url(#${p}gStrip)`} d="M610 375C640 410 665 435 685 465L490 792C440 835 370 868 297 873Z"/>
      <path fill={`url(#${p}gStripShade)`} d="M610 375C640 410 665 435 685 465L490 792C440 835 370 868 297 873Z"/>
      <path fill={`url(#${p}gWave)`} d="M152 800C160 840 200 872 290 874C370 872 440 840 490 792C560 740 620 690 690 650C740 625 800 615 850 615C960 615 1050 660 1112 772C1120 785 1124 800 1125 815C1090 800 1040 785 960 785C900 785 860 797 820 815C780 835 730 870 690 900L590 985C530 1030 470 1060 400 1060L300 1060C195 1060 115 985 115 890C115 850 130 825 152 800Z"/>
      <path mask={`url(#${p}mRidge)`} fill={`url(#${p}gRidge)`} d="M152 800C160 840 200 872 290 874C370 872 440 840 490 792C560 740 620 690 690 650C740 625 800 615 850 615C960 615 1050 660 1112 772C1120 785 1124 800 1125 815C1090 800 1040 785 960 785C900 785 860 797 820 815C780 835 730 870 690 900L590 985C530 1030 470 1060 400 1060L300 1060C195 1060 115 985 115 890C115 850 130 825 152 800Z"/>
      <path fill={`url(#${p}gUnder)`} d="M690 900C730 870 780 835 820 815C860 797 900 785 960 785C1040 785 1090 800 1125 815C1150 850 1160 880 1157 905C1150 985 1080 1060 990 1060C950 1060 920 1045 895 1030Z"/>
      <path fill={`url(#${p}gShade)`} d="M860 797C910 860 950 930 965 1000L965 1052C940 1050 915 1040 895 1028L690 900C750 850 810 815 860 797Z"/>
    </svg>
  );
}

/**
 * Mark + stacked wordmark: ALTRONIX over SOFT.
 * SOFT is one text node spaced with letter-spacing, not separate letter elements.
 * The links that wrap the logo carry the accessible name ("Altronixsoft — home").
 * The trailing negative margin cancels the spacing that CSS adds after the last letter.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="h-[38px] w-auto shrink-0" />
      <span className="flex flex-col gap-[5px] leading-none">
        <b className="text-[19px] font-extrabold tracking-[0.05em] text-white">ALTRONIX</b>
        <span className="mr-[-0.924em] block text-[8.5px] font-semibold tracking-[0.924em] text-[#bcd2f7]">
          SOFT
        </span>
      </span>
    </span>
  );
}
