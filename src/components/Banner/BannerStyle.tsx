import styled from "styled-components";
import ArrowLeft from "../../assets/svg/icon-swiper-1.svg";
import ArrowRight from "../../assets/svg/icon-swiper-2.svg";
import { media } from "../style/media";

export const BannerContainer = styled.div`
  width: 100vw;
  background-color: #f2f2f2;
  height: 400px;
  position: relative;
  overflow: hidden;
  margin-bottom: 70px;
  ${media.Small`
    height: 300px;
  `}
`;

export const BannerImgContainer = styled.div`
  width: 100vw;
  display: flex;
  /* transition: 5s ease-in-out; */
  img {
    width: 100vw;
    height: 400px;
    object-fit: cover;
    ${media.Small`
      height: 300px;
    `}
  }
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
