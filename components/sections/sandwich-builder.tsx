"use client";

import { cn } from "cn";
import { Check } from "lucide-react";
import {
  backOut,
  domAnimation,
  LazyMotion,
  m,
  motionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { ScooterIcon } from "@/components/brand/icons";
import { Sparks } from "@/components/decor/doodles";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { formatPrice } from "@/lib/menu";
import {
  HERO_SANDWICH,
  SANDWICH_CANVAS as CANVAS,
  SANDWICH_LAYERS,
  SEEDS,
  type SandwichLayerName,
} from "@/lib/sandwich-data";
import { linkProps, siteConfig } from "@/lib/site";

/**
 * "Capa por capa": the exploded sandwich photo assembles itself as you scroll.
 * Each topping is its own cut-out layer that drops onto the stack inside a
 * slice of the scroll progress; the sesame seeds rain in individually.
 *
 * Uses the lightweight `m` component + LazyMotion(domAnimation) instead of
 * the full `motion` bundle: only scroll-linked styles are needed here.
 */

type Topping = {
  label: string;
  detail: string;
  layer?: Exclude<SandwichLayerName, "base" | "bits">;
  /** Progress window in which this topping lands. */
  range?: [number, number];
};

const INGREDIENTS: Topping[] = [
  { label: "Pan brioche dorado", detail: "a la plancha, crujiente por fuera" },
  { label: "Tocino crujiente", detail: "doradito, como debe ser" },
  { label: "Huevo revuelto cremoso", detail: "recién hecho, nunca de bolsa" },
  { label: "Cebolla morada", detail: "en plumitas", layer: "onion", range: [0.1, 0.24] },
  { label: "Lechuga fresca", detail: "crujiente y bien verde", layer: "lettuce", range: [0.2, 0.38] },
  { label: "Aguacate", detail: "en cubos, en su punto", layer: "avocado", range: [0.34, 0.52] },
  { label: "Aderezo de la casa", detail: "cremoso con chipotle", layer: "sauce", range: [0.48, 0.66] },
  { label: "Ajonjolí negro", detail: "el toque final", range: [0.62, 0.86] },
];
const SEEDS_RANGE = INGREDIENTS[7].range!;
const DONE_AT = 0.88;
const PRICE = 85;

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

export function SandwichBuilder() {
  const reduce = usePrefersReducedMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      {reduce ? <BuilderLayout progress={STATIC_DONE} staticMode /> : <ScrollBuilder />}
    </LazyMotion>
  );
}

const STATIC_DONE = motionValue(1);

function ScrollBuilder() {
  const trackRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.35 });
  return <BuilderLayout progress={progress} trackRef={trackRef} />;
}

