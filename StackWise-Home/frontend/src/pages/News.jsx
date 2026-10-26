import { Link } from "react-router-dom";
import {
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Megaphone,
  BookOpen,
} from "lucide-react";
import useFadeIn from "../hooks/useFadeIn";
import "./News.css";

// ── Edit this array to add new posts ─────────────────────────────────────────
const POSTS = [
  {
    id: 1,
    type: "launch",
    date: "17 Oct 2026",
    title: "UptimeWatch is live",
    summary:
      "Free website uptime monitoring for SA businesses. Add any URL, get instant email alerts when your site goes down, and track response time over time.",
    body: `UptimeWatch is now live at uptimewatch.stackwiseza.co.za — free for any SA business to use.

What it does:
— Monitor any website URL every 5 minutes
— Get instant email alerts when your site goes down
— Track uptime percentage and average response time
— Full incident history so you know how long outages lasted

Why we built it: Most SA businesses find out their website is down when a customer calls to complain. UptimeWatch fixes that — you know before anyone else does.

Try it free at uptimewatch.stackwiseza.co.za`,
    url: "https://uptimewatch.stackwiseza.co.za",
    urlLabel: "Try UptimeWatch free",
  },
  {
    id: 2,
    type: "case-study",
    date: "17 Oct 2026",
    title: "Case study: ShieldScan scores A/97% on its own security audit",
    summary:
      "We built a website security scanner and then scanned it with itself. It scored A/97% — passing 9 of 10 checks. Here's what we found and what it means.",
    body: `ShieldScan is a free website security audit tool built by StackWise for SA businesses. When we scanned our own tool, it scored A/97%.

What passed (9/10):
— HTTPS encryption: valid and enforced
— SSL certificate: valid, expires Jan 2027
— HSTS header: present with max-age=63072000
— Content Security Policy: fully configured
— X-Frame-Options: DENY
— X-Content-Type-Options: nosniff
— Referrer Policy: strict-origin-when-cross-origin
— HTTP to HTTPS redirect: clean single hop
— robots.txt: present, no sensitive paths exposed

What scored partial (1/10):
— Server header: Vercel's server header is present but doesn't expose version information. We score this as a warning, not a failure. It's a Vercel infrastructure limitation, not a code issue.

The fact that ShieldScan scores an A on its own audit is the strongest proof we can offer that the tool is credible — not inflated, not generous. Honest.

Scan your own site free at shieldscan.stackwiseza.co.za`,
    url: "https://shieldscan.stackwiseza.co.za",
    urlLabel: "Scan your site free",
  },
  {
    id: 3,
    type: "launch",
    date: "17 Oct 2026",
    title: "ShieldScan is live on stackwiseza.co.za",
    summary:
      "ShieldScan is now running on our real domain. Every SA business can now scan their website for free and get a grade A–F with actionable recommendations.",
    body: `ShieldScan moved from a Vercel subdomain to shieldscan.stackwiseza.co.za — now running on our registered company domain with proper security headers and a 97% security score.

What ShieldScan checks:
— HTTPS encryption
— SSL certificate validity and expiry
— 5 critical security headers
— HTTP to HTTPS redirect chain
— robots.txt for sensitive path exposure
— Server header version disclosure

Free to use. No account needed. 5 scans per day.

For unlimited access or to add ShieldScan to your client delivery workflow, contact hello@stackwiseza.co.za`,
    url: "https://shieldscan.stackwiseza.co.za",
    urlLabel: "Try ShieldScan",
  },
  {
    id: 4,
    type: "milestone",
    date: "Oct 2026",
    title: "STACKWISE (Pty) Ltd officially registered",
    summary:
      "StackWise is now a registered South African company. Reg. 2026/606439/07. Level 1 B-BBEE EME. 100% Black & Youth Owned.",
    body: `STACKWISE (Pty) Ltd is officially registered as a South African private company.

Registration: 2026/606439/07
B-BBEE status: Level 1 EME
Ownership: 100% Black & Youth Owned
Location: Johannesburg, Gauteng

What this means for clients:
— You are contracting with a registered legal entity
— Level 1 B-BBEE status counts toward your transformation scorecard
— All invoices, contracts and deliverables are issued under a registered company

StackWise is open for business. If you have a project to discuss, reach out at hello@stackwiseza.co.za`,
    url: "/contact",
    urlLabel: "Get in touch",
    internal: true,
  },
  {
    id: 5,
    type: "incident", // launch | case-study | milestone | incident | resolved
    date: "26 Oct 2026",
    title: "ShieldScan API experiencing delays",
    summary:
      "The ShieldScan API is responding slower than normal. We are investigating.",
    body: `We identified increased response times on the ShieldScan API at 14:32 UTC.

Affected: Scan results taking 30–60 seconds instead of the normal 10–15 seconds.
Cause: Render free tier cold start after period of inactivity.
Status: Monitoring.

We will post an update when resolved.`,
    url: null,
    urlLabel: null,
  },
];

