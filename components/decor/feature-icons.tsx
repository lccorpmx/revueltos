import type { SVGProps } from "react";

/** Illustrated icons for the "¿Por qué Revueltos?" section (mockup style:
 *  thick ink outlines, sunny fills, a soft blob shadow underneath). */

const INK = "#1b1915";
const line = { stroke: INK, strokeWidth: 3.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
type Props = SVGProps<SVGSVGElement>;

function Shadow() {
  return <ellipse cx="52" cy="86" rx="36" ry="7" fill="#fddf3b" opacity="0.75" />;
}

export function CrackedEggIcon(props: Props) {
  return (
    <svg viewBox="0 0 104 96" fill="none" aria-hidden="true" {...props}>
      <Shadow />
      <g transform="rotate(-16 40 46)">
        <path d="M40 16C53 16 60 33 60 44C60 57 51 66 40 66C29 66 20 57 20 44C20 33 27 16 40 16Z" fill="#fffdf6" {...line} />
        <ellipse cx="33" cy="32" rx="3.5" ry="6" fill="#fff" stroke="none" transform="rotate(14 33 32)" />
      </g>
      <ellipse cx="68" cy="61" rx="14" ry="5.5" fill="#ffc21f" {...line} />
      <path
        d="M50 61L55 55L60 61L66 54L72 61L78 55L86 61C86 74 78 82 68 82C58 82 50 74 50 61Z"
        fill="#fffdf6"
        {...line}
      />
      <path d="M57 70C58 74 61 77 65 78" stroke="#eadcc0" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function TacoIcon(props: Props) {
  return (
    <svg viewBox="0 0 104 96" fill="none" aria-hidden="true" {...props}>
      <Shadow />
      <path
        d="M12 52C15 39 24 41 26 34C31 39 37 31 42 36C46 28 55 33 58 29C63 35 70 29 75 35C81 31 88 38 91 48Z"
        fill="#6cc04a"
        {...line}
      />
      <circle cx="34" cy="38" r="5" fill="#ff5a3c" {...line} strokeWidth={2.6} />
      <circle cx="62" cy="36" r="5" fill="#ff5a3c" {...line} strokeWidth={2.6} />
      <path d="M46 40C50 36 55 37 57 41" stroke="#fff4c2" strokeWidth="5" strokeLinecap="round" />
      <path d="M9 50C9 72 28 84 50 84C72 84 94 72 94 50C76 60 26 60 9 50Z" fill="#ffd23a" {...line} />
      <g fill="#d9902a">
        <circle cx="30" cy="70" r="1.8" />
        <circle cx="46" cy="75" r="1.6" />
        <circle cx="64" cy="72" r="1.8" />
        <circle cx="76" cy="66" r="1.5" />
        <circle cx="40" cy="65" r="1.3" />
      </g>
      <g transform="translate(88 30) rotate(18)">
        <path d="M0 -15C8 -15 12 -4 12 3C12 11 7 15 0 15C-7 15 -12 11 -12 3C-12 -4 -8 -15 0 -15Z" fill="#9bd166" {...line} />
        <circle cx="0" cy="4" r="5.5" fill="#b0743a" {...line} strokeWidth={2.6} />
      </g>
    </svg>
  );
}

export function HappyHeartIcon(props: Props) {
  return (
    <svg viewBox="0 0 104 96" fill="none" aria-hidden="true" {...props}>
      <Shadow />
      <g stroke={INK} strokeWidth="3.6" strokeLinecap="round">
        <path d="M8 26L16 30" />
        <path d="M12 52L4 56" />
        <path d="M94 24L86 30" />
        <path d="M92 54L100 58" />
      </g>
      <path
        d="M52 84C22 64 14 46 18 32C22 18 38 14 47 24C49.5 26.5 51 29 52 31C53 29 54.5 26.5 57 24C66 14 82 18 86 32C90 46 82 64 52 84Z"
        fill="#ffd23a"
        {...line}
      />
      <path d="M28 32C30 26 35 23 40 23" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <circle cx="42" cy="44" r="3.6" fill={INK} />
      <circle cx="62" cy="44" r="3.6" fill={INK} />
      <path d="M43 53Q52 61 61 53" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
      <ellipse cx="34" cy="52" rx="5" ry="3" fill="#ff8a4c" opacity="0.6" />
      <ellipse cx="70" cy="52" rx="5" ry="3" fill="#ff8a4c" opacity="0.6" />
    </svg>
  );
}

export function ThumbsUpIcon(props: Props) {
  return (
    <svg viewBox="0 0 104 96" fill="none" aria-hidden="true" {...props}>
      <Shadow />
      <g stroke={INK} strokeWidth="3.4" strokeLinecap="round">
        <path d="M70 14L74 6" />
        <path d="M78 20L86 14" />
      </g>
      <rect x="22" y="44" width="16" height="36" rx="4" fill="#ffb31a" {...line} />
      <path
        d="M38 46L50 42L54 24C55 17 62 15 65 21C67 25 66 31 64 38L62 44H78C84 44 86 50 83 54C87 56 87 62 83 64C86 67 85 72 80 74C82 78 79 82 74 82H50C44 82 40 80 38 78Z"
        fill="#ffd23a"
        {...line}
      />
      <g stroke={INK} strokeWidth="3" strokeLinecap="round">
        <path d="M66 54H82" />
        <path d="M66 64H82" />
        <path d="M66 74H78" />
      </g>
      <path d="M57 26C58 23 60 22 62 23" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}
