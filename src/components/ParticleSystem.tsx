import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  active: boolean;
}

export const ParticleSystem = ({ active }: ParticleSystemProps) => {
  const meshRef = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    const colors = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      // Random positions
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Random colors (birthday theme)
      const colorChoice = Math.floor(Math.random() * 4);
      switch (colorChoice) {
        case 0: // Electric Blue
          colors[i * 3] = 0;
          colors[i * 3 + 1] = 0.75;
          colors[i * 3 + 2] = 1;
          break;
        case 1: // Neon Magenta
          colors[i * 3] = 1;
          colors[i * 3 + 1] = 0.08;
          colors[i * 3 + 2] = 0.58;
          break;
        case 2: // Glowing Yellow
          colors[i * 3] = 1;
          colors[i * 3 + 1] = 1;
          colors[i * 3 + 2] = 0;
          break;
        case 3: // Luminous Purple
          colors[i * 3] = 0.58;
          colors[i * 3 + 1] = 0;
          colors[i * 3 + 2] = 0.83;
          break;
      }
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (meshRef.current && active) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Create explosion effect
        positions[i] += (Math.random() - 0.5) * 0.1; // x
        positions[i + 1] += Math.random() * 0.05; // y (upward)
        positions[i + 2] += (Math.random() - 0.5) * 0.1; // z
        
        // Reset particles that go too far
        if (Math.abs(positions[i]) > 15 || Math.abs(positions[i + 2]) > 15 || positions[i + 1] > 15) {
          positions[i] = (Math.random() - 0.5) * 2;
          positions[i + 1] = (Math.random() - 0.5) * 2;
          positions[i + 2] = (Math.random() - 0.5) * 2;
        }
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Rotate the entire particle system
      meshRef.current.rotation.y += 0.01;
    }
  });

  if (!active) return null;

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={1000}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        blending={THREE.AdditiveBlending}
        transparent
        opacity={0.8}
      />
    </points>
  );
};