import { Link } from "react-router-dom";
import { Code2, Shield, Cloud, ClipboardList, Check } from "lucide-react";
import useFadeIn from "../hooks/useFadeIn";
import "./Services.css";

const SERVICES = [
  {
    Icon: Code2,
    title: "Web & App Development",
    tag: "Core offering",
    desc: "We build full-stack web applications, mobile-ready platforms, and REST APIs that perform under load and scale without rebuilding. Every line of code is written with security and maintainability in mind.",
    features: [
      "React, TypeScript, Python, Django",
      "REST API design and implementation",
      "Mobile-responsive from day one",
      "PostgreSQL, SQLite database design",
      "CI/CD pipeline setup",
      "Performance optimisation",
    ],
  },
  {
    Icon: Shield,
    title: "Cybersecurity",
    tag: "High demand",
    desc: "Security is not an afterthought at StackWise — it is built into every system from line one. We conduct security audits, identify vulnerabilities, and implement protections before attackers find the gaps.",
    features: [
      "Website security audits (ShieldScan)",
      "Vulnerability assessments",
      "SSL/TLS configuration",
      "Security header implementation",
      "POPIA compliance guidance",
      "Secure coding reviews",
    ],
  },
  {
    Icon: Cloud,
    title: "Cloud Solutions",
    tag: "Growth area",
    desc: "We architect and deploy cloud infrastructure on AWS that scales with your business. From serverless functions to full EC2 deployments, we build cloud systems that are resilient and cost-effective.",
    features: [
      "AWS EC2, Lambda, S3, CloudFront",
      "Serverless architecture design",
      "Cloud migration from on-premise",
      "Deployment pipeline automation",
      "Infrastructure monitoring",
      "Cost optimisation",
    ],
  },
  {
    Icon: ClipboardList,
    title: "Project Management",
    tag: "Full service",
    desc: "Technology projects fail because of poor delivery, not poor technology. StackWise manages projects end-to-end — scoping, planning, execution, and handover — with full transparency at every stage.",
    features: [
      "Project scoping and estimation",
      "Agile delivery management",
      "Stakeholder communication",
      "Risk identification and mitigation",
      "Post-launch support",
      "Documentation and handover",
    ],
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Discovery",
    desc: "We listen first. We understand your business, your users, and the problem you are actually trying to solve — before we write a line of code.",
  },
  {
    n: "02",
    title: "Architecture",
    desc: "We design the system before we build it. Tech stack selection, security model, database design, and deployment strategy — all planned upfront.",
  },
  {
    n: "03",
    title: "Build",
    desc: "We build in iterations. Regular demos, continuous feedback, and no surprises. You see progress from week one.",
  },
  {
    n: "04",
    title: "Deploy",
    desc: "We deploy to production, set up monitoring, run security checks, and hand over full documentation. The project ends when you are confident.",
  },
];

export default function Services() {
  const ref = useFadeIn();

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <div className="fade-in">
            <p className="section-label light">What we do</p>
            <h1 className="page-hero-title">
              Engineering services for ambitious teams.
            </h1>
            <p className="page-hero-sub">
              Four disciplines. One relationship. Everything you need to build,
              secure, and scale your technology — without switching vendors.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-list">
            {SERVICES.map((s, i) => (
              <div
                className={`service-item fade-in ${i % 2 === 1 ? "reverse" : ""}`}
                key={s.title}
              >
                <div className="service-content">
                  <span className="service-tag">{s.tag}</span>
                  <div className="service-title-row">
                    <div className="service-icon-wrap">
                      <s.Icon
                        size={22}
                        strokeWidth={1.5}
                        color="var(--sw-green)"
                      />
                    </div>
                    <h2 className="service-title">{s.title}</h2>
                  </div>
                  <p className="service-desc">{s.desc}</p>
                  <Link to="/contact" className="btn-primary">
                    Get a quote
                  </Link>
                </div>
                <div className="service-features">
                  <p className="features-label">What's included</p>
                  <ul className="features-list">
                    {s.features.map((f) => (
                      <li key={f}>
                        <Check
                          size={14}
                          strokeWidth={2.5}
                          color="var(--sw-green)"
                          className="feature-check"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-bg">
        <div className="container">
          <div className="section-header fade-in">
            <p className="section-label">How we work</p>
            <h2 className="section-title">A process built for clarity.</h2>
          </div>
          <div className="process-grid fade-in">
            {PROCESS.map((p) => (
              <div className="process-card" key={p.n}>
                <span className="process-n">{p.n}</span>
                <h3 className="process-title">{p.title}</h3>
                <p className="process-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-inner fade-in">
          <div>
            <h2 className="cta-title">Ready to start a project?</h2>
            <p className="cta-sub">
              Tell us what you need. We'll tell you how to build it.
            </p>
          </div>
          <Link to="/contact" className="btn-primary">
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
