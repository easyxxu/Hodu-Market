import styled from "styled-components";
import TestProduct from "../../assets/product2.svg";
import ToggleCheck from "../../assets/toggle-check.svg";
import Minus from "../../assets/icon-minus-line.svg";
import Plus from "../../assets/icon-plus-line.svg";
import Close from "../../assets/icon-delete.svg";
const CartItemContainer = styled.div`
  max-width: 1280px;
  display: flex;
  align-items: center;
  padding: 20px 100px 20px 30px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  position: relative;
`;
const ToggleCheckBtn = styled.button`
  background: url(${ToggleCheck}) no-repeat;
  width: 20px;
  height: 20px;
  margin-right: 40px;
`;
const ProductInfo = styled.div`
  display: flex;
  gap: 36px;
  width: 614px;
  margin-right: 48px;
`;
const ProductImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 10px;
`;
const ProductInfoWrapper = styled.div`
  /* box-shadow: inset 0 0 15px red; */
  padding: 10px 0;
  p:nth-child(1) {
    color: var(--content-color-dark);
    margin-bottom: 10px;
  }
  p:nth-child(2) {
    font-size: 18px;
    margin-bottom: 10px;
  }
  p:nth-child(3) {
    font-weight: 700;
    margin-bottom: 40px;
  }
  p:last-child {
    font-size: 14px;
    color: var(--content-color-dark);
  }
`;
const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
  padding: 13px;
  width: 150px;
  border: 1px solid var(--content-color-light);
  border-radius: 5px;
  margin-right: 148px;
  button {
    width: 20px;
    height: 20px;
  }
  p {
    font-size: 18px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 1px;
      height: 47px;
      top: -14px;
      left: -20px;
      background-color: var(--content-color-light);
    }
    &::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 47px;
      top: -14px;
      right: -20px;
      background-color: var(--content-color-light);
    }
  }
`;
const BtnMinus = styled.button`
  background: url(${Minus}) no-repeat center center;
`;
const BtnPlus = styled.button`
  background: url(${Plus}) no-repeat center center;
`;
const ProductPriceContainer = styled.div`
  margin: 0 auto;
  p {
    color: #eb5757;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 26px;
  }
  button {
    width: 130px;
    padding: 10px 35px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 5px;
    background-color: var(--point-color);
    color: #fff;
  }
`;
const BtnClose = styled.button`
  position: absolute;
  background: url(${Close}) no-repeat center center;
  width: 22px;
  height: 22px;
  top: 18px;
  right: 18px;
`;
export {
  CartItemContainer,
  ToggleCheckBtn,
  ProductInfo,
  ProductImg,
  ProductInfoWrapper,
  BtnContainer,
  BtnMinus,
  BtnPlus,
  ProductPriceContainer,
  BtnClose,
};
