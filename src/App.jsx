import { useEffect, useState, useSyncExternalStore } from 'react';
import Navigation from './components/Navigation.jsx';
import HeroVisual from './components/HeroVisual.jsx';
import Icon from './components/Icon.jsx';
import RichText from './components/RichText.jsx';
import ProjectDialog from './components/ProjectDialog.jsx';
import { awards, capabilities, education, experience, profile, projects } from './data/portfolio.js';
import certificates from './data/certificates.js';
import { closeProject, getHash, normalizeLegacyHash, subscribeHash } from './navigation.js';

function SectionHeading({ number, eyebrow, title, children }) {
  return <div className="section-heading">
    <div><p className="eyebrow"><span>{number} /</span> {eyebrow}</p><h2>{title}</h2></div>
    {children && <p className="section-description">{children}</p>}
  </div>;
}

function ProjectCard({ project }) {
  const focusTrigger = event => event.currentTarget.focus({ preventScroll: true });
  return <article className={`project-card project-${project.id}`}>
    <a className="project-image-link" href={`#project-${project.id}`} aria-label={`View ${project.title}`} onClick={focusTrigger}>
      <img src={`/generated/${project.image}-480.webp`} srcSet={`/generated/${project.image}-480.webp 480w, /generated/${project.image}-960.webp 960w`} sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 360px" alt={`${project.title} preview`} width="480" height="300" loading="lazy" decoding="async" />
      <span className="project-image-action"><Icon name="arrow" /></span>
    </a>
    <div className="project-content">
      <p className="tiny-label">{project.category}</p>
      <h3><a href={`#project-${project.id}`} onClick={focusTrigger}>{project.title}</a></h3>
      <p className="project-summary"><RichText>{project.projectDescription}</RichText></p>
      <div className="project-footer"><ul className="tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><a href={`#project-${project.id}`} className="text-link" aria-label={`Details about ${project.title}`} onClick={focusTrigger}>Details <Icon name="arrow" size={15} /></a></div>
    </div>
  </article>;
}

function ExperienceCard({ item, index }) {
  const points = item.workDone.split(/<br\s*\/?>/i).map(point => point.trim().replace(/^•\s*/, '')).filter(Boolean);
  return <article className={`experience-card${index === 0 ? ' current-role' : ''}`}>
    <div className="experience-meta"><span className="company-monogram">{item.corp.slice(0, 1)}</span><p>{item.time}</p><span className="muted">{item.location}</span></div>
    <div className="experience-body">
      <div className="role-heading"><h3>{item.corp}</h3>{index === 0 && <span className="status-tag"><span /> CURRENT</span>}</div>
      <p className="role-title">{item.position}</p>
      <p className="role-summary"><RichText>{points[0]}</RichText></p>
      {points.length > 1 && <details className="role-details"><summary>Explore the work <Icon name="down" size={15} /></summary><ul>{points.slice(1).map((point, i) => <li key={i}><RichText>{point}</RichText></li>)}</ul></details>}
    </div>
  </article>;
}

function Award({ item }) {
  return <article className="award-card"><Icon name="award" size={25} /><p className="tiny-label">{item.time}</p><h3>{item.award}</h3><p>{item.desc}</p></article>;
}

