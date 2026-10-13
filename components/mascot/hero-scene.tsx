import { EASE, keyframes, motionSafe, o, r, step, t, tr, ts } from "@/lib/timeline";
import {
  Body,
  Cap,
  Cheeks,
  EggProp,
  Eyes,
  EyesSqueeze,
  GroundShadow,
  Hand,
  INK,
  Legs,
  Limb,
  MascotDefs,
  MouthO,
  MouthOpen,
  MouthSmile,
  ShellBottom,
  ShellTop,
  SplatPuddle,
  SweatDrop,
} from "./parts";

/**
 * Hero scene: "El Malabarista" tosses an egg, catches it twice, misses the
 * third toss (¡crack!) and pulls a fresh one out of his cap. "El Mirón", a
 * smaller egg, follows every throw with his eyes and reacts to the crash.
 *
 * Coordinates are in each mascot's local space (see ./parts).
 */
const D = 9.6;

// Right hand / held egg geometry (juggler local space).
const SHOULDER_R = [165, 142] as const;
const SHOULDER_L = [35, 142] as const;
const HELD = [194, 134] as const; // held egg center at rest
const RELEASE = [186.1, 120.6] as const; // held egg center with the arm at -30°
const RELEASE_BIG = [182.1, 117.2] as const; // …and at -40°
const IMPACT = [232, 219] as const;

