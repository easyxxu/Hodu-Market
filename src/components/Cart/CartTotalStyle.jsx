import styled from "styled-components";
import Minus from "../../assets/minus-icon_2.svg";
import Plus from "../../assets/plus-icon_2.svg";
const TotalContainer = styled.div`
  display: flex;
  border-radius: 10px;
  background: #f2f2f2;
  & > div:last-child > p:nth-child(2) {
    color: var(--price-point-color);
    strong {
      font-size: 36px;
    }
  }
`;
const TotalBox = styled.div`
  width: 320px;
  height: 150px;
  padding: 46px 91px;
  text-align: center;
  position: relative;
  p:last-child {
    margin-top: 12px;
    strong {
      font-size: 24px;
      font-weight: 700;
      margin-right: 2px;
    }
  }
  &:nth-child(1)::after {
    content: "";
    position: absolute;
    background: url(${Minus}) no-repeat center;
    top: 55px;
    right: 0;
    width: 34px;
    height: 34px;
  }
  &:nth-child(2)::after {
    content: "";
    position: absolute;
    background: url(${Plus}) no-repeat center;
    top: 55px;
    right: 0;
    width: 34px;
    height: 34px;
  }
`;
const TotalPrice = styled.p`
  font-weight: 700;
`;
export { TotalContainer, TotalBox, TotalPrice };
