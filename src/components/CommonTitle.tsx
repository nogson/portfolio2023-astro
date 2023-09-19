import styled from "styled-components";
import media from "styled-media-query";
import { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CommonTitle = ({ text, delay = 0 }: { text: string; delay: number }) => {
  const [titleArr, setTitleArr] = useState(text.split(""));
  return (
    <Title className="title-main">
      {titleArr.map((char, index) => {
        return (
          <motion.span
            className="title-char"
            initial={{ opacity: 0, transform: "translateY(100px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{
              duration: 0.25,
              delay: index * 0.1 + delay,
              type: "spring",
              stiffness: 50,
              ease: "easeIn",
            }}
            key={index}
          >
            {char}
          </motion.span>
        );
      })}
    </Title>
  );
};

const Title = styled.h2`
  font-family: $font-family-oswald;
  font-size: var(--font-size-hero-title);
  filter: drop-shadow(0px 0px 10px rgba(255, 255, 255, 1));
  margin-bottom: 0;

  .title-char {
    display: inline-block;
  }
`;
export default CommonTitle;
