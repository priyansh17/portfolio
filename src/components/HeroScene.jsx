import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { MathUtils } from 'three';

function OrbitalSystem({ onFailure }) {
  const group = useRef(null);
  const slowFrames = useRef(0);
  useFrame(({ pointer }, delta) => {
    if (delta > 0.065 && delta < 1) slowFrames.current += 1;
    else slowFrames.current = Math.max(0, slowFrames.current - 1);
    if (slowFrames.current > 90) { slowFrames.current = 0; onFailure(); }
    group.current.rotation.y += Math.min(delta, 0.05) * 0.12;
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, pointer.y * 0.2, 2, delta);
    group.current.rotation.z = MathUtils.damp(group.current.rotation.z, -0.15 + pointer.x * 0.12, 2, delta);
  });
  return <group ref={group}>
    <mesh><icosahedronGeometry args={[0.95, 2]} /><meshStandardMaterial color="#90be97" roughness={0.3} metalness={0.45} flatShading /></mesh>
    <mesh><icosahedronGeometry args={[0.955, 2]} /><meshBasicMaterial color="#d5efcc" wireframe transparent opacity={0.18} /></mesh>
    {[[-0.7, 0.2, 0], [0.7, -0.2, 0], [1.4, 0.9, 0]].map((rotation, index) =>
      <group key={index} rotation={rotation}>
        <mesh><torusGeometry args={[1.88, 0.008, 6, 100]} /><meshBasicMaterial color={index === 2 ? '#7cbab4' : '#badfa7'} transparent opacity={0.6} /></mesh>
        <mesh position={[1.88, 0, 0]}><sphereGeometry args={[0.075, 12, 12]} /><meshBasicMaterial color={['#bce9a0', '#78c6d3', '#d9b786'][index]} /></mesh>
      </group>)}
  </group>;
}

function ContextGuard({ onFailure }) {
  const canvas = useThree(state => state.gl.domElement);
  useEffect(() => {
    const lost = event => { event.preventDefault(); onFailure(); };
    canvas.addEventListener('webglcontextlost', lost);
    return () => canvas.removeEventListener('webglcontextlost', lost);
  }, [canvas, onFailure]);
  return null;
}

export default function HeroScene({ onFailure }) {
  return <div className="hero-canvas" data-testid="hero-canvas">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.5], fov: 48 }} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }} fallback={null}>
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 5, 4]} intensity={3} color="#e1f7d8" />
      <pointLight position={[-3, -2, 2]} intensity={8} color="#62bfc6" />
      <OrbitalSystem onFailure={onFailure} />
      <ContextGuard onFailure={onFailure} />
    </Canvas>
  </div>;
}
