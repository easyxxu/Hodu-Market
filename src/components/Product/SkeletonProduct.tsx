import { keyframes, styled } from "styled-components";
import { media } from "../style/media";
export default function SkeletonProduct() {
  return (
    <SkeletonWrap>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </SkeletonWrap>
  );
}
const loading = keyframes`
  0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
`;

const SkeletonWrap = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  div {
    background-color: #f2f2f2;
    position: relative;
    overflow: hidden;
  }
  div::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${loading} 1.5s infinite ease-in-out;
  }
  div:first-child {
    border-radius: 10px;
    height: 350px;
    ${media.Medium`
    height: 250px;
  `}
    ${media.Small`
    height: 90px;
  `}
  }
  div:not(:first-child) {
    height: 22px;
  }
  div:nth-child(2) {
    width: 50%;
  }
  div:last-child {
    width: 30%;
  }
`;
