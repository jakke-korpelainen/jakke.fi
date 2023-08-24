import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { createRef } from "react";
import { Mesh } from "three";

const cursor = createRef<Mesh>();

export const Cursor = () => {
  const size = 1;
  const [ref, api] = useSphere(() => ({ mass: 500, args: [size], position: [0, 0, 10000], type: "Static" }), cursor);

  useFrame(({ mouse, viewport: { height, width } }) => {
    const x = mouse.x * width;
    const y = mouse.y * height;
    api.position.set(x, y, 0);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial fog={false} depthTest={false} transparent opacity={1} />
    </mesh>
  );
};
