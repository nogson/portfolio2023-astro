import { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Instances } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type ModelProps = {
  path: string;
  position: number[];
  rotation?: number[];
  scale?: number[];
  rate?: number;
};

const filePath = [
  "/Javascript.gltf",
  "/AI.gltf",
  "/Figma.gltf",
  "/Typescript.gltf",
  "/PS.gltf",
  "/XD.gltf",
  "/Blender.gltf",
  "/man.gltf",
];

const models: ModelProps[] = [
  {
    path: filePath[0],
    position: [1, 2, -10],
    rotation: [-0.25 + rate, 0 + rate, -1 + rate],
  },
  {
    path: filePath[1],
    position: [3, -2, -12],
    rotation: [-0.4 - rate, -0.2 + rate, 1 - rate],
  },
  {
    path: filePath[2],
    position: [0.25, -1.7, -8],
    rotation: [-0.7 - rate, -0.5 + rate, -0.1 - rate],
  },
  {
    path: filePath[3],
    position: [7, 0, -11.5],
    rotation: [-0.2 + rate, 0.5 + rate, 1],
  },
  {
    path: filePath[4],
    position: [6, -3, -11],
    rotation: [-0.7, -0.5 - rate, -1],
  },
  {
    path: filePath[5],
    position: [6.5, 3, -11.5],
    rotation: [0.2 + rate, 0.25, 0 - rate],
  },
  {
    path: filePath[6],
    position: [7, -1.5, -9],
    rotation: [0.2 - rate, 0.25 + rate, 0 - rate],
  },
];

export default function BackgrounGltfModel({ path, ...props }: ModelProps) {
  const model = useLoader(GLTFLoader, path);
  const ref = useRef<THREE.Group>(null!);

  return <primitive ref={ref} {...props} object={model.scene} />;
}
