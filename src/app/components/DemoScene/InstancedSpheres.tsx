import { useSphere } from "@react-three/cannon";
import { useRef } from "react";
import { InstancedMesh } from "three";
import { COLORS } from ".";
import { useTexture } from "@react-three/drei";

const DEFAULT_SPHERE_COUNT = 8;
const SPHERE_TEXTURE = "/ball.png";
const SPHERE_SIZE = 0.5;

export function InstancedSpheres({ number = DEFAULT_SPHERE_COUNT }) {
  const [texture] = useTexture([SPHERE_TEXTURE]);

  const [ref] = useSphere(
    (index) => ({
      args: [SPHERE_SIZE],
      mass: 1,
      position: [Math.random() - 0.5, -Math.random() - 5, index * 2],
    }),
    useRef<InstancedMesh>(null),
  );

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, number]}>
      <sphereGeometry args={[SPHERE_SIZE, 16, 16]} />
      <meshPhongMaterial shininess={50} depthTest emissive={COLORS.sphere} emissiveIntensity={0.5} map={texture} />
    </instancedMesh>
  );
}
