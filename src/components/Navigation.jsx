import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

const links = [
  ['about', 'About'],
  ['experience', 'Experience'],
  ['projects', 'Work'],
  ['skills', 'Stack'],
  ['awards', 'Recognition'],
];

export default function Navigation({ theme, onThemeChange }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const toggle = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = event => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onResize = () => { if (window.innerWidth > 900) setOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="nav-container">
        <a className="brand" href="#home" aria-label="Priyansh Choudhary, home" onClick={() => setOpen(false)}>
          <span className="brand-mark">p<span>.</span></span>
          <span className="brand-name">priyansh<span className="muted"> / </span><span className="brand-caption">engineer & builder</span></span>
        </a>
        <nav id="primary-navigation" aria-label="Main navigation" className={`nav-links${open ? ' is-open' : ''}`}>
          {links.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Let's talk <Icon name="arrow" size={16} /></a>
        </nav>
        <div className="nav-tools">
          <button type="button" className="icon-button" onClick={onThemeChange} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19} />
          </button>
          <button ref={toggle} type="button" className="icon-button menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}
