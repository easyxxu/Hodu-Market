import styled from "styled-components";
import ArrowLeft from "../../assets/icon-swiper-1.svg";
import ArrowRight from "../../assets/icon-swiper-2.svg";

export const BannerContainer = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  height: 400px;
  position: relative;
`;

export const BannerLeftBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 4%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 124px;
  background: url(${ArrowLeft}) no-repeat;
`;

export const BannerRightBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 1%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 124px;
  background: url(${ArrowRight}) no-repeat;
`;
