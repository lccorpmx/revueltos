import { EASE, keyframes, motionSafe, o, r, step, t, tr, type Keyframe } from "@/lib/timeline";
import {
  Arm,
  Body,
  Cap,
  Cheeks,
  EggProp,
  Eyes,
  EyesWink,
  FaceFrame,
  GroundShadow,
  Heart,
  Legs,
  MascotDefs,
  MouthO,
  MouthOpen,
  MouthSmile,
  pivot,
  pivotAt,
  SweatDrop,
} from "./parts";
import { MASCOT } from "./rig";

/**
 * CTA scene: the mascot struts along balancing an egg on its cap, winking.
 * Halfway through the egg nearly rolls off — a little hop saves the day.
 */
const D = 6.4;
const STEP = 0.4;
const NEAR_MISS: [number, number] = [3.6, 4.6];

const inWindow = (s: number) => s > NEAR_MISS[0] - 0.01 && s < NEAR_MISS[1] + 0.01;
const sortFrames = (frames: Keyframe[]) => [...frames].sort((a, b) => a[0] - b[0]);

/** Repeats a two-step gait across the cycle, skipping the near-miss window. */
function gait(even: string, odd: string, mid?: string): Keyframe[] {
  const frames: Keyframe[] = [];
  for (let k = 0; k * STEP <= D + 0.001; k++) {
    const s = +(k * STEP).toFixed(3);
    if (!inWindow(s)) frames.push([s, k % 2 === 0 ? even : odd, EASE.inOut]);
    const m = +(s + STEP / 2).toFixed(3);
    if (mid && m < D && !inWindow(m)) frames.push([m, mid, EASE.inOut]);
  }
  return frames;
}

const frames = [
  keyframes(
    "bl-body",
    D,
    sortFrames([
      ...gait(tr(0, 0, -3), tr(0, 0, 3), tr(0, -5, 0)),
      [NEAR_MISS[0], tr(0, 0, 0), EASE.inOut],
      [3.85, tr(-2, 0, -8), EASE.inOut],
      [4.12, tr(-3, 0, -9), EASE.out],
      [4.26, tr(0, -16, -2), EASE.in],
      [4.42, tr(0, 0, 0), EASE.inOut],
      [NEAR_MISS[1], tr(0, -3, 0), EASE.inOut],
    ]),
  ),
  keyframes(
    "bl-leg-l",
    D,
    sortFrames([
      ...gait(r(0), r(-6), r(16)),
      [NEAR_MISS[0], r(0)],
      [4.12, r(0), EASE.out],
      [4.26, r(-14), EASE.in],
      [4.42, r(0)],
      [NEAR_MISS[1], r(0)],
    ]),
  ),
  keyframes(
    "bl-leg-r",
    D,
    sortFrames([
      ...gait(r(6), r(0), r(-16)),
      [NEAR_MISS[0], r(0)],
      [4.12, r(0), EASE.out],
      [4.26, r(14), EASE.in],
      [4.42, r(0)],
      [NEAR_MISS[1], r(6)],
    ]),
  ),
  keyframes(
    "bl-arm-l",
    D,
    sortFrames([
      ...gait(r(-8), r(8)),
      [NEAR_MISS[0], r(0)],
      [3.8, r(-28)],
      [3.92, r(14)],
      [4.04, r(-30)],
      [4.16, r(16)],
      [4.3, r(-10)],
      [NEAR_MISS[1], r(-8)],
    ]),
  ),
  keyframes(
    "bl-arm-r",
    D,
    sortFrames([
      ...gait(r(8), r(-8)),
      [NEAR_MISS[0], r(0)],
      [3.8, r(28)],
      [3.92, r(-14)],
      [4.04, r(30)],
      [4.16, r(-16)],
      [4.3, r(10)],
      [NEAR_MISS[1], r(8)],
    ]),
  ),
  keyframes(
    "bl-egg",
    D,
    sortFrames([
      ...gait(tr(-2, 0, -9), tr(2, 0, 9)),
      [NEAR_MISS[0], tr(0, 0, 0), EASE.in],
      [3.85, tr(9, 2, 26), EASE.out],
      [4.12, tr(14, 3, 40), EASE.out],
      [4.26, tr(5, -26, 12), EASE.in],
      [4.44, tr(0, 0, -6), EASE.inOut],
      [NEAR_MISS[1], tr(-2, 0, -9)],
    ]),
  ),
  keyframes("bl-wink", D, [[0, o(1)], ...step(3.78, o(1), o(0)), ...step(4.44, o(0), o(1)), [D, o(1)]]),
  keyframes("bl-eyes", D, [[0, o(0)], ...step(3.78, o(0), o(1)), ...step(4.44, o(1), o(0)), [D, o(0)]]),
  keyframes("bl-smile", D, [[0, o(1)], ...step(3.78, o(1), o(0)), ...step(5.1, o(0), o(1)), [D, o(1)]]),
  keyframes("bl-o", D, [[0, o(0)], ...step(3.78, o(0), o(1)), ...step(4.44, o(1), o(0)), [D, o(0)]]),
  keyframes("bl-open", D, [[0, o(0)], ...step(4.44, o(0), o(1)), ...step(5.1, o(1), o(0)), [D, o(0)]]),
  keyframes("bl-sweat", D, [
    [0, `${t(0, 0)};${o(0)}`],
    [3.86, `${t(0, 0)};${o(0)}`],
    [3.95, `${t(0, 1)};${o(1)}`],
    [4.5, `${t(0, 10)};${o(1)}`],
    [4.66, `${t(0, 12)};${o(0)}`],
    [D, `${t(0, 0)};${o(0)}`],
  ]),
];

