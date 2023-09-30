import styled from "styled-components";
import Minus from "../../assets/minus-icon_2.svg";
import Plus from "../../assets/plus-icon_2.svg";
import Result from "../../assets/icon-result.svg";
import { media } from "../style/media";
const TotalContainer = styled.div`
  display: flex;
  border-radius: 10px;
  background: #f2f2f2;

  & > div:last-child > p:nth-child(2) {
    color: var(--price-point-color);
  }
`;

const TotalBox = styled.div`
  width: 320px;
  padding: 46px 0;
  text-align: center;
  position: relative;

  ${media.Small`
    font-size: 0.7rem;
   `}

  p:last-child {
    margin-top: 12px;

    strong {
      font-size: 1.6em;
      font-weight: 700;
      margin-right: 2px;
    }
  }

  &:nth-child(1)::after,
  &:nth-child(2)::after,
  &:nth-child(3)::after {
    content: "";
    position: absolute;
    background-repeat: no-repeat;
    background-position: center;
    top: 61px;
    right: 0;
    width: 34px;
    height: 34px;
    ${media.Small`
        top:49px ;
        right:-17px ;
        background-size:50% ;
      `}
  }

  &:nth-child(1)::after {
    background-image: url(${Minus});
  }

  &:nth-child(2)::after {
    background-image: url(${Plus});
  }

  &:nth-child(3)::after {
    background-image: url(${Result});
  }
`;

const TotalPrice = styled.p`
  font-weight: 700;
`;

export { TotalContainer, TotalBox, TotalPrice };
