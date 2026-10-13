"use client";

import { cn } from "cn";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MascotMark } from "@/components/brand/logo";
import { HERO_SANDWICH as HERO, SEEDS } from "@/lib/sandwich-data";

/**
 * Hero sandwich. On load a squeeze bottle drizzles the house sauce along the
 * real shape of the sauce (an SVG mask follows the drizzle path), then a
 * shaker sweeps over the top and every sesame seed falls into place.
 */

type Phase = "waiting" | "sauce" | "seeds" | "done";

const INK = "#1b1915";
const DRIZZLE_MS = 1700;
const SWEEP_MS = 1300;
const SHAKER_Y = -60;
const SAUCE_SRC = "/images/sandwich/hero-sauce.webp";

const seedXs = SEEDS.map((s) => s.x);
const SWEEP_FROM = Math.min(...seedXs) - 40;
const SWEEP_TO = Math.max(...seedXs) + 40;

/** Per-seed fall timing: released when the shaker passes over it. */
const seedTimings = SEEDS.map((seed) => {
  const startY = SHAKER_Y + 6 + seed.jitter * 10;
  const fall = seed.y - startY;
  const duration = Math.round(260 + Math.sqrt(Math.max(fall, 1)) * 22);
  const delay = Math.round(seed.order * SWEEP_MS + seed.jitter * 90);
  return { dx: (seed.jitter - 0.5) * 14, dy: startY - seed.y, duration, delay };
});
const SEEDS_TOTAL_MS = Math.max(...seedTimings.map((s) => s.delay + s.duration)) + 120;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function HeroSandwich({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [phase, setPhase] = useState<Phase>("waiting");
  const maskPathRef = useRef<SVGPathElement>(null);
  const bottleRef = useRef<SVGGElement>(null);
  const shakerRef = useRef<SVGGElement>(null);
  const shakeRef = useRef<SVGGElement>(null);

  // The whole sequence runs once, after the photo is in place. Phase changes
  // only toggle CSS; they must not restart (or cancel) this effect.
  useEffect(() => {
    if (!loaded) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }

    const path = maskPathRef.current;
    const bottle = bottleRef.current;
    const shaker = shakerRef.current;
    const shake = shakeRef.current;
    if (!path || !bottle || !shaker || !shake) return;

    const running: Animation[] = [];
    let cancelled = false;
    const play = (el: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = el.animate(keyframes, { fill: "forwards", ...options });
      running.push(animation);
      return animation.finished;
    };

    const sauceImage = new window.Image();
    sauceImage.src = SAUCE_SRC;

    const [x0, y0] = HERO.bottle[0];
    const along = HERO.bottle.map(([x, y, tilt]) => ({
      transform: `translate(${x}px, ${y}px) rotate(${14 + tilt}deg)`,
    }));
    const [xEnd, yEnd] = HERO.bottle[HERO.bottle.length - 1];

    (async () => {
      await sauceImage.decode().catch(() => undefined);
      if (cancelled) return;

      // 1 · the bottle swoops in
      await play(
        bottle,
        [
          { transform: `translate(${x0 + 160}px, ${y0 - 240}px) rotate(48deg)`, opacity: 0 },
          { transform: along[0].transform, opacity: 1 },
        ],
        { duration: 560, delay: 250, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
      );
      if (cancelled) return;

      // 2 · drizzle: mask stroke and nozzle share one timing so they stay glued
      setPhase("sauce");
      const easing = "cubic-bezier(0.42, 0, 0.58, 1)";
      await Promise.all([
        play(path, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: DRIZZLE_MS, easing }),
        play(bottle, along, { duration: DRIZZLE_MS, easing }),
      ]);
      if (cancelled) return;

      // 3 · bottle leaves, the shaker comes in
      setPhase("seeds");
      play(
        bottle,
        [
          { transform: along[along.length - 1].transform, opacity: 1 },
          { transform: `translate(${xEnd + 140}px, ${yEnd - 260}px) rotate(-20deg)`, opacity: 0 },
        ],
        { duration: 480, easing: "cubic-bezier(0.55, 0, 1, 0.45)" },
      );
      play(shake, [{ transform: "rotate(-14deg)" }, { transform: "rotate(14deg)" }], {
        duration: 110,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out",
      });
      await play(
        shaker,
        [
          { transform: `translate(${SWEEP_FROM - 120}px, ${SHAKER_Y - 160}px)`, opacity: 0 },
          { transform: `translate(${SWEEP_FROM}px, ${SHAKER_Y}px)`, opacity: 1 },
        ],
        { duration: 380, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
      );
      if (cancelled) return;
      await play(
        shaker,
        [{ transform: `translate(${SWEEP_FROM}px, ${SHAKER_Y}px)` }, { transform: `translate(${SWEEP_TO}px, ${SHAKER_Y}px)` }],
        { duration: SWEEP_MS, easing: "linear" },
      );
      if (cancelled) return;
      await play(
        shaker,
        [
          { transform: `translate(${SWEEP_TO}px, ${SHAKER_Y}px)`, opacity: 1 },
          { transform: `translate(${SWEEP_TO + 160}px, ${SHAKER_Y - 180}px)`, opacity: 0 },
        ],
        { duration: 420, easing: "cubic-bezier(0.55, 0, 1, 0.45)" },
      );
      await wait(Math.max(0, SEEDS_TOTAL_MS - SWEEP_MS - 420));
      if (!cancelled) setPhase("done");
    })().catch(() => {
      // animations are cancelled on unmount; nothing to recover
    });

    return () => {
      cancelled = true;
      running.forEach((animation) => animation.cancel());
    };
  }, [loaded]);

  return (
    <div
      data-phase={phase}
      className={cn("hero-sandwich @container relative", className)}
      style={{ aspectRatio: `${HERO.width} / ${HERO.height}` }}
    >
      <Image
        src="/images/sandwich/hero-stack.webp"
        alt="Sándwich Revueltos con pan brioche tostado, tocino, huevo revuelto, cebolla morada, lechuga y aguacate, servido en su empaque amarillo."
        fill
        sizes="(min-width: 1024px) 360px, 58vw"
        loading="eager"
        fetchPriority="high"
        className="object-contain"
        onLoad={() => setLoaded(true)}
      />

      <svg
        viewBox={`0 0 ${HERO.width} ${HERO.height}`}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <mask id="hero-sauce-mask" maskUnits="userSpaceOnUse" x={-80} y={-80} width={HERO.width + 160} height={HERO.height + 160}>
            <path
              ref={maskPathRef}
              d={HERO.saucePath}
              pathLength={1}
              fill="none"
              stroke="#fff"
              strokeWidth={96}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1 2"
              strokeDashoffset={1}
              className="hs-mask-path"
            />
            {HERO.drops.map((drop) => (
              <ellipse
                key={`${drop.cx}-${drop.cy}`}
                className="hs-drop"
                cx={drop.cx}
                cy={drop.cy}
                rx={drop.rx}
                ry={drop.ry}
                fill="#fff"
                style={{ "--drop-delay": `${Math.round(drop.t * DRIZZLE_MS)}ms` } as CSSProperties}
              />
            ))}
            <rect className="hs-fill" x={-80} y={-80} width={HERO.width + 160} height={HERO.height + 160} fill="#fff" />
          </mask>
        </defs>

        <image
          href={SAUCE_SRC}
          x={HERO.sauce.x}
          y={HERO.sauce.y}
          width={HERO.sauce.w}
          height={HERO.sauce.h}
          mask="url(#hero-sauce-mask)"
        />

        <g className="hs-seeds">
          {SEEDS.map((seed, i) => {
            const timing = seedTimings[i];
            return (
              <g
                key={i}
                className="hs-seed"
                data-miss={seed.miss ? "" : undefined}
                style={
                  {
                    "--dx": `${timing.dx.toFixed(1)}px`,
                    "--dy": `${timing.dy.toFixed(1)}px`,
                    "--dur": `${timing.duration}ms`,
                    "--delay": `${timing.delay}ms`,
                    "--spin": `${Math.round((seed.jitter - 0.5) * 240)}deg`,
                  } as CSSProperties
                }
              >
                <ellipse
                  cx={seed.x}
                  cy={seed.y}
                  rx={seed.rx}
                  ry={seed.ry}
                  transform={`rotate(${seed.rotate} ${seed.x} ${seed.y})`}
                  fill="#1d1712"
                />
                <ellipse cx={seed.x - seed.rx * 0.25} cy={seed.y - seed.ry * 0.35} rx={seed.rx * 0.35} ry={seed.ry * 0.25} fill="#fff" opacity="0.35" />
              </g>
            );
          })}
        </g>

        <g ref={bottleRef} opacity={0} className="hs-prop">
          <SauceBottle />
        </g>
        <g ref={shakerRef} opacity={0} className="hs-prop">
          <g ref={shakeRef} style={{ transformBox: "view-box", transformOrigin: "0 -58px" }}>
            <SeedShaker />
          </g>
        </g>
      </svg>

      {/* brand print on the wrapper */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[83.5%] left-[17%] flex w-[52%] -rotate-[5deg] flex-col items-center text-ink"
      >
        <span className="flex items-end font-display text-[9.6cqw] leading-none font-extrabold tracking-tight">
          Revuelt
          <MascotMark id="wrap" className="mx-[0.2cqw] mb-[0.6cqw] h-[10cqw] w-auto" />s
        </span>
        <span className="mt-[0.6cqw] font-display text-[2.6cqw] font-extrabold tracking-[0.18em] uppercase">
          Un desayuno de huevos
        </span>
      </div>
    </div>
  );
}

function SauceBottle() {
  return (
    <g transform="scale(1.75)">
      <path d="M-3 -1L3 -1L6.5 -20L-6.5 -20Z" fill="#fff8ec" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <rect x="-16" y="-36" width="32" height="17" rx="4" fill="#ee6a0b" stroke={INK} strokeWidth="3" />
      <rect x="-26" y="-128" width="52" height="94" rx="18" fill="#ff8f2e" stroke={INK} strokeWidth="3.4" />
      <rect x="-26" y="-100" width="52" height="36" fill="#fff8e6" stroke={INK} strokeWidth="3" />
      <ellipse cx="0" cy="-82" rx="8" ry="10" fill="#fddf3b" stroke={INK} strokeWidth="2.6" />
      <path d="M-15 -118V-106" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
    </g>
  );
}

function SeedShaker() {
  return (
    <g transform="scale(1.6)">
      <rect x="-19" y="-13" width="38" height="13" rx="4" fill="#d7dde3" stroke={INK} strokeWidth="3" />
      <g fill={INK}>
        <circle cx="-9" cy="-4.5" r="1.6" />
        <circle cx="0" cy="-4.5" r="1.6" />
        <circle cx="9" cy="-4.5" r="1.6" />
      </g>
      <path d="M-17 -13V-58Q-17 -68 -7 -68H7Q17 -68 17 -58V-13Z" fill="#fffdf7" stroke={INK} strokeWidth="3.2" strokeLinejoin="round" />
      <rect x="-17" y="-50" width="34" height="18" fill="#fddf3b" stroke={INK} strokeWidth="2.6" />
      <g fill="#1d1712">
        <ellipse cx="-8" cy="-22" rx="2.6" ry="1.6" transform="rotate(30 -8 -22)" />
        <ellipse cx="2" cy="-18" rx="2.6" ry="1.6" transform="rotate(-20 2 -18)" />
        <ellipse cx="9" cy="-24" rx="2.6" ry="1.6" transform="rotate(60 9 -24)" />
        <ellipse cx="-3" cy="-27" rx="2.6" ry="1.6" />
        <ellipse cx="-10" cy="-60" rx="2.4" ry="1.5" transform="rotate(-40 -10 -60)" />
      </g>
      <path d="M-11 -62V-54" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}
