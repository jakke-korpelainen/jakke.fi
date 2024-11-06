"use client";

import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { Cursor } from "./Cursor";
import { InstancedSpheres } from "./InstancedSpheres";
import { Plane } from "./Plane";

export const colors = {
  gray: "#333",
  teal: "teal",
  white: "white",
  plane: {
    top: "#16161d",
    left: "#16161d",
    right: "#16161d",
    bottom: "#16161d",
  },
} as const;

const imageSrc = "/face_2024.jpg";

export default function DemoScene() {
  return (
    <Canvas className="cursor-none select-none" dpr={[0.5, 1]} shadows camera={{ position: [0, 0, 8] }}>
      <EffectComposer>
        <N8AO quality="performance" halfRes color={colors.gray} aoRadius={5} distanceFalloff={5} intensity={5} />
      </EffectComposer>
      <hemisphereLight intensity={2.5} />
      <spotLight
        position={[0, 0, 30]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
      <pointLight position={[0, 0, -30]} intensity={0.5} />
      <Physics gravity={[0, 0, -30]}>
        <Cursor />

        {/* top */}
        <Plane color={colors.plane.top} position={[0, 6, 0]} rotation={[0.9, 0, 0]} />

        {/* left */}
        <Plane color={colors.plane.left} position={[-6, 0, 0]} rotation={[0, 0.9, 0]} />

        {/* surface */}
        <Plane image={imageSrc} position={[0, 0, 0]} rotation={[0, 0, 0]} />

        {/* right */}
        <Plane color={colors.plane.right} position={[6, 0, 0]} rotation={[0, -0.9, 0]} />

        {/* bottom */}
        <Plane color={colors.plane.bottom} position={[0, -6, 0]} rotation={[-0.9, 0, 0]} />
        <InstancedSpheres />
      </Physics>
    </Canvas>
  );
}
