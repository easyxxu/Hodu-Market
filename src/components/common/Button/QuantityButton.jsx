import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Minus from "../../../assets/icon-minus-line.svg";
import Plus from "../../../assets/icon-plus-line.svg";

export default function QuantityButton({ cartQuantity }) {
  const [quantity, setQuantity] = useState(1);
  const handleQuantityPlus = () => {
    setQuantity(quantity + 1);
  };
  const handleQuantityMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    if (cartQuantity !== undefined) setQuantity(cartQuantity);
  }, []);
  return (
    <CountButtonStyle>
      <button type="button" onClick={handleQuantityMinus} />
      <p>{quantity}</p>
      <button type="button" onClick={handleQuantityPlus} />
    </CountButtonStyle>
  );
}

const CountButtonStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
  padding: 13px;
  width: 150px;
  border: 1px solid var(--content-color-light);
  border-radius: 5px;
  button {
    width: 20px;
    height: 20px;
    &:first-child {
      background: url(${Minus}) no-repeat center center;
    }
    &:last-child {
      background: url(${Plus}) no-repeat center center;
    }
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