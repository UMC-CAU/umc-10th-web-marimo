import { useState, useEffect, useRef } from 'react';

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdatedAt = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearTimer = () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const now = Date.now();
    const elapsed = now - lastUpdatedAt.current;

    if (elapsed >= interval) {
      // Leading edge: 충분한 시간이 지났으므로 즉시 반영
      clearTimer();
      lastUpdatedAt.current = now;
      setThrottledValue(value);
    } else {
      // Trailing edge: 남은 시간 후 최신 값 반영
      clearTimer();
      timerRef.current = setTimeout(() => {
        lastUpdatedAt.current = Date.now();
        setThrottledValue(value);
        timerRef.current = null;
      }, interval - elapsed);
    }

    return clearTimer;
  }, [value, interval]);

  return throttledValue;
}
