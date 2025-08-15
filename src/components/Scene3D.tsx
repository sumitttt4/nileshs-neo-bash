import { OrbitControls, Stars, Text3D, Float, Sparkles } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BirthdayText } from './BirthdayText';
import { FloatingElements } from './FloatingElements';
import { ParticleSystem } from './ParticleSystem';
import { CityBackground } from './CityBackground';

export const Scene3D = () => {
  const [celebrationActive, setCelebrationActive] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  const triggerCelebration = () => {
    setCelebrationActive(true);
    setTimeout(() => setCelebrationActive(false), 3000);
  };

  return (
    <>
      {/* Camera Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={15}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI - Math.PI / 4}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00BFFF" />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#FF1493" />
      <pointLight position={[0, 0, -10]} intensity={0.6} color="#FFFF00" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#9400D3" />

      {/* Background Elements */}
      <Stars
        radius={300}
        depth={50}
        count={2000}
        factor={4}
        saturation={0.8}
        fade={true}
        speed={0.5}
      />

      <CityBackground />

      {/* Main Content Group */}
      <group ref={groupRef}>
        {/* Birthday Text */}
        <BirthdayText onClick={triggerCelebration} />

        {/* Floating Elements */}
        <FloatingElements celebrationActive={celebrationActive} />

        {/* Sparkles around the scene */}
        <Sparkles
          count={100}
          scale={[20, 20, 20]}
          size={3}
          speed={0.6}
          color="#FFD700"
        />
      </group>

      {/* Particle Systems */}
      <ParticleSystem active={celebrationActive} />

      {/* Post-processing Effects */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          height={300}
        />
        <ChromaticAberration
          offset={[0.0005, 0.0012]}
        />
      </EffectComposer>
    </>
  );
};