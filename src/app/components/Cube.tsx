"use client";

import type { PlaneProps } from "@react-three/cannon";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import type { MeshPhongMaterialProps } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { ASCII, EffectComposer, N8AO, Noise } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import type { InstancedMesh, Mesh, Texture } from "three";
import { Color, TextureLoader } from "three";

const imageSrc = "/face.jpg";
const colors = ["#16161d", "teal"] as const;

type PlaneArgs =
  | [
      width?: number | undefined,
      height?: number | undefined,
      widthSegments?: number | undefined,
      heightSegments?: number | undefined,
    ]
  | undefined;

type OurPlaneProps = { image?: string } & Pick<MeshPhongMaterialProps, "color"> &
  Pick<PlaneProps, "position" | "rotation">;

function Plane({ color, image, ...props }: OurPlaneProps) {
  const [ref] = usePlane(() => ({ ...props }), useRef<Mesh>(null));

  const texture = useMemo(() => {
    if (image) {
      const textureLoader = new TextureLoader();
      return textureLoader.load(imageSrc, (texture: Texture) => {
        texture.center.set(0.5, 0.5);
      });
    }
    return undefined;
  }, [image]);

  const imageWidth: PlaneArgs = [10, 10];
  const normalWidth: PlaneArgs = [1000, 1000];

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={texture ? [...imageWidth] : [...normalWidth]} />
      <meshBasicMaterial color={texture ? undefined : color} map={texture} />
    </mesh>
  );
}

function InstancedSpheres({ number = 100 }) {
  const size = 0.5;
  const [ref] = useSphere(
    (index) => ({
      args: [size],
      mass: 1,
      position: [Math.random() - 0.5, -Math.random() - 5, index * 2],
    }),
    useRef<InstancedMesh>(null),
  );
  const sphereColors = useMemo(() => {
    const array = new Float32Array(number * 3);
    const color = new Color();
    for (let i = 0; i < number; i++)
      color
        .set(colors[0])
        .convertSRGBToLinear()
        .toArray(array, i * 3);
    return array;
  }, [number]);

  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[undefined, undefined, number]}>
      <sphereGeometry args={[size, 16, 16]}>
        <instancedBufferAttribute attach="attributes-color" args={[sphereColors, 3]} />
      </sphereGeometry>
      <meshPhongMaterial vertexColors />
    </instancedMesh>
  );
}

export default function Cube() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 8] }}
      gl={{
        alpha: false,
        // todo: stop using legacy lights
        useLegacyLights: false,
      }}
    >
      <EffectComposer>
        <ASCII invert color={colors[1]} fontSize={50} />
        <N8AO color={colors[0]} aoRadius={5} distanceFalloff={1} intensity={5} />
        <Noise opacity={0.02} />
      </EffectComposer>
      <hemisphereLight intensity={1} />
      <spotLight
        position={[30, 0, 30]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
      <pointLight position={[-30, 0, -30]} intensity={0.5} />
      <Physics gravity={[0, 0, -30]}>
        {/* surface */}
        <Plane image="/face.jpg" position={[0, 0, 0]} rotation={[0, 0, 0]} />

        {/* left */}
        <Plane color={colors[0]} position={[-6, 0, 0]} rotation={[0, 0.9, 0]} />

        {/* right */}
        <Plane color={colors[0]} position={[6, 0, 0]} rotation={[0, -0.9, 0]} />

        {/* back */}
        <Plane color={colors[0]} position={[0, 6, 0]} rotation={[0.9, 0, 0]} />

        {/* front */}
        <Plane color={colors[0]} position={[0, -6, 0]} rotation={[-0.9, 0, 0]} />
        {/* <Box /> */}
        <InstancedSpheres number={50} />
      </Physics>
    </Canvas>
  );
}
