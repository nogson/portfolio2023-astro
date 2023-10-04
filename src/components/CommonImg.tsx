import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { IoCloseSharp } from "react-icons/io5";

export default function CommonImg({ src, alt }: { src: string; alt: string }) {
  const [isShow, setIsShow] = useState(false);

  const openWindow = () => {
    setIsShow(!isShow);
  };

  return (
    <div>
      <Img src={src} alt={alt} onClick={openWindow} />
      <Dialog $isShow={isShow} onClick={openWindow}>
        <div className="dialog">
          <div className="close-button">
            <IoCloseSharp />
          </div>
          <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
        </div>
      </Dialog>
    </div>
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

  .dialog {
    position: relative;
    padding: var(--spacing-L);
    background: var(--color-white);
    border-radius: var(--radius-M);
    .close-button {
      position: absolute;
      top: -10px;
      right: -10px;
      background: none;
      border: none;
      font-size: var(--font-size-XXL);
      line-height: 1;
      cursor: pointer;
      padding: var(--spacing-M);
      background: var(--color-white);
      border-radius: 100%;
    }
  }

  img {
    border: none !important;
  }
`;