function getTheme() {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* Continue with the system preference when storage is unavailable. */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [theme, setTheme] = useState(getTheme);
  const hash = useSyncExternalStore(subscribeHash, getHash, () => '');
  const activeProject = projects.find(project => hash === `#project-${project.id}`);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111715' : '#f6f7f2');
  }, [theme]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const legacy = window.location.hash.startsWith('#/') || window.location.hash === '#career' || window.location.hash === '#certificates';
    normalizeLegacyHash();
    if (activeProject) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const element = document.getElementById(id);
    if (!element) return;
    const details = element.closest('details');
    const needsExpansion = details && !details.open;
    if (details) details.open = true;
    if (!legacy && !needsExpansion) return;
    const frame = requestAnimationFrame(() => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
    return () => cancelAnimationFrame(frame);
  }, [hash, activeProject]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('portfolio-theme', next); } catch { /* Theme still works without storage. */ }
  }

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navigation theme={theme} onThemeChange={toggleTheme} />
    <main id="main-content">
      <section id="home" className="hero section-container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="availability-dot" /> SOFTWARE ENGINEER. ENDLESSLY CURIOUS.</p>
          <p className="hero-intro">Hey, I'm Priyansh.</p>
          <h1 id="hero-title">Building systems.<br /><span>Making an impact.</span></h1>
          <p className="hero-description">From cloud infrastructure to thoughtful applications. I enjoy turning complex problems into things that simply work.</p>
          <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <Icon name="arrow" size={18} /></a><a className="button button-secondary" href={profile.resume} download="PriyanshChoudhary_Resume.pdf">Resume <Icon name="download" size={17} /></a></div>
          <div className="hero-person"><img src="/generated/portrait-160.webp" alt="" width="44" height="44" /><div><strong>Currently at Microsoft</strong><span>Building resilient cloud systems</span></div><a href={profile.github} aria-label="Explore Priyansh's GitHub" target="_blank" rel="noopener noreferrer"><Icon name="code" size={22} /></a></div>
        </div>
        <HeroVisual />
        <a className="scroll-cue" href="#about"><span className="scroll-line" /> A LITTLE MORE ABOUT ME <Icon name="down" size={14} /></a>
      </section>

      <div className="company-strip"><div className="section-container"><span className="tiny-label">A JOURNEY THROUGH</span><span>Microsoft</span><span>Cloudera<span className="company-period">.</span></span><span>DELL<span className="company-small"> Technologies</span></span><span>HighRadius</span><span>KPMG</span></div></div>

      <section id="about" className="section-container section-block about-section" aria-labelledby="about-title">
        <div><p className="eyebrow"><span>01 /</span> THE PERSON BEHIND THE CODE</p><h2 id="about-title">Curiosity is the<br />common thread<span className="accent">.</span></h2><a className="text-link" href="#contact">Say hello <Icon name="arrow" size={17} /></a></div>
        <div className="about-copy"><div className="rich-text"><RichText>{profile.about}</RichText></div><div className="about-notes"><span><Icon name="cloud" /> Cloud & infrastructure</span><span><Icon name="code" /> Open-source contributor</span><span><Icon name="layers" /> Full-stack perspective</span></div></div>
      </section>

      <section id="experience" className="section-container section-block" aria-label="Experience">
        <SectionHeading number="02" eyebrow="THE JOURNEY" title={<>Good teams.<br />Meaningful work.</>}>Building, learning, and contributing across cloud platforms and software teams.</SectionHeading>
        <div className="experience-list">{experience.slice(0, 3).map((item, index) => <ExperienceCard item={item} index={index} key={`${item.corp}-${item.time}`} />)}</div>
        <details className="collection-details"><summary><span>Earlier experience <span className="count-badge">{experience.length - 3}</span></span><Icon name="down" size={18} /></summary><div className="experience-list">{experience.slice(3).map((item, index) => <ExperienceCard item={item} index={index + 3} key={`${item.corp}-${item.time}`} />)}</div></details>
      </section>

      <section id="projects" className="section-container section-block" aria-label="Projects">
        <SectionHeading number="03" eyebrow="SELECTED WORK" title={<>Ideas, made real<span className="accent">.</span></>}>A few things I've built. Different problems, different tools, the same curiosity.</SectionHeading>
        <div className="project-grid">{projects.filter(project => project.featured).map(project => <ProjectCard key={project.id} project={project} />)}</div>
        <details className="collection-details"><summary><span>More projects <span className="count-badge">{projects.filter(project => !project.featured).length}</span></span><Icon name="down" size={18} /></summary><div className="project-grid">{projects.filter(project => !project.featured).map(project => <ProjectCard key={project.id} project={project} />)}</div></details>
      </section>

      <section id="skills" className="stack-section section-block" aria-label="Technology stack">
        <div className="section-container">
          <SectionHeading number="04" eyebrow="TOOLS WITH PURPOSE" title={<>More than a<br />list of languages<span className="accent">.</span></>}>The technology stack is just the starting point. It's how the pieces come together that matters.</SectionHeading>
          <div className="capability-grid">{capabilities.map(capability => <article className="capability-card" key={capability.title}><span className={`capability-icon tone-${capability.color}`}><Icon name={capability.icon} size={25} /></span><h3>{capability.title}</h3><p>{capability.description}</p><ul className="capability-tools">{capability.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></article>)}</div>
        </div>
      </section>

      <section id="awards" className="section-container section-block" aria-label="Recognition">
        <SectionHeading number="05" eyebrow="MOMENTS THAT MATTER" title={<>A little recognition<span className="accent">.</span></>}>Milestones from the work, the teams, and the challenges along the way.</SectionHeading>
        <div className="award-grid">{awards.slice(0, 3).map((item, index) => <Award item={item} key={index} />)}</div>
        <details className="collection-details"><summary><span>All awards & achievements <span className="count-badge">{awards.length}</span></span><Icon name="down" size={18} /></summary><div className="award-grid">{awards.slice(3).map((item, index) => <Award item={item} key={index} />)}</div></details>
        <details id="certifications" className="collection-details"><summary><span>Certifications & learning <span className="count-badge">{certificates.reduce((total, group) => total + group.items.length, 0)}</span></span><Icon name="down" size={18} /></summary><div className="certificate-groups">{certificates.map(group => <div key={group.group}><h3>{group.group}</h3><ul>{group.items.map(item => <li key={item.name}><a href={item.url} target="_blank" rel="noopener noreferrer"><Icon name="file" size={17} /><span>{item.name}</span><Icon name="arrow" size={15} /></a></li>)}</ul></div>)}</div></details>
      </section>

      <section id="education" className="section-container section-block education-section" aria-label="Education">
        <SectionHeading number="06" eyebrow="THE FOUNDATIONS" title={<>Where it started<span className="accent">.</span></>} />
        <div className="education-list">{education.map(item => <article key={item.institution}><span className="tiny-label">{item.time}</span><div><h3>{item.institution}</h3><p>{item.qualification} <span className="muted"> / {item.place}</span></p></div><span className="education-result">{item.remarks}</span></article>)}</div>
      </section>

      <section id="contact" className="contact-section section-container" aria-labelledby="contact-title">
        <div><p className="eyebrow"><span>07 /</span> KEEP THE CONVERSATION GOING</p><h2 id="contact-title">Good things start<br />with a hello<span className="accent">.</span></h2><p>A project, an interesting problem, or just a conversation.<br />I'd love to hear from you.</p><a className="button button-primary" href={profile.email}>Let's talk <Icon name="arrow" size={19} /></a></div>
        <div className="contact-links"><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><Icon name="arrow" /></a><a href={profile.github} target="_blank" rel="noopener noreferrer"><span>GitHub</span><Icon name="arrow" /></a><a href={profile.email}><span>Email</span><Icon name="arrow" /></a><details className="social-details"><summary>Elsewhere <Icon name="down" size={16} /></summary><div>{['twitter', 'youtube', 'instagram', 'discord', 'facebook'].map(name => <a key={name} href={profile[name]} target="_blank" rel="noopener noreferrer">{name === 'twitter' ? 'Twitter / X' : name}<Icon name="arrow" size={14} /></a>)}</div></details></div>
      </section>
    </main>
    <footer className="site-footer section-container"><span>Priyansh Choudhary <span className="muted"> / Always a work in progress.</span></span><a href="#home">Back to top <Icon name="arrow" size={15} /></a></footer>
    <ProjectDialog key={activeProject?.id || 'closed'} project={activeProject} onClose={closeProject} />
  </>;
}
