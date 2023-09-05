import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { rgba } from "polished";

let beforeScrollY: number = 0;

export default function GradationCircle({
  scrollY,
  color,
  position,
  size,
}: {
  scrollY: number;
  color: string;
  position: { x: number; y: number };
  size: number;
}) {
  const grd = useRef<HTMLElement>(null!);
  const [pos, setPos] = useState({ x: position.x, y: position.y });
  const r = 0.4;

  useEffect(() => {
    const x = pos.x - scrollY * 0.1;
    const y = pos.y - scrollY * 0.05;
    if (pos.x < size * -1) {
      setPos({ x: window.innerWidth, y: y });
    } else if (pos.y < size * -1) {
      setPos({ x, y: window.innerHeight });
    } else {
      setPos({ x, y: y });
    }

    beforeScrollY = scrollY;
  }, [scrollY]);

  return (
    <GradationCircleSpan ref={grd} $pos={pos} $color={color} $size={size} />
  );
}

const GradationCircleSpan = styled.span<{
  $pos: { x: number; y: number };
  $color: string;
  $size: number;
}>`
  position: absolute;
  transform: ${({ $pos }) => `translate3d(${$pos.x}px,${$pos.y}px, 0px)`};
  top: 0;
  left: 0;
  height: ${({ $size }) => `${$size}px`};
  width: ${({ $size }) => `${$size}px`};
  mix-blend-mode: screen;
  background-image: ${({ $color }) => `radial-gradient(
      circle,
      ${rgba($color, 0.7)} 20%,
      ${rgba($color, 0)} 60%
    )`};
`;
