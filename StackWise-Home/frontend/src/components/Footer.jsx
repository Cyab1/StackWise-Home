import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#085041" />
              <rect
                x="11"
                y="6"
                width="10"
                height="5"
                rx="2.5"
                fill="#5DCAA5"
              />
              <rect
                x="7"
                y="13"
                width="18"
                height="5"
                rx="2.5"
                fill="#5DCAA5"
                opacity="0.75"
              />
              <rect
                x="3"
                y="20"
                width="26"
                height="5"
                rx="2.5"
                fill="#5DCAA5"
                opacity="0.5"
              />
            </svg>
            <span>StackWise</span>
          </Link>
          <p className="footer-desc">
            South African software engineering, cloud, and cybersecurity
            expertise for businesses building what matters.
          </p>
          <div className="footer-socials">
            <a
              href="https://linkedin.com/company/stackwise-pty"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="https://github.com/Cyab1" target="_blank" rel="noreferrer">
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

        <div className="footer-links">
          <div className="footer-col">
            <p className="footer-col-title">Navigate</p>
            <Link to="/news">News & Updates</Link>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Products</p>
            <a
              href="https://shieldscan.stackwiseza.co.za"
              target="_blank"
              rel="noreferrer"
            >
              ShieldScan
            </a>
            <a
              href="https://uptimewatch.stackwiseza.co.za"
              target="_blank"
              rel="noreferrer"
            >
              UptimeWatch
            </a>
            <a href="https://github.com/Cyab1" target="_blank" rel="noreferrer">
              SecureTask
            </a>
            <a href="https://github.com/Cyab1" target="_blank" rel="noreferrer">
              VaultAPI
            </a>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Legal</p>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/paia">PAIA Manual</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            © 2026 STACKWISE (Pty) Ltd · Reg. 2026/606439/07 · Level 1 B-BBEE
            EME · 100% Black & Youth Owned
          </p>
          <a href="mailto:hello@stackwiseza.co.za">hello@stackwiseza.co.za</a>
        </div>
      </div>
    </footer>
  );
}