const juggler = [
  keyframes("jg-arm", D, [
    [0, r(0)],
    [0.4, r(0), EASE.inOut],
    [0.62, r(14), EASE.in],
    [0.74, r(-30), EASE.out],
    [0.95, r(-22), EASE.inOut],
    [1.35, r(0)],
    [1.9, r(0), EASE.out],
    [2.0, r(9), EASE.inOut],
    [2.22, r(0)],
    [2.5, r(0), EASE.inOut],
    [2.72, r(14), EASE.in],
    [2.84, r(-30), EASE.out],
    [3.05, r(-22), EASE.inOut],
    [3.45, r(0)],
    [4.0, r(0), EASE.out],
    [4.1, r(9), EASE.inOut],
    [4.32, r(0)],
    [4.6, r(0), EASE.inOut],
    [4.84, r(18), EASE.in],
    [4.96, r(-40), EASE.out],
    [5.2, r(-28), EASE.inOut],
    [5.6, r(-8)],
    [6.05, r(-8), EASE.out],
    [6.3, r(32), EASE.inOut],
    [6.55, r(24), EASE.inOut],
    [7.0, r(0)],
    [8.42, r(0), EASE.out],
    [8.5, r(7), EASE.inOut],
    [8.68, r(0)],
    [D, r(0)],
  ]),
  keyframes("jg-arm-l", D, [
    [0, r(0)],
    [7.38, r(0), EASE.inOut],
    [7.62, r(165), EASE.out],
    [7.8, r(172)],
    [8.2, r(172), EASE.inOut],
    [8.46, r(0)],
    [D, r(0)],
  ]),
  keyframes("jg-body", D, [
    [0, tr(0, 0, 0)],
    [4.04, tr(0, 0, 0), EASE.out],
    [4.18, tr(0, -7, 0), EASE.in],
    [4.32, tr(0, 0, 0)],
    [5.95, tr(0, 0, 0), EASE.out],
    [6.3, tr(0, 0, 7), EASE.inOut],
    [6.7, tr(0, 0, 5), EASE.inOut],
    [7.1, tr(0, 0, 0)],
    [D, tr(0, 0, 0)],
  ]),
  keyframes("jg-held", D, [
    [0, o(1)],
    ...step(0.74, o(1), o(0)),
    ...step(1.9, o(0), o(1)),
    ...step(2.84, o(1), o(0)),
    ...step(4.0, o(0), o(1)),
    ...step(4.96, o(1), o(0)),
    ...step(8.45, o(0), o(1)),
    [D, o(1)],
  ]),
  keyframes("jg-fly", D, [
    [0, o(0)],
    ...step(0.74, o(0), o(1)),
    ...step(1.9, o(1), o(0)),
    ...step(2.84, o(0), o(1)),
    ...step(4.0, o(1), o(0)),
    ...step(4.96, o(0), o(1)),
    ...step(6.52, o(1), o(0)),
    [D, o(0)],
  ]),
  keyframes("jg-fx", D, [
    [0, t(RELEASE[0], 0)],
    [0.74, t(RELEASE[0], 0), EASE.linear],
    [1.9, t(HELD[0], 0)],
    [2.84, t(RELEASE[0], 0), EASE.linear],
    [4.0, t(HELD[0], 0)],
    [4.96, t(RELEASE_BIG[0], 0), EASE.linear],
    [6.52, t(IMPACT[0], 0)],
    [D, t(IMPACT[0], 0)],
  ]),
  keyframes("jg-fy", D, [
    [0, t(0, RELEASE[1])],
    [0.74, t(0, RELEASE[1]), EASE.up],
    [1.32, t(0, 6), EASE.down],
    [1.9, t(0, HELD[1])],
    [2.84, t(0, RELEASE[1]), EASE.up],
    [3.42, t(0, -10), EASE.down],
    [4.0, t(0, HELD[1])],
    [4.96, t(0, RELEASE_BIG[1]), EASE.up],
    [5.7, t(0, -92), EASE.down],
    [6.52, t(0, IMPACT[1])],
    [D, t(0, IMPACT[1])],
  ]),
  keyframes("jg-fr", D, [
    [0, r(-30)],
    [0.74, r(-30), EASE.linear],
    [1.9, r(360)],
    [2.84, r(-30), EASE.linear],
    [4.0, r(720)],
    [4.96, r(-40), EASE.linear],
    [6.52, r(560)],
    [D, r(560)],
  ]),
  keyframes("jg-look", D, [
    [0, t(2.5, 1)],
    [0.74, t(2.5, 0), EASE.up],
    [1.32, t(1.5, -4.5), EASE.down],
    [1.9, t(2.5, 1)],
    [2.84, t(2.5, 0), EASE.up],
    [3.42, t(1.5, -5), EASE.down],
    [4.0, t(2.5, 1)],
    [4.96, t(2.5, 0), EASE.up],
    [5.7, t(2, -5.5), EASE.down],
    [6.3, t(4, 1)],
    [6.52, t(4, 4)],
    [7.4, t(4, 4), EASE.inOut],
    [7.7, t(-1, -3.5)],
    [8.1, t(1.5, -4)],
    [8.45, t(2.5, 1)],
    [D, t(2.5, 1)],
  ]),
  keyframes("jg-wide", D, [
    [0, "transform:scale(1)"],
    [6.5, "transform:scale(1)", EASE.snap],
    [6.62, "transform:scale(1.3)"],
    [7.4, "transform:scale(1.3)", EASE.inOut],
    [7.62, "transform:scale(1)"],
    [D, "transform:scale(1)"],
  ]),
  keyframes("jg-smile", D, [
    [0, o(1)],
    ...step(4.0, o(1), o(0)),
    ...step(4.7, o(0), o(1)),
    ...step(6.52, o(1), o(0)),
    ...step(7.75, o(0), o(1)),
    ...step(8.45, o(1), o(0)),
    ...step(9.05, o(0), o(1)),
    [D, o(1)],
  ]),
  keyframes("jg-open", D, [
    [0, o(0)],
    ...step(4.0, o(0), o(1)),
    ...step(4.7, o(1), o(0)),
    ...step(8.45, o(0), o(1)),
    ...step(9.05, o(1), o(0)),
    [D, o(0)],
  ]),
  keyframes("jg-o", D, [[0, o(0)], ...step(6.52, o(0), o(1)), ...step(7.75, o(1), o(0)), [D, o(0)]]),
  keyframes("jg-sweat", D, [
    [0, `${t(0, 0)};${o(0)}`],
    [6.75, `${t(0, 0)};${o(0)}`],
    [6.85, `${t(0, 1)};${o(1)}`],
    [7.55, `${t(0, 11)};${o(1)}`],
    [7.75, `${t(0, 13)};${o(0)}`],
    [D, `${t(0, 0)};${o(0)}`],
  ]),
  keyframes("jg-splat", D, [
    [0, `${ts(0, 0, 0.2)};${o(0)}`],
    [6.52, `${ts(0, 0, 0.4)};${o(0)}`],
    [6.521, `${ts(0, 0, 0.4)};${o(1)}`, EASE.out],
    [6.62, `${ts(0, 0, 1.18, 0.85)};${o(1)}`, EASE.inOut],
    [6.76, `${ts(0, 0, 0.95, 1.05)};${o(1)}`, EASE.inOut],
    [6.88, `${ts(0, 0, 1)};${o(1)}`],
    [8.7, `${ts(0, 0, 1)};${o(1)}`],
    [9.25, `${ts(0, 0, 1)};${o(0)}`],
    [D, `${ts(0, 0, 0.2)};${o(0)}`],
  ]),
  keyframes("jg-shell-l", D, [
    [0, tr(-4, -8, 0)],
    [6.52, tr(-4, -8, 0), EASE.up],
    [6.72, tr(-24, -26, -50), EASE.down],
    [6.95, tr(-31, -7, -95)],
    [D, tr(-31, -7, -95)],
  ]),
  keyframes("jg-shell-r", D, [
    [0, tr(4, -8, 0)],
    [6.52, tr(4, -8, 0), EASE.up],
    [6.72, tr(22, -30, 40), EASE.down],
    [6.95, tr(31, -9, 100)],
    [D, tr(31, -9, 100)],
  ]),
  keyframes("jg-crack", D, [
    [0, `transform:scale(0.3) rotate(-8deg);${o(0)}`],
    [6.52, `transform:scale(0.3) rotate(-8deg);${o(0)}`, EASE.snap],
    [6.64, `transform:scale(1.2) rotate(-8deg);${o(1)}`],
    [6.78, `transform:scale(1) rotate(-8deg);${o(1)}`],
    [7.35, `transform:scale(1) rotate(-8deg);${o(1)}`],
    [7.6, `transform:scale(0.85) rotate(-8deg);${o(0)}`],
    [D, `transform:scale(0.3) rotate(-8deg);${o(0)}`],
  ]),
  keyframes("jg-cap", D, [
    [0, tr(0, 0, 0)],
    [7.68, tr(0, 0, 0), EASE.out],
    [7.84, tr(2, -26, -7)],
    [8.18, tr(2, -26, -7), EASE.snap],
    [8.32, tr(0, 0, 0)],
    [D, tr(0, 0, 0)],
  ]),
  keyframes("jg-new", D, [
    [0, o(0)],
    ...step(7.82, o(0), o(1)),
    ...step(8.45, o(1), o(0)),
    [D, o(0)],
  ]),
  keyframes("jg-nx", D, [
    [0, t(104, 0)],
    [7.82, t(104, 0), EASE.linear],
    [7.98, t(112, 0), EASE.linear],
    [8.16, t(152, 0), EASE.linear],
    [8.45, t(HELD[0], 0)],
    [D, t(HELD[0], 0)],
  ]),
  keyframes("jg-ny", D, [
    [0, t(0, 78)],
    [7.82, t(0, 78), EASE.out],
    [7.98, t(0, -2), EASE.up],
    [8.16, t(0, -24), EASE.down],
    [8.45, t(0, HELD[1])],
    [D, t(0, HELD[1])],
  ]),
  keyframes("jg-spark", D, [
    [0, `transform:scale(0) rotate(0deg);${o(0)}`],
    [7.86, `transform:scale(0) rotate(0deg);${o(1)}`, EASE.out],
    [8.0, `transform:scale(1.25) rotate(45deg);${o(1)}`],
    [8.24, `transform:scale(0) rotate(90deg);${o(0)}`],
    [D, `transform:scale(0) rotate(0deg);${o(0)}`],
  ]),
];

