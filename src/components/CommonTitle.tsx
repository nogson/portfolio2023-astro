import styled from "styled-components";
import media from "styled-media-query";
import { ElementType, ReactNode, JSX, useState } from "react";
import { MotionProps, motion } from "framer-motion";

export type ScrollRevealProps<T extends keyof JSX.IntrinsicElements> = {
  children: ReactNode;
  as?: keyof typeof motion | ElementType;
  initial?: MotionProps["initial"];
  whileInView?: MotionProps["whileInView"];
  delay: number;
  text: string;
} & JSX.IntrinsicElements[T];

const CommonTitle = ({
  text,
  delay = 0,
  size,
  sizeUnit = "rem",
  color = "#242424",
}: {
  text: string;
  delay?: number;
  size: number;
  sizeUnit?: string;
  color?: string;
}) => {
  const [titleArr, setTitleArr] = useState(text.split(""));
  return (
    <Title
      className="title-main"
      $fontSize={`${size}${sizeUnit}`}
      $color={color}
    >
      {titleArr.map((char, index) => {
        return (
          <motion.span
            className="title-char"
            variants={{
              offscreen: {
                // 画面外の場合のスタイル
                transform: "translateY(50px)",
                opacity: 0,
              },
              onscreen: {
                // 画面内の場合のスタイル
                transform: "translateY(0px)",
                opacity: 1,
                transition: {
                  duration: 0.25,
                  delay: index * 0.05 + delay,
                  type: "spring",
                  stiffness: 50,
                  ease: "easeIn",
                },
              },
            }}
            initial="offscreen" // 初期表示はoffscreen
            whileInView="onscreen" // 画面内に入ったらonscreen
            viewport={{ once: true }}
            key={index}
          >
            <TitleChar $fontSize={size} $sizeUnit={sizeUnit}>
              {char}
            </TitleChar>
          </motion.span>
        );
      })}
    </Title>
  );
};

const Title = styled.div<{ $fontSize: string; $color: string }>`
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => $fontSize};
  font-family: $font-family-oswald;
  filter: drop-shadow(0px 0px 10px rgba(255, 255, 255, 1));
  margin-bottom: 0;
  ${media.lessThan("medium")`
  font-size: ${({ $fontSize }: { $fontSize: string }) =>
    `${parseFloat($fontSize) * 0.65}rem`};

  `}
  .title-char {
    display: inline-block;
  }
`;

const TitleChar = styled.span.attrs<{ $fontSize: number; $sizeUnit: string }>(
  ({ $fontSize, $sizeUnit }) => {
    return {
      style: {
        minWidth: `${$fontSize * 0.25}${$sizeUnit}`,
      },
    };
  }
)`
  display: inline-block;
`;

export default CommonTitle;
