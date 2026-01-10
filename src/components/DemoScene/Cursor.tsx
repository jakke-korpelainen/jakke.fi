import { useSphere } from "@react-three/cannon";
import { Sphere, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { createRef } from "react";
import type { Mesh } from "three";

const cursor = createRef<Mesh>();

const CURSOR_MATCAP = "/ball2.png";
const CURSOR_SEGMENTS = 32;
const CURSOR_SIZE = 0.77;
const CURSOR_Z = 0.4;

export const Cursor = () => {
  const [matcap] = useTexture([CURSOR_MATCAP]);
  const [ref, api] = useSphere(
    () => ({
      mass: 2000,
      args: [CURSOR_SIZE],
      position: [0, 0, CURSOR_Z],
      type: "Static",
    }),
    cursor,
  );

  useFrame(({ pointer, viewport: { height, width } }) => {
    const x = (pointer.x * width) / (Math.PI / 2);
    const y = (pointer.y * height) / (Math.PI / 2);

    const rotationX = pointer.y * (Math.PI / 2) * -4;
    const rotationY = pointer.x * (Math.PI / 2) * 4;

    api.rotation.set(rotationX, rotationY, 0);

    api.position.set(x, y, CURSOR_Z);
  });

  return (
    <Sphere args={[CURSOR_SIZE, CURSOR_SEGMENTS, CURSOR_SEGMENTS]} ref={ref}>
      <meshMatcapMaterial color="white" map={matcap} />
    </Sphere>
  );
};
