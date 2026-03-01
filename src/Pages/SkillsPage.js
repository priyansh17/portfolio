import React from 'react';
import { Container } from 'react-bootstrap';
import SkillsData from './SkillsData';
import PageHeader from './PageHeader';

// Per-category colour themes for the 3D balls
const CATEGORY_THEME = {
    'Programming Languages': [
        { bg: 'radial-gradient(circle at 35% 35%, #a78bfa, #4f46e5 60%, #1e1b4b)', glow: 'rgba(139,92,246,0.5)' },
        { bg: 'radial-gradient(circle at 35% 35%, #c084fc, #7c3aed 60%, #2d1b69)', glow: 'rgba(192,132,252,0.5)' },
        { bg: 'radial-gradient(circle at 35% 35%, #818cf8, #3730a3 60%, #1e1b4b)', glow: 'rgba(129,140,248,0.5)' },
    ],
    'Cloud & Infrastructure': [
        { bg: 'radial-gradient(circle at 35% 35%, #67e8f9, #0891b2 60%, #0c4a6e)', glow: 'rgba(6,182,212,0.5)' },
        { bg: 'radial-gradient(circle at 35% 35%, #93c5fd, #2563eb 60%, #1e3a8a)', glow: 'rgba(59,130,246,0.5)' },
        { bg: 'radial-gradient(circle at 35% 35%, #38bdf8, #0369a1 60%, #082f49)', glow: 'rgba(14,165,233,0.5)' },
    ],
    'DevOps & Automation': [
        { bg: 'radial-gradient(circle at 35% 35%, #fcd34d, #d97706 60%, #78350f)', glow: 'rgba(251,191,36,0.5)' },
        { bg: 'radial-gradient(circle at 35% 35%, #fb923c, #c2410c 60%, #431407)', glow: 'rgba(249,115,22,0.5)' },
        { bg: 'radial-gradient(circle at 35% 35%, #fda4af, #e11d48 60%, #881337)', glow: 'rgba(244,63,94,0.5)' },
    ],
    'Web & Frameworks': [
        { bg: 'radial-gradient(circle at 35% 35%, #6ee7b7, #059669 60%, #064e3b)', glow: 'rgba(5,150,105,0.5)' },
        { bg: 'radial-gradient(circle at 35% 35%, #86efac, #16a34a 60%, #14532d)', glow: 'rgba(22,163,74,0.5)' },
        { bg: 'radial-gradient(circle at 35% 35%, #5eead4, #0d9488 60%, #134e4a)', glow: 'rgba(20,184,166,0.5)' },
    ],
    Databases: [
        { bg: 'radial-gradient(circle at 35% 35%, #f9a8d4, #db2777 60%, #831843)', glow: 'rgba(219,39,119,0.5)' },
        { bg: 'radial-gradient(circle at 35% 35%, #d8b4fe, #9333ea 60%, #581c87)', glow: 'rgba(147,51,234,0.5)' },
    ],
};

// Category accent colours for the section labels
const CATEGORY_ACCENT = {
    'Programming Languages': '#a78bfa',
    'Cloud & Infrastructure': '#38bdf8',
    'DevOps & Automation':   '#fcd34d',
    'Web & Frameworks':      '#6ee7b7',
    Databases:               '#f9a8d4',
};

const CATEGORY_ICONS = {
    'Programming Languages': '⟨/⟩',
    'Cloud & Infrastructure': '☁',
    'DevOps & Automation':   '⚙',
    'Web & Frameworks':      '🌐',
    Databases:               '🗄',
};

const SIZES = [110, 120, 100, 115, 105];

function SkillsPage() {
    // Preserve insertion order of categories
    const categories = [...new Set(SkillsData.map(s => s.type))];

    return (
        <Container>
            <PageHeader header="SkillsPageHeading" />
            {categories.map(category => {
                const skills  = SkillsData.filter(s => s.type === category);
                const palette = CATEGORY_THEME[category] || CATEGORY_THEME['Programming Languages'];
                const accent  = CATEGORY_ACCENT[category] || '#a78bfa';
                const icon    = CATEGORY_ICONS[category] || '◆';

                return (
                    <div key={category} className="skills-section">
                        <div className="skills-section-header">
                            <span className="skills-section-icon" style={{ color: accent }}>{icon}</span>
                            <h3 className="skills-section-title" style={{ color: accent }}>{category}</h3>
                            <div className="skills-section-line" style={{ background: `linear-gradient(to right, ${accent}55, transparent)` }} />
                        </div>
                        <div className="skills-arena">
                            {skills.map((s, i) => {
                                const color = palette[i % palette.length];
                                const size  = SIZES[i % SIZES.length];
                                return (
                                    <div
                                        key={i}
                                        className="skill-ball"
                                        style={{
                                            width: size,
                                            height: size,
                                            background: color.bg,
                                            boxShadow: `-4px -4px 8px rgba(255,255,255,0.12), 4px 4px 14px rgba(0,0,0,0.55), 0 0 28px ${color.glow}`,
                                            animationDelay: `${-(i * 0.65) % 8}s`,
                                            animationDuration: `${6 + (i % 5) * 1.2}s`,
                                        }}
                                    >
                                        <span className="skill-label">{s.skill}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </Container>
    );
}

export default SkillsPage;