const TYPE_CONFIG = {
  launch: {
    Icon: Megaphone,
    label: "Launch",
    colour: "var(--sw-green)",
    bg: "var(--sw-teal-light)",
  },
  "case-study": {
    Icon: BookOpen,
    label: "Case study",
    colour: "#1D4ED8",
    bg: "#EFF6FF",
  },
  milestone: {
    Icon: CheckCircle,
    label: "Milestone",
    colour: "var(--sw-dark)",
    bg: "var(--sw-bg)",
  },
  incident: {
    Icon: AlertCircle,
    label: "Incident",
    colour: "#DC2626",
    bg: "#FEF2F2",
  },
  resolved: {
    Icon: CheckCircle,
    label: "Resolved",
    colour: "var(--sw-green)",
    bg: "var(--sw-teal-light)",
  },
};

export default function News() {
  const ref = useFadeIn();

  return (
    <div ref={ref}>
      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className="fade-in">
            <p className="section-label light">News & updates</p>
            <h1 className="page-hero-title">What's happening at StackWise.</h1>
            <p className="page-hero-sub">
              Product launches, case studies, service status updates, and
              announcements. This is where we post first.
            </p>
          </div>
        </div>
      </section>

      {/* ── Posts ── */}
      <section className="section">
        <div className="container news-layout">
          {/* ── Main feed ── */}
          <div className="news-feed">
            {POSTS.map((post) => {
              const config = TYPE_CONFIG[post.type] || TYPE_CONFIG.milestone;
              const { Icon } = config;
              return (
                <article className="news-post fade-in" key={post.id}>
                  <div className="post-meta">
                    <span
                      className="post-type-badge"
                      style={{ background: config.bg, color: config.colour }}
                    >
                      <Icon size={12} strokeWidth={2} />
                      {config.label}
                    </span>
                    <span className="post-date">{post.date}</span>
                  </div>
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-summary">{post.summary}</p>
                  <div className="post-body">
                    {post.body
                      .split("\n")
                      .map((line, i) =>
                        line.trim() === "" ? (
                          <br key={i} />
                        ) : (
                          <p key={i}>{line}</p>
                        ),
                      )}
                  </div>
                  {post.url &&
                    (post.internal ? (
                      <Link to={post.url} className="post-link">
                        {post.urlLabel} <ArrowRight size={14} />
                      </Link>
                    ) : (
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        className="post-link"
                      >
                        {post.urlLabel} <ArrowRight size={14} />
                      </a>
                    ))}
                </article>
              );
            })}
          </div>

          {/* ── Sidebar ── */}
          <aside className="news-sidebar fade-in fade-in-delay-1">
            <div className="sidebar-card">
              <h3 className="sidebar-title">Live products</h3>
              <div className="sidebar-products">
                <a
                  href="https://shieldscan.stackwiseza.co.za"
                  target="_blank"
                  rel="noreferrer"
                  className="sidebar-product"
                >
                  <div>
                    <p className="sidebar-product-name">ShieldScan</p>
                    <p className="sidebar-product-desc">
                      Website security audit
                    </p>
                  </div>
                  <span className="sidebar-status up">Live</span>
                </a>
                <a
                  href="https://uptimewatch.stackwiseza.co.za"
                  target="_blank"
                  rel="noreferrer"
                  className="sidebar-product"
                >
                  <div>
                    <p className="sidebar-product-name">UptimeWatch</p>
                    <p className="sidebar-product-desc">Uptime monitoring</p>
                  </div>
                  <span className="sidebar-status up">Live</span>
                </a>
                <a
                  href="https://github.com/Cyab1"
                  target="_blank"
                  rel="noreferrer"
                  className="sidebar-product"
                >
                  <div>
                    <p className="sidebar-product-name">SecureTask</p>
                    <p className="sidebar-product-desc">Project management</p>
                  </div>
                  <span className="sidebar-status up">Live</span>
                </a>
                <a
                  href="https://github.com/Cyab1"
                  target="_blank"
                  rel="noreferrer"
                  className="sidebar-product"
                >
                  <div>
                    <p className="sidebar-product-name">VaultAPI</p>
                    <p className="sidebar-product-desc">
                      Secure API boilerplate
                    </p>
                  </div>
                  <span className="sidebar-status up">Live</span>
                </a>
              </div>
            </div>

            <div className="sidebar-card">
              <h3 className="sidebar-title">Post types</h3>
              <div className="sidebar-legend">
                {Object.entries(TYPE_CONFIG).map(([key, config]) => (
                  <div className="legend-item" key={key}>
                    <span
                      className="legend-dot"
                      style={{ background: config.colour }}
                    />
                    <span className="legend-label">{config.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <h3 className="sidebar-title">Stay updated</h3>
              <p className="sidebar-desc">
                Follow StackWise on LinkedIn for the latest news, product
                updates, and security tips for SA businesses.
              </p>
              <a
                href="https://linkedin.com/company/stackwise-pty"
                target="_blank"
                rel="noreferrer"
                className="sidebar-btn"
              >
                Follow on LinkedIn <ArrowRight size={14} />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
