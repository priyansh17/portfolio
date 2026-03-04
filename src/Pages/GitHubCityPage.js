import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import Navbar from '../Navbar';
import '../GitHubCity.css';

/* ─── Language colour palette ─────────────────────────────────────────────── */
const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python:     '#3776ab',
  Java:       '#b07219',
  Kotlin:     '#7f52ff',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  'C++':      '#f34b7d',
  C:          '#555555',
  Go:         '#00add8',
  Rust:       '#dea584',
  Ruby:       '#701516',
  Swift:      '#fa7343',
  PHP:        '#4f5d95',
  Shell:      '#89e051',
  default:    '#6366f1',
};

function langColor(lang) {
  return LANG_COLORS[lang] || LANG_COLORS.default;
}

/* ─── Fallback data (used when GitHub API is unavailable) ─────────────────── */
const FALLBACK_REPOS = [
  { id: 1,  name: 'BrainRelief',                    description: 'Mental health supervisor app – ML, Sentiment Analysis, Kotlin, Firebase. Rated 4.8/5 on Play Store.', language: 'Kotlin',     stargazers_count: 18,  forks_count: 7,  size: 3400,  fork: false, html_url: 'https://github.com/priyansh17/BrainRelief' },
  { id: 2,  name: 'HealthifyLife_Medical_Chatbot',   description: 'AI-powered healthcare chatbot that diagnoses diseases using decision trees.', language: 'Python',     stargazers_count: 12,  forks_count: 4,  size: 1800,  fork: false, html_url: 'https://github.com/priyansh17/HealthifyLife_Medical_Chatbot' },
  { id: 3,  name: 'VirtualhandControlForGames',      description: 'Control your PC with hand gestures via OpenCV at up to 60 FPS.', language: 'Python',     stargazers_count: 34,  forks_count: 11, size: 2200,  fork: false, html_url: 'https://github.com/priyansh17/VirtualhandControlForGames' },
  { id: 4,  name: 'PGLife-Webdev-Project',           description: 'PG hostel search website built with React, PHP, MySQL and Bootstrap.', language: 'JavaScript', stargazers_count: 9,   forks_count: 3,  size: 4500,  fork: false, html_url: 'https://github.com/priyansh17/PGLife-Webdev-Project' },
  { id: 5,  name: 'Restaurant-App-FoodApp',          description: 'Full-stack Android food delivery app using Kotlin and Firebase.', language: 'Kotlin',     stargazers_count: 6,   forks_count: 2,  size: 2800,  fork: false, html_url: 'https://github.com/priyansh17/Restaurant-App-FoodApp' },
  { id: 6,  name: 'portfolio',                       description: 'Personal portfolio website built with React, Three.js and Material UI.', language: 'JavaScript', stargazers_count: 22,  forks_count: 5,  size: 5100,  fork: false, html_url: 'https://github.com/priyansh17/portfolio' },
  { id: 7,  name: 'FinTech-B2B-Order-Management',   description: 'AI-enabled B2B invoice management dashboard with SVM payment predictor.', language: 'Java',       stargazers_count: 15,  forks_count: 6,  size: 6200,  fork: false, html_url: 'https://github.com/priyansh17' },
  { id: 8,  name: 'ml-experiments',                  description: 'Assorted machine learning experiments and notebooks.', language: 'Python',     stargazers_count: 5,   forks_count: 1,  size: 980,   fork: false, html_url: 'https://github.com/priyansh17' },
  { id: 9,  name: 'react-components-lib',            description: 'Reusable React component library with MUI theming.', language: 'TypeScript', stargazers_count: 8,   forks_count: 2,  size: 1600,  fork: false, html_url: 'https://github.com/priyansh17' },
  { id: 10, name: 'android-utils',                   description: 'Collection of Android utility classes and helpers.', language: 'Kotlin',     stargazers_count: 4,   forks_count: 1,  size: 760,   fork: false, html_url: 'https://github.com/priyansh17' },
  { id: 11, name: 'data-structures-java',            description: 'Data structures and algorithms implemented in Java.', language: 'Java',       stargazers_count: 11,  forks_count: 4,  size: 1200,  fork: false, html_url: 'https://github.com/priyansh17' },
  { id: 12, name: 'web-scraper',                     description: 'Python web scraping scripts using BeautifulSoup and Selenium.', language: 'Python',     stargazers_count: 7,   forks_count: 2,  size: 540,   fork: false, html_url: 'https://github.com/priyansh17' },
];

