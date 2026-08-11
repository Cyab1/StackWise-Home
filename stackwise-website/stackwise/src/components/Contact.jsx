import { useRef, useState } from 'react';
import useReveal from '../hooks/useReveal';
import './Contact.css';

// Replace with your Formspree endpoint, e.g. "https://formspree.io/f/xxxxabcd"
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrewyqwn';

export default function Contact() {
  const ref = useRef(null);
  useReveal(ref);

  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container contact__inner">
        <div className="contact__left reveal">
          <p className="eyebrow eyebrow--light">Contact</p>
          <h2 className="contact__title">Let&rsquo;s work together.</h2>
          <p className="contact__text">
            Have a project in mind, or just want to talk through an idea? I&rsquo;d
            love to hear from you.
          </p>

          <ul className="contact__details">
            <li>
              <span className="contact__label">Email</span>
              <a href="mailto:stackwiseza@gmail.com" className="contact__value">
                stackwiseza@gmail.com
              </a>
            </li>
            <li>
              <span className="contact__label">LinkedIn</span>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="contact__value"
              >
                linkedin.com/in/stackwise
              </a>
            </li>
            <li>
              <span className="contact__label">Location</span>
              <span className="contact__value">Johannesburg, South Africa</span>
            </li>
          </ul>
        </div>

        <form
          className="contact__form reveal reveal-delay-1"
          onSubmit={handleSubmit}
        >
          <div className="contact__field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" required />
          </div>

          <div className="contact__field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>

          <div className="contact__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Tell me a bit about your project..."
              required
            />
          </div>

          <button type="submit" className="btn btn-solid-teal contact__submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'success' && (
            <p className="contact__status contact__status--success">
              Thanks — your message has been sent. I&rsquo;ll be in touch soon.
            </p>
          )}
          {status === 'error' && (
            <p className="contact__status contact__status--error">
              Something went wrong. Please email me directly at stackwiseza@gmail.com.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
