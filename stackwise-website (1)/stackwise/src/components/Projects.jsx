import { useRef } from 'react';
import useReveal from '../hooks/useReveal';
import useGithubRepo from '../hooks/useGithubRepo';
import './Projects.css';

// Set each to "your-github-username/repo-name" once the repos are public.
// Leave as null to skip the live-stats fetch and show the static tags only.
const REPO_SLUGS = {
  securetask: null,
  shieldscan: null,
  vaultapi: null,
};

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

function GithubBadge({ repoSlug }) {
  const { status, data } = useGithubRepo(repoSlug);

  if (status === 'skipped') return null;
  if (status === 'loading') return <p className="project-card__gh project-card__gh--muted">Checking repo status…</p>;
  if (status === 'error') return <p className="project-card__gh project-card__gh--muted">Repository private</p>;

  return (
    <p className="project-card__gh">
      <span aria-hidden="true">★</span> {data.stars} · {data.language} · updated {data.updated}
    </p>
  );
}

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
          {PROJECTS.map((p, i) => {
            const repoSlug = REPO_SLUGS[p.key];
            return (
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

                  <GithubBadge repoSlug={repoSlug} />

                  <a
                    href={repoSlug ? `https://github.com/${repoSlug}` : '#contact'}
                    target={repoSlug ? '_blank' : undefined}
                    rel={repoSlug ? 'noreferrer' : undefined}
                    className="project-card__link"
                    onClick={(e) => {
                      if (repoSlug) return;
                      e.preventDefault();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View project <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
