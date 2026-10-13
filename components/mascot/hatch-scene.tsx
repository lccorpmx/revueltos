import { EASE, keyframes, motionSafe, o, r, rs, step, t, tr, ts } from "@/lib/timeline";
import {
  Body,
  Cap,
  Cheeks,
  Chick,
  EggProp,
  Eyes,
  EyesHeart,
  GroundShadow,
  Hand,
  Heart,
  INK,
  Legs,
  Limb,
  MascotDefs,
  MouthOpen,
  MouthSmile,
  ShellBottom,
  ShellTop,
} from "./parts";

/**
 * "¿Por qué Revueltos?" scene: the mascot holds up a sign and an egg. The egg
 * wobbles, cracks and a chick pops out, hops onto the cap and flies away…
 * then a fresh egg appears and the story starts again.
 */
const D = 8.4;
const EGG = [50, 146] as const; // egg center in the held hand
const CAP_SEAT = [84, 14] as const; // where the chick perches

const frames = [
  keyframes("ht-egg", D, [
    [0, `${rs(0, 1)};${o(1)}`],
    [1.1, rs(0, 1), EASE.inOut],
    [1.25, rs(-12, 1)],
    [1.4, rs(10, 1)],
    [1.55, rs(-9, 1)],
    [1.7, rs(8, 1)],
    [1.82, rs(-4, 1)],
    [1.95, rs(0, 1)],
    [2.05, rs(0, 1)],
    [2.12, rs(-7, 1)],
    [2.2, rs(6, 1)],
    ...step(2.32, `${rs(0, 1)};${o(1)}`, `${rs(0, 0.2)};${o(0)}`),
    ...step(7.5, `${rs(0, 0.2)};${o(0)}`, `${rs(0, 0.2)};${o(1)}`, EASE.snap),
    [7.75, `${rs(0, 1)};${o(1)}`],
    [D, `${rs(0, 1)};${o(1)}`],
  ]),
  keyframes("ht-crackline", D, [[0, o(0)], ...step(2.0, o(0), o(1)), ...step(2.32, o(1), o(0)), [D, o(0)]]),
  keyframes("ht-shell", D, [[0, o(0)], ...step(2.32, o(0), o(1)), [7.3, o(1)], [7.5, o(0)], [D, o(0)]]),
  keyframes("ht-lid", D, [
    [0, `${tr(0, 0, 0)};${o(0)}`],
    ...step(2.32, `${tr(0, 0, 0)};${o(0)}`, `${tr(0, 0, 0)};${o(1)}`, EASE.out),
    [2.62, `${tr(-26, -46, -140)};${o(1)}`, EASE.in],
    [2.95, `${tr(-48, -10, -260)};${o(0)}`],
    [D, `${tr(0, 0, 0)};${o(0)}`],
  ]),
  // chick: x (linear) / y (eased) / squash
  keyframes("ht-cx", D, [
    [0, t(EGG[0], 0)],
    [4.5, t(EGG[0], 0), EASE.linear],
    [5.05, t(CAP_SEAT[0], 0)],
    [6.55, t(CAP_SEAT[0], 0), EASE.in],
    [7.25, t(CAP_SEAT[0] + 120, 0)],
    [D, t(EGG[0], 0)],
  ]),
  keyframes("ht-cy", D, [
    [0, t(0, EGG[1] + 6)],
    [2.3, t(0, EGG[1] + 6), EASE.snap],
    [2.55, t(0, EGG[1] - 12)],
    [4.5, t(0, EGG[1] - 12), EASE.up],
    [4.78, t(0, -30), EASE.down],
    [5.05, t(0, CAP_SEAT[1])],
    [6.55, t(0, CAP_SEAT[1]), EASE.out],
    [7.25, t(0, CAP_SEAT[1] - 130)],
    [D, t(0, EGG[1] + 6)],
  ]),
  keyframes("ht-chick", D, [
    [0, `${ts(0, 0, 0.4)};${o(0)}`],
    ...step(2.3, `${ts(0, 0, 0.4)};${o(0)}`, `${ts(0, 0, 0.4)};${o(1)}`, EASE.snap),
    [2.55, `${ts(0, 0, 1)};${o(1)}`],
    [3.0, `${ts(0, 0, 1)};${o(1)}`],
    [3.12, `${ts(0, 1, 1.1, 0.9)};${o(1)}`],
    [3.26, `${ts(0, 0, 1)};${o(1)}`],
    [4.42, `${ts(0, 0, 1)};${o(1)}`],
    [4.5, `${ts(0, 2, 1.12, 0.86)};${o(1)}`],
    [4.6, `${ts(0, 0, 0.94, 1.08)};${o(1)}`],
    [5.05, `${ts(0, 0, 1)};${o(1)}`],
    [5.12, `${ts(0, 2, 1.12, 0.86)};${o(1)}`],
    [5.26, `${ts(0, 0, 1)};${o(1)}`],
    [5.8, `${ts(0, 0, 1)};${o(1)}`],
    [5.9, `${ts(0, 1, 1.08, 0.92)};${o(1)}`],
    [6.0, `${ts(0, 0, 1)};${o(1)}`],
    [6.9, `${ts(0, 0, 1)};${o(1)}`],
    [7.25, `${ts(0, 0, 0.7)};${o(0)}`],
    [D, `${ts(0, 0, 0.4)};${o(0)}`],
  ]),
  keyframes("ht-wing", D, [
    [0, r(0)],
    [6.5, r(0)],
    [6.58, r(-40)],
    [6.66, r(10)],
    [6.74, r(-40)],
    [6.82, r(10)],
    [6.9, r(-40)],
    [6.98, r(10)],
    [7.06, r(-40)],
    [7.14, r(10)],
    [7.25, r(0)],
    [D, r(0)],
  ]),
  keyframes("ht-pio", D, [
    [0, `transform:scale(0);${o(0)}`],
    [2.55, `transform:scale(0);${o(0)}`, EASE.snap],
    [2.7, `transform:scale(1);${o(1)}`],
    [3.5, `transform:scale(1);${o(1)}`],
    [3.65, `transform:scale(0.6);${o(0)}`],
    [D, `transform:scale(0);${o(0)}`],
  ]),
  keyframes("ht-pio2", D, [
    [0, `transform:scale(0);${o(0)}`],
    [5.3, `transform:scale(0);${o(0)}`, EASE.snap],
    [5.45, `transform:scale(1);${o(1)}`],
    [6.25, `transform:scale(1);${o(1)}`],
    [6.4, `transform:scale(0.6);${o(0)}`],
    [D, `transform:scale(0);${o(0)}`],
  ]),
  keyframes("ht-hearts", D, [
    [0, `${t(0, 0)};${o(0)}`],
    [2.7, `${t(0, 0)};${o(0)}`, EASE.out],
    [2.9, `${t(0, -6)};${o(1)}`],
    [4.0, `${t(0, -40)};${o(0)}`],
    [D, `${t(0, 0)};${o(0)}`],
  ]),
  keyframes("ht-look", D, [
    [0, t(-3, 3)],
    [1.1, t(-3, 3)],
    [1.2, t(-4, 4)],
    [2.3, t(-4, 4), EASE.out],
    [2.5, t(-3, 0)],
    [4.5, t(-3, 0), EASE.inOut],
    [4.85, t(-1.5, -5)],
    [5.05, t(-2, -6)],
    [6.55, t(-2, -6), EASE.inOut],
    [7.0, t(3, -6)],
    [7.4, t(-3, 3)],
    [D, t(-3, 3)],
  ]),
  keyframes("ht-eyes", D, [[0, o(1)], ...step(2.62, o(1), o(0)), ...step(4.3, o(0), o(1)), [D, o(1)]]),
  keyframes("ht-heart-eyes", D, [[0, o(0)], ...step(2.62, o(0), o(1)), ...step(4.3, o(1), o(0)), [D, o(0)]]),
  keyframes("ht-smile", D, [[0, o(1)], ...step(2.62, o(1), o(0)), ...step(4.3, o(0), o(1)), [D, o(1)]]),
  keyframes("ht-open", D, [[0, o(0)], ...step(2.62, o(0), o(1)), ...step(4.3, o(1), o(0)), [D, o(0)]]),
  keyframes("ht-sign", D, [
    [0, r(0)],
    [D / 4, r(3)],
    [D / 2, r(0)],
    [(3 * D) / 4, r(-3)],
    [D, r(0)],
  ]),
  keyframes("ht-poof", D, [
    [0, `transform:scale(0.2);${o(0)}`],
    [7.42, `transform:scale(0.2);${o(0)}`, EASE.out],
    [7.55, `transform:scale(1.1);${o(1)}`],
    [7.85, `transform:scale(1.4);${o(0)}`],
    [D, `transform:scale(0.2);${o(0)}`],
  ]),
];

