import { cn } from "cn";
import { Body, Cap, Cheeks, Eyes, Hand, Legs, Limb, MascotDefs, MouthSmile } from "@/components/mascot/parts";

/** Full-body mascot used as the brand mark (header, footer, favicon-like). */
export function MascotMark({ className, id = "mark" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="-6 12 216 230" className={className} aria-hidden="true">
      <MascotDefs id={id} />
      <Legs />
      <Body id={id} />
      <g transform="translate(35 142)">
        <Limb d="M0 0Q-12 12 -16 26" />
        <Hand x={-17} y={29} flip />
      </g>
      <Cheeks />
      <Eyes blinkClassName="m-blink" />
      <MouthSmile />
      <Cap id={id} />
      <g transform="translate(165 142)">
        <g className="origin-[0_0] [transform-box:view-box] group-hover:animate-[logo-wave_0.9s_ease-in-out]">
          <Limb d="M0 0Q14 -12 16 -30" />
          <Hand x={17} y={-34} />
        </g>
      </g>
    </svg>
  );
}

export function Logo({
  tone = "ink",
  withTagline = false,
  className,
}: {
  tone?: "ink" | "white";
  withTagline?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("group inline-flex items-center gap-2", className)}>
      <MascotMark
        id={`mark-${tone}`}
        className="h-11 w-auto shrink-0 transition-transform duration-300 ease-(--ease-squish) group-hover:-translate-y-0.5 group-hover:-rotate-6 sm:h-12"
      />
      <span className={cn("flex flex-col", tone === "white" ? "text-white" : "text-ink")}>
        <span className="display-heavy text-[1.55rem] leading-none tracking-tight sm:text-[1.8rem]">Revueltos</span>
        {withTagline && (
          <span className="mt-1 font-display text-[0.62rem] font-bold tracking-[0.14em] uppercase">
            Un desayuno de huevos
          </span>
        )}
      </span>
    </span>
  );
}
