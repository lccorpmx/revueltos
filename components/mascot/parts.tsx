import type { CSSProperties, ReactNode, SVGProps } from "react";
import { preload } from "react-dom";
import { MASCOT } from "./rig";

/**
 * Building blocks for the Revueltos mascot, faithful to the reference art:
 * body and cap are raster layers cut from it, while face, arms and legs are
 * vector (traced from the same art) so scenes can pose and animate them.
 * All parts share the mascot space defined in ./rig.
 */

export const INK = "#0d0b09";
const LINE = { stroke: INK, strokeLinecap: "round", strokeLinejoin: "round" } as const;

type G = SVGProps<SVGGElement>;
type Pt = readonly [number, number];

/** CSS transforms on these groups pivot on (x, y) in mascot space. */
export const pivotAt = (x: number, y: number): CSSProperties => ({
  transformBox: "view-box",
  transformOrigin: `${x}px ${y}px`,
});
export const pivot: CSSProperties = { transformBox: "view-box", transformOrigin: "0 0" };

export function MascotDefs({ id }: { id: string }) {
  // The hero mascot is above the fold: start fetching its layers early.
  preload(MASCOT.body.href, { as: "image" });
  preload(MASCOT.cap.href, { as: "image" });
  return (
    <defs>
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

export function GroundShadow({ rx = 66, ...props }: G & { rx?: number }) {
  return (
    <g {...props}>
      <ellipse cx="98" cy="236" rx={rx} ry="7" fill="#000" opacity="0.13" />
    </g>
  );
}

export function Body() {
  const b = MASCOT.body;
  return <image href={b.href} x={b.x} y={b.y} width={b.width} height={b.height} />;
}

/** The backwards cap. Animate the wrapper (it pivots near the brim). */
export function Cap({ className, style }: { className?: string; style?: CSSProperties }) {
  const c = MASCOT.cap;
  return (
    <g className={className} style={style}>
      <image href={c.href} x={c.x} y={c.y} width={c.width} height={c.height} />
    </g>
  );
}

/** Traced legs; pass classes to animate each one around its hip. */
export function Legs({ leftClassName, rightClassName }: { leftClassName?: string; rightClassName?: string }) {
  const { hipL, hipR } = MASCOT.anchors;
  return (
    <g fill={INK}>
      <g className={leftClassName} style={pivotAt(hipL[0], hipL[1])}>
        <path d={MASCOT.paths.legL} />
      </g>
      <g className={rightClassName} style={pivotAt(hipR[0], hipR[1])}>
        <path d={MASCOT.paths.legR} />
      </g>
    </g>
  );
}

/** Reference pose: right arm waving. Rotates around the right shoulder. */
export function ArmWave({ className }: { className?: string }) {
  const [x, y] = MASCOT.anchors.shoulderR;
  return (
    <g className={className} style={pivotAt(x, y)}>
      <path d={MASCOT.paths.armWave} fill={INK} />
    </g>
  );
}

/** Reference pose: left hand resting on the hip. */
export function ArmHip(props: G) {
  return (
    <g {...props}>
      <path d={MASCOT.paths.armHip} fill={INK} />
    </g>
  );
}

/** Stick arm drawn from a shoulder pivot at (0,0). */
export function Limb({ d }: { d: string }) {
  return <path d={d} fill="none" strokeWidth={MASCOT.armWidth} {...LINE} />;
}

export type HandPose = "mitten" | "open";

/**
 * Cartoon hand with the wrist on (x, y) and the fingers along `angle`
 * (0 = pointing right). The thumb sits on the -y side; `flip` mirrors it.
 */
export function Hand({
  x = 0,
  y = 0,
  angle = 0,
  pose = "mitten",
  flip = false,
}: {
  x?: number;
  y?: number;
  angle?: number;
  pose?: HandPose;
  flip?: boolean;
}) {
  return (
    <g fill={INK} transform={`translate(${x} ${y}) rotate(${angle})${flip ? " scale(1 -1)" : ""}`}>
      <path d="M0 0H3" strokeWidth={MASCOT.armWidth} {...LINE} />
      {pose === "open" ? (
        <>
          <ellipse cx={6} cy={0.6} rx={5.2} ry={5} />
          <path d="M7 -1.4L12.8 -5.2M8 0.6L14.6 0.7M7 2.6L12.2 5.9" fill="none" strokeWidth={5} {...LINE} />
          <path d="M4.4 -2L5 -7.6" fill="none" strokeWidth={4.6} {...LINE} />
        </>
      ) : (
        <>
          <ellipse cx={8.6} cy={0.8} rx={7} ry={5.9} />
          <ellipse cx={6.6} cy={-5.5} rx={4.1} ry={2.4} transform="rotate(-58 6.6 -5.5)" />
        </>
      )}
    </g>
  );
}

/**
 * Stick arm from a shoulder pivot at (0,0), curving through `via` to the
 * wrist at `to`. The hand follows the arm's direction, plus `twist` degrees.
 */
export function Arm({
  via,
  to,
  hand,
  twist = 0,
  flip,
}: {
  via: Pt;
  to: Pt;
  hand?: HandPose;
  twist?: number;
  flip?: boolean;
}) {
  const angle = (Math.atan2(to[1] - via[1], to[0] - via[0]) * 180) / Math.PI + twist;
  return (
    <>
      <Limb d={`M0 0Q${via[0]} ${via[1]} ${to[0]} ${to[1]}`} />
      <Hand x={to[0]} y={to[1]} angle={Math.round(angle * 10) / 10} pose={hand} flip={flip} />
    </>
  );
}

/* ——— Face (local frame: origin between the eyes, tilted like the art) ——— */

const F = MASCOT.face;

export function FaceFrame({ children }: { children: ReactNode }) {
  return <g transform={`translate(${F.origin[0]} ${F.origin[1]}) rotate(${F.tilt})`}>{children}</g>;
}

/** Converts a point of the face frame to mascot space (for props near the face). */
export function facePoint([x, y]: Pt): Pt {
  const a = (F.tilt * Math.PI) / 180;
  return [F.origin[0] + x * Math.cos(a) - y * Math.sin(a), F.origin[1] + x * Math.sin(a) + y * Math.cos(a)];
}

export function Eyes({ blinkClassName, wide = false }: { blinkClassName?: string; wide?: boolean }) {
  const k = wide ? 1.25 : 1;
  return (
    <g fill={INK}>
      {[-F.eye.x, F.eye.x].map((cx) => (
        <g key={cx} className={blinkClassName}>
          <ellipse cx={cx} cy={0} rx={F.eye.rx * k} ry={F.eye.ry * k} />
        </g>
      ))}
    </g>
  );
}

/** Happy closed eyes "^ ^". */
export function EyesHappy(props: G) {
  return (
    <g fill="none" strokeWidth={3.2} {...LINE} {...props}>
      {[-F.eye.x, F.eye.x].map((cx) => (
        <path key={cx} d={`M${cx - 5.5} 2.5Q${cx} -5.5 ${cx + 5.5} 2.5`} />
      ))}
    </g>
  );
}

/** Squeezed eyes "> <". */
export function EyesSqueeze(props: G) {
  const x = F.eye.x;
  return (
    <g fill="none" strokeWidth={3.2} {...LINE} {...props}>
      <path d={`M${-x - 5} -5L${-x + 4} 0L${-x - 5} 5`} />
      <path d={`M${x + 5} -5L${x - 4} 0L${x + 5} 5`} />
    </g>
  );
}

export function EyesHeart(props: G) {
  return (
    <g {...props}>
      {[-F.eye.x, F.eye.x].map((cx) => (
        <path
          key={cx}
          d={`M${cx} 7C${cx - 11} 0 ${cx - 8} -9 ${cx - 3} -7C${cx - 1} -6 ${cx} -4.5 ${cx} -3.5C${cx} -4.5 ${cx + 1} -6 ${cx + 3} -7C${cx + 8} -9 ${cx + 11} 0 ${cx} 7Z`}
          fill="#ff5d5d"
          strokeWidth={2.2}
          {...LINE}
        />
      ))}
    </g>
  );
}

/** Wink: left eye closed, right eye open. */
export function EyesWink({ blinkClassName, ...props }: G & { blinkClassName?: string }) {
  const x = F.eye.x;
  return (
    <g {...props}>
      <path d={`M${-x - 5.5} 1.5Q${-x} -5 ${-x + 5.5} 1.5`} fill="none" strokeWidth={3.2} {...LINE} />
      <g className={blinkClassName}>
        <ellipse cx={x} cy={0} rx={F.eye.rx} ry={F.eye.ry} fill={INK} />
      </g>
    </g>
  );
}

export function MouthSmile(props: G) {
  return (
    <g {...props}>
      <path d={F.smile} fill="none" strokeWidth={F.smileWidth} {...LINE} />
    </g>
  );
}

export function MouthOpen(props: G) {
  return (
    <g {...props}>
      <path d="M-8 7Q0.8 23 9.5 7Z" fill="#7d2411" strokeWidth={2.8} {...LINE} />
      <path d="M-3.5 13.6Q0.8 10.6 5 13.6Q0.8 17.4 -3.5 13.6Z" fill="#ff7b6b" />
    </g>
  );
}

export function MouthO(props: G) {
  return (
    <g {...props}>
      <ellipse cx={0.8} cy={11} rx={4.3} ry={5.4} fill="#7d2411" strokeWidth={2.8} {...LINE} />
    </g>
  );
}

export function MouthWobble(props: G) {
  return (
    <g {...props}>
      <path d="M-8 10Q-4 6 0.5 10Q5 14 9.5 10" fill="none" strokeWidth={3.2} {...LINE} />
    </g>
  );
}

export function Cheeks(props: G) {
  return (
    <g fill="#fc9011" {...props}>
      <ellipse cx={F.cheekL.x} cy={F.cheekL.y} rx={F.cheekL.rx} ry={F.cheekL.ry} />
      <ellipse cx={F.cheekR.x} cy={F.cheekR.y} rx={F.cheekR.rx} ry={F.cheekR.ry} />
    </g>
  );
}

/* ——— Props ——— */

/** A whole raw egg centered on (0,0). */
export function EggProp({ id, scale = 1 }: { id: string; scale?: number }) {
  return (
    <g transform={scale === 1 ? undefined : `scale(${scale})`}>
      <path
        d="M0 -14.5C8.5 -14.5 12.5 -4 12.5 3C12.5 10.5 7 14.5 0 14.5C-7 14.5 -12.5 10.5 -12.5 3C-12.5 -4 -8.5 -14.5 0 -14.5Z"
        fill={`url(#${id}-egg)`}
        strokeWidth="3"
        {...LINE}
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
      strokeWidth="3"
      {...LINE}
    />
  );
}

export function ShellTop({ id }: { id: string }) {
  return (
    <path
      d="M-12.5 -1C-12.5 -6 -8.5 -14.5 0 -14.5C8.5 -14.5 12.5 -6 12.5 -1L8 -5L4 0L0 -5L-4 0L-8 -5Z"
      fill={`url(#${id}-egg)`}
      strokeWidth="3"
      {...LINE}
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
        {...LINE}
      />
      <ellipse cx="1" cy="-3" rx="10" ry="6.4" fill={`url(#${id}-yolk)`} strokeWidth="3" {...LINE} />
      <ellipse cx="-2.5" cy="-5" rx="3" ry="1.6" fill="#fff" opacity="0.85" />
    </g>
  );
}

export function Chick() {
  return (
    <g>
      <path d="M-11 -2C-11 -12 -5 -18 1 -18C8 -18 12 -12 12 -4C12 4 7 8 0 8C-7 8 -11 5 -11 -2Z" fill="#fde047" strokeWidth="2.6" {...LINE} />
      <path d="M-1 -18Q0 -24 3 -22M1 -18Q4 -23 6 -20" fill="none" strokeWidth="2.2" {...LINE} />
      <circle cx="-3" cy="-9" r="2" fill={INK} />
      <circle cx="5.5" cy="-9" r="2" fill={INK} />
      <path d="M-0.5 -6L1.5 -2.5L3.5 -6Z" fill="#ff8a1f" strokeWidth="1.6" {...LINE} />
      <ellipse cx="-7.5" cy="-4" rx="2.4" ry="1.4" fill="#fc9011" opacity="0.8" />
      <ellipse cx="10" cy="-4" rx="2.2" ry="1.4" fill="#fc9011" opacity="0.8" />
      <path d="M-10 -1Q-15 -4 -14 2" fill="#facc15" strokeWidth="2.2" {...LINE} />
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
        strokeWidth={2.4 / size}
        {...LINE}
      />
    </g>
  );
}

export function SweatDrop(props: G) {
  return (
    <g {...props}>
      <path d="M0 -9C3 -4 6 0 6 3.5C6 7 3.4 9 0 9C-3.4 9 -6 7 -6 3.5C-6 0 -3 -4 0 -9Z" fill="#8fd3ff" strokeWidth="2.4" {...LINE} />
      <ellipse cx="-2" cy="3" rx="1.2" ry="2" fill="#fff" />
    </g>
  );
}

/** Reference pose (waving, hand on hip): the mascot exactly as drawn. */
export function MascotPose({ id, waveClassName }: { id: string; waveClassName?: string }) {
  return (
    <g>
      <MascotDefs id={id} />
      <Legs />
      <Body />
      <ArmHip />
      <ArmWave className={waveClassName} />
      <FaceFrame>
        <Cheeks />
        <Eyes blinkClassName="m-blink" />
        <MouthSmile />
      </FaceFrame>
      <Cap />
    </g>
  );
}
