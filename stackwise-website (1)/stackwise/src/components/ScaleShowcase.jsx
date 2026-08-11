import { useRef } from 'react';
import useReveal from '../hooks/useReveal';
import useLiveMetric from '../hooks/useLiveMetric';
import './ScaleShowcase.css';

function Tier({ index, total, label, context, metricLabel, metricValue, metricSuffix, decimals, note, accent }) {
  const display = decimals ? metricValue.toFixed(decimals) : Math.round(metricValue).toLocaleString();

  return (
    <div className={`tier reveal reveal-delay-${index + 1}`} style={{ '--tier-accent': accent }}>
      <div className="tier__scale-track" aria-hidden="true">
        <div className="tier__scale-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      <p className="tier__context">{context}</p>
      <h3 className="tier__label">{label}</h3>

      <div className="tier__metric">
        <span className="tier__metric-dot" />
        <span className="tier__metric-value">
          {display}
          {metricSuffix}
        </span>
        <span className="tier__metric-label">{metricLabel}</span>
      </div>

      <p className="tier__note">{note}</p>
    </div>
  );
}

export default function ScaleShowcase() {
  const ref = useRef(null);
  useReveal(ref);

  const scriptRuns = useLiveMetric({ start: 12, min: 3, max: 40, step: 6, intervalMs: 2400 });
  const appReq = useLiveMetric({ start: 340, min: 180, max: 520, step: 60, intervalMs: 1800 });
  const platformReq = useLiveMetric({ start: 11200, min: 8500, max: 15400, step: 1400, intervalMs: 1400 });

  return (
    <section className="scale" ref={ref} aria-label="What we build, from small to large">
      <div className="container">
        <div className="scale__head reveal">
          <p className="eyebrow">Built at every scale</p>
          <h2 className="scale__title">From a single script to a distributed platform.</h2>
          <p className="scale__sub">
            The same engineering discipline applies whether it's a one-off
            automation or infrastructure serving thousands of requests a
            second. Figures below are illustrative, showing the range we
            design for.
          </p>
        </div>

        <div className="scale__grid">
          <Tier
            index={0}
            total={3}
            context="Small"
            label="Scripts & automation"
            metricLabel="runs today"
            metricValue={scriptRuns}
            metricSuffix=""
            note="Scheduled jobs, data pipelines, internal tooling — built lean and left to run unattended."
            accent="var(--teal-soft)"
          />
          <Tier
            index={1}
            total={3}
            context="Medium"
            label="Web & mobile applications"
            metricLabel="req/sec"
            metricValue={appReq}
            metricSuffix=""
            note="Full-stack products with real users, auth, and uptime that matters."
            accent="var(--teal-medium)"
          />
          <Tier
            index={2}
            total={3}
            context="Large"
            label="Cloud platforms"
            metricLabel="req/sec at peak"
            metricValue={platformReq}
            metricSuffix=""
            note="Serverless and distributed architecture on AWS, built to scale horizontally under load."
            accent="var(--teal-deep)"
          />
        </div>
      </div>
    </section>
  );
}
