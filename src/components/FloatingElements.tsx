import { Float, Sphere, Box, Torus } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingElementsProps {
  celebrationActive: boolean;
  spawnGifts?: boolean;
}

export const FloatingElements = ({ celebrationActive, spawnGifts = false }: FloatingElementsProps) => {
  const balloonRefs = useRef<THREE.Mesh[]>([]);
  const confettiRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    // Animate balloons
    balloonRefs.current.forEach((balloon, index) => {
      if (balloon) {
        balloon.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5 + 3;
        balloon.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      }
    });

    // Animate confetti when celebration is active
    if (celebrationActive) {
      confettiRefs.current.forEach((confetti, index) => {
        if (confetti) {
          confetti.position.y -= 0.02;
          confetti.rotation.x += 0.1;
          confetti.rotation.z += 0.1;
          
          // Reset position if it falls too low
          if (confetti.position.y < -5) {
            confetti.position.y = 8;
            confetti.position.x = (Math.random() - 0.5) * 10;
            confetti.position.z = (Math.random() - 0.5) * 10;
          }
        }
      });
    }
  });

  return (
    <>
      {/* Floating Balloons */}
      {Array.from({ length: 8 }, (_, i) => (
        <Float
          key={`balloon-${i}`}
          speed={1 + i * 0.1}
          rotationIntensity={0.2}
          floatIntensity={0.5}
        >
          <Sphere
            ref={(el) => el && (balloonRefs.current[i] = el)}
            args={[0.3, 16, 16]}
            position={[
              Math.sin(i * 0.8) * 4,
              Math.cos(i * 0.8) * 2 + 2,
              Math.sin(i * 1.2) * 3
            ]}
          >
            <meshStandardMaterial
              color={
                i % 4 === 0 ? "#00BFFF" :
                i % 4 === 1 ? "#FF1493" :
                i % 4 === 2 ? "#FFFF00" : "#9400D3"
              }
              metalness={0.3}
              roughness={0.7}
              emissive={
                i % 4 === 0 ? "#00BFFF" :
                i % 4 === 1 ? "#FF1493" :
                i % 4 === 2 ? "#FFFF00" : "#9400D3"
              }
              emissiveIntensity={0.2}
            />
          </Sphere>
        </Float>
      ))}

      {/* Gift Boxes */}
      {Array.from({ length: spawnGifts ? 8 : 4 }, (_, i) => (
        <Float
          key={`gift-${i}`}
          speed={0.5 + i * 0.1}
          rotationIntensity={0.3}
          floatIntensity={0.3}
        >
          <Box
            args={[0.4, 0.4, 0.4]}
            position={[
              Math.cos(i * 1.5) * 5,
              Math.sin(i * 1.5) * 1 - 1,
              Math.sin(i * 2) * 4
            ]}
          >
            <meshStandardMaterial
              color={i % 2 === 0 ? "#FF1493" : "#9400D3"}
              metalness={0.1}
              roughness={0.8}
            />
          </Box>
        </Float>
      ))}

      {/* Party Hats */}
      {Array.from({ length: 6 }, (_, i) => (
        <Float
          key={`hat-${i}`}
          speed={0.8 + i * 0.05}
          rotationIntensity={0.4}
          floatIntensity={0.4}
        >
          <group
            position={[
              Math.sin(i * 2) * 6,
              Math.cos(i * 1.5) * 3 + 1,
              Math.cos(i * 2.5) * 5
            ]}
          >
            <mesh>
              <coneGeometry args={[0.3, 0.8, 8]} />
              <meshStandardMaterial
                color="#FFFF00"
                metalness={0.4}
                roughness={0.6}
                emissive="#FFFF00"
                emissiveIntensity={0.1}
              />
            </mesh>
          </group>
        </Float>
      ))}

      {/* Confetti Pieces (only visible during celebration) */}
      {celebrationActive && Array.from({ length: 50 }, (_, i) => (
        <Box
          key={`confetti-${i}`}
          ref={(el) => el && (confettiRefs.current[i] = el)}
          args={[0.05, 0.05, 0.01]}
          position={[
            (Math.random() - 0.5) * 10,
            Math.random() * 8 + 5,
            (Math.random() - 0.5) * 10
          ]}
        >
          <meshStandardMaterial
            color={
              i % 4 === 0 ? "#00BFFF" :
              i % 4 === 1 ? "#FF1493" :
              i % 4 === 2 ? "#FFFF00" : "#9400D3"
            }
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
      ))}

      {/* Floating Rings */}
      {Array.from({ length: 3 }, (_, i) => (
        <Float
          key={`ring-${i}`}
          speed={0.3 + i * 0.1}
          rotationIntensity={0.5}
          floatIntensity={0.2}
        >
          <Torus
            args={[1 + i * 0.5, 0.1, 8, 20]}
            position={[0, i * 2 - 2, -3]}
          >
            <meshStandardMaterial
              color={i === 0 ? "#00BFFF" : i === 1 ? "#FF1493" : "#9400D3"}
              metalness={0.9}
              roughness={0.1}
              emissive={i === 0 ? "#00BFFF" : i === 1 ? "#FF1493" : "#9400D3"}
              emissiveIntensity={0.3}
            />
          </Torus>
        </Float>
      ))}
    </>
  );
};