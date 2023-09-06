import { useEffect, useRef } from "react";
import {  useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { a } from "@react-spring/three";

type ItemProps = {
  geometry: THREE.BufferGeometry;
  position: number[];
  rotation?: number[];
  color: string;
  rate: number;
};

const items: ItemProps[] = [
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [3, 2, -11.5],
    color: "#ff8af5",
    rate: 0.5,
  },
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [-2, -3, -15],
    color: "#ffd500",
    rate: 0.4,
  },
  {
    geometry: new THREE.BoxGeometry(1, 1, 1),
    position: [-3, 2, -13.5],
    rotation: [1, 0.5, 0.5],
    color: "#4a7b9e",
    rate: 0.3,
  },
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [3, 2, 11.5],
    color: "#ff8af5",
    rate: 0.2,
  },
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [-2, -3, 15],
    color: "#ffd500",
    rate: 0.6,
  },
  {
    geometry: new THREE.BoxGeometry(1, 1, 1),
    position: [5, -1.5, 15.5],
    rotation: [-1, -2, 0.5],
    color: "#b749c1",
    rate: -0.5,
  },
  {
    geometry: new THREE.CylinderGeometry(0.8, 0.8, 2, 32),
    position: [-3, -1.5, 15.5],
    rotation: [-1, -2, 0.5],
    color: "#e0e0e0",
    rate: -0.3,
  },
  {
    geometry: new THREE.IcosahedronGeometry(1),
    position: [0, 0, 17.5],
    rotation: [-1, -2, 0.5],
    color: "#8f8cc9",
    rate: -0.2,
  },
  // -------
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [10, 2, 0],
    color: "#dcff8a",
    rate: 0.6,
  },
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [-12, -4, -7],
    color: "#ffd500",
    rate: 0.4,
  },
  {
    geometry: new THREE.BoxGeometry(1, 1, 1),
    position: [-13, 2, -1],
    rotation: [1, 0.5, 0.5],
    color: "#4a7b9e",
    rate: -0.4,
  },
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [13, 2, -3],
    color: "#8afff9",
    rate: 0.4,
  },
  {
    geometry: new THREE.SphereGeometry(0.5, 16, 16),
    position: [-12, -3, -5],
    color: "#b300ff",
    rate: 0.5,
  },
  {
    geometry: new THREE.BoxGeometry(1, 1, 1),
    position: [15, -1.5, 0],
    rotation: [-1, -2, 0.5],
    color: "#c7ff73",
    rate: 0.25,
  },
  {
    geometry: new THREE.CylinderGeometry(0.8, 0.8, 2, 32),
    position: [-15, -1.5, 3],
    rotation: [-1, -2, 0.5],
    color: "#ffffff",
    rate: 0.45,
  },
  {
    geometry: new THREE.IcosahedronGeometry(1),
    position: [-14, 0, 5],
    rotation: [-1, -2, 0.5],
    color: "#ffa775",
    rate: 0.5,
  },
  {
    geometry: new THREE.IcosahedronGeometry(1),
    position: [-7, 4, -7],
    rotation: [-1, -2, 0.5],
    color: "#7593ff",
    rate: 0.35,
  },
];

export default function BackgroundGeometry({
  scrollY = 0,
}: {
  scrollY: number;
}) {
  
  const r = 0.4;
  return items.map((item: ItemProps, index: number) => {
    const ref = useRef<THREE.Mesh>(null!);
    let material = new THREE.MeshToonMaterial({ color: item.color });

    useFrame((state) => {
      ref.current.rotation.x += 0.002;
      ref.current.rotation.z += 0.002;
      ref.current.position.y =
        item.position[1] +
        Math[r > 1 ? "cos" : "sin"](state.clock.getElapsedTime() * r) * r;
    });

    useEffect(() => {
      ref.current.rotation.x = ref.current.rotation.x + item.rate;
      ref.current.rotation.z = ref.current.rotation.x + item.rate;
    }, []);

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
