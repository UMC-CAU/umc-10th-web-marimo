import { useEffect, useRef, useCallback } from 'react';

export function useIntersect(
  onIntersect: () => void,
  options?: IntersectionObserverInit
) {
  const ref = useRef<HTMLDivElement>(null);

  const handler = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) onIntersect();
    },
    [onIntersect]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(handler, { threshold: 0.1, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handler, options]);

  return ref;
}
