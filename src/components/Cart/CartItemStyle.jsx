import styled from "styled-components";
import ToggleCheck from "../../assets/toggle-check.svg";
import ToggleUnCheck from "../../assets/toggle-uncheck.svg";
import Close from "../../assets/icon-delete.svg";
const CartItemContainer = styled.li`
  max-width: 1280px;
  display: flex;
  align-items: center;
  padding: 20px 100px 20px 30px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  position: relative;
`;
const ToggleCheckBox = styled.input`
  background: url(${ToggleUnCheck}) no-repeat;
  width: 20px;
  height: 20px;
  margin-right: 40px;
  appearance: none;
  cursor: pointer;
  &:checked {
    background: url(${ToggleCheck}) no-repeat;
  }
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
  ToggleCheckBox,
  ProductInfo,
  ProductImg,
  ProductInfoWrapper,
  ProductPriceContainer,
  BtnClose,
};
