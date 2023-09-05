import styled from "styled-components";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Image } from "@react-three/drei";
import { useThrottle } from "@/assets/js/useThrottle";
import BackgroundGeometry from "@/components/background/BackgroundGeometry";
import BackgrounGltfModels from "../background/BackgroundGltfModels";
import BackgroundImages from "../background/BackgroundImages";

const Background = () => {
  const [scrollY, setScrollY] = useState(0);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const rate = scrollY * 0.001;

  const handler = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 33);

  useEffect(() => {
    window.addEventListener("scroll", handler);
  });

  return (
    <BackgroundWrapper>
      <BackgroundImages scrollY={scrollY} />
      <Canvas>
        <PerspectiveCamera
          makeDefault
          aspect={windowWidth / windowHeight}
          position={[0, 0, 0]}
          rotation={[0, rate * -0.1, 0]}
        />

        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[-12, 5, 10]} intensity={3.5} />

        <fog attach="fog" color={"#e9e9e9"} near={5} far={30} />
        <Suspense fallback={null}>
          <BackgrounGltfModels scrollY={scrollY} />
          <BackgroundGeometry scrollY={scrollY} />
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
