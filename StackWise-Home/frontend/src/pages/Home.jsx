import { Link } from "react-router-dom";
import {
  Shield,
  Monitor,
  CheckSquare,
  Lock,
  ArrowRight,
  Check,
} from "lucide-react";
import useFadeIn from "../hooks/useFadeIn";
import "./Home.css";

const PRODUCTS = [
  {
    Icon: Shield,
    name: "ShieldScan",
    tag: "Live · Free",
    desc: "Free website security scanner. Scan any URL, get a letter grade A–F, identify vulnerabilities, and download a branded PDF report in seconds.",
    url: "https://shieldscan.stackwiseza.co.za",
    stats: ["10 security checks", "Grade A–F", "PDF export", "Shareable links"],
  },
  {
    Icon: Monitor,
    name: "UptimeWatch",
    tag: "Live · Free",
    desc: "Website uptime monitoring with instant email alerts. Know the moment your site goes down — before your customers do.",
    url: "https://uptimewatch.stackwiseza.co.za",
    stats: [
      "5 min checks",
      "Email alerts",
      "Response time",
      "Incident history",
    ],
  },
  {
    Icon: CheckSquare,
    name: "SecureTask",
    tag: "Live",
    desc: "Project management with role-based access control and audit logging built in from day one.",
    url: "https://github.com/Cyab1",
    stats: ["Role-based access", "Audit logging", "Full-stack", "REST API"],
  },
  {
    Icon: Lock,
    name: "VaultAPI",
    tag: "Live",
    desc: "Secure REST API boilerplate with JWT authentication, rate limiting, and structured logging.",
    url: "https://github.com/Cyab1",
    stats: ["JWT auth", "Rate limiting", "Logging", "Python"],
  },
];

const STATS = [
  { n: "4", l: "Live products" },
  { n: "5+", l: "Certifications" },
  { n: "Level 1", l: "B-BBEE EME" },
  { n: "100%", l: "Black & Youth Owned" },
];

const SERVICES = [
  {
    title: "Web & App Development",
    desc: "Full-stack apps, mobile-ready platforms, and APIs built to scale.",
  },
  {
    title: "Cybersecurity",
    desc: "Audits, vulnerability assessments, and ongoing monitoring.",
  },
  {
    title: "Cloud Solutions",
    desc: "AWS infrastructure, deployment pipelines, and cloud migration.",
  },
  {
    title: "Project Management",
    desc: "End-to-end delivery — on time, on budget, every time.",
  },
];

export default function Home() {
  const ref = useFadeIn();

  return (
    <div ref={ref}>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-inner">
          <div className="fade-in">
            <div className="hero-badge">
              <span className="badge-dot" />
              Available for projects · Johannesburg & Remote
            </div>
            <h1 className="hero-title">
              Build smarter.
              <br />
              Ship securely.
              <br />
              <span className="hero-accent">Scale confidently.</span>
            </h1>
            <p className="hero-sub">
              StackWise engineers secure digital products, resilient cloud
              systems, and practical security tools for South African businesses
              ready to grow.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn-primary">
                Start a project
              </Link>
              <Link to="/services" className="btn-outline">
                Our services
              </Link>
            </div>
          </div>

          <div className="hero-right fade-in fade-in-delay-2">
            <div className="hero-card">
              <div className="hero-card-header">
                <span className="hero-card-dot up" />
                <span className="hero-card-title">ShieldScan · Live</span>
              </div>
              <div className="hero-card-grade">A</div>
              <p className="hero-card-sub">97% security score</p>
              <div className="hero-card-checks">
                {["HTTPS", "SSL valid", "HSTS", "CSP", "Headers"].map((c) => (
                  <span key={c} className="hero-check-chip">
                    <Check size={10} strokeWidth={3} /> {c}
                  </span>
                ))}
              </div>
              <a
                href="https://shieldscan.stackwiseza.co.za"
                target="_blank"
                rel="noreferrer"
                className="hero-card-link"
              >
                Scan your site free <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="stats-bar">
        <div className="container stats-inner">
          {STATS.map((s) => (
            <div className="stat-item fade-in" key={s.l}>
              <span className="stat-n">{s.n}</span>
              <span className="stat-l">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Products ── */}
      <section className="section" id="products">
        <div className="container">
          <div className="section-header fade-in">
            <p className="section-label">Live products</p>
            <h2 className="section-title">Proof of work, not promises.</h2>
            <p className="section-sub">
              Every product is live, deployed, and built to solve a real problem
              for SA businesses. Try them free.
            </p>
          </div>
          <div className="products-grid">
            {PRODUCTS.map((p, i) => (
              <div
                className={`product-card fade-in fade-in-delay-${(i % 3) + 1}`}
                key={p.name}
              >
                <div className="product-top">
                  <div className="product-icon-wrap">
                    <p.Icon
                      size={20}
                      strokeWidth={1.5}
                      color="var(--sw-green)"
                    />
                  </div>
                  <span className="product-tag">{p.tag}</span>
                </div>
                <h3 className="product-name">{p.name}</h3>
                <p className="product-desc">{p.desc}</p>
                <div className="product-stats">
                  {p.stats.map((s) => (
                    <span key={s} className="product-stat">
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="product-link"
                >
                  View project <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services teaser ── */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header fade-in">
            <p className="section-label light">What we do</p>
            <h2 className="section-title light">
              Engineering depth across every critical layer.
            </h2>
          </div>
          <div className="services-teaser fade-in">
            {SERVICES.map((s) => (
              <div className="service-teaser-card" key={s.title}>
                <h3 className="service-teaser-title">{s.title}</h3>
                <p className="service-teaser-desc">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="section-cta fade-in">
            <Link to="/services" className="btn-primary">
              See all services
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="cta-banner">
        <div className="container cta-inner fade-in">
          <div>
            <h2 className="cta-title">Ready to build something that lasts?</h2>
            <p className="cta-sub">
              Tell us what you're solving. We'll tell you how to build it right.
            </p>
          </div>
          <Link to="/contact" className="btn-primary">
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
