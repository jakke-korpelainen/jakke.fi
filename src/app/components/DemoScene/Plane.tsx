import { PlaneProps, usePlane } from "@react-three/cannon";
import { useTexture } from "@react-three/drei";
import { MeshPhongMaterialProps } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, MeshBasicMaterial } from "three";

type PlaneArgs =
  | [
      width?: number | undefined,
      height?: number | undefined,
      widthSegments?: number | undefined,
      heightSegments?: number | undefined,
    ]
  | undefined;

type LocalPlaneProps = Pick<MeshPhongMaterialProps, "color"> &
  Pick<PlaneProps, "position" | "rotation"> & { args?: PlaneArgs };

export function TexturedPlane({ textureSrc, ...props }: LocalPlaneProps & { textureSrc: string }) {
  const [map] = useTexture([textureSrc]);
  const args: PlaneArgs = [10, 10];

  return <Plane args={[...args]} map={map} {...props} />;
}

export function Plane({ color, map, args, ...props }: LocalPlaneProps & { map?: MeshBasicMaterial["map"] }) {
  const [ref] = usePlane(() => ({ ...props }), useRef<Mesh>(null));

  return (
    <mesh ref={ref}>
      <planeGeometry args={[...(args ?? [100, 100])]} />
      <meshPhongMaterial color={color} map={map} />
    </mesh>
  );
}
