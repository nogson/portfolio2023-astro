import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useThrottle } from "@/assets/js/useThrottle";

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

function Box(props) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.1;
    ref.current.rotation.y += delta * 0.1;
    ref.current.position.y += delta * 0.1;
  });

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function Sphere(props) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    // ref.current.position.x += delta * 0.1;
    // ref.current.position.z -= delta * 0.1;
    // ref.current.position.y += delta * 0.1;
  });

  return (
    
    <mesh {...props} ref={ref}>
      <sphereGeometry args={[0.5, 16]} />
      <meshPhongMaterial color={props.color} />
    </mesh>
  );
}

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
      position: [1, 2, -1],
      rotation: [-0.25 + rate, 0 + rate, -1 + rate],
    },
    {
      path: filePath[1],
      position: [3, -2, -2],
      rotation: [-0.4 - rate, -0.2 + rate, 1 - rate],
    },
    {
      path: filePath[2],
      position: [0.25, -1.7, 2],
      rotation: [-0.7 - rate, -0.5 + rate, -0.1 - rate],
    },
    {
      path: filePath[3],
      position: [7, 0, -0.5],
      rotation: [-0.2 + rate, 0.5 + rate, 1],
    },
    {
      path: filePath[4],
      position: [7, -3, -1],
      rotation: [-0.7, -0.5 - rate, -1],
    },
    {
      path: filePath[5],
      position: [7.5, 3, -1.5],
      rotation: [0.2 + rate, 0.25, 0 - rate],
    },
    {
      path: filePath[6],
      position: [7, -1.5, 1],
      rotation: [0.2 - rate, 0.25 + rate, 0 - rate],
    },
    // {
    //   path: filePath[7],
    //   position: [3.5, -3, 1],
    //   rotation: [0, -0.5 + rate, 0],
    //   scale: [1, 1, 1],
    // },
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
          position={[0, 0, 10]}
        ></PerspectiveCamera>
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[-12, 5, 10]} intensity={3.5} />
        <fog attach="fog" color={"#e9e9e9"} near={5 - rate * 10} far={30} />
        {models.map((model, index) => (
          <Model
            key={index}
            path={model.path}
            position={model.position}
            rotation={model.rotation}
            scale={model.scale}
          />
        ))}
        <Sphere
          position={[-1 + rate * 0.1 * rate, rate, rate * 2]}
          color={"#ff8af5"}
        />
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
