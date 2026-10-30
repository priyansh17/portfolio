const paths = {
  arrow: 'M7 17 17 7M7 7h10v10',
  down: 'm6 9 6 6 6-6',
  right: 'M4 12h16m-6-6 6 6-6 6',
  cloud: 'M7 18a5 5 0 1 1 1-9 6 6 0 0 1 11 2 3.5 3.5 0 0 1-1 7Z',
  code: 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16',
  database: 'M4 6c0-4 16-4 16 0s-16 4-16 0Zm0 0v12c0 4 16 4 16 0V6M4 12c0 4 16 4 16 0',
  layers: 'm12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5',
  shield: 'm12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Zm-4 9 3 3 5-6',
  activity: 'M2 12h4l3-8 6 16 3-8h4',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  moon: 'M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10Z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  award: 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 12l-2 9 6-3 6 3-2-9',
  mail: 'M3 5h18v14H3Zm0 1 9 7 9-7',
  play: 'm9 5 11 7-11 7Z',
  pause: 'M8 5v14M16 5v14',
  file: 'M14 2H5v20h14V7Zm0 0v5h5M8 12h8M8 16h6',
};

export default function Icon({ name, size = 20, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name] || paths.arrow} /></svg>;
}
