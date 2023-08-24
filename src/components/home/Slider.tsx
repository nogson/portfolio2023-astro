import styled from "styled-components";
import { Transition } from "react-transition-group";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
};

const Slider = ({ images }: Props) => {
  const windowWidth = window.innerWidth;
  const itemWidth = windowWidth / 2;
  const sliderListWidth = itemWidth * images.length;
  const duration = 300;
  const [startX, setStartX] = useState(-sliderListWidth / 2 + itemWidth / 2);
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    const thumbnails = images.map((image: string) => {
      // TODO @で指定しえいるrootエイリアスをどうにかできないか
      return import(image.replace("@/", "../../"));
    });
    const getImages = async () => {
      const res = await Promise.all(thumbnails);
      setItems(res.map((d) => d.default.src));
    };
    getImages();
  }, [images]);

  const back = () => {
    console.log("back");
    setStartX(startX + itemWidth);
  };

  const next = () => {
    console.log("next");
    setStartX(startX - itemWidth);
  };

  return (
    <SliderWrapper>
      <BackButton onClick={back} type="button">
        左
      </BackButton>
      <Transition timeout={duration}>
        <SliderList $width={sliderListWidth} $startX={startX}>
          {items.map((item: any, index: number) => (
            <SliderItem key={index} $width={itemWidth}>
              <img src={item} alt="" />
            </SliderItem>
          ))}
        </SliderList>
      </Transition>
      <NextButton onClick={next}>右</NextButton>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  overflow: hidden;
  transform: translateZ(0);
`;

const SliderList = styled.div<{ $width: number; $startX: number }>`
  width: ${({ $width }) => $width}px;
  height: 100%;
  position: relative;
  display: block;
  transition: 0.5s;
  transform: ${({ $startX }) => `translate3d(${$startX}px, 0px, 0px)`};
`;

const SliderItem = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}px;
  float: left;
  min-height: 1px;
  box-sizing: border-box;
  padding: var(--spacing-XL) var(--spacing-XL);
  img {
    width: 100%;
    height: auto;
    border-radius: 50px;
    box-shadow: var(--shadow-02);
  }
`;

const BaseButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
`;

const BackButton = styled(BaseButton)`
  left: 10px;
`;

const NextButton = styled(BaseButton)`
  right: 10px;
`;

export default Slider;
