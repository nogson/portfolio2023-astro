import { useEffect, useRef } from "react";
import {  useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { a } from "@react-spring/three";

type ItemProps = {
  geometry: THREE.BufferGeometry;
  position: number[];
  rotation?: number[];
  color: string;
  rate?: number;
};

const items: ItemProps[] = [
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

export default function BackgroundGeometry({
  scrollY = 0,
}: {
  scrollY: number;
}) {
  const rate = 0.5;
  const r = 0.4;
  return items.map((item: ItemProps, index: number) => {
    const ref = useRef<THREE.Mesh>(null!);
    let material = new THREE.MeshToonMaterial({ color: item.color });

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
      ref.current.rotation.x += 0.002;
      ref.current.rotation.z += 0.002;
      ref.current.position.y =
        item.position[1] +
        Math[r > 1 ? "cos" : "sin"](state.clock.getElapsedTime() * r) * r;
    });

    useEffect(() => {
      ref.current.rotation.x = ref.current.rotation.x + rate;
      ref.current.rotation.z = ref.current.rotation.x + rate;
    }, [rate]);

    return (
      <group key={index}>
        <a.mesh
          {...item}
          material={material}
          geometry={item.geometry}
          ref={ref}
        />
      </group>
    );
  });
}
