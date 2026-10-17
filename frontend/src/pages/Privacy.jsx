import "./Privacy.css";

export default function Privacy() {
  return (
    <main className="privacy">
      <div className="privacy-content">
        <div className="privacy-header">
          <a href="/" className="back-link">
            ← Back to StackWise
          </a>
          <h1>Privacy Policy</h1>
          <p className="privacy-date">
            StackWise (Pty) Ltd · Last updated: 17 October 2026
          </p>
        </div>
        <section>
          <h2>Who we are</h2>
          <p>
            <strong>StackWise (Pty) Ltd</strong>, registration number
            2026/606439/07, is a South African registered software engineering,
            cloud, and cybersecurity consultancy based in Johannesburg, Gauteng.
            Contact us at{" "}
            <a href="mailto:stackwiseza@gmail.com">stackwiseza@gmail.com</a>.
          </p>
        </section>
        <section>
          <h2>Information we collect</h2>
          <p>
            When you submit the contact form, we collect your name, email
            address, subject, and message. We use this information solely to
            respond to your enquiry. We do not sell or share your information
            with third parties.
          </p>
        </section>
        <section>
          <h2>POPIA compliance</h2>
          <p>
            StackWise (Pty) Ltd is committed to complying with the Protection of
            Personal Information Act (POPIA), Act 4 of 2013. To request access,
            correction, or deletion of your information, contact us at{" "}
            <a href="mailto:stackwiseza@gmail.com">stackwiseza@gmail.com</a>.
          </p>
        </section>
        <section>
          <h2>Analytics</h2>
          <p>
            This site uses Google Analytics to measure traffic and usage. Google
            Analytics may collect anonymised data about your visit. See{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              Google's Privacy Policy
            </a>{" "}
            for details.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            For any privacy questions contact StackWise (Pty) Ltd at{" "}
            <a href="mailto:stackwiseza@gmail.com">stackwiseza@gmail.com</a> or
            visit{" "}
            <a href="https://www.stackwiseza.co.za">www.stackwiseza.co.za</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