/* ─── Repo score (shared by height calc and sort order) ──────────────────── */
function repoScore(repo) {
  return (repo.stargazers_count || 0) * 3
       + (repo.forks_count || 0) * 2
       + Math.sqrt(repo.size || 0) * 0.5
       + 1;
}

/* ─── Height metric ───────────────────────────────────────────────────────── */
function buildingHeight(repo) {
  return Math.log1p(repoScore(repo)) * 2.5 + 1.5;
}

/* ─── Single building mesh ────────────────────────────────────────────────── */
function Building({ repo, position, maxHeight, hovered, onHover }) {
  const meshRef   = useRef();
  const targetH   = buildingHeight(repo);
  const color     = langColor(repo.language);
  const isHovered = hovered === repo.id;

  // Animate height rising on mount
  const currentH = useRef(0);
  useFrame((_, delta) => {
    if (currentH.current < targetH) {
      currentH.current = Math.min(currentH.current + delta * targetH * 1.5, targetH);
      if (meshRef.current) {
        meshRef.current.scale.y = currentH.current / targetH;
        meshRef.current.position.y = currentH.current / 2;
      }
    }
    // Gentle pulse when hovered
    if (isHovered && meshRef.current) {
      const pulse = 1 + Math.sin(Date.now() * 0.004) * 0.04;
      meshRef.current.scale.x = pulse;
      meshRef.current.scale.z = pulse;
    } else if (meshRef.current) {
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.1);
    }
  });

  const emissiveIntensity = isHovered ? 0.9 : 0.35;

  return (
    <group position={[position[0], 0, position[1]]}>
      <mesh
        ref={meshRef}
        position={[0, targetH / 2, 0]}
        scale={[1, 0, 1]}
        onPointerOver={(e) => { e.stopPropagation(); onHover(repo.id); }}
        onPointerOut={(e)  => { e.stopPropagation(); onHover(null);    }}
        onClick={(e)       => { e.stopPropagation(); window.open(repo.html_url, '_blank', 'noopener,noreferrer'); }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.9, targetH, 0.9]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Roof glow dot */}
      <mesh position={[0, targetH + 0.08, 0]}>
        <sphereGeometry args={[0.13, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
        />
      </mesh>

      {/* Floating repo name label */}
      <Text
        position={[0, targetH + 0.5, 0]}
        fontSize={0.22}
        color="#e0e0ff"
        anchorX="center"
        anchorY="bottom"
        renderOrder={1}
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {repo.name.length > 18 ? repo.name.slice(0, 16) + '…' : repo.name}
      </Text>

      {/* HTML tooltip on hover */}
      {isHovered && (
        <Html position={[0, targetH + 1.4, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
          <div className="city-tooltip">
            <div className="city-tooltip-name">{repo.name}</div>
            {repo.description && (
              <div className="city-tooltip-desc">{repo.description}</div>
            )}
            <div className="city-tooltip-meta">
              {repo.language && (
                <span className="city-tooltip-lang" style={{ color: langColor(repo.language) }}>
                  ⬛ {repo.language}
                </span>
              )}
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
              {repo.fork && <span className="city-tooltip-forked">forked</span>}
            </div>
            <div className="city-tooltip-hint">click to open</div>
          </div>
        </Html>
      )}
    </group>
  );
}

/* ─── Ground grid ─────────────────────────────────────────────────────────── */
function Ground({ size }) {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial
          color="#0a0a1a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      <gridHelper
        args={[size, size / 2.5, '#1e1e4a', '#141428']}
        position={[0, 0.01, 0]}
      />
    </>
  );
}

/* ─── Scene ───────────────────────────────────────────────────────────────── */
function CityScene({ repos }) {
  const [hoveredId, setHoveredId] = useState(null);

  const cols     = Math.ceil(Math.sqrt(repos.length));
  const spacing  = 2.5;
  const maxH     = Math.max(...repos.map(buildingHeight));
  const gridSize = (cols + 2) * spacing;

  return (
    <>
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 20, 80]} />

      {/* Lighting */}
      <ambientLight intensity={0.25} color="#6366f1" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.8}
        color="#c4b5fd"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[0, 12, 0]} intensity={2} color="#818cf8" distance={50} />
      <pointLight position={[-10, 5, -10]} intensity={1.5} color="#06b6d4" distance={40} />
      <pointLight position={[10, 5, 10]}  intensity={1.5} color="#a855f7" distance={40} />

      <Stars radius={60} depth={40} count={3000} factor={3} saturation={0.5} fade />

      <Ground size={gridSize} />

      {repos.map((repo, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x   = col * spacing - ((cols - 1) * spacing) / 2;
        const z   = row * spacing - ((Math.ceil(repos.length / cols) - 1) * spacing) / 2;
        return (
          <Building
            key={repo.id}
            repo={repo}
            position={[x, z]}
            maxHeight={maxH}
            hovered={hoveredId}
            onHover={setHoveredId}
          />
        );
      })}

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.4}
        enablePan={true}
        enableZoom={true}
        minDistance={5}
        maxDistance={60}
        maxPolarAngle={Math.PI / 2.1}
        makeDefault
      />
    </>
  );
}

