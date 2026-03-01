import React from 'react';
import './ThreeBackground.css';

const orbs = [
  { size: 320, top: '10%', left: '5%',  delay: '0s',   duration: '8s',  color: 'rgba(99,102,241,0.22)' },
  { size: 260, top: '55%', left: '75%', delay: '-3s',  duration: '10s', color: 'rgba(139,92,246,0.2)' },
  { size: 400, top: '30%', left: '50%', delay: '-5s',  duration: '12s', color: 'rgba(6,182,212,0.15)' },
  { size: 180, top: '70%', left: '15%', delay: '-2s',  duration: '9s',  color: 'rgba(59,130,246,0.18)' },
  { size: 220, top: '5%',  left: '65%', delay: '-7s',  duration: '11s', color: 'rgba(167,139,250,0.16)' },
];

export default function ThreeBackground() {
  return (
    <div className='threebg-wrapper' aria-hidden='true'>
      {orbs.map((orb, i) => (
        <div
          key={i}
          className='threebg-orb'
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: `radial-gradient(circle at 40% 40%, ${orb.color}, transparent 70%)`,
            animationDelay: orb.delay,
            animationDuration: orb.duration,
          }}
        />
      ))}
    </div>
  );
}
