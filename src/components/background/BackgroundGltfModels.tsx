import { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


type ItemProps = {
  path: string;
  position: number[];
  rotation: number[];
  scale?: number[];
  rate: { x: number; y: number; z: number };
};

const filePath = [
  "/Javascript.gltf",
  "/AI.gltf",
  "/Figma.gltf",
  "/Typescript.gltf",
  "/PS.gltf",
  "/XD.gltf",
  "/Blender.gltf",
  "/vue.gltf",
  "/next.gltf",
  "/docker.gltf",
];

const items: ItemProps[] = [
  {
    path: filePath[0],
    position: [1, 2, -10],
    rotation: [-0.25, 0, -1],
    rate: { x: 0, y: 0.2, z: 0.1 },
  },
  {
    path: filePath[1],
    position: [3, -2, -12],
    rotation: [-0.4, -0.2, 1],
    rate: { x: -0.2, y: 0, z: 0.5 },
  },
  {
    path: filePath[2],
    position: [0.25, -1.7, -8],
    rotation: [-0.7, -0.5, -0.1],
    rate: { x: 0, y: 0, z: 0 },
  },
  {
    path: filePath[3],
    position: [7, 0, -11.5],
    rotation: [-0.2, 0.5, 1],
    rate: { x: 0.3, y: 0, z: 0.1 },
  },
  {
    path: filePath[4],
    position: [6, -3, -11],
    rotation: [-0.7, -0.5, -1],
    rate: { x: -0.2, y: 0, z: 0.5 },
  },
  {
    path: filePath[5],
    position: [6.5, 3, -11.5],
    rotation: [0.2, 0.25, 0],
    rate: { x: -0.3, y: -0.2, z: 0.1 },
  },
  {
    path: filePath[6],
    position: [7, -1.5, -9],
    rotation: [0.2, 0.25, 0],
    rate: { x: 0.3, y: -0.6, z: -0.2 },
  },
  {
    path: filePath[7],
    position: [6, -2.5, -4],
    rotation: [0.4, 0.4, 0.2],
    rate: { x: 0.3, y: -0.6, z: -0.2 },
  },
  {
    path: filePath[8],
    position: [7, 2, -6],
    rotation: [-0.2, -0.1, 0],
    rate: { x: 0.3, y: -0.6, z: -0.2 },
  },
  {
    path: filePath[9],
    position: [9, 0, -4],
    rotation: [-0.2, -0.1, 0],
    rate: { x: 0.1, y: -0.2, z: -0.6 },
  },
];

export default function BackgrounGltfModels({ scrollY }: { scrollY: number }) {
  return items.map((item: ItemProps, index: number) => {
    const model = useLoader(GLTFLoader, item.path);
    const ref = useRef<THREE.Group>(null!);
    const r = 0.4;

    useEffect(() => {
      ref.current.rotation.x = item.rotation[0] + scrollY * 0.003 * item.rate.x;
      ref.current.rotation.y = item.rotation[1] + scrollY * 0.003 * item.rate.y;
      ref.current.rotation.z = item.rotation[2] + scrollY * 0.003 * item.rate.z;

      ref.current.position.z =
        item.position[2] + Math.sin(scrollY * 0.001 );
    }, [scrollY]);

    useFrame((state) => {
      ref.current.position.y =
        item.position[1] +
        Math[r > 1 ? "cos" : "sin"](state.clock.getElapsedTime() * r) * r;
    });

    return <primitive key={index} ref={ref} {...item} object={model.scene} />;
  });
}
