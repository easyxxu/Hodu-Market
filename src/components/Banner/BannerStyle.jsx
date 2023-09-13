import styled, { keyframes } from "styled-components";
import ArrowLeft from "../../assets/icon-swiper-1.svg";
import ArrowRight from "../../assets/icon-swiper-2.svg";

const fadeAnimation = keyframes`
0%{
  opacity: 1;
}
50%{
  opacity: 0.5;
}
100%{
  opacity:1;
}
`;
export const BannerContainer = styled.div`
  width: 100vw;
  background-color: #f2f2f2;
  height: 400px;
  position: relative;
  transition: transform 0.5s;
  overflow: hidden;
  animation-name: ${fadeAnimation};
  animation-duration: 0.8s;
`;

export const BannerLeftBtn = styled.button`
  position: absolute;
  top: 45%;
  left: 10px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: url(${ArrowLeft}) no-repeat center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const BannerRightBtn = styled.button`
  position: absolute;
  top: 45%;
  right: 10px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: url(${ArrowRight}) no-repeat center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const BannerImgContainer = styled.div`
  width: 100vw;
  display: flex;
  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
`;
