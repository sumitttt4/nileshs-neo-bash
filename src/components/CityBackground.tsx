import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CityBackground = () => {
  const cityRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cityRef.current) {
      // Slowly rotate the city background
      cityRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group ref={cityRef} position={[0, -3, -15]}>
      {/* Create a low-poly cityscape */}
      {Array.from({ length: 30 }, (_, i) => {
        const height = Math.random() * 4 + 1;
        const width = Math.random() * 0.8 + 0.5;
        const depth = Math.random() * 0.8 + 0.5;
        const x = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 20;
        
        return (
          <mesh key={i} position={[x, height / 2, z]}>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial
              color={
                i % 4 === 0 ? "#1a1a2e" :
                i % 4 === 1 ? "#16213e" :
                i % 4 === 2 ? "#0f3460" : "#533483"
              }
              metalness={0.8}
              roughness={0.2}
              emissive={
                i % 4 === 0 ? "#00BFFF" :
                i % 4 === 1 ? "#FF1493" :
                i % 4 === 2 ? "#FFFF00" : "#9400D3"
              }
              emissiveIntensity={0.1}
            />
          </mesh>
        );
      })}

      {/* Grid lines on the ground */}
      <group position={[0, -2, 0]}>
        {Array.from({ length: 21 }, (_, i) => (
          <mesh key={`line-x-${i}`} position={[(i - 10) * 2, 0, 0]}>
            <boxGeometry args={[0.02, 0.02, 40]} />
            <meshStandardMaterial
              color="#00BFFF"
              emissive="#00BFFF"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
        {Array.from({ length: 21 }, (_, i) => (
          <mesh key={`line-z-${i}`} position={[0, 0, (i - 10) * 2]}>
            <boxGeometry args={[40, 0.02, 0.02]} />
            <meshStandardMaterial
              color="#FF1493"
              emissive="#FF1493"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};