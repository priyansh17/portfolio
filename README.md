## PRIYANSH CHOUDHARY — Personal Portfolio ##

A modern, responsive personal portfolio website built with **React 18**, featuring an animated background, collapsible navigation, and dedicated pages for projects, education, career, skills, and achievements.

**Live:** [priyanshc.com](https://priyanshc.com)

---

## Features

- **Animated Orb Background** — Floating gradient orbs rendered via CSS animations for a polished visual aesthetic.
- **Responsive Navbar** — Collapsible Bootstrap navigation bar that adapts to all screen sizes.
- **Multi-Page Layout** — Client-side routing (React Router v6, HashRouter) with pages for:
  - Projects
  - Education
  - Career / Work Experience
  - Skills
  - Awards & Achievements
- **Certificate Carousel** — Image slider powered by `react-slick` for browsing certificates.
- **Social Links & Resume Download** — Footer with links to LinkedIn, GitHub, Twitter, YouTube, Instagram, Discord, and a downloadable resume.
- **GitHub Pages Deployment** — One-command deploy via `gh-pages`.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI Framework | React 18 |
| Routing | React Router v6 |
| Component Library | Material UI (MUI) 5, React Bootstrap 5 |
| Icons | Font Awesome 6 |
| Carousel | react-slick / slick-carousel |
| Deployment | GitHub Pages (`gh-pages`) |

---

## Customisation

To adapt this portfolio for your own use:

1. **Personal info** — Edit `src/stringConst.js` (name, bio, social links).
2. **Homepage cards** — Edit `src/homepageData.js`.
3. **Page content** — Update the `*Data.js` files inside `src/Pages/` (projects, education, career, skills, awards).
4. **Media assets** — Replace images in `src/media/`.
5. **Domain** — Update `public/CNAME` and the `homepage` field in `package.json`.

---

## License

This project is open source and available for personal use.
