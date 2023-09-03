import { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Instances } from "@react-three/drei";
import * as THREE from "three";
import { a, useSpring } from "@react-spring/three";

type Props = {
  geometry: THREE.BufferGeometry;
  position: number[];
  rotation?: number[];
  color: string;
  rate?: number;
};

export default function BackgroundGeometry({ rate = 0, ...props }: Props) {
  const ref = useRef<THREE.Mesh>(null!);
  let material = new THREE.MeshToonMaterial({ color: props.color });
  const r = 0.5;

  // useEffect(() => {
  //   ref.current.scale.x = 0;
  //   ref.current.scale.y = 0;
  //   ref.current.scale.z = 0;
  // }, []);

  useFrame((state) => {
    // if (ref.current.scale.x <= 1) {
    //   ref.current.scale.x += 0.01;
    //   ref.current.scale.y += 0.01;
    //   ref.current.scale.z += 0.01;
    // }
    //ref.current.rotation.z += 0.005;

    ref.current.position.y =
      props.position[1] +
      Math[r > 1 ? "cos" : "sin"](state.clock.getElapsedTime() * r) * r;
  });

  useEffect(() => {
    ref.current.rotation.x = ref.current.rotation.x + rate;
    ref.current.rotation.z = ref.current.rotation.x + rate;
  }, [rate]);

  return (
    <group>
      <a.mesh
        {...props}
        material={material}
        geometry={props.geometry}
        ref={ref}
      />
    </group>
  );
}
