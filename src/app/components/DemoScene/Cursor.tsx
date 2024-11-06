import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { createRef } from "react";
import { Mesh } from "three";

const cursor = createRef<Mesh>();

const SIZE = 1;
const SEGMENTS = 32;

export const Cursor = () => {
  const [ref, api] = useSphere(() => ({ mass: 500, args: [SIZE], position: [0, 0, 10000], type: "Static" }), cursor);

  useFrame(({ mouse, viewport: { height, width } }) => {
    const x = (mouse.x * width) / 1.6;
    const y = (mouse.y * height) / 1.6;
    api.position.set(x, y, 0);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[SIZE, SEGMENTS, SEGMENTS]} />
      <meshStandardMaterial
        emissive={"orange"}
        emissiveIntensity={0.5}
        metalness={0.1}
        attach="material"
        color="orange"
      />
    </mesh>
  );
};
