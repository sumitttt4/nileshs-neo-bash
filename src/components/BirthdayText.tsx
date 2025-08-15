import { Text3D, Center, Float } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BirthdayTextProps {
  onClick: () => void;
}

export const BirthdayText = ({ onClick }: BirthdayTextProps) => {
  const textRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (textRef.current) {
      // Gentle floating animation
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      
      // Glowing effect
      const material = textRef.current.material as THREE.MeshStandardMaterial;
      if (material) {
        material.emissive.setRGB(
          Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.1,
          Math.sin(state.clock.elapsedTime * 2 + 2) * 0.1 + 0.1,
          Math.sin(state.clock.elapsedTime * 2 + 4) * 0.1 + 0.1
        );
      }
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <Center>
        <group>
          {/* Main Title */}
          <Text3D
            ref={textRef}
            font="/fonts/helvetiker_bold.typeface.json"
            size={0.8}
            height={0.15}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            position={[0, 1, 0]}
            onClick={onClick}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            Happy Birthday
            <meshStandardMaterial
              color={hovered ? "#FF1493" : "#00BFFF"}
              metalness={0.8}
              roughness={0.2}
              emissive={hovered ? "#FF1493" : "#00BFFF"}
              emissiveIntensity={0.3}
            />
          </Text3D>

          {/* Name */}
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={1.2}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.03}
            bevelSize={0.03}
            bevelOffset={0}
            bevelSegments={5}
            position={[0, -0.5, 0]}
            onClick={onClick}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            Nilesh
            <meshStandardMaterial
              color={hovered ? "#FFFF00" : "#9400D3"}
              metalness={0.9}
              roughness={0.1}
              emissive={hovered ? "#FFFF00" : "#9400D3"}
              emissiveIntensity={0.4}
            />
          </Text3D>
        </group>
      </Center>
    </Float>
  );
};