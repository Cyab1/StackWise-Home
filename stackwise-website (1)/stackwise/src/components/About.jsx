import { useRef } from 'react';
import useReveal from '../hooks/useReveal';
import './About.css';

const STACK = ['React', 'Python', 'Django', 'AWS', 'SQL', 'Git', 'REST APIs'];

const CERTS = [
  { name: 'HyperionDev — Software Engineering', color: 'var(--teal-medium)' },
  { name: 'FNB App Academy', color: 'var(--teal-soft)' },
  { name: 'Coursera — Cybersecurity', color: 'var(--coral)' },
  { name: 'Coursera — Project Management', color: 'var(--amber)' },
  { name: 'AWS Cloud Practitioner (in progress)', color: 'var(--blue)' },
];

export default function About() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container about__inner">
        <div className="about__left reveal">
          <p className="eyebrow">About</p>
          <h2 className="about__title">
            Multi-skilled. Deeply technical. Trustworthy.
          </h2>
          <p className="about__text">
            I&rsquo;m a full-stack developer growing into cloud security engineering —
            comfortable across the stack, from interface to infrastructure. Based in
            Johannesburg, I work with clients locally and abroad who need software
            that&rsquo;s built well, secured properly, and delivered on time. I bring
            structured project management to every engagement, so nothing falls
            through the cracks between idea and launch.
          </p>
        </div>

        <div className="about__right">
          <div className="about__block reveal reveal-delay-1">
            <h3 className="about__block-title">Tech stack</h3>
            <div className="about__pills">
              {STACK.map((tech) => (
                <span key={tech} className="about__pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="about__block reveal reveal-delay-2">
            <h3 className="about__block-title">Certifications &amp; training</h3>
            <ul className="about__certs">
              {CERTS.map((cert) => (
                <li key={cert.name} className="about__cert">
                  <span className="about__cert-dot" style={{ background: cert.color }} />
                  {cert.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
