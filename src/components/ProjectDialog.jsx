import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import RichText from './RichText.jsx';

export default function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null);
  const [copied, setCopied] = useState('');
  const timeout = useRef(null);

  useEffect(() => {
    if (!project) return;
    const element = dialog.current;
    const trigger = document.activeElement;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
      if (trigger === document.body && window.location.hash === '#projects') document.getElementById('projects')?.scrollIntoView();
      clearTimeout(timeout.current);
    };
  }, [project]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied('Link copied');
    } catch {
      setCopied('Copy the link from your address bar');
    }
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(''), 3500);
  }

  return (
    <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={event => { event.preventDefault(); onClose(); }}>
      {project && <>
        <div className="dialog-top">
          <span className="eyebrow">{project.category}</span>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close project details"><Icon name="close" /></button>
        </div>
        <h2 id="project-dialog-title">{project.projectName}</h2>
        <p className="muted">{project.projectDate}</p>
        <img className="dialog-image" src={`/generated/${project.image}-960.webp`} alt={`${project.title} project preview`} width="960" height="540" />
        <div className="rich-text"><RichText>{project.projectDescription}</RichText></div>
        <h3>Behind the project</h3>
        {[project.breifDescription1, project.breifDescription2, project.breifDescription3].filter(Boolean).map((text, index) => <p className="rich-text" key={index}><RichText>{text}</RichText></p>)}
        <div className="dialog-actions">
          <a className="button button-primary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">Explore the project <Icon name="arrow" size={17} /></a>
          <button className="button button-secondary" type="button" onClick={copyLink}>Copy project link</button>
        </div>
        <p className="copy-status" role="status">{copied}</p>
      </>}
    </dialog>
  );
}
