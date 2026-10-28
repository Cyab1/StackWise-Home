import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Megaphone,
  BookOpen,
  Milestone,
} from "lucide-react";
import axios from "axios";
import useFadeIn from "../hooks/useFadeIn";
import "./News.css";

const NEWS_API = import.meta.env.VITE_NEWS_API_URL;

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

const PRODUCTS = [
  {
    name: "ShieldScan",
    desc: "Website security audit",
    url: "https://shieldscan.stackwiseza.co.za",
  },
  {
    name: "UptimeWatch",
    desc: "Uptime monitoring",
    url: "https://uptimewatch.stackwiseza.co.za",
  },
  {
    name: "SecureTask",
    desc: "Project management",
    url: "https://github.com/Cyab1",
  },
  {
    name: "VaultAPI",
    desc: "Secure API boilerplate",
    url: "https://github.com/Cyab1",
  },
];

export default function News() {
  const ref = useFadeIn();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${NEWS_API}/api/news`)
      .then((r) => setPosts(Array.isArray(r.data) ? r.data : []))
      .catch(() => setError("Could not load posts."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div ref={ref}>
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

      <section className="section">
        <div className="container news-layout">
          <div className="news-feed">
            {loading && <p className="news-loading">Loading posts…</p>}
            {error && <p className="news-error">{error}</p>}
            {!loading && !error && posts.length === 0 && (
              <p className="news-empty">No posts yet — check back soon.</p>
            )}
            {posts.map((post) => {
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
                        {post.url_label} <ArrowRight size={14} />
                      </Link>
                    ) : (
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        className="post-link"
                      >
                        {post.url_label} <ArrowRight size={14} />
                      </a>
                    ))}
                </article>
              );
            })}
          </div>

          <aside className="news-sidebar fade-in fade-in-delay-1">
            <div className="sidebar-card">
              <h3 className="sidebar-title">Live products</h3>
              <div className="sidebar-products">
                {PRODUCTS.map((p) => (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="sidebar-product"
                    key={p.name}
                  >
                    <div>
                      <p className="sidebar-product-name">{p.name}</p>
                      <p className="sidebar-product-desc">{p.desc}</p>
                    </div>
                    <span className="sidebar-status up">Live</span>
                  </a>
                ))}
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

            <div className="sidebar-card">
              <Link
                to="/news/admin"
                className="sidebar-btn"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Admin — manage posts
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