const HEART_CSS =
  "@keyframes bl-heart{0%{transform:translate(0,0) scale(0.4);opacity:0}15%{opacity:1}70%{opacity:1}100%{transform:translate(10px,-46px) scale(1);opacity:0}}";

const names = ["bl-body", "bl-leg-l", "bl-leg-r", "bl-arm-l", "bl-arm-r", "bl-egg", "bl-wink", "bl-eyes", "bl-smile", "bl-o", "bl-open", "bl-sweat"];
const CSS =
  frames.join("") +
  HEART_CSS +
  motionSafe(
    names.map((n) => `.scene-balance .${n}{animation:${n} ${D}s infinite both}`).join("") +
      ".scene-balance .bl-heart{transform-box:fill-box;transform-origin:50% 50%;animation:bl-heart 3.2s infinite ease-out both}" +
      ".scene-balance .bl-heart-2{animation-delay:1.6s}",
  );

const { shoulderL: SL, shoulderR: SR, capTop } = MASCOT.anchors;

export function BalanceScene({ className }: { className?: string }) {
  return (
    <>
      <style href="scene-balance" precedence="default">
        {CSS}
      </style>
      <svg
        viewBox="-36 -30 290 280"
        className={`scene-balance overflow-visible ${className ?? ""}`}
        role="img"
        aria-label="Huevito con gorra que camina guiñando el ojo mientras equilibra un huevo sobre su gorra."
      >
        <MascotDefs id="bl" />
        <GroundShadow />
        <g className="bl-body" style={pivotAt(98, 232)}>
          <Legs leftClassName="bl-leg-l" rightClassName="bl-leg-r" />
          <Body />
          <g transform={`translate(${SL[0]} ${SL[1]})`}>
            <g className="bl-arm-l" style={pivot}>
              <Arm via={[-16, -4]} to={[-27, -16]} hand="open" flip />
            </g>
          </g>
          <g transform={`translate(${SR[0]} ${SR[1]})`}>
            <g className="bl-arm-r" style={pivot}>
              <Arm via={[16, -4]} to={[27, -16]} hand="open" />
            </g>
          </g>
          <FaceFrame>
            <Cheeks />
            <EyesWink className="bl-wink" blinkClassName="m-blink" />
            <g className="bl-eyes" opacity={0}>
              <Eyes wide />
            </g>
            <MouthSmile className="bl-smile" />
            <MouthO className="bl-o" opacity={0} />
            <MouthOpen className="bl-open" opacity={0} />
          </FaceFrame>
          <g transform="translate(164 98)">
            <SweatDrop className="bl-sweat" opacity={0} />
          </g>
          <Cap />
          {/* the egg balanced on top of the cap; pivots on its bottom tip */}
          <g transform={`translate(${capTop[0] - 1} ${capTop[1] + 1})`}>
            <g className="bl-egg" style={pivot}>
              <g transform="translate(0 -14)">
                <EggProp id="bl" />
              </g>
            </g>
          </g>
        </g>
        <g transform="translate(186 50)">
          <Heart className="bl-heart" size={0.9} />
        </g>
        <g transform="translate(212 84)">
          <Heart className="bl-heart bl-heart-2" size={0.6} fill="#ffcf2e" />
        </g>
      </svg>
    </>
  );
}
