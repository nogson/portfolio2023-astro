import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

export default function CommonImg({ src, alt }: { src: string; alt: string }) {
  const [isShow, setIsShow] = useState(false);

  const openWindow = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      <Img src={src} alt={alt} onClick={openWindow} />
      <Dialog $isShow={isShow} onClick={openWindow}>
        <div className="close-button">
          <AiOutlineClose />
        </div>
        <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
      </Dialog>
    </>
  );
}

const Img = styled.img`
  cursor: pointer;
`;

const Dialog = styled.div<{ $isShow: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $isShow }) => ($isShow ? 1 : 0)};
  transition: all 0.5s ease;
  visibility: ${({ $isShow }) => ($isShow ? "visible" : "hidden")};
  padding: var(--spacing-L);
  box-sizing: border-box;
  z-index: 100;

  img {
    padding: var(--spacing-L);
    background: var(--color-white);
    border: none !important;
    border-radius: var(--radius-M);
  }

  .close-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: var(--spacing-M);
    background: none;
    border: none;
    color: var(--color-white);
    font-size: var(--font-size-XXL);
    cursor: pointer;
  }
`;
