import styled from "styled-components";

const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  overflow: hidden;
  transform: translateZ(0);
`;

const SliderList = styled.div<{ $width: number,$startX: number }>`
  width: ${({ $width }) => $width}px;
  height: 100%;
  position: relative;
  display:block;
  transform: ${({ $startX }) => `translate3d(${$startX}px, 0px, 0px)`};
  transition: all 1.0s;
`;

const SliderItem = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}px;
  height: 100px;
  float: left;
  min-height: 1px;
  box-sizing: border-box;
  border: 1px solid #000;
  `;

const BaseButton = styled.button`
    position: absolute;
    top:50%;
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


const Slider = () => {
  const windowWidth = window.innerWidth;
  const item = [1, 2, 3, 4];
  const itemWidth = windowWidth / 2;
  const sliderListWidth = itemWidth * item.length;
  let startX = -itemWidth;

  const back = () => {
    console.log('back')
    startX = startX + itemWidth;
  }

  const next = () => {
    console.log('next')
    startX = startX - itemWidth;
  }

  return (
    <SliderWrapper>
      <BackButton onClick={back} type="button">左</BackButton>
      <SliderList $width={sliderListWidth} $startX={startX}>
        {item.map((item, index) => (
          <SliderItem key={index} $width={itemWidth}>
            {item}
          </SliderItem>
        ))}
      </SliderList>
      <NextButton onClick={next}>右</NextButton>
    </SliderWrapper>
  );
};


export default Slider;