const watcher = [
  keyframes("wt-look", D, [
    [0, t(3, -2)],
    [0.74, t(3, -2.5), EASE.up],
    [1.32, t(2.5, -5), EASE.down],
    [1.9, t(3, -2)],
    [2.84, t(3, -2.5), EASE.up],
    [3.42, t(2.5, -5.5), EASE.down],
    [4.0, t(3, -2)],
    [4.96, t(3, -2.5), EASE.up],
    [5.7, t(2.5, -6), EASE.down],
    [6.52, t(4.5, 1.5)],
    [7.6, t(4.5, 1.5), EASE.inOut],
    [7.9, t(3, -3.5)],
    [8.45, t(3, -2)],
    [D, t(3, -2)],
  ]),
  keyframes("wt-eyes", D, [[0, o(1)], ...step(6.52, o(1), o(0)), ...step(7.55, o(0), o(1)), [D, o(1)]]),
  keyframes("wt-squeeze", D, [[0, o(0)], ...step(6.52, o(0), o(1)), ...step(7.55, o(1), o(0)), [D, o(0)]]),
  keyframes("wt-smile", D, [
    [0, o(1)],
    ...step(4.02, o(1), o(0)),
    ...step(4.62, o(0), o(1)),
    ...step(6.52, o(1), o(0)),
    ...step(7.55, o(0), o(1)),
    [D, o(1)],
  ]),
  keyframes("wt-open", D, [[0, o(0)], ...step(4.02, o(0), o(1)), ...step(4.62, o(1), o(0)), [D, o(0)]]),
  keyframes("wt-o", D, [[0, o(0)], ...step(6.52, o(0), o(1)), ...step(7.55, o(1), o(0)), [D, o(0)]]),
  keyframes("wt-arm-l", D, [
    [0, r(0)],
    [4.0, r(0), EASE.out],
    [4.12, r(100)],
    [4.5, r(100), EASE.inOut],
    [4.66, r(0)],
    [6.5, r(0), EASE.snap],
    [6.62, r(-126)],
    [7.5, r(-126), EASE.inOut],
    [7.7, r(0)],
    [D, r(0)],
  ]),
  keyframes("wt-arm-r", D, [
    [0, r(0)],
    [4.0, r(0), EASE.out],
    [4.12, r(-100)],
    [4.5, r(-100), EASE.inOut],
    [4.66, r(0)],
    [6.5, r(0), EASE.snap],
    [6.62, r(126)],
    [7.5, r(126), EASE.inOut],
    [7.7, r(0)],
    [D, r(0)],
  ]),
  keyframes("wt-body", D, [
    [0, t(0, 0)],
    [4.0, t(0, 0), EASE.out],
    [4.12, t(0, -12), EASE.in],
    [4.26, t(0, 0), EASE.out],
    [4.36, t(0, -6), EASE.in],
    [4.48, t(0, 0)],
    [6.55, t(0, 0)],
    [6.6, t(-2, 0)],
    [6.66, t(2, 0)],
    [6.72, t(-2, 0)],
    [6.78, t(2, 0)],
    [6.84, t(0, 0)],
    [D, t(0, 0)],
  ]),
];

