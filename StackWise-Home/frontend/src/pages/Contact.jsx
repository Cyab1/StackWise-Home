import { useState } from "react";
import { Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import axios from "axios";
import useFadeIn from "../hooks/useFadeIn";
import "./Contact.css";

const API = import.meta.env.VITE_API_URL;

const SERVICES = [
  "Web & App Development",
  "Cybersecurity audit",
  "Cloud solutions",
  "Project management",
  "ShieldScan / UptimeWatch",
  "Other",
];

export default function Contact() {
  const ref = useFadeIn();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

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
      await axios.post(`${API}/api/contact`, form);
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        company: "",
        service: "",
        budget: "",
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
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <div className="fade-in">
            <p className="section-label light">Get in touch</p>
            <h1 className="page-hero-title">
              Let's build something that lasts.
            </h1>
            <p className="page-hero-sub">
              Tell us what you are solving, where you are stuck, or what you
              need to ship next. We'll respond within one business day.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info fade-in">
            <h2 className="contact-info-title">How to reach us</h2>

            <div className="contact-detail-card">
              <div className="contact-detail-icon-wrap">
                <Mail size={18} strokeWidth={1.5} color="var(--sw-green)" />
              </div>
              <div>
                <p className="contact-detail-label">Email</p>
                <a
                  href="mailto:hello@stackwiseza.co.za"
                  className="contact-detail-val"
                >
                  hello@stackwiseza.co.za
                </a>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="contact-detail-icon-wrap">
                <MapPin size={18} strokeWidth={1.5} color="var(--sw-green)" />
              </div>
              <div>
                <p className="contact-detail-label">Location</p>
                <p className="contact-detail-val">Johannesburg, Gauteng</p>
                <p className="contact-detail-sub">Remote worldwide</p>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="contact-detail-icon-wrap">
                <Clock size={18} strokeWidth={1.5} color="var(--sw-green)" />
              </div>
              <div>
                <p className="contact-detail-label">Response time</p>
                <p className="contact-detail-val">Within 1 business day</p>
              </div>
            </div>

            <div className="contact-socials">
              <p className="contact-socials-label">Connect</p>
              <div className="socials-row">
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
              </div>
            </div>

            <div className="bbee-badge">
              <div className="bbee-flag">ZA</div>
              <div>
                <p className="bbee-title">Level 1 B-BBEE EME</p>
                <p className="bbee-sub">
                  100% Black & Youth Owned · Reg. 2026/606439/07
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap fade-in fade-in-delay-1">
            {success ? (
              <div className="contact-success">
                <CheckCircle
                  size={48}
                  strokeWidth={1.5}
                  color="var(--sw-green)"
                />
                <h3>Message sent</h3>
                <p>
                  Thank you for reaching out. We will be in touch within one
                  business day.
                </p>
                <button
                  className="btn-primary"
                  onClick={() => setSuccess(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your name *</label>
                    <input
                      name="name"
                      className="form-input"
                      placeholder="Thabo Nkosi"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email address *</label>
                    <input
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="thabo@company.co.za"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input
                      name="company"
                      className="form-input"
                      placeholder="Your company name"
                      value={form.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Service needed</label>
                    <select
                      name="service"
                      className="form-input"
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="">Select a service…</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Budget range</label>
                  <select
                    name="budget"
                    className="form-input"
                    value={form.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select a range…</option>
                    <option>Under R10,000</option>
                    <option>R10,000 – R30,000</option>
                    <option>R30,000 – R75,000</option>
                    <option>R75,000+</option>
                    <option>Monthly retainer</option>
                    <option>Not sure yet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message"
                    className="form-input form-textarea"
                    placeholder="Tell us about your project, the problem you're solving, or what you need help with…"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>

                <label className="consent-label">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={form.consent}
                    onChange={handleChange}
                  />
                  <span>
                    I consent to StackWise storing my information to respond to
                    this enquiry. See our <a href="/privacy">Privacy Policy</a>.
                  </span>
                </label>

                {status && <p className="form-error">{status}</p>}

                <button
                  type="submit"
                  className="btn-primary btn-full"
                  disabled={sending}
                >
                  {sending ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
