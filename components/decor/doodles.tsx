import { cn } from "cn";
import type { SVGProps } from "react";

type SvgProps = SVGProps<SVGSVGElement>;

const WAVES = {
  a: "M0 48C110 18 236 12 360 34S600 80 726 62 944 12 1080 20 1328 66 1440 50V100H0Z",
  b: "M0 64C140 78 262 34 404 28S640 64 782 66 1006 22 1150 18 1376 44 1440 40V100H0Z",
  c: "M0 34C120 56 250 72 380 58S620 12 760 16 1010 66 1160 62 1380 26 1440 30V100H0Z",
} as const;

/** Organic section edge. Fill comes from `currentColor`. */
export function Wave({
  variant = "a",
  flip = false,
  className,
}: {
  variant?: keyof typeof WAVES;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("pointer-events-none block h-10 w-full sm:h-14 lg:h-16", flip && "-scale-y-100", className)}
    >
      <path d={WAVES[variant]} fill="currentColor" />
    </svg>
  );
}

/** Orange marker stroke that draws itself under a word. */
export function Underline({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 300 26" fill="none" preserveAspectRatio="none" aria-hidden="true" className={cn("text-orange", className)} {...props}>
      <path
        d="M5 15C62 8 122 6 180 9C222 11 262 14 295 11"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        className="animate-draw [animation-delay:var(--draw-delay,350ms)]"
      />
      <path
        d="M24 20C86 15 156 14 236 18"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
        pathLength={1}
        strokeDasharray="1"
        className="animate-draw [animation-delay:var(--draw-delay,350ms)]"
      />
    </svg>
  );
}

/** Three little strokes radiating from a corner ("¡pum!"). */
export function Sparks({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={cn("text-orange", className)} {...props}>
      <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
        <path d="M5 24L14 25" />
        <path d="M8 10L16 16" />
        <path d="M21 3L23 12" />
      </g>
    </svg>
  );
}

export function Slashes({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className={cn("text-orange", className)} {...props}>
      <g stroke="currentColor" strokeLinecap="round">
        <path d="M24 84L58 10" strokeWidth="14" />
        <path d="M70 94L112 44" strokeWidth="11" />
      </g>
    </svg>
  );
}

/** Outline doodle of a fried egg (menu background). */
export function FriedEggDoodle({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={cn("text-sun-deep", className)} {...props}>
      <path
        d="M50 7C69 5 86 16 90 33C95 48 92 67 79 79C67 92 43 95 28 86C12 77 5 59 9 43C13 25 30 9 50 7Z"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <circle cx="52" cy="49" r="14" fill="#fddf3b" stroke="currentColor" strokeWidth="4" />
      <path d="M46 43C47 40 50 38 53 38" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M74 70C70 76 64 80 58 81" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

/** Filled, slightly crispy fried egg. */
export function FriedEgg({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 110" fill="none" aria-hidden="true" className={className} {...props}>
      <defs>
        <radialGradient id="fried-yolk" cx="38%" cy="34%" r="70%">
          <stop offset="0" stopColor="#ffe270" />
          <stop offset="0.6" stopColor="#ffbe1f" />
          <stop offset="1" stopColor="#f59a0c" />
        </radialGradient>
      </defs>
      <path
        d="M60 6C82 4 104 16 110 38C116 58 108 82 90 94C72 106 42 108 24 96C8 85 2 64 8 44C14 22 36 8 60 6Z"
        fill="#fffdf6"
        stroke="#e9a54a"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M60 6C82 4 104 16 110 38C116 58 108 82 90 94C72 106 42 108 24 96C8 85 2 64 8 44C14 22 36 8 60 6Z"
        stroke="#1b1915"
        strokeWidth="2.6"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <circle cx="62" cy="54" r="22" fill="url(#fried-yolk)" stroke="#1b1915" strokeWidth="2.6" />
      <ellipse cx="54" cy="45" rx="7" ry="4.5" fill="#fff" opacity="0.8" transform="rotate(-24 54 45)" />
      <path d="M22 70C26 80 34 86 44 88" stroke="#ecdcbc" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/** Hand-drawn curvy arrow pointing down-left by default. */
export function HandArrow({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 60 80" fill="none" aria-hidden="true" className={className} {...props}>
      <g stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M48 6C30 16 22 34 24 54C25 60 26 66 28 72" />
        <path d="M16 60L28 73L38 60" />
      </g>
    </svg>
  );
}

export function HeartDoodle({ className, filled = false, ...props }: SvgProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 40 36" fill="none" aria-hidden="true" className={className} {...props}>
      <path
        d="M20 33C6 24 2 15 4 9C6 3 14 1 19 7C19.5 7.6 20 8.4 20 9C20.6 8 21.2 7.3 22 6.6C27 1.6 35 3.8 36 10C37 16 32 25 20 33Z"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}

/** Short white "shine" strokes used around the mascots. */
export function Shine({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className={cn("text-white", className)} {...props}>
      <g stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <path d="M8 40L26 30" />
        <path d="M14 54L30 48" />
      </g>
    </svg>
  );
}
