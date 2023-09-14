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

type GradationCircleProps = {
  $pos: { x: number; y: number };
  $color: string;
  $size: number;
};

const GradationCircleSpan = styled.span.attrs<GradationCircleProps>((props) => {
  return {
    style: {
      transform: `translate3d(${props.$pos.x}px,${props.$pos.y}px, 0px)`,
      height: `${props.$size}px`,
      width: `${props.$size}px`,
      backgroundImage: `radial-gradient(circle, ${rgba(
        props.$color,
        0.7
      )} 20%,${rgba(props.$color, 0)} 60%)`,
    },
  };
})`
  position: absolute;
  top: 0;
  left: 0;
  mix-blend-mode: screen;
`;
