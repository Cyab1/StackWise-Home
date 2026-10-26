import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-brand">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#085041" />
            <rect x="11" y="6" width="10" height="5" rx="2.5" fill="#5DCAA5" />
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
          <span className="brand-name">StackWise</span>
        </Link>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className={isActive("/") ? "active" : ""}>
            Home
          </Link>
          <Link
            to="/services"
            className={isActive("/services") ? "active" : ""}
          >
            Services
          </Link>
          <Link to="/about" className={isActive("/about") ? "active" : ""}>
            About
          </Link>
          <Link to="/news" className={isActive("/news") ? "active" : ""}>
            News
          </Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""}>
            Contact
          </Link>
          <Link to="/contact" className="nav-cta">
            Let's talk
          </Link>
        </div>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
