import { useEffect, useState } from 'react';

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

// Fetches public repo metadata from the GitHub REST API (no auth needed).
// repoSlug is "owner/repo". Pass null/empty to skip fetching (e.g. private
// or not-yet-published repos) — the component decides what to render then.
export default function useGithubRepo(repoSlug) {
  const [state, setState] = useState({ status: repoSlug ? 'loading' : 'skipped', data: null });

  useEffect(() => {
    if (!repoSlug) {
      setState({ status: 'skipped', data: null });
      return;
    }

    let cancelled = false;
    setState({ status: 'loading', data: null });

    fetch(`https://api.github.com/repos/${repoSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        setState({
          status: 'success',
          data: {
            stars: json.stargazers_count,
            language: json.language,
            updated: timeAgo(json.pushed_at),
            url: json.html_url,
          },
        });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', data: null });
      });

    return () => {
      cancelled = true;
    };
  }, [repoSlug]);

  return state;
}
