import { useEffect } from 'react';

// Attaches an IntersectionObserver to all elements with class "reveal"
// inside the given ref, adding "is-visible" once they enter the viewport.
export default function useReveal(ref) {
  useEffect(() => {
    const root = ref?.current;
    if (!root) return;

    const els = root.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ref]);
}
