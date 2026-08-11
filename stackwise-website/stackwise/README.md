# StackWise Website

A single-page React + Vite site for StackWise, a Johannesburg-based software engineering, cloud, and cybersecurity consultancy.

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploying to Vercel (free)

1. Push this project to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. Framework preset: Vite (auto-detected). No extra config needed.
4. Deploy.

## Before going live

- **Contact form:** open `src/components/Contact.jsx` and replace `FORMSPREE_ENDPOINT` with your real Formspree endpoint (e.g. `https://formspree.io/f/xxxxabcd`), from https://formspree.io.
- **LinkedIn link:** update the placeholder LinkedIn URL in `src/components/Contact.jsx`.
- **Project links:** the "View project →" links on the Projects section currently scroll to Contact. Point them at live demos or repos once available.

## Project structure

```
src/
  components/       # Navbar, Hero, Services, About, Projects, Contact, Footer, Logo
  hooks/            # useReveal (scroll animations), useActiveSection (nav highlight)
  App.jsx
  index.css         # design tokens (colors, fonts, spacing) + shared utility classes
  main.jsx
```
