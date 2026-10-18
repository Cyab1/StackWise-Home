import { useState } from "react";
import axios from "axios";
import "./Home.css";

const ANNOUNCEMENTS = [
  {
    date: "17 Oct 2026",
    tag: "Launch",
    title: "ShieldScan is live",
    body: "Our free website security scanner is now live at shieldscan.stackwiseza.co.za — scan any SA business website and get a grade A–F in seconds.",
    url: "https://shieldscan.stackwiseza.co.za",
  },
  {
    date: "Oct 2026",
    tag: "Milestone",
    title: "StackWise officially registered",
    body: "STACKWISE (Pty) Ltd is now a registered South African company — Reg. 2026/606439/07. Level 1 B-BBEE EME. 100% Black & Youth Owned.",
    url: null,
  },
];

const SERVICES = [
  {
    icon: "💻",
    title: "Web & App Development",
    desc: "Full-stack web apps, mobile-ready platforms, and APIs built to perform and scale.",
    tag: "Core offering",
  },
  {
    icon: "🛡️",
    title: "Cybersecurity",
    desc: "Security audits, vulnerability assessments, secure coding, and ongoing monitoring.",
    tag: "High demand",
  },
  {
    icon: "☁️",
    title: "Cloud Solutions",
    desc: "AWS infrastructure, serverless architecture, deployment pipelines, and cloud migration.",
    tag: "Growth area",
  },
  {
    icon: "📋",
    title: "Project Management",
    desc: "End-to-end delivery management — on time, on budget, every single time.",
    tag: "Full service",
  },
];

const PROJECTS = [
  {
    name: "ShieldScan",
    desc: "Free website security scanner for SA businesses. Scan any URL, get a grade A–F, download a branded PDF report. Built with Python, Flask, React, and ReportLab. Deployed on Render and Vercel.",
    url: "https://shieldscan.stackwiseza.co.za",
    tag: "Live · Free",
    icon: "🛡️",
    stats: ["10 security checks", "Grade A–F", "PDF export", "Shareable links"],
  },
  {
    name: "SecureTask",
    desc: "Project management tool with role-based access control and audit logging built in from day one. Designed for teams that need accountability and traceability built into their workflow.",
    url: "https://github.com/Cyab1",
    tag: "Live",
    icon: "✅",
    stats: ["Role-based access", "Audit logging", "Full-stack", "REST API"],
  },
  {
    name: "VaultAPI",
    desc: "Secure REST API boilerplate with JWT authentication, rate limiting, and structured logging. A production-ready foundation for any backend project.",
    url: "https://github.com/Cyab1",
    tag: "Live",
    icon: "🔐",
    stats: ["JWT auth", "Rate limiting", "Structured logging", "Python"],
  },
];

const STACK = [
  "React",
  "TypeScript",
  "Python",
  "Django",
  "PostgreSQL",
  "AWS",
  "Railway",
  "GitHub Actions",
];

