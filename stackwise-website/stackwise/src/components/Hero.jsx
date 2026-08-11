import './Hero.css';

const BADGES = [
  'HyperionDev',
  'FNB App Academy',
  'Coursera Cybersecurity',
  'Coursera PM',
  'AWS Cloud Practitioner (in progress)',
];

export default function Hero() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="top" className="hero">
      <div className="hero__decor" aria-hidden="true">
        <svg viewBox="0 0 320 280" fill="none">
          <rect x="30" y="190" width="260" height="46" rx="23" fill="#5DCAA5" opacity="0.14" />
          <rect x="70" y="110" width="180" height="46" rx="23" fill="#5DCAA5" opacity="0.18" />
          <rect x="110" y="30" width="100" height="46" rx="23" fill="#5DCAA5" opacity="0.24" />
          <circle cx="160" cy="53" r="12" fill="#5DCAA5" opacity="0.3" />
        </svg>
      </div>

      <div className="container hero__inner">
        <p className="eyebrow eyebrow--light">JOHANNESBURG · SOFTWARE &amp; CLOUD CONSULTANCY</p>

        <h1 className="hero__headline">
          Build smarter. Ship securely. <span>Scale confidently.</span>
        </h1>

        <p className="hero__subtext">
          Full-stack development, cybersecurity, cloud architecture, and project
          management — all under one roof. Based in Johannesburg, serving clients
          worldwide.
        </p>

        <div className="hero__actions">
          <a href="#projects" className="btn btn-solid-light" onClick={(e) => scrollTo(e, 'projects')}>
            View my work
          </a>
          <a href="#contact" className="btn btn-outline-light" onClick={(e) => scrollTo(e, 'contact')}>
            Get in touch
          </a>
        </div>

        <div className="hero__badges">
          {BADGES.map((badge) => (
            <span key={badge} className="hero__badge">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
