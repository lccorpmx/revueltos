import { cn } from "cn";
import { MascotPose } from "@/components/mascot/parts";

/** The mascot exactly as in the reference art (logo, wrapper print). */
export function MascotMark({ className, id = "mark" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="-8 30 226 212" className={className} aria-hidden="true">
      <MascotPose id={id} waveClassName="group-hover:animate-[logo-wave_0.9s_ease-in-out]" />
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