function BuilderLayout({
  progress,
  trackRef,
  staticMode = false,
}: {
  progress: MotionValue<number>;
  trackRef?: RefObject<HTMLElement | null>;
  staticMode?: boolean;
}) {
  const [landed, setLanded] = useState(() => countLanded(progress.get()));
  useMotionValueEvent(progress, "change", (value) => {
    const next = countLanded(value);
    setLanded((current) => (current === next ? current : next));
  });
  const done = landed === INGREDIENTS.length;

  return (
    <section
      ref={trackRef}
      id="capa-por-capa"
      aria-labelledby="builder-title"
      className={cn("relative overflow-x-clip bg-butter", staticMode ? "py-20" : "h-[300svh]")}
    >
      <div className={cn(!staticMode && "sticky top-0 flex h-svh items-center overflow-hidden")}>
        <BackdropWord />
        <div className="container-page relative grid w-full grid-cols-[minmax(0,1fr)] items-center gap-4 pt-[calc(var(--header-h)+0.5rem)] pb-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10 lg:pt-(--header-h)">
          <div className="relative z-10">
            <p className="flex items-center gap-2 font-display text-sm font-extrabold tracking-[0.16em] text-orange-ink uppercase">
              <Sparks className="size-6 -scale-x-100" />
              Capa por capa
            </p>
            <h2 id="builder-title" className="display-heavy mt-2 text-[clamp(2rem,3.9vw,3.25rem)] text-ink">
              Así se arma un <span className="text-orange-deep">Ahuevo Toast</span>
            </h2>
            <p className="mt-4 hidden max-w-md text-lg leading-relaxed text-ink-soft sm:block">
              Baja despacito y míralo armarse: cada ingrediente cae justo en su lugar, como en nuestra cocina.
            </p>

            {/* desktop: full checklist */}
            <ol className="sr-only gap-2 lg:not-sr-only lg:mt-8 lg:grid" aria-label="Ingredientes">
              {INGREDIENTS.map((item, i) => {
                const isDone = i < landed;
                const isCurrent = i === landed;
                return (
                  <li
                    key={item.label}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3 py-1.5 transition-all duration-300",
                      isCurrent && "bg-white/80 shadow-[0_4px_0_0_rgb(0_0_0/0.06)]",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full border-2 font-display text-sm font-extrabold transition-colors duration-300",
                        isDone && "border-ink bg-sun text-ink",
                        isCurrent && "border-ink bg-white text-ink",
                        !isDone && !isCurrent && "border-dashed border-muted-foreground/60 bg-transparent text-muted-foreground",
                      )}
                    >
                      {isDone ? <Check className="size-4" strokeWidth={3.5} aria-hidden="true" /> : i + 1}
                    </span>
                    <span className="leading-tight">
                      <span
                        className={cn(
                          "block font-display text-[1.05rem] font-extrabold transition-colors duration-300",
                          isDone || isCurrent ? "text-ink" : "text-muted-foreground",
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="text-sm text-muted-foreground [@media(max-height:820px)]:sr-only">{item.detail}</span>
                    </span>
                    <span className="sr-only">{isDone ? "(listo)" : ""}</span>
                  </li>
                );
              })}
            </ol>

            <div
              className={cn(
                "mt-8 hidden items-center gap-4 transition-all duration-500 lg:flex",
                done ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
              )}
            >
              <Button asChild variant="ink" size="pill" tabIndex={done ? undefined : -1}>
                <a {...linkProps(siteConfig.links.order)}>
                  <ScooterIcon className="size-5 text-sun" />
                  Pídelo ya · {formatPrice(PRICE)}
                </a>
              </Button>
            </div>
          </div>

          <Stage progress={progress} />
        </div>
      </div>
    </section>
  );
}

