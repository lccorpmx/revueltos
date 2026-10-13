import type { SVGProps } from "react";

/**
 * Building blocks for the Revueltos egg mascot. All parts share one local
 * coordinate system (body centered at x=100, feet on y≈232) so scenes can
 * compose and animate them with plain CSS transforms.
 */

export const INK = "#1b1915";
const OUTLINE = { stroke: INK, strokeLinecap: "round", strokeLinejoin: "round" } as const;

type G = SVGProps<SVGGElement>;

export function MascotDefs({ id }: { id: string }) {
  return (
    <defs>
      <radialGradient id={`${id}-body`} cx="36%" cy="30%" r="78%">
        <stop offset="0" stopColor="#fff3a3" />
        <stop offset="0.36" stopColor="#ffe24a" />
        <stop offset="0.72" stopColor="#ffca20" />
        <stop offset="1" stopColor="#f3a20b" />
      </radialGradient>
      <linearGradient id={`${id}-cap`} x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0" stopColor="#ffe866" />
        <stop offset="1" stopColor="#ffc41d" />
      </linearGradient>
      <linearGradient id={`${id}-brim`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffd83c" />
        <stop offset="1" stopColor="#f0ac0d" />
      </linearGradient>
      <radialGradient id={`${id}-egg`} cx="38%" cy="32%" r="75%">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.7" stopColor="#fff8ea" />
        <stop offset="1" stopColor="#f1e2c4" />
      </radialGradient>
      <radialGradient id={`${id}-yolk`} cx="40%" cy="35%" r="70%">
        <stop offset="0" stopColor="#ffd45a" />
        <stop offset="1" stopColor="#ff9f0f" />
      </radialGradient>
    </defs>
  );
}

export function GroundShadow({ rx = 58, ...props }: G & { rx?: number }) {
  return (
    <g {...props}>
      <ellipse cx="100" cy="234" rx={rx} ry="7.5" fill="#000" opacity="0.13" />
    </g>
  );
}

export function Body({ id }: { id: string }) {
  return (
    <g>
      <path
        d="M100 40C138 40 168 92 168 134C168 174 138 200 100 200C62 200 32 174 32 134C32 92 62 40 100 40Z"
        fill={`url(#${id}-body)`}
        strokeWidth="5"
        {...OUTLINE}
      />
      <path d="M62 184C82 197 122 198 144 181" fill="none" stroke="#e48c08" strokeWidth="6" strokeLinecap="round" opacity="0.32" />
      <path d="M53 116C51 96 59 78 71 66" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity="0.75" />
      <circle cx="55" cy="132" r="3.6" fill="#fff" opacity="0.8" />
    </g>
  );
}

/** Backwards snapback cap. The outer group holds the static tilt so the
 *  inner one can be animated freely. */
export function Cap({ id, className }: { id: string; className?: string }) {
  return (
    <g transform="rotate(-9 100 70)">
      <g className={className}>
        <path
          d="M44 92C40 56 70 26 104 26C138 26 160 52 158 88C128 98 76 100 44 92Z"
          fill={`url(#${id}-cap)`}
          strokeWidth="5"
          {...OUTLINE}
        />
        <path d="M114 86C113 70 139 64 145 81Z" fill="#e7a10a" strokeWidth="4" {...OUTLINE} />
        <path d="M102 31C94 47 89 65 89 91" fill="none" strokeWidth="3.4" {...OUTLINE} />
        <circle cx="103" cy="27.5" r="5.4" fill="#ffd93d" strokeWidth="4" {...OUTLINE} />
        <path
          d="M50 86C33 81 12 86 7 98C4 106 19 109 38 105C51 102 58 95 50 86Z"
          fill={`url(#${id}-brim)`}
          strokeWidth="5"
          {...OUTLINE}
        />
        <path d="M60 56C67 44 80 36 93 34" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.65" />
      </g>
    </g>
  );
}

/** Both eyes. `blinkClassName` should scale around each eye's own box. */
export function Eyes({ blinkClassName, wide = false }: { blinkClassName?: string; wide?: boolean }) {
  const ry = wide ? 11 : 9.2;
  const rx = wide ? 8.4 : 7;
  return (
    <g>
      {[84, 117].map((cx) => (
        <g key={cx} className={blinkClassName}>
          <ellipse cx={cx} cy="128" rx={rx} ry={ry} fill={INK} />
          <circle cx={cx + 2.5} cy={124.2} r={wide ? 3.1 : 2.6} fill="#fff" />
        </g>
      ))}
    </g>
  );
}

/** Happy closed eyes "^ ^" (used when proud or when winking with both). */
export function EyesHappy(props: G) {
  return (
    <g {...props}>
      <path d="M77 130Q84 121 91 130" fill="none" strokeWidth="4.2" {...OUTLINE} />
      <path d="M110 130Q117 121 124 130" fill="none" strokeWidth="4.2" {...OUTLINE} />
    </g>
  );
}

/** Squeezed eyes "> <" for scared reactions. */
export function EyesSqueeze(props: G) {
  return (
    <g {...props}>
      <path d="M78 122L90 128L78 134" fill="none" strokeWidth="4" {...OUTLINE} />
      <path d="M123 122L111 128L123 134" fill="none" strokeWidth="4" {...OUTLINE} />
    </g>
  );
}

export function EyesHeart(props: G) {
  return (
    <g {...props}>
      {[84, 117].map((cx) => (
        <path
          key={cx}
          d={`M${cx} 136C${cx - 12} 128 ${cx - 9} 118 ${cx - 3} 120C${cx - 1} 121 ${cx} 123 ${cx} 124C${cx} 123 ${cx + 1} 121 ${cx + 3} 120C${cx + 9} 118 ${cx + 12} 128 ${cx} 136Z`}
          fill="#ff5d5d"
          strokeWidth="2.6"
          {...OUTLINE}
        />
      ))}
    </g>
  );
}

export function MouthSmile(props: G) {
  return (
    <g {...props}>
      <path d="M91 146Q100.5 155 110 146" fill="none" strokeWidth="4.2" {...OUTLINE} />
    </g>
  );
}

export function MouthOpen(props: G) {
  return (
    <g {...props}>
      <path d="M89 144Q100.5 164 112 144Z" fill="#7d2411" strokeWidth="3.6" {...OUTLINE} />
      <path d="M95 154Q100.5 150 106 154Q100.5 159 95 154Z" fill="#ff7b6b" />
    </g>
  );
}

export function MouthO(props: G) {
  return (
    <g {...props}>
      <ellipse cx="100.5" cy="151" rx="5.4" ry="6.8" fill="#7d2411" strokeWidth="3.4" {...OUTLINE} />
    </g>
  );
}

export function MouthWobble(props: G) {
  return (
    <g {...props}>
      <path d="M90 150Q95 145 100 150Q105 155 111 150" fill="none" strokeWidth="4" {...OUTLINE} />
    </g>
  );
}

export function Cheeks(props: G) {
  return (
    <g {...props}>
      <ellipse cx="68" cy="146" rx="9" ry="5.4" fill="#ff8a4c" opacity="0.55" />
      <ellipse cx="133" cy="146" rx="9" ry="5.4" fill="#ff8a4c" opacity="0.55" />
    </g>
  );
}

/** Stick arm/leg drawn from a pivot at (0,0). */
export function Limb({ d }: { d: string }) {
  return <path d={d} fill="none" strokeWidth="5" {...OUTLINE} />;
}

/** Little mitten: a palm with a thumb bump. */
export function Hand({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  const s = flip ? -1 : 1;
  return (
    <g>
      <circle cx={x + 6.5 * s} cy={y - 5.5} r="4" fill="#ffd23a" strokeWidth="3.4" {...OUTLINE} />
      <circle cx={x} cy={y} r="9" fill="#ffd83c" strokeWidth="4" {...OUTLINE} />
      <path d={`M${x - 3.5 * s} ${y - 3.5}Q${x - 1 * s} ${y - 6} ${x + 2 * s} ${y - 5.5}`} fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
    </g>
  );
}

export function Legs() {
  return (
    <g>
      <Limb d="M86 196L82 226" />
      <Limb d="M114 196L118 226" />
      <ellipse cx="77" cy="229" rx="11.5" ry="6.6" fill={INK} />
      <ellipse cx="123" cy="229" rx="11.5" ry="6.6" fill={INK} />
      <ellipse cx="73" cy="226.5" rx="3.5" ry="1.8" fill="#fff" opacity="0.35" />
      <ellipse cx="119" cy="226.5" rx="3.5" ry="1.8" fill="#fff" opacity="0.35" />
    </g>
  );
}

/** A whole raw egg centered on (0,0). */
export function EggProp({ id, scale = 1 }: { id: string; scale?: number }) {
  return (
    <g transform={scale === 1 ? undefined : `scale(${scale})`}>
      <path
        d="M0 -14.5C8.5 -14.5 12.5 -4 12.5 3C12.5 10.5 7 14.5 0 14.5C-7 14.5 -12.5 10.5 -12.5 3C-12.5 -4 -8.5 -14.5 0 -14.5Z"
        fill={`url(#${id}-egg)`}
        strokeWidth="3.4"
        {...OUTLINE}
      />
      <ellipse cx="-4.5" cy="-5" rx="2.6" ry="4.4" fill="#fff" transform="rotate(18 -4.5 -5)" />
    </g>
  );
}

/** Bottom half of a cracked shell (zig-zag rim), centered on (0,0). */
export function ShellBottom({ id }: { id: string }) {
  return (
    <path
      d="M-12.5 -1L-8 -5L-4 0L0 -5L4 0L8 -5L12.5 -1C12.5 8 7 14.5 0 14.5C-7 14.5 -12.5 8 -12.5 -1Z"
      fill={`url(#${id}-egg)`}
      strokeWidth="3.2"
      {...OUTLINE}
    />
  );
}

export function ShellTop({ id }: { id: string }) {
  return (
    <path
      d="M-12.5 -1C-12.5 -6 -8.5 -14.5 0 -14.5C8.5 -14.5 12.5 -6 12.5 -1L8 -5L4 0L0 -5L-4 0L-8 -5Z"
      fill={`url(#${id}-egg)`}
      strokeWidth="3.2"
      {...OUTLINE}
    />
  );
}

/** Broken egg on the floor; origin = impact point. */
export function SplatPuddle({ id }: { id: string }) {
  return (
    <g>
      <path
        d="M-34 0C-36 -7 -20 -11 -8 -9C2 -13 24 -11 32 -4C38 2 24 7 8 7C-6 9 -32 7 -34 0Z"
        fill="#fffdf6"
        strokeWidth="3"
        {...OUTLINE}
      />
      <ellipse cx="1" cy="-3" rx="10" ry="6.4" fill={`url(#${id}-yolk)`} strokeWidth="3" {...OUTLINE} />
      <ellipse cx="-2.5" cy="-5" rx="3" ry="1.6" fill="#fff" opacity="0.85" />
    </g>
  );
}

export function Chick() {
  return (
    <g>
      <path d="M-11 -2C-11 -12 -5 -18 1 -18C8 -18 12 -12 12 -4C12 4 7 8 0 8C-7 8 -11 5 -11 -2Z" fill="#ffe14d" strokeWidth="3" {...OUTLINE} />
      <path d="M-1 -18Q0 -24 3 -22M1 -18Q4 -23 6 -20" fill="none" strokeWidth="2.4" {...OUTLINE} />
      <circle cx="-3" cy="-9" r="2" fill={INK} />
      <circle cx="5.5" cy="-9" r="2" fill={INK} />
      <circle cx="-2.4" cy="-9.7" r="0.7" fill="#fff" />
      <circle cx="6.1" cy="-9.7" r="0.7" fill="#fff" />
      <path d="M-0.5 -6L1.5 -2.5L3.5 -6Z" fill="#ff8a1f" strokeWidth="1.8" {...OUTLINE} />
      <ellipse cx="-7.5" cy="-4" rx="2.4" ry="1.4" fill="#ff8a4c" opacity="0.6" />
      <ellipse cx="10" cy="-4" rx="2.2" ry="1.4" fill="#ff8a4c" opacity="0.6" />
      <path d="M-10 -1Q-15 -4 -14 2" fill="#ffd83c" strokeWidth="2.4" {...OUTLINE} />
    </g>
  );
}

export function Heart({ size = 1, fill = "#ff6a5c", ...props }: G & { size?: number; fill?: string }) {
  return (
    <g {...props}>
      <path
        transform={`scale(${size})`}
        d="M0 8C-11 1 -10 -8 -4 -8C-2 -8 -0.5 -6.5 0 -5C0.5 -6.5 2 -8 4 -8C10 -8 11 1 0 8Z"
        fill={fill}
        strokeWidth={2.6 / size}
        {...OUTLINE}
      />
    </g>
  );
}

export function SweatDrop(props: G) {
  return (
    <g {...props}>
      <path d="M0 -9C3 -4 6 0 6 3.5C6 7 3.4 9 0 9C-3.4 9 -6 7 -6 3.5C-6 0 -3 -4 0 -9Z" fill="#8fd3ff" strokeWidth="2.6" {...OUTLINE} />
      <ellipse cx="-2" cy="3" rx="1.2" ry="2" fill="#fff" />
    </g>
  );
}
