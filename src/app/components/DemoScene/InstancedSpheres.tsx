import { useSphere } from "@react-three/cannon";
import { useMemo, useRef } from "react";
import { Color, InstancedMesh } from "three";

import { colors } from ".";

export function InstancedSpheres({ number = 100 }) {
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
