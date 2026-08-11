import Logo from './Logo';
import './Footer.css';

const LINKS = [
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  const handleClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a
          href="#top"
          className="footer__logo"
          onClick={(e) => handleClick(e, 'top')}
        >
          <Logo variant="dark" />
        </a>

        <nav className="footer__links" aria-label="Footer">
          {LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={(e) => handleClick(e, link.id)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__meta">
          <p>Johannesburg · Remote Worldwide</p>
          <p>&copy; 2026 StackWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
