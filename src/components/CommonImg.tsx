import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
// import { AiOutlineCloseCircle } from "react-icons/ai";

export default function CommonImg({
  src,
  alt,
  width,
}: {
  src: string;
  alt: string;
  width?: string;
}) {
  const [isShow, setIsShow] = useState(false);
  const [imgW, setImgW] = useState<string>("100px");
  const imgElm = useRef<HTMLImageElement>(null);

  const openWindow = () => {
    setIsShow(!isShow);
  };

  useEffect(() => {
    const threshold = window.innerWidth - 200;
    const w =
      imgElm.current && threshold > imgElm.current.naturalWidth
        ? imgElm.current.naturalWidth
        : threshold;
    setImgW(`${w}px`);
  });

  return (
    <div>
      <Img src={src} alt={alt} onClick={openWindow} />
      <Dialog $isShow={isShow} $imgWidth={imgW} onClick={openWindow}>
        <div className="dialog">
          <div className="close-button">
            {/* <AiOutlineCloseCircle /> */}
          </div>
          <img
            src={src}
            alt={alt}
            width={width}
            onClick={(e) => e.stopPropagation()}
            ref={imgElm}
          />
        </div>
      </Dialog>
    </div>
  );
}

const Img = styled.img`
  cursor: pointer;
`;

const Dialog = styled.div<{ $isShow: boolean; $imgWidth: string }>`
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
    img {
      width: ${({ $imgWidth }) => $imgWidth};
    }
  }

  img {
    border: none !important;
  }
`;
