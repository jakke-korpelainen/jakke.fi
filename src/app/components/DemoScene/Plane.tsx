import { PlaneProps, usePlane } from "@react-three/cannon";
import { MeshPhongMaterialProps } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { Mesh, TextureLoader, Texture } from "three";

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

export function Plane({ color, image, ...props }: OurPlaneProps) {
  const [ref] = usePlane(() => ({ ...props }), useRef<Mesh>(null));

  const texture = useMemo(() => {
    if (image) {
      const textureLoader = new TextureLoader();
      return textureLoader.load(image, (texture: Texture) => {
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
