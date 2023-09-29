import styled from "styled-components";
import ToggleCheck from "../../assets/toggle-check.svg";
import ToggleUnCheck from "../../assets/toggle-uncheck.svg";
import Close from "../../assets/icon-delete.svg";
import { media } from "../style/media";
const CartItemContainer = styled.li`
  /* max-width: 1280px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 100px 20px 30px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  position: relative;
  ${media.Small`
    font-size: 0.9rem;
    padding-left: 10px;
    padding-right: 30px;
  `}
`;
const ToggleCheckBox = styled.input`
  background: url(${ToggleUnCheck}) no-repeat;
  width: 20px;
  height: 20px;
  margin: auto 0;
  appearance: none;
  cursor: pointer;
  &:checked {
    background: url(${ToggleCheck}) no-repeat;
  }
`;
const ProductInfoContainer = styled.div`
  display: flex;
  gap: 40px;
  width: 500px;
  word-break: keep-all;
  ${media.Small`
    width: inherit;
    /* gap: 20px; */
    /* width: 180px; */
  `}
`;
const ProductInfoWrapper = styled.div`
  display: flex;
  gap: 36px;
  ${media.Small`
    flex-direction: column;
    gap: 10px;
    width: 110px;
  `}
`;
const ProductImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 10px;
  ${media.Small`
    width: 80px;
    height: 80px;
  `}
`;
const ProductInfo = styled.div`
  padding: 10px 0;
  ${media.Small`
    /* float: left; */
  `}
  p:nth-child(1) {
    color: var(--content-color-dark);
    margin-bottom: 10px;
  }
  p:nth-child(2) {
    font-size: 1.125em;
    margin-bottom: 10px;
  }
  p:nth-child(3) {
    font-weight: 700;
    margin-bottom: 40px;
  }
  p:last-child {
    font-size: 0.875em;
    color: var(--content-color-dark);
  }
`;

const ProductPriceContainer = styled.div`
  p {
    color: #eb5757;
    text-align: center;
    font-size: 1.125em;
    font-weight: 700;
    margin-bottom: 26px;
  }
  button {
    width: 130px;
    padding: 10px 35px;
    font-size: 1em;
    font-weight: 500;
    border-radius: 5px;
    background-color: var(--point-color);
    color: #fff;
    ${media.Small`
      padding: 10px;
      width: 73px;
    `}
  }
`;
const BtnDelete = styled.button`
  position: absolute;
  background: url(${Close}) no-repeat center center;
  width: 22px;
  height: 22px;
  top: 18px;
  right: 18px;
`;
export {
  CartItemContainer,
  ToggleCheckBox,
  ProductInfoContainer,
  ProductImg,
  ProductInfoWrapper,
  ProductInfo,
  ProductPriceContainer,
  BtnDelete,
};