const CERTS = [
  { title: "Full-Stack Software Engineering", org: "HyperionDev" },
  { title: "App Development", org: "FNB App Academy" },
  { title: "Cybersecurity", org: "Coursera" },
  { title: "Project Management", org: "Coursera" },
  { title: "AWS Cloud Practitioner", org: "In progress" },
];

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.consent) {
      setStatus("Please confirm your consent before sending.");
      return;
    }
    setSending(true);
    setStatus("");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, form);
      setStatus("Message sent — we will be in touch soon.");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        consent: false,
      });
    } catch {
      setStatus(
        "Something went wrong. Please email us directly at hello@stackwiseza.co.za",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="container nav-inner">
          <a href="/" className="nav-brand">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="8" y="3" width="6" height="4" rx="2" fill="#5DCAA5" />
              <rect
                x="4"
                y="9"
                width="14"
                height="4"
                rx="2"
                fill="#5DCAA5"
                opacity="0.75"
              />
              <rect
                x="1"
                y="15"
                width="20"
                height="4"
                rx="2"
                fill="#5DCAA5"
                opacity="0.5"
              />
            </svg>
            <span className="nav-name">StackWise</span>
          </a>
          <div className="nav-links">
            <a href="#announcements">Updates</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <a href="#contact" className="nav-cta">
              Let's talk
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">
            Available for projects · Jhb & Remote
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
            systems, and practical AI solutions for teams ready to move with
            confidence.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Start a project
            </a>
            <a href="#projects" className="btn-secondary">
              See our work
            </a>
          </div>
          <div className="hero-creds">
            {[
              "HyperionDev",
              "FNB App Academy",
              "Coursera",
              "AWS learning track",
            ].map((c) => (
              <span key={c} className="cred-chip">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Announcements ── */}
      <section className="section section-bg" id="announcements">
        <div className="container">
          <p className="section-label">Latest updates</p>
          <h2 className="section-title">What's happening at StackWise.</h2>
          <div className="announcements-grid">
            {ANNOUNCEMENTS.map((a) => (
              <div className="announcement-card" key={a.title}>
                <div className="announcement-top">
                  <span className="announcement-tag">{a.tag}</span>
                  <span className="announcement-date">{a.date}</span>
                </div>
                <h3 className="announcement-title">{a.title}</h3>
                <p className="announcement-body">{a.body}</p>
                {a.url && (
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="announcement-link"
                  >
                    View →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section" id="services">
        <div className="container">
          <p className="section-label">What we do</p>
          <h2 className="section-title">
            Engineering depth across every critical layer.
          </h2>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <div className="service-card" key={s.title}>
                <div className="service-icon">{s.icon}</div>
                <span className="service-tag">{s.tag}</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="section section-dark" id="about">
        <div className="container">
          <p className="section-label light">About StackWise</p>
          <h2 className="section-title light">
            A Johannesburg consultancy built for ambitious teams.
          </h2>
          <p className="about-body">
            STACKWISE (Pty) Ltd is a registered South African software
            engineering, cloud, and cybersecurity consultancy. We translate
            complex technical challenges into secure, useful systems — and stay
            close to the work from strategy through delivery.
          </p>
          <div className="about-stats">
            {[
              ["2026/606439/07", "Registration"],
              ["Level 1 EME", "B-BBEE Status"],
              ["100% Black & Youth Owned", "Ownership"],
              ["South Africa · Worldwide", "Reach"],
            ].map(([val, label]) => (
              <div className="stat-card" key={label}>
                <div className="stat-val">{val}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
          <div className="stack-section">
            <p className="stack-label">Core stack</p>
            <div className="stack-chips">
              {STACK.map((s) => (
                <span key={s} className="stack-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="certs-section">
            <p className="stack-label">Credentials & certifications</p>
            <div className="certs-grid">
              {CERTS.map((c) => (
                <div className="cert-card" key={c.title}>
                  <div className="cert-title">{c.title}</div>
                  <div className="cert-org">{c.org}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="section" id="projects">
        <div className="container">
          <p className="section-label">Case studies</p>
          <h2 className="section-title">Proof of work, not promises.</h2>
          <div className="stats-row">
            {[
              ["3", "Live projects"],
              ["5", "Certifications"],
              ["Level 1", "B-BBEE"],
              ["Est. 2026", "Founded"],
            ].map(([n, l]) => (
              <div className="mini-stat" key={l}>
                <div className="mini-n">{n}</div>
                <div className="mini-l">{l}</div>
              </div>
            ))}
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <div className="project-card" key={p.name}>
                <div className="project-top">
                  <span className="project-icon">{p.icon}</span>
                  <span className="project-tag">{p.tag}</span>
                </div>
                <h3 className="project-name">{p.name}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-stats">
                  {p.stats.map((s) => (
                    <span key={s} className="project-stat-chip">
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  View project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="section section-bg" id="contact">
        <div className="container contact-inner">
          <div className="contact-left">
            <p className="section-label">Start a conversation</p>
            <h2 className="section-title">Let's build something that lasts.</h2>
            <p className="contact-sub">
              Tell us what you are solving, where you are stuck, or what you
              need to ship next.
            </p>
            <div className="contact-details">
              <a
                href="mailto:hello@stackwiseza.co.za"
                className="contact-email"
              >
                hello@stackwiseza.co.za
              </a>
              <p className="contact-loc">
                Johannesburg, Gauteng · Remote worldwide
              </p>
            </div>
            <div className="social-links">
              <a
                href="https://linkedin.com/company/stackwise-pty"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Cyab1"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://x.com/Stackwise_za"
                target="_blank"
                rel="noreferrer"
              >
                X
              </a>
              <a
                href="https://www.instagram.com/stackwiseza"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@stackwiseza"
                target="_blank"
                rel="noreferrer"
              >
                TikTok
              </a>
            </div>
          </div>
          <div className="contact-right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="form-input"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                required
                className="form-input form-textarea"
                rows={5}
              />
              <label className="consent-label">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                />
                <span>
                  I consent to StackWise storing my information in order to
                  respond to this enquiry. See our{" "}
                  <a href="/privacy">Privacy Policy</a>.
                </span>
              </label>
              {status && <p className="form-status">{status}</p>}
              <button type="submit" className="btn-primary" disabled={sending}>
                {sending ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <a href="/" className="nav-brand">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <rect x="8" y="3" width="6" height="4" rx="2" fill="#5DCAA5" />
                <rect
                  x="4"
                  y="9"
                  width="14"
                  height="4"
                  rx="2"
                  fill="#5DCAA5"
                  opacity="0.75"
                />
                <rect
                  x="1"
                  y="15"
                  width="20"
                  height="4"
                  rx="2"
                  fill="#5DCAA5"
                  opacity="0.5"
                />
              </svg>
              <span className="nav-name">StackWise</span>
            </a>
            <p className="footer-desc">
              South African software engineering, cloud, and cybersecurity
              expertise for teams building what matters.
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <p className="footer-col-title">Navigate</p>
              <a href="#announcements">Updates</a>
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Legal</p>
              <a href="/privacy">Privacy Policy</a>
              <a href="/paia">PAIA Manual</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Connect</p>
              <a
                href="https://linkedin.com/company/stackwise-pty"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Cyab1"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://x.com/Stackwise_za"
                target="_blank"
                rel="noreferrer"
              >
                X
              </a>
              <a
                href="https://www.instagram.com/stackwiseza"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@stackwiseza"
                target="_blank"
                rel="noreferrer"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2026 STACKWISE (Pty) Ltd · Reg. 2026/606439/07 · Level 1 B-BBEE
            EME
          </p>
        </div>
      </footer>
    </>
  );
}
