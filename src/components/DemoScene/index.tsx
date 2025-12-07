"use client";

import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { Color } from "three";

import { Cursor } from "./Cursor";
import { InstancedSpheres } from "./InstancedSpheres";
import { Plane, TexturedPlane } from "./Plane";

export const COLORS = {
  cursor: new Color("orange"),
  sphere: new Color("teal"),
  plane: new Color("#16161d"),
} as const;

export const SURFACE_TEXTURE = "/face_2024.jpg";

export default function DemoScene() {
  return (
    <Canvas className="cursor-none select-none" performance={{ min: 0.25, max: 2 }} camera={{ position: [0, 0, 8] }}>
      <EffectComposer>
        <N8AO quality="performance" halfRes />
      </EffectComposer>
      <hemisphereLight intensity={2.5} />
      <Physics gravity={[0, 0, -30]}>
        <Cursor />

        {/* top */}
        <Plane color={COLORS.plane} position={[0, 6, 0]} rotation={[0.9, 0, 0]} />

        {/* left */}
        <Plane color={COLORS.plane} position={[-6, 0, 0]} rotation={[0, 0.9, 0]} />

        {/* surface */}
        <TexturedPlane textureSrc={SURFACE_TEXTURE} position={[0, 0, 0]} rotation={[0, 0, 0]} />

        {/* right */}
        <Plane color={COLORS.plane} position={[6, 0, 0]} rotation={[0, -0.9, 0]} />

        {/* bottom */}
        <Plane color={COLORS.plane} position={[0, -6, 0]} rotation={[-0.9, 0, 0]} />
        <InstancedSpheres />
      </Physics>
    </Canvas>
  );
}
