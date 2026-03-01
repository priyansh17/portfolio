import React from 'react';
import { Container } from 'react-bootstrap';
import SkillsData from './SkillsData';
import PageHeader from './PageHeader';

const BALL_COLORS = [
    { bg: 'radial-gradient(circle at 35% 35%, #a78bfa, #4f46e5 60%, #1e1b4b)', glow: 'rgba(139,92,246,0.45)' },
    { bg: 'radial-gradient(circle at 35% 35%, #c084fc, #7c3aed 60%, #2d1b69)', glow: 'rgba(192,132,252,0.45)' },
    { bg: 'radial-gradient(circle at 35% 35%, #67e8f9, #0891b2 60%, #0c4a6e)', glow: 'rgba(6,182,212,0.45)' },
    { bg: 'radial-gradient(circle at 35% 35%, #93c5fd, #2563eb 60%, #1e3a8a)', glow: 'rgba(59,130,246,0.45)' },
    { bg: 'radial-gradient(circle at 35% 35%, #6ee7b7, #059669 60%, #064e3b)', glow: 'rgba(5,150,105,0.45)' },
];

const SIZES = [100, 115, 95, 120, 105];

function SkillsPage() {
    const uniqueSkills = [...new Map(SkillsData.map(s => [s.skill, s])).values()].map(s => s.skill);

    return (
        <Container>
            <PageHeader header="SkillsPageHeading" />
            <div className="skills-arena">
                {uniqueSkills.map((skill, i) => {
                    const color = BALL_COLORS[i % BALL_COLORS.length];
                    const size = SIZES[i % SIZES.length];
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
                            <span className="skill-label">{skill}</span>
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}

export default SkillsPage;
