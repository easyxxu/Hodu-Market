import styled from "styled-components";
import ToggleCheck from "../../assets/toggle-check.svg";
import ToggleUnCheck from "../../assets/toggle-uncheck.svg";
import Close from "../../assets/icon-delete.svg";
import { media } from "../style/media";
const CartItemContainer = styled.tr`
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  position: relative;
  ${media.Small`
    font-size: 0.9rem;
    padding-left: 10px;
    padding-right: 30px;
  `}
  td {
    vertical-align: middle;
    padding: 20px;
    &:first-child {
      border-left: 2px solid #e0e0e0;
      border-top: 2px solid #e0e0e0;
      border-bottom: 2px solid #e0e0e0;
      border-radius: 10px 0 0 10px;
    }
    &:nth-child(2) {
      border-top: 2px solid #e0e0e0;
      border-bottom: 2px solid #e0e0e0;
    }
    &:nth-child(3) {
      border-top: 2px solid #e0e0e0;
      border-bottom: 2px solid #e0e0e0;
      div {
        margin: 0 auto;
      }
    }
    &:nth-child(4) {
      border-right: 2px solid #e0e0e0;
      border-top: 2px solid #e0e0e0;
      border-bottom: 2px solid #e0e0e0;
      border-radius: 0 10px 10px 0;
    }
  }
`;
const ToggleCheckBox = styled.input`
  background: url(${ToggleUnCheck}) no-repeat;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  appearance: none;
  cursor: pointer;
  &:checked {
    background: url(${ToggleCheck}) no-repeat;
  }
`;
const ProductInfoWrapper = styled.td`
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
  border: 1px solid var(--content-color-light);
  ${media.Small`
    width: 110px;
    height: 110px;
  `};
`;
const ProductInfo = styled.div`
  padding: 10px 0;
  ${media.Small`
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
const ProductPriceContainer = styled.td`
  p {
    color: #eb5757;
    text-align: center;
    font-size: 1.125em;
    font-weight: 700;
    margin-bottom: 26px;
  }
  button {
    margin: 0 auto;
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
  ProductImg,
  ProductInfoWrapper,
  ProductInfo,
  ProductPriceContainer,
  BtnDelete,
};
