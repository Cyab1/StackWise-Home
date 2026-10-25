import { Link } from "react-router-dom";
import {
  GraduationCap,
  Smartphone,
  Shield,
  ClipboardList,
  Cloud,
  ArrowRight,
} from "lucide-react";
import useFadeIn from "../hooks/useFadeIn";
import "./About.css";

const CERTS = [
  {
    Icon: GraduationCap,
    title: "Full-Stack Software Engineering",
    org: "HyperionDev",
  },
  { Icon: Smartphone, title: "App Development", org: "FNB App Academy" },
  { Icon: Shield, title: "Cybersecurity", org: "Coursera" },
  { Icon: ClipboardList, title: "Project Management", org: "Coursera" },
  { Icon: Cloud, title: "AWS Cloud Practitioner", org: "In progress" },
];

const STACK = [
  "React",
  "TypeScript",
  "Python",
  "Django",
  "Flask",
  "PostgreSQL",
  "SQLite",
  "AWS EC2",
  "AWS Lambda",
  "S3",
  "CloudFront",
  "REST APIs",
  "JWT Auth",
  "Git",
  "GitHub Actions",
  "Vercel",
  "Render",
];

const VALUES = [
  {
    title: "Security first",
    desc: "Every system we build is designed with security from line one — not bolted on after a breach.",
  },
  {
    title: "Long-term partner",
    desc: "We build ongoing relationships, not one-and-done projects. Your success is our metric.",
  },
  {
    title: "Built for SA",
    desc: "Priced for SA businesses. Structured to serve SMEs, startups, and growing companies — not just enterprises.",
  },
  {
    title: "Honest engineering",
    desc: "We tell you what will work, what won't, and why — before we start building.",
  },
];

export default function About() {
  const ref = useFadeIn();

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <div className="fade-in">
            <p className="section-label light">About StackWise</p>
            <h1 className="page-hero-title">
              A Johannesburg consultancy built to last.
            </h1>
            <p className="page-hero-sub">
              STACKWISE (Pty) Ltd is a registered South African software
              engineering, cloud, and cybersecurity consultancy. We translate
              complex technical challenges into secure, useful systems.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reg-grid fade-in">
            {[
              ["2026/606439/07", "Registration number"],
              ["Level 1 EME", "B-BBEE status"],
              ["100% Black & Youth Owned", "Ownership"],
              ["Johannesburg · Worldwide", "Location"],
            ].map(([val, label]) => (
              <div className="reg-card" key={label}>
                <div className="reg-val">{val}</div>
                <div className="reg-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-bg">
        <div className="container founder-section">
          <div className="fade-in">
            <p className="section-label">The founder</p>
            <h2 className="section-title">Why StackWise is built to last.</h2>
            <p className="founder-body">
              StackWise is founded by a multi-certified software engineer with
              hands-on experience across the full technology stack — from
              frontend interfaces to cloud infrastructure to cybersecurity. Not
              a generalist. A specialist who covers all the layers.
            </p>
            <p className="founder-body">
              The vision is simple: SA businesses deserve enterprise-grade
              technology at a scale that works for them. One trusted partner,
              full coverage, accessible pricing.
            </p>
            <div className="founder-differentiators">
              {[
                [
                  "Full-stack to cloud to security",
                  "A rare combination. Most engineers specialise in one layer. StackWise covers the entire lifecycle.",
                ],
                [
                  "Real systems, not tutorial code",
                  "Portfolio projects are deployed and live — not sitting on GitHub collecting dust.",
                ],
                [
                  "Strategic and technical",
                  "Understands business goals, not just code. Can translate between tech and business stakeholders.",
                ],
              ].map(([title, desc]) => (
                <div className="differentiator" key={title}>
                  <ArrowRight
                    size={16}
                    color="var(--sw-green)"
                    className="diff-arrow"
                  />
                  <div>
                    <p className="diff-title">{title}</p>
                    <p className="diff-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header fade-in">
            <p className="section-label">Credentials</p>
            <h2 className="section-title">Certified across the full stack.</h2>
          </div>
          <div className="certs-grid fade-in">
            {CERTS.map((c) => (
              <div className="cert-card" key={c.title}>
                <div className="cert-icon-wrap">
                  <c.Icon size={22} strokeWidth={1.5} color="var(--sw-green)" />
                </div>
                <div className="cert-title">{c.title}</div>
                <div className="cert-org">{c.org}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header fade-in">
            <p className="section-label light">Core stack</p>
            <h2 className="section-title light">The tools we work with.</h2>
          </div>
          <div className="stack-chips fade-in">
            {STACK.map((s) => (
              <span key={s} className="stack-chip">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header fade-in">
            <p className="section-label">How we operate</p>
            <h2 className="section-title">What we stand for.</h2>
          </div>
          <div className="values-grid fade-in">
            {VALUES.map((v) => (
              <div className="value-card" key={v.title}>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-inner fade-in">
          <div>
            <h2 className="cta-title">Want to work with us?</h2>
            <p className="cta-sub">
              Let's have a conversation about what you're building.
            </p>
          </div>
          <Link to="/contact" className="btn-primary">
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
