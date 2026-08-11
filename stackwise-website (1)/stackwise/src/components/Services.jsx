import { useRef } from 'react';
import useReveal from '../hooks/useReveal';
import './Services.css';

const SERVICES = [
  {
    key: 'web',
    color: 'teal',
    title: 'Web & App Development',
    desc: 'Full-stack builds with React, Django and modern APIs — from MVP to production.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="17" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M4 11h24" stroke="currentColor" strokeWidth="2" />
        <circle cx="8" cy="8.5" r="1" fill="currentColor" />
        <circle cx="11.5" cy="8.5" r="1" fill="currentColor" />
        <path d="M11 27h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'security',
    color: 'coral',
    title: 'Cybersecurity',
    desc: 'Audits, vulnerability testing and secure-by-design practices that protect what you build.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4l11 4v7c0 7-4.6 12-11 13-6.4-1-11-6-11-13V8l11-4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M12 16.5l2.6 2.6L20.5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'cloud',
    color: 'blue',
    title: 'Cloud Solutions',
    desc: 'Scalable AWS architecture, serverless APIs and infrastructure that grows with you.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path
          d="M9.5 23a5.5 5.5 0 01-.6-10.97A7 7 0 0123 14a5 5 0 01-1 9.9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M9.5 23h13" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: 'pm',
    color: 'amber',
    title: 'Project Management',
    desc: 'Structured delivery, clear timelines and stakeholder communication end to end.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="5" y="7" width="22" height="20" rx="2.5" stroke="currentColor" strokeWidth="2" />
        <path d="M5 13h22" stroke="currentColor" strokeWidth="2" />
        <path d="M10 4v6M22 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10.5 18.5l2.4 2.4 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Services() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="services" className="services" ref={ref}>
      <div className="container">
        <div className="services__head reveal">
          <p className="eyebrow">What I do</p>
          <h2 className="services__title">Services</h2>
        </div>

        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <div key={s.key} className={`service-card service-card--${s.color} reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="service-card__icon">{s.icon}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
