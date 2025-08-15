import { Center, Float } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BirthdayTextProps {
  onClick: () => void;
}

export const BirthdayText = ({ onClick }: BirthdayTextProps) => {
  const textRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (textRef.current) {
      // Gentle floating animation
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      
      // Cycle through colors
      textRef.current.children.forEach((child, index) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material && 'emissive' in mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          const time = state.clock.elapsedTime + index;
          material.emissive.setRGB(
            Math.sin(time * 2) * 0.1 + 0.1,
            Math.sin(time * 2 + 2) * 0.1 + 0.1,
            Math.sin(time * 2 + 4) * 0.1 + 0.1
          );
        }
      });
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <Center>
        <group
          ref={textRef}
          onClick={onClick}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          {/* Main Title - Using simple text geometry */}
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[4, 0.8, 0.2]} />
            <meshStandardMaterial
              color={hovered ? "#FF1493" : "#00BFFF"}
              metalness={0.8}
              roughness={0.2}
              emissive={hovered ? "#FF1493" : "#00BFFF"}
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Overlay text effect */}
          <mesh position={[0, 1, 0.1]}>
            <boxGeometry args={[3.8, 0.6, 0.1]} />
            <meshStandardMaterial
              color="#FFFFFF"
              metalness={0.1}
              roughness={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Name */}
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[3, 1, 0.25]} />
            <meshStandardMaterial
              color={hovered ? "#FFFF00" : "#9400D3"}
              metalness={0.9}
              roughness={0.1}
              emissive={hovered ? "#FFFF00" : "#9400D3"}
              emissiveIntensity={0.4}
            />
          </mesh>

          {/* Name overlay */}
          <mesh position={[0, -0.5, 0.15]}>
            <boxGeometry args={[2.8, 0.8, 0.1]} />
            <meshStandardMaterial
              color="#FFFFFF"
              metalness={0.1}
              roughness={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      </Center>
    </Float>
  );
};