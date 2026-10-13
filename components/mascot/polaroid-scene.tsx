import { EASE, keyframes, motionSafe, o, r, step, t } from "@/lib/timeline";
import { Body, Cap, Cheeks, EggProp, Eyes, EyesHappy, GroundShadow, Hand, Legs, Limb, MascotDefs, MouthOpen } from "./parts";

/**
 * Polaroid scene: a "live photo" of the mascot waving at the camera, then
 * showing off by tossing its egg — and winking after the catch.
 */
const D = 4.4;
const HELD = [50, 146] as const;
const RELEASE = [50.5, 141.7] as const;

const frames = [
  keyframes("pl-wave", D, [
    [0, r(0), EASE.inOut],
    [0.25, r(18), EASE.inOut],
    [0.5, r(-6), EASE.inOut],
    [0.75, r(18), EASE.inOut],
    [1.0, r(-6), EASE.inOut],
    [1.25, r(18), EASE.inOut],
    [1.55, r(0)],
    [D, r(0)],
  ]),
  keyframes("pl-arm", D, [
    [0, r(0)],
    [1.8, r(0), EASE.inOut],
    [1.95, r(10), EASE.in],
    [2.05, r(-16), EASE.out],
    [2.3, r(0)],
    [2.88, r(0), EASE.out],
    [2.98, r(8), EASE.inOut],
    [3.15, r(0)],
    [D, r(0)],
  ]),
  keyframes("pl-held", D, [[0, o(1)], ...step(2.05, o(1), o(0)), ...step(2.9, o(0), o(1)), [D, o(1)]]),
  keyframes("pl-fly", D, [[0, o(0)], ...step(2.05, o(0), o(1)), ...step(2.9, o(1), o(0)), [D, o(0)]]),
  keyframes("pl-fx", D, [
    [0, t(RELEASE[0], 0)],
    [2.05, t(RELEASE[0], 0), EASE.linear],
    [2.9, t(HELD[0], 0)],
    [D, t(RELEASE[0], 0)],
  ]),
  keyframes("pl-fy", D, [
    [0, t(0, RELEASE[1])],
    [2.05, t(0, RELEASE[1]), EASE.up],
    [2.47, t(0, 58), EASE.down],
    [2.9, t(0, HELD[1])],
    [D, t(0, RELEASE[1])],
  ]),
  keyframes("pl-fr", D, [
    [0, "transform:rotate(-16deg)"],
    [2.05, "transform:rotate(-16deg)", EASE.linear],
    [2.9, "transform:rotate(360deg)"],
    [D, "transform:rotate(360deg)"],
  ]),
  keyframes("pl-look", D, [
    [0, t(0, 0)],
    [1.9, t(0, 0), EASE.inOut],
    [2.1, t(-3, -1)],
    [2.47, t(-3.5, -5), EASE.inOut],
    [2.9, t(-3, 2)],
    [3.1, t(0, 0)],
    [D, t(0, 0)],
  ]),
  keyframes("pl-eyes", D, [[0, o(1)], ...step(3.05, o(1), o(0)), ...step(3.7, o(0), o(1)), [D, o(1)]]),
  keyframes("pl-happy", D, [[0, o(0)], ...step(3.05, o(0), o(1)), ...step(3.7, o(1), o(0)), [D, o(0)]]),
];

const names = ["pl-wave", "pl-arm", "pl-held", "pl-fly", "pl-fx", "pl-fy", "pl-fr", "pl-look", "pl-eyes", "pl-happy"];
const CSS =
  frames.join("") + motionSafe(names.map((n) => `.scene-polaroid .${n}{animation:${n} ${D}s infinite both}`).join(""));

const pivot = { transformBox: "view-box", transformOrigin: "0 0" } as const;

export function PolaroidScene({ className }: { className?: string }) {
  return (
    <>
      <style href="scene-polaroid" precedence="default">
        {CSS}
      </style>
      <svg
        viewBox="-10 10 230 240"
        className={`scene-polaroid overflow-visible ${className ?? ""}`}
        aria-hidden="true"
      >
        <MascotDefs id="pl" />
        <GroundShadow />
        <Legs />
        <Body id="pl" />
        <Cheeks />
        <g className="pl-look" style={pivot}>
          <g className="pl-eyes">
            <Eyes blinkClassName="m-blink" />
          </g>
        </g>
        <EyesHappy className="pl-happy" opacity={0} />
        <MouthOpen />
        <Cap id="pl" />
        <g transform="translate(165 142)">
          <g className="pl-wave" style={pivot}>
            <Limb d="M0 0Q14 -12 16 -30" />
            <Hand x={17} y={-34} />
          </g>
        </g>
        <g transform="translate(35 142)">
          <g className="pl-arm" style={pivot}>
            <g className="pl-held">
              <g transform={`translate(${HELD[0] - 35} ${HELD[1] - 142})`}>
                <EggProp id="pl" />
              </g>
            </g>
            <Limb d="M0 0Q-10 18 13 22" />
            <Hand x={15} y={20} />
          </g>
        </g>
        <g className="pl-fly" opacity={0}>
          <g className="pl-fx" style={pivot}>
            <g className="pl-fy" style={pivot}>
              <g className="pl-fr" style={pivot}>
                <EggProp id="pl" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </>
  );
}
