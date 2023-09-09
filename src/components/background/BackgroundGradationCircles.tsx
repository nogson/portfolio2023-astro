import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import GradationCircle from "./GradationCircle";

const items = [
  { color: "#BC79FF", position: { x: 900, y: 100 }, size: 500 },
  { color: "#79BFFF", position: { x: 1050, y: 300 }, size: 400 },
  { color: "#FCFF79", position: { x: 1000, y: 350 }, size: 300 },
  { color: "#BC79FF", position: { x: 100, y: 600 }, size: 300 },
  { color: "#79BFFF", position: { x: 400, y: -100 }, size: 200 },
  { color: "#FCFF79", position: { x: 1400, y: 100 }, size: 500 },
  { color: "#BC79FF", position: { x: 200, y: 100 }, size: 100 },
  { color: "#79BFFF", position: { x: 0, y: 650 }, size: 600 },
  { color: "#FCFF79", position: { x: 1800, y: 300 }, size: 100 },
];

let beforeScrollY: number = window.scrollY;

export default function BackgroundGradationCircles({ scrollY }: { scrollY: number }) {
  useEffect(() => {
    beforeScrollY = scrollY;
  }, [scrollY]);

  return (
    <BackgroundImagesWrapper>
      {items.map((item, index) => (
        <GradationCircle
          key={index}
          scrollY={scrollY - beforeScrollY}
          color={item.color}
          position={item.position}
          size={item.size}
        />
      ))}
    </BackgroundImagesWrapper>
  );
}

const BackgroundImagesWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

// export default function BackgroundImages({ scrollY }: { scrollY: number }) {
//   const image = useRef<THREE.Mesh>(null!);
//   useEffect(() => {}, [scrollY]);
//   const url =
//     "https://images.pexels.com/photos/227675/pexels-photo-227675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
//   console.log(Image);
//   return (
//     <Image
//       raycast={() => null}
//       ref={image}
//       position={[1, 2, -10]}
//       url={url}
//     />
//   );
// }
