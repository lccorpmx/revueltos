/**
 * Tiny helpers to author looping CSS choreographies in seconds instead of
 * hand-computed percentages. Every part of a scene shares the same cycle, so
 * they stay in sync without any JavaScript at runtime.
 */
export type Keyframe = readonly [seconds: number, css: string, easing?: string];

export function keyframes(name: string, cycle: number, frames: readonly Keyframe[]) {
  const body = frames
    .map(([seconds, css, easing]) => {
      const pct = Math.min(100, Math.max(0, (seconds / cycle) * 100));
      const timing = easing ? `;animation-timing-function:${easing}` : "";
      return `${+pct.toFixed(3)}%{${css}${timing}}`;
    })
    .join("");
  return `@keyframes ${name}{${body}}`;
}

/** Instant switch between two values (used for opacity swaps). The optional
 *  easing applies to the segment that starts right after the switch. */
export function step(seconds: number, from: string, to: string, easing?: string): Keyframe[] {
  return [
    [seconds, from],
    [seconds + 0.001, to, easing],
  ];
}

export const t = (x: number, y: number) => `transform:translate(${x}px,${y}px)`;
export const r = (deg: number) => `transform:rotate(${deg}deg)`;
export const tr = (x: number, y: number, deg: number) =>
  `transform:translate(${x}px,${y}px) rotate(${deg}deg)`;
export const ts = (x: number, y: number, sx: number, sy = sx) =>
  `transform:translate(${x}px,${y}px) scale(${sx},${sy})`;
export const rs = (deg: number, scale: number) => `transform:rotate(${deg}deg) scale(${scale})`;
export const o = (value: number) => `opacity:${value}`;

export const EASE = {
  /** Thrown objects decelerate on the way up… */
  up: "cubic-bezier(0.33,0.66,0.66,1)",
  /** …and accelerate on the way down. */
  down: "cubic-bezier(0.33,0,0.66,0.33)",
  inOut: "cubic-bezier(0.45,0,0.55,1)",
  out: "cubic-bezier(0.2,0.8,0.2,1)",
  in: "cubic-bezier(0.55,0,1,0.45)",
  snap: "cubic-bezier(0.3,1.6,0.5,1)",
  linear: "linear",
} as const;

/** Wraps scene rules so reduced-motion users get the static pose. */
export function motionSafe(rules: string) {
  return `@media (prefers-reduced-motion:no-preference){${rules}}`;
}
