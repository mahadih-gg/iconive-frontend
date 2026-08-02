"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

export function useCanScrollX(
  ref: RefObject<HTMLElement | null>,
  dependencyKey?: string | number | boolean
) {
  const [canScroll, setCanScroll] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) {
      setCanScroll(false);
      return;
    }
    setCanScroll(el.scrollWidth > el.clientWidth + 1);
  }, [ref]);

  useEffect(() => {
    update();

    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(update);
    observer.observe(el);

    for (const child of Array.from(el.children)) {
      if (child instanceof HTMLElement) observer.observe(child);
    }

    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [update, dependencyKey, ref]);

  return canScroll;
}
