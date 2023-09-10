import styled from "styled-components";
import { useEffect, useState } from "react";
import { AiOutlineSwapLeft, AiOutlineSwapRight } from "react-icons/ai";
import media from "styled-media-query";

type Post = {
  thumbnail: string;
  url: string;
};
type Props = {
  posts: Post[];
};

const getItemWidth = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth < 768) {
    return windowWidth - 100;
  }
  return windowWidth / 2 > 600 ? 600 : windowWidth / 2;
};

const getStartX = (
  sliderListWidth: number,
  itemWidth: number,
  leftMargin: number
) => {
  const windowWidth = window.innerWidth;
  if (windowWidth < 768) {
    return -sliderListWidth / 2 + (windowWidth - itemWidth) / 2;
  }
  return -sliderListWidth / 2 + itemWidth / 2 + leftMargin;
};

const Slider = ({ posts }: Props) => {
  const windowWidth = window.innerWidth;
  const itemWidth = getItemWidth();
  const sliderListWidth = itemWidth * posts.length;
  const leftMargin = windowWidth >= 1280 ? 140 : 0;
  const [startX, setStartX] = useState(
    getStartX(sliderListWidth, itemWidth, leftMargin)
  );
  const [containerStartX, setContainerStartX] = useState(0);
  const [items, setItems] = useState<any>([]);
  const [animationDirection, setAnimationDirection] = useState<
    "back" | "next"
  >();
  const [isTransitionEnd, setIsTransitionEnd] = useState(true);

  useEffect(() => {
    const thumbnails = posts.map((post: Post) => {
      // TODO @で指定しえいるrootエイリアスをどうにかできないか
      const path = post.thumbnail.replace("@/", "../../");
      return import(path);
    });
    const getImages = async () => {
      const _posts = [...posts];
      const res = await Promise.all(thumbnails);

      setItems(
        _posts.map((post, index) => {
          post.thumbnail = res[index].default.src;
          return post;
        })
      );
    };
    getImages();
  }, [posts]);

  const back = () => {
    if (!isTransitionEnd) return;
    setIsTransitionEnd(false);
    setAnimationDirection("back");
    setStartX(startX + itemWidth);
  };

  const next = () => {
    if (!isTransitionEnd) return;
    setIsTransitionEnd(false);
    setAnimationDirection("next");
    setStartX(startX - itemWidth);
  };

  const onTransitionEnd = () => {
    const _items = [...items];

    if (animationDirection === "next") {
      //　先頭の要素を末尾に追加
      _items.push(_items.shift());
      setItems(_items);
      setContainerStartX(containerStartX + itemWidth);
    } else {
      //　末尾の要素を先頭に追加
      _items.unshift(_items.pop());
      setItems(_items);
      setContainerStartX(containerStartX - itemWidth);
    }
    setIsTransitionEnd(true);
  };

  return (
    <SliderWrapper $width={windowWidth}>
      <BackButton onClick={back} type="button">
        <AiOutlineSwapLeft />
      </BackButton>
      <SliderListMoveContainer $startX={containerStartX}>
        <SliderList
          $width={sliderListWidth}
          $startX={startX}
          onTransitionEnd={onTransitionEnd}
        >
          {items.map((item: any, index: number) => (
            <SliderItem key={index} $width={itemWidth}>
              <a href={item.url}>
                <img src={item.thumbnail} alt="" />
              </a>
            </SliderItem>
          ))}
        </SliderList>
      </SliderListMoveContainer>
      <NextButton onClick={next}>
        <AiOutlineSwapRight />
      </NextButton>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}px;
  height: 100%;
  position: relative;
  display: block;
  overflow: hidden;
  transform: translateZ(0);
  margin-left: calc(var(--spacing-XL) * -1);
  ${media.lessThan("medium")`
    margin-left: calc(var(--spacing-L) * -1);
  `}
`;

const SliderList = styled.div<{
  $width: number;
  $startX: number;
}>`
  width: ${({ $width }) => $width}px;
  height: 100%;
  position: relative;
  display: block;
  transition-duration: 500ms;
  transform: ${({ $startX }) => `translate3d(${$startX}px, 0px, 0px)`};
`;

const SliderListMoveContainer = styled.div<{ $startX: number }>`
  width: 100%;
  height: 100%;
  transition-duration: 0ms;
  transform: ${({ $startX }) => `translate3d(${$startX}px, 0px, 0px)`};
`;

const SliderItem = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}px;
  float: left;
  min-height: 1px;
  box-sizing: border-box;
  padding: var(--spacing-XL) var(--spacing-XL);
  ${media.lessThan("medium")`
    padding: var(--spacing-M);
  `}
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
  font-size: var(--font-size-XXL);
  background-color: rgba(0, 0, 0, 0.6);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: var(--color-white);
  text-align: center;
  line-height: 50px;
  transition-duration: 200ms;
  &:hover {
    transform: translateY(-50%) scale(1.2);
  }
`;

const BackButton = styled(BaseButton)`
  left: 10px;
`;

const NextButton = styled(BaseButton)`
  right: 10px;
`;

export default Slider;
