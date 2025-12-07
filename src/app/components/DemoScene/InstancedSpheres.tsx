import { useSphere } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { InstancedMesh, TextureLoader } from "three";

const DEFAULT_SPHERE_COUNT = 8;
const IMAGE_SRC = "/face_2024.jpg";
const SIZE = 0.5;

export function InstancedSpheres({ number = DEFAULT_SPHERE_COUNT }) {
  const texture = useLoader(TextureLoader, IMAGE_SRC);
  const [ref] = useSphere(
    (index) => ({
      args: [SIZE],
      mass: 1,
      position: [Math.random() - 0.5, -Math.random() - 5, index * 2],
    }),
    useRef<InstancedMesh>(null),
  );

  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[undefined, undefined, number]}>
      <sphereGeometry args={[SIZE, 16, 16]} />
      <meshPhongMaterial emissive="teal" emissiveIntensity={0.5} map={texture} />
    </instancedMesh>
  );
}
