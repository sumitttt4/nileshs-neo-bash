import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { LoadingScreen } from './LoadingScreen';
import { Scene3D } from './Scene3D';
import { AudioManager } from './AudioManager';
import { Controls } from './Controls';

export const BirthdayScene = () => {
  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <Scene3D />
        </Canvas>
        <AudioManager />
        <Controls />
      </Suspense>
    </div>
  );
};