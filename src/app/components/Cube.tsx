"use client";

import type { PlaneProps } from "@react-three/cannon";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import type { MeshPhongMaterialProps } from "@react-three/fiber";
import { Canvas, useFrame } from "@react-three/fiber";
import { ASCII, EffectComposer, N8AO, Noise } from "@react-three/postprocessing";
import { createRef, useMemo, useRef, useState } from "react";
import type { InstancedMesh, Mesh, Texture } from "three";
import { Color, TextureLoader } from "three";

const colors = {
  gray: "#333",
  teal: "rgb(114, 255, 255)",
  white: "white",
  plane: {
    left: "#333",
    right: "#666",
  },
} as const;
const imageSrc = "/face.jpg";
const planeColor = colors.gray;
const cursor = createRef<Mesh>();

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
  const normalWidth: PlaneArgs = [100, 100];

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
        .set(colors.white)
        .convertSRGBToLinear()
        .toArray(array, i * 3);
    return array;
  }, [number]);

  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[undefined, undefined, number]}>
      <sphereGeometry args={[size, 16, 16]}>
        <instancedBufferAttribute attach="attributes-color" args={[sphereColors, 3]} />
      </sphereGeometry>
      <meshPhongMaterial />
    </instancedMesh>
  );
}

const Cursor = () => {
  const size = 1;
  const [ref, api] = useSphere(() => ({ mass: 500, args: [size], position: [0, 0, 10000], type: "Static" }), cursor);

  useFrame(({ mouse, viewport: { height, width } }) => {
    const x = mouse.x * width;
    const y = (mouse.y * height) / 1.9 + -x / 3.5;
    api.position.set(x / 1.4, y, 0);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial fog={false} depthTest={false} transparent opacity={1} />
    </mesh>
  );
};

export default function Cube() {
  const [asciiEnabled, setAsciiEnabled] = useState(true);
  const changeShader = () => {
    setAsciiEnabled(!asciiEnabled);
  };

  const postProcessing = useMemo(() => {
    return (
      <EffectComposer>
        {asciiEnabled ? (
          <ASCII characters="jakeorplin" invert cellSize={7} color={colors.teal} fontSize={100} />
        ) : (
          <></>
        )}
        <N8AO quality="performance" halfRes color={colors.gray} aoRadius={5} distanceFalloff={5} intensity={7} />
        <Noise opacity={0.02} />
      </EffectComposer>
    );
  }, [asciiEnabled]);

  return (
    <Canvas
      onClick={changeShader}
      className="cursor-none select-none"
      dpr={[0.5, 1]}
      shadows
      camera={{ position: [0, 0, 8] }}
      gl={{
        alpha: false,
      }}
    >
      {postProcessing}
      <hemisphereLight intensity={2.5} />
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
        <Cursor />

        {/* surface */}
        <Plane image="/face.jpg" position={[0, 0, 0]} rotation={[0, 0, 0]} />

        {/* left */}
        <Plane color={colors.plane.left} position={[-6, 0, 0]} rotation={[0, 0.9, 0]} />

        {/* right */}
        <Plane color={colors.plane.right} position={[6, 0, 0]} rotation={[0, -0.9, 0]} />

        {/* back */}
        <Plane color={planeColor} position={[0, 6, 0]} rotation={[0.9, 0, 0]} />

        {/* front */}
        <Plane color={planeColor} position={[0, -6, 0]} rotation={[-0.9, 0, 0]} />

        <InstancedSpheres number={50} />
      </Physics>
    </Canvas>
  );
}