function countLanded(value: number) {
  let count = 3; // bread, bacon and egg are the base
  for (const item of INGREDIENTS.slice(3)) if (item.range && value >= item.range[1] - 0.02) count++;
  return count;
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  const bitsOpacity = useTransform(progress, [0.04, 0.5], [1, 0]);
  const bitsScale = useTransform(progress, [0.04, 0.5], [1, 0.8]);
  const settle = useTransform(progress, [0.84, 0.9, 0.95], [1, 1.035, 1]);
  const badgeScale = useTransform(progress, [DONE_AT, DONE_AT + 0.05], [0, 1], { ease: backOut });

  const seedsRef = useRef<SVGSVGElement>(null);
  const seedProgress = useTransform(progress, SEEDS_RANGE, [0, 1]);
  useMotionValueEvent(seedProgress, "change", (value) => {
    seedsRef.current?.style.setProperty("--p", value.toFixed(4));
  });
  useEffect(() => {
    seedsRef.current?.style.setProperty("--p", seedProgress.get().toFixed(4));
  }, [seedProgress]);

  return (
    <div
      className="relative flex h-[min(56svh,560px,calc((100vw-2.5rem)*1.25))] justify-center lg:h-[min(84svh,760px)]"
      aria-hidden="true"
    >
      <div className="absolute inset-x-[-12%] top-[18%] bottom-[2%] rounded-full bg-[radial-gradient(closest-side,#fddf3b_0%,#fddf3b99_45%,transparent_100%)]" />
      <m.div
        className="relative h-full"
        style={{ aspectRatio: `${CANVAS.width} / ${CANVAS.height}`, scale: settle, transformOrigin: "50% 90%" }}
      >
        <m.div
          className="absolute"
          style={{ ...boxStyle("bits"), opacity: bitsOpacity, scale: bitsScale, transformOrigin: "49% 60%" }}
        >
          <LayerImage name="bits" />
        </m.div>
        <div className="absolute" style={boxStyle("base")}>
          <LayerImage name="base" />
        </div>
        {INGREDIENTS.filter((item) => item.layer).map((item) => (
          <ToppingLayer key={item.layer} name={item.layer!} range={item.range!} progress={progress} />
        ))}

        <svg
          ref={seedsRef}
          viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
          className="builder-seeds absolute inset-0 h-full w-full overflow-visible"
        >
          {SEEDS.map((seed, i) => {
            const x = seed.x + HERO_SANDWICH.offsetX;
            const y = seed.y + HERO_SANDWICH.offsetY;
            return (
              <g
                key={i}
                className="builder-seed"
                data-miss={seed.miss ? "" : undefined}
                style={
                  {
                    "--fx": `${(seed.fromX - seed.x).toFixed(1)}px`,
                    "--fy": `${(seed.fromY - seed.y).toFixed(1)}px`,
                    "--o": (seed.order * 0.3 + seed.jitter * 0.08).toFixed(3),
                  } as CSSProperties
                }
              >
                <ellipse cx={x} cy={y} rx={seed.rx} ry={seed.ry} transform={`rotate(${seed.rotate} ${x} ${y})`} fill="#1d1712" />
              </g>
            );
          })}
        </svg>

        <m.div
          className="absolute top-[10%] right-[2%] grid aspect-square w-[24%] place-items-center rounded-full border-[3px] border-ink bg-sun text-center shadow-[0_6px_0_0_rgb(0_0_0/0.12)]"
          style={{ scale: badgeScale, rotate: 12 }}
        >
          <span className="font-display leading-none font-extrabold text-ink">
            <span className="block text-[clamp(0.8rem,1.6vw,1.2rem)]">¡Listo!</span>
            <span className="block text-[clamp(1.1rem,2.4vw,1.9rem)]">{formatPrice(PRICE)}</span>
          </span>
        </m.div>
      </m.div>
    </div>
  );
}

function boxStyle(name: SandwichLayerName): CSSProperties {
  const box = SANDWICH_LAYERS[name];
  return {
    left: pct(box.x, CANVAS.width),
    top: pct(box.y, CANVAS.height),
    width: pct(box.w, CANVAS.width),
    height: pct(box.h, CANVAS.height),
  };
}

/** Rendered width ≈ stage width × the layer's share of the canvas. */
function layerSizes(name: SandwichLayerName) {
  const share = SANDWICH_LAYERS[name].w / CANVAS.width;
  return `(min-width: 1024px) ${Math.round(610 * share)}px, ${Math.round(90 * share)}vw`;
}

function LayerImage({ name }: { name: SandwichLayerName }) {
  return (
    <Image
      src={`/images/sandwich/layer-${name}.webp`}
      alt=""
      fill
      sizes={layerSizes(name)}
      className="object-contain select-none"
      draggable={false}
    />
  );
}

function ToppingLayer({
  name,
  range,
  progress,
}: {
  name: SandwichLayerName;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const box = SANDWICH_LAYERS[name];
  const y = useTransform(progress, range, ["0%", `${(box.dy / box.h) * 100}%`], { ease: backOut });
  return (
    <m.div className="absolute" style={{ ...boxStyle(name), y }}>
      <LayerImage name={name} />
    </m.div>
  );
}

/** Giant outlined word behind the stage. */
function BackdropWord() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[24vw] leading-none font-extrabold text-transparent select-none [-webkit-text-stroke:2px_rgb(238_106_11/0.16)]"
    >
      ¡AHUEVO!
    </span>
  );
}
