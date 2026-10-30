import { Component, lazy, Suspense, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Icon from './Icon.jsx';

const Scene = lazy(() => import('./HeroScene.jsx'));
const reducedQuery = '(prefers-reduced-motion: reduce)';
const desktopQuery = '(min-width: 768px) and (pointer: fine)';

function useMedia(query) {
  return useSyncExternalStore(
    callback => {
      const media = window.matchMedia(query);
      media.addEventListener('change', callback);
      return () => media.removeEventListener('change', callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function OrbitIllustration() {
  return <svg className="orbit-illustration" viewBox="0 0 520 520" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="orb-fill" cx=".35" cy=".25"><stop stopColor="#d4f5c2" /><stop offset=".45" stopColor="#82b594" /><stop offset="1" stopColor="#183a31" /></radialGradient>
      <linearGradient id="ring-stroke"><stop stopColor="#bce9a0" /><stop offset=".5" stopColor="#6caba2" stopOpacity=".25" /><stop offset="1" stopColor="#bce9a0" /></linearGradient>
    </defs>
    <circle cx="260" cy="260" r="205" stroke="currentColor" strokeDasharray="2 12" opacity=".22" />
    <g stroke="url(#ring-stroke)" strokeWidth="1.5">
      <ellipse cx="260" cy="260" rx="190" ry="80" transform="rotate(-32 260 260)" />
      <ellipse cx="260" cy="260" rx="190" ry="80" transform="rotate(32 260 260)" />
      <ellipse cx="260" cy="260" rx="190" ry="80" transform="rotate(90 260 260)" />
    </g>
    <circle cx="260" cy="260" r="88" fill="url(#orb-fill)" />
    <g stroke="#d4f5c2" opacity=".28">
      <ellipse cx="260" cy="260" rx="88" ry="32" />
      <ellipse cx="260" cy="260" rx="34" ry="88" transform="rotate(-25 260 260)" />
      <path d="m189 209 142 102m-142 0 142-102M172 260h176" />
    </g>
    <circle cx="98" cy="170" r="10" fill="#bce9a0" />
    <circle cx="409" cy="159" r="7" fill="#78c6d3" />
    <circle cx="308" cy="429" r="8" fill="#d9b786" />
    <circle cx="102" cy="171" r="18" stroke="#bce9a0" opacity=".3" />
  </svg>;
}

export default function HeroVisual() {
  const container = useRef(null);
  const reduced = useMedia(reducedQuery);
  const desktop = useMedia(desktopQuery);
  const [enabled, setEnabled] = useState(() => {
    try { return localStorage.getItem('portfolio-motion') !== 'off'; } catch { return true; }
  });
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const saveData = navigator.connection?.saveData;
  const eligible = enabled && !reduced && desktop && !saveData && !failed;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(container.current);
    const visibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    if (!eligible || !visible || hidden) return;
    const timer = setTimeout(() => {
      try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('webgl2');
        if (!context) { setFailed(true); return; }
        context.getExtension('WEBGL_lose_context')?.loseContext();
        setReady(true);
      } catch {
        setFailed(true);
      }
    }, 1400);
    return () => clearTimeout(timer);
  }, [eligible, visible, hidden]);

  function toggle() {
    setEnabled(!enabled);
    try { localStorage.setItem('portfolio-motion', enabled ? 'off' : 'on'); } catch { /* Storage is optional. */ }
  }

  return <div ref={container} className="hero-visual">
    <div className="visual-topline"><span className="tiny-label">A LITTLE STRUCTURE. A LITTLE CURIOSITY.</span><span className="visual-cross">+</span></div>
    <div className="orb-container" aria-hidden="true">
      <OrbitIllustration />
      {eligible && ready && visible && !hidden && <SceneBoundary onFailure={() => setFailed(true)}>
        <Suspense fallback={null}><Scene onFailure={() => setFailed(true)} /></Suspense>
      </SceneBoundary>}
      <span className="orbit-tag tag-cloud"><Icon name="cloud" size={15} /> cloud</span>
      <span className="orbit-tag tag-code"><Icon name="code" size={15} /> code</span>
      <span className="orbit-tag tag-systems"><Icon name="layers" size={15} /> systems</span>
    </div>
    <div className="visual-bottomline">
      <span className="tiny-label">BUILT TO CONNECT.</span>
      <button className="motion-toggle" type="button" onClick={toggle} aria-pressed={eligible} disabled={reduced || !desktop || saveData || failed}>
        <Icon name={eligible ? 'pause' : 'play'} size={12} />
        {reduced ? 'Reduced motion' : failed || !desktop || saveData ? 'Static view' : enabled ? 'Pause motion' : 'Enable motion'}
      </button>
    </div>
  </div>;
}