const names = [
  "ht-egg",
  "ht-crackline",
  "ht-shell",
  "ht-lid",
  "ht-cx",
  "ht-cy",
  "ht-chick",
  "ht-wing",
  "ht-pio",
  "ht-pio2",
  "ht-hearts",
  "ht-look",
  "ht-eyes",
  "ht-heart-eyes",
  "ht-smile",
  "ht-open",
  "ht-sign",
  "ht-poof",
];
const CSS =
  frames.join("") +
  motionSafe(
    ".scene-hatch .ht-chick,.scene-hatch .ht-pio,.scene-hatch .ht-pio2,.scene-hatch .ht-poof{transform-box:fill-box;transform-origin:50% 100%}" +
      ".scene-hatch .ht-poof{transform-origin:50% 50%}" +
      names.map((n) => `.scene-hatch .${n}{animation:${n} ${D}s infinite both}`).join(""),
  );

const pivot = { transformBox: "view-box", transformOrigin: "0 0" } as const;

export function HatchScene({ className, signLines }: { className?: string; signLines: string[] }) {
  return (
    <>
      <style href="scene-hatch" precedence="default">
        {CSS}
      </style>
      <svg
        viewBox="-24 -70 290 320"
        className={`scene-hatch overflow-visible ${className ?? ""}`}
        role="img"
        aria-label={`Huevito con gorra sosteniendo un letrero que dice "${signLines.join(" ")}". En su otra mano un huevo se rompe y sale un pollito.`}
      >
        <MascotDefs id="ht" />
        <GroundShadow />
        <g>
          <Legs />
          <Body id="ht" />

          {/* sign, held up with the far arm */}
          <g transform="translate(176 108)">
            <g className="ht-sign" style={pivot}>
              <rect x="-3" y="-64" width="6" height="74" rx="2" fill="#d98a3a" stroke={INK} strokeWidth="3" />
              <g transform="rotate(5 26 -96)">
                <rect x="-14" y="-152" width="84" height="96" rx="4" fill="#fffdf7" stroke={INK} strokeWidth="3.6" />
                <text
                  x="28"
                  y="-130"
                  textAnchor="middle"
                  fontSize="13.5"
                  fill={INK}
                  style={{ fontFamily: "var(--font-gochi), cursive" }}
                >
                  {signLines.map((line, i) => (
                    <tspan key={line} x="28" dy={i === 0 ? 0 : 16}>
                      {line}
                    </tspan>
                  ))}
                </text>
                <Heart transform="translate(52 -66)" size={0.55} fill="#ffcf2e" />
              </g>
            </g>
          </g>
          <g transform="translate(165 142)">
            <Limb d="M0 0Q14 -14 11 -28" />
            <Hand x={11} y={-32} />
          </g>

          <Cheeks />
          <g className="ht-look" style={pivot}>
            <g className="ht-eyes">
              <Eyes blinkClassName="m-blink" />
            </g>
          </g>
          <EyesHeart className="ht-heart-eyes" opacity={0} />
          <MouthSmile className="ht-smile" />
          <MouthOpen className="ht-open" opacity={0} />
          <Cap id="ht" />

          {/* floating hearts */}
          <g className="ht-hearts" opacity={0}>
            <Heart transform="translate(24 104) rotate(-14)" size={0.8} />
            <Heart transform="translate(6 126) rotate(10)" size={0.55} fill="#ffcf2e" />
          </g>

          {/* egg hand */}
          <g transform={`translate(${EGG[0]} ${EGG[1]})`}>
            <g className="ht-shell" opacity={0}>
              <g transform="translate(0 4)">
                <ShellBottom id="ht" />
              </g>
            </g>
            <g className="ht-egg" style={{ transformBox: "view-box", transformOrigin: "0 12px" }}>
              <EggProp id="ht" />
              <path
                className="ht-crackline"
                opacity={0}
                d="M-12 0L-7 -4L-3 1L1 -4L5 1L9 -4L12 -1"
                fill="none"
                stroke={INK}
                strokeWidth="2.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </g>
            <g className="ht-lid" opacity={0} style={pivot}>
              <ShellTop id="ht" />
            </g>
            <g className="ht-poof" opacity={0}>
              <circle cx="-9" cy="-4" r="7" fill="#fff" stroke={INK} strokeWidth="2.4" />
              <circle cx="6" cy="-9" r="8" fill="#fff" stroke={INK} strokeWidth="2.4" />
              <circle cx="9" cy="4" r="6" fill="#fff" stroke={INK} strokeWidth="2.4" />
            </g>
          </g>
          <g transform="translate(35 142)">
            <Limb d="M0 0Q-10 18 13 22" />
            <Hand x={15} y={20} />
          </g>
        </g>

        {/* the chick lives outside the body so it can fly away */}
        <g className="ht-cx" style={pivot}>
          <g className="ht-cy" style={pivot}>
            <g className="ht-chick" opacity={0}>
              <g transform="scale(1.3)">
                <Chick />
              </g>
              <g transform="translate(12 -3)">
                <path
                  className="ht-wing"
                  style={pivot}
                  d="M0 0Q10 -8 13 3Q8 8 0 5Z"
                  fill="#ffd23a"
                  stroke={INK}
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
              </g>
            </g>
            <g transform="translate(-14 -64)">
              <g className="ht-pio" opacity={0}>
                <SpeechBubble text="¡pío!" />
              </g>
              <g className="ht-pio2" opacity={0}>
                <SpeechBubble text="¡pío pío!" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </>
  );
}

/** Speech bubble whose tail (bottom-right) points at the origin + (8, 33). */
function SpeechBubble({ text }: { text: string }) {
  const w = 14 + text.length * 7.4;
  return (
    <g transform={`translate(${-w} 0)`}>
      <path
        d={`M0 0H${w}a8 8 0 0 1 8 8v8a8 8 0 0 1 -8 8H${w - 6}l6 9 -14 -9H0a8 8 0 0 1 -8 -8v-8a8 8 0 0 1 8 -8Z`}
        fill="#fff"
        stroke={INK}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <text
        x={w / 2}
        y="17.5"
        textAnchor="middle"
        fontSize="15"
        fill={INK}
        style={{ fontFamily: "var(--font-gochi), cursive" }}
      >
        {text}
      </text>
    </g>
  );
}
