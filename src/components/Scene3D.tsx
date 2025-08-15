import { OrbitControls, Stars, Float, Sparkles } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BirthdayText } from './BirthdayText';
import { FloatingElements } from './FloatingElements';
import { ParticleSystem } from './ParticleSystem';
import { CityBackground } from './CityBackground';

export const Scene3D = () => {
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [fireworksActive, setFireworksActive] = useState(false);
  const [spawnGifts, setSpawnGifts] = useState(false);
  const [sparklesActive, setSparklesActive] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);

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

  // Event listeners for control buttons
  useEffect(() => {
    const handleResetCamera = () => {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
    };

    const handleTriggerCelebration = () => {
      setFireworksActive(true);
      triggerCelebration();
      setTimeout(() => setFireworksActive(false), 4000);
    };

    const handleSpawnGifts = () => {
      setSpawnGifts(true);
      setTimeout(() => setSpawnGifts(false), 1000);
    };

    const handleAddSparkles = () => {
      setSparklesActive(true);
      setTimeout(() => setSparklesActive(false), 5000);
    };

    window.addEventListener('resetCamera', handleResetCamera);
    window.addEventListener('triggerCelebration', handleTriggerCelebration);
    window.addEventListener('spawnGifts', handleSpawnGifts);
    window.addEventListener('addSparkles', handleAddSparkles);

    return () => {
      window.removeEventListener('resetCamera', handleResetCamera);
      window.removeEventListener('triggerCelebration', handleTriggerCelebration);
      window.removeEventListener('spawnGifts', handleSpawnGifts);
      window.removeEventListener('addSparkles', handleAddSparkles);
    };
  }, []);

  return (
    <>
      {/* Camera Controls */}
      <OrbitControls
        ref={controlsRef}
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
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00BFFF" />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#FF1493" />
      <pointLight position={[0, 0, -10]} intensity={0.6} color="#FFFF00" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#9400D3" />

      {/* Background Elements */}
      <Stars
        radius={300}
        depth={50}
        count={1000}
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
        <FloatingElements 
          celebrationActive={celebrationActive} 
          spawnGifts={spawnGifts}
        />

        {/* Sparkles around the scene */}
        <Sparkles
          count={sparklesActive ? 100 : 50}
          scale={[15, 15, 15]}
          size={sparklesActive ? 4 : 2}
          speed={sparklesActive ? 1.2 : 0.6}
          color="#FFD700"
        />

        {/* Additional celebration sparkles */}
        {sparklesActive && (
          <Sparkles
            count={75}
            scale={[20, 20, 20]}
            size={3}
            speed={0.8}
            color="#FF1493"
          />
        )}
      </group>

      {/* Particle Systems */}
      <ParticleSystem active={celebrationActive || fireworksActive} />
      
      {/* Additional firework effects */}
      {fireworksActive && (
        <>
          <ParticleSystem active={true} />
          <ParticleSystem active={true} />
        </>
      )}
    </>
  );
};