const anim = (cls: string, name = cls) => `.scene-hero .${cls}{animation:${name} ${D}s infinite both}`;
const CSS =
  juggler.join("") +
  watcher.join("") +
  motionSafe(
    [
      "jg-arm",
      "jg-arm-l",
      "jg-body",
      "jg-held",
      "jg-fly",
      "jg-fx",
      "jg-fy",
      "jg-fr",
      "jg-look",
      "jg-smile",
      "jg-open",
      "jg-o",
      "jg-sweat",
      "jg-splat",
      "jg-shell-l",
      "jg-shell-r",
      "jg-cap",
      "jg-new",
      "jg-nx",
      "jg-ny",
      "wt-look",
      "wt-eyes",
      "wt-squeeze",
      "wt-smile",
      "wt-open",
      "wt-o",
      "wt-arm-l",
      "wt-arm-r",
      "wt-body",
    ]
      .map((name) => anim(name))
      .join("") +
      ".scene-hero .jg-wide,.scene-hero .jg-crack,.scene-hero .jg-spark{transform-box:fill-box;transform-origin:50% 50%}" +
      ".scene-hero .jg-cap{transform-box:fill-box;transform-origin:22% 88%}" +
      anim("jg-wide") +
      anim("jg-crack") +
      anim("jg-spark"),
  );

const pivot = { transformBox: "view-box", transformOrigin: "0 0" } as const;

export function HeroScene({ className }: { className?: string }) {
  return (
    <>
      <style href="scene-hero" precedence="default">
        {CSS}
      </style>
      <svg
        viewBox="0 0 560 600"
        className={`scene-hero overflow-visible ${className ?? ""}`}
        role="img"
        aria-label="Dos huevitos con gorra: uno hace malabares con un huevo y el otro lo mira con atención."
      >
        <MascotDefs id="jg" />

        {/* ——— El Mirón (watcher) ——— */}
        <g transform="translate(14 440) scale(0.64)">
          <GroundShadow rx={52} />
          <g className="wt-body" style={pivot}>
            <Legs />
            <Body id="jg" />
            <g transform={`translate(${SHOULDER_L[0]} ${SHOULDER_L[1]})`}>
              <g className="wt-arm-l" style={pivot}>
                <Limb d="M0 0Q-12 12 -18 26" />
                <Hand x={-18} y={26} flip />
              </g>
            </g>
            <g transform={`translate(${SHOULDER_R[0]} ${SHOULDER_R[1]})`}>
              <g className="wt-arm-r" style={pivot}>
                <Limb d="M0 0Q12 12 18 26" />
                <Hand x={18} y={26} />
              </g>
            </g>
            <Cheeks />
            <g className="wt-look" style={pivot}>
              <g className="wt-eyes">
                <Eyes blinkClassName="m-blink m-blink-late" />
              </g>
            </g>
            <EyesSqueeze className="wt-squeeze" opacity={0} />
            <MouthSmile className="wt-smile" />
            <MouthOpen className="wt-open" opacity={0} />
            <MouthO className="wt-o" opacity={0} />
            <Cap id="jg" />
          </g>
        </g>

        {/* ——— El Malabarista (juggler) ——— */}
        <g transform="translate(166 252) scale(1.38)">
          <GroundShadow />
          <g className="jg-body" style={{ transformBox: "view-box", transformOrigin: "100px 232px" }}>
            <Legs />
            <Body id="jg" />

            {/* fresh egg that pops out from under the cap */}
            <g className="jg-new" opacity={0}>
              <g className="jg-nx" style={pivot}>
                <g className="jg-ny" style={pivot}>
                  <EggProp id="jg" />
                </g>
              </g>
            </g>

            <g transform={`translate(${SHOULDER_L[0]} ${SHOULDER_L[1]})`}>
              <g className="jg-arm-l" style={pivot}>
                <Limb d="M0 0Q-14 12 -21 28" />
                <Hand x={-21} y={28} flip />
              </g>
            </g>

            <Cheeks />
            <g className="jg-look" style={pivot}>
              <g className="jg-wide">
                <Eyes blinkClassName="m-blink" />
              </g>
            </g>
            <MouthSmile className="jg-smile" />
            <MouthOpen className="jg-open" opacity={0} />
            <MouthO className="jg-o" opacity={0} />
            <g transform="translate(156 104)">
              <SweatDrop className="jg-sweat" opacity={0} />
            </g>
            <g transform="translate(100 34)">
              <path
                className="jg-spark"
                d="M0 -11L2.6 -2.6L11 0L2.6 2.6L0 11L-2.6 2.6L-11 0L-2.6 -2.6Z"
                fill="#fff"
                stroke={INK}
                strokeWidth="2.6"
                strokeLinejoin="round"
                opacity={0}
              />
            </g>
            <Cap id="jg" className="jg-cap" />

            <g transform={`translate(${SHOULDER_R[0]} ${SHOULDER_R[1]})`}>
              <g className="jg-arm" style={pivot}>
                <g className="jg-held">
                  <g transform={`translate(${HELD[0] - SHOULDER_R[0]} ${HELD[1] - SHOULDER_R[1]})`}>
                    <EggProp id="jg" />
                  </g>
                </g>
                <Limb d="M0 0Q15 3 29 10" />
                <Hand x={29} y={10} />
              </g>
            </g>
          </g>

          {/* the egg in flight */}
          <g className="jg-fly" opacity={0}>
            <g className="jg-fx" style={pivot}>
              <g className="jg-fy" style={pivot}>
                <g className="jg-fr" style={pivot}>
                  <EggProp id="jg" />
                </g>
              </g>
            </g>
          </g>

          {/* ¡crack! */}
          <g transform={`translate(${IMPACT[0]} 233)`}>
            <g className="jg-splat" opacity={0} style={pivot}>
              <SplatPuddle id="jg" />
              <g className="jg-shell-l" style={pivot}>
                <ShellTop id="jg" />
              </g>
              <g className="jg-shell-r" style={pivot}>
                <ShellBottom id="jg" />
              </g>
            </g>
          </g>
          <text
            className="jg-crack"
            x="236"
            y="172"
            textAnchor="middle"
            fontSize="30"
            fill="#ee6a0b"
            stroke={INK}
            strokeWidth="1.6"
            paintOrder="stroke"
            opacity={0}
            style={{ fontFamily: "var(--font-gochi), cursive" }}
          >
            ¡crack!
          </text>
        </g>
      </svg>
    </>
  );
}