/* ─── Loading skeleton ────────────────────────────────────────────────────── */
function CityLoader() {
  return (
    <div className="city-loader">
      <div className="city-loader-pulse" />
      <p>Fetching GitHub repos…</p>
    </div>
  );
}

/* ─── Legend overlay ──────────────────────────────────────────────────────── */
function Legend({ repos }) {
  const langs = [...new Set(repos.map(r => r.language).filter(Boolean))].slice(0, 8);
  return (
    <div className="city-legend">
      <div className="city-legend-title">Language</div>
      {langs.map(lang => (
        <div key={lang} className="city-legend-item">
          <span className="city-legend-dot" style={{ background: langColor(lang) }} />
          {lang}
        </div>
      ))}
      <div className="city-legend-hint">🏗 Height = Stars + Forks + Code size</div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function GitHubCityPage() {
  const [repos,      setRepos]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      try {
        // Fetch all public repos (including forks) for priyansh17
        const res = await fetch(
          'https://api.github.com/users/priyansh17/repos?per_page=100&type=all',
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        );
        if (!res.ok) throw new Error(`GitHub API responded with status ${res.status}`);
        const data = await res.json();
        // Sort by score descending so the most prominent repos stand tallest
        data.sort((a, b) => repoScore(b) - repoScore(a));
        setRepos(data);
      } catch {
        // Fall back to curated data when the API is unreachable
        setRepos(FALLBACK_REPOS);
        setUsedFallback(true);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <div className="city-page">
      <Navbar />
      <div className="city-header">
        <h1 className="city-title">
          <span className="city-title-accent">GitHub</span> City
        </h1>
        <p className="city-subtitle">
          Every building is a repository · Height = Stars + Forks + Code volume
        </p>
        {usedFallback && (
          <p className="city-fallback-note">
            ℹ️ Showing curated repos — live GitHub data will load in production.
          </p>
        )}
      </div>

      {loading && <CityLoader />}

      {!loading && repos.length > 0 && (
        <div className="city-canvas-wrap">
          <Canvas
            shadows
            camera={{ position: [0, 14, 28], fov: 55 }}
            gl={{ antialias: true, alpha: false }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <CityScene repos={repos} />
            </Suspense>
          </Canvas>
          <Legend repos={repos} />
          <div className="city-controls-hint">
            🖱 Drag to rotate · Scroll to zoom · Right-drag to pan · Click a building to open repo
          </div>
        </div>
      )}
    </div>
  );
}

