export const legacySections = {
  mainPage: 'home',
  projects: 'projects',
  career: 'experience',
  experience: 'experience',
  education: 'education',
  skills: 'skills',
  awards: 'awards',
  certifications: 'certifications',
  certificates: 'certifications',
  about: 'about',
  contact: 'contact',
};

export function legacyTarget(path, hash = '') {
  const fragment = hash.replace(/^#\/?/, '').replace(/\/$/, '');
  const route = path.replace(/^\/portfolio\/?/, '').replace(/^\/|\/$/g, '');
  const section = Object.hasOwn(legacySections, fragment) ? legacySections[fragment]
    : Object.hasOwn(legacySections, route) ? legacySections[route] : null;
  if (section) return section === 'home' ? '/' : `/#${section}`;
  if (fragment === 'home' || !fragment) return '/';
  return /^project-[a-z0-9-]+$/.test(fragment) ? `/#${fragment}` : '/';
}

export function normalizeLegacyHash() {
  const hash = window.location.hash;
  if (hash.startsWith('#/') || hash === '#career' || hash === '#certificates') {
    window.history.replaceState(null, '', legacyTarget('/', hash));
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
}

export function subscribeHash(listener) {
  window.addEventListener('hashchange', listener);
  return () => window.removeEventListener('hashchange', listener);
}

export const getHash = () => window.location.hash;

export function closeProject() {
  window.history.replaceState(null, '', '#projects');
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}
