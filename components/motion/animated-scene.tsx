"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

/**
 * Wraps a CSS-animated illustration and pauses every animation inside it while
 * it's off-screen (see `[data-paused]` in globals.css). Nothing to do for
 * reduced-motion users: their scenes are static to begin with.
 */
export function AnimatedScene({ children, ...props }: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), {
      rootMargin: "120px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-paused={paused ? "" : undefined} {...props}>
      {children}
    </div>
  );
}
