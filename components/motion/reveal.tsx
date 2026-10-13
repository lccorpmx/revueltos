"use client";

import { cn } from "cn";
import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  /** Delay in ms, handy for staggering siblings. */
  delay?: number;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>;

/**
 * Fades content up when it scrolls into view. Server HTML stays visible (no
 * flash of hidden content without JS); elements below the fold are hidden on
 * mount and revealed by an IntersectionObserver.
 */
export function Reveal({ as: Tag = "div", delay = 0, className, children, style, ...props }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"in" | "out">("in");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) return;

    setState("out");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("in");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={state}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms`, ...(style as CSSProperties) } as CSSProperties}
      {...props}
    >
      {children}
    </Tag>
  );
}
