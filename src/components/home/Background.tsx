import * as THREE from "three";
import styled from "styled-components";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useThrottle } from "@/assets/js/useThrottle";
import {
  EffectComposer,
  DepthOfField,
  N8AO,
  TiltShift2,
} from "@react-three/postprocessing";
import BackgroundGeometry from "@/components/background/BackgroundGeometry";
import BackgrounGltfModel from "../background/BackgroundGltfModel";

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

const geometryItems = [
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [3, 2, -11.5],
    color: "#ff8af5",
  },
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [-2, -3, -15],
    color: "#ffd500",
  },
  {
    geometry: new THREE.BoxGeometry(1, 1, 1),
    position: [-3, 2, -13.5],
    rotation: [1, 0.5, 0.5],
    color: "#4a7b9e",
  },
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [3, 2, 11.5],
    color: "#ff8af5",
  },
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [-2, -3, 15],
    color: "#ffd500",
  },
  {
    geometry: new THREE.BoxGeometry(1, 1, 1),
    position: [5, -1.5, 15.5],
    rotation: [-1, -2, 0.5],
    color: "#b749c1",
  },
  {
    geometry: new THREE.CylinderGeometry(0.8, 0.8, 2, 32),
    position: [-3, -1.5, 15.5],
    rotation: [-1, -2, 0.5],
    color: "#e0e0e0",
  },
  {
    geometry: new THREE.IcosahedronGeometry(1),
    position: [0, 0, 17.5],
    rotation: [-1, -2, 0.5],
    color: "#8f8cc9",
  },
  // -------
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [10, 2, 0],
    color: "#dcff8a",
  },
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [-12, -4, -7],
    color: "#ffd500",
  },
  {
    geometry: new THREE.BoxGeometry(1, 1, 1),
    position: [-13, 2, -1],
    rotation: [1, 0.5, 0.5],
    color: "#4a7b9e",
  },
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [13, 2, -3],
    color: "#8afff9",
  },
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [-12, -3, -5],
    color: "#b300ff",
  },
  {
    geometry: new THREE.BoxGeometry(1, 1, 1),
    position: [15, -1.5, 0],
    rotation: [-1, -2, 0.5],
    color: "#c7ff73",
  },
  {
    geometry: new THREE.CylinderGeometry(0.8, 0.8, 2, 32),
    position: [-15, -1.5, 3],
    rotation: [-1, -2, 0.5],
    color: "#ffffff",
  },
  {
    geometry: new THREE.IcosahedronGeometry(1),
    position: [-14, 0, 5],
    rotation: [-1, -2, 0.5],
    color: "#ffa775",
  },
  {
    geometry: new THREE.IcosahedronGeometry(1),
    position: [-7, 4, -7],
    rotation: [-1, -2, 0.5],
    color: "#7593ff",
  },
];

type ModelProps = {
  path: string;
  position: number[];
  rotation?: number[];
  scale?: number[];
};

function Model({ path, ...props }: ModelProps) {
  const model = useLoader(GLTFLoader, path);
  const ref = useRef<THREE.Group>(null!);

  return <primitive ref={ref} {...props} object={model.scene} />;
}

const Background = () => {
  const [scrollY, setScrollY] = useState(0);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const rate = scrollY * 0.001;

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

  const handler = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 33);

  useEffect(() => {
    window.addEventListener("scroll", handler);
  });

  return (
    <BackgroundWrapper>
      <Canvas>
        <PerspectiveCamera
          makeDefault
          aspect={windowWidth / windowHeight}
          position={[0, 0, 0]}
          rotation={[0, rate * -1, 0]}
        />

        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[-12, 5, 10]} intensity={3.5} />

        {/* <fog attach="fog" color={"#e9e9e9"} near={5} far={30} /> */}
        <Suspense fallback={null}>
          {models.map((item, index) => (
            <BackgrounGltfModel key={index} {...item} rate={rate} />
          ))}

          {geometryItems.map((item, index) => (
            <BackgroundGeometry key={index} {...item} rate={rate} />
          ))}
        </Suspense>
      </Canvas>
    </BackgroundWrapper>
  );
};

const BackgroundWrapper = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
`;

export default Background;
