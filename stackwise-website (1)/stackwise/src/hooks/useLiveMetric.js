import { useEffect, useState } from 'react';

// Produces a value that drifts within [min, max] on an interval, to give
// a "live telemetry" feel without needing a real data source.
export default function useLiveMetric({ start, min, max, step, intervalMs = 2200 }) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((prev) => {
        const delta = (Math.random() - 0.5) * 2 * step;
        const next = prev + delta;
        return Math.min(max, Math.max(min, next));
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [min, max, step, intervalMs]);

  return value;
}
