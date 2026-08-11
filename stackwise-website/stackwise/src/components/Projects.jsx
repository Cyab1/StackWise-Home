import { useRef } from 'react';
import useReveal from '../hooks/useReveal';
import './Projects.css';

const PROJECTS = [
  {
    key: 'securetask',
    name: 'SecureTask',
    desc: 'A full-stack project management app with role-based access and audit logging built in from day one.',
    tags: ['React', 'Django', 'AWS'],
  },
  {
    key: 'shieldscan',
    name: 'ShieldScan',
    desc: 'A security audit tool that scans web applications for common vulnerabilities and reports fixes.',
    tags: ['Python', 'Flask', 'React'],
  },
  {
    key: 'vaultapi',
    name: 'VaultAPI',
    desc: 'A secure serverless API for storing and retrieving sensitive data with fine-grained access control.',
    tags: ['Python', 'AWS Lambda'],
  },
];

export default function Projects() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <div className="projects__head reveal">
          <p className="eyebrow">Selected work</p>
          <h2 className="projects__title">Projects</h2>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <article key={p.key} className={`project-card reveal reveal-delay-${i + 1}`}>
              <div className="project-card__bar" />
              <div className="project-card__body">
                <h3 className="project-card__name">{p.name}</h3>
                <p className="project-card__desc">{p.desc}</p>
                <div className="project-card__tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="project-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="#contact" className="project-card__link" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  View project <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
