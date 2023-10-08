import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { updateQuantityApi, cartListApi } from "../../../apis/cartApi";
import Minus from "../../../assets/icon-minus-line.svg";
import Plus from "../../../assets/icon-plus-line.svg";
import { cartInfoListAtom } from "../../../atoms/cartAtom";
import { media } from "../../style/media";

interface QuantityButtonProps {
  cartQuantity?: number;
  cartAddForm?: any;
  setCartAddForm?: any;
  cartItemId?: number;
  productId?: number;
}
export default function QuantityButton({
  cartQuantity,
  cartAddForm,
  setCartAddForm,
  cartItemId,
  productId,
}: QuantityButtonProps) {
  const [quantity, setQuantity] = useState(cartQuantity || 1);
  const [quantityUpdateForm, setQuantityUpdateForm] = useState({
    product_id: productId,
    quantity: cartQuantity,
    is_active: true,
  });
  const [cartInfoList, setCartInfoList] = useRecoilState(cartInfoListAtom);

  const handleQuantityPlus = () => {
    setQuantity(quantity + 1);
    setQuantityUpdateForm({ ...quantityUpdateForm, quantity: quantity + 1 });
    if (setCartAddForm) {
      setCartAddForm({ ...cartAddForm, quantity: quantity + 1 });
    }
  };
  const handleQuantityMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setQuantityUpdateForm({ ...quantityUpdateForm, quantity: quantity - 1 });
      if (setCartAddForm) {
        setCartAddForm({ ...cartAddForm, quantity: quantity - 1 });
      }
    }
  };
  // 장바구니 수량 업뎃
  const quantityUpdate = async () => {
    try {
      if (!cartItemId) return;
      await updateQuantityApi(cartItemId, quantityUpdateForm);
      loadCartList();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("장바구니 수량 업뎃 에러: ", err);
        if (
          err.response?.data.FAIL_message ===
          "현재 재고보다 더 많은 수량을 담을 수 없습니다."
        ) {
          alert("현재 재고보다 더 많은 수량을 담을 수 없습니다.");
          setQuantity((prev) => prev - 1);
          setQuantityUpdateForm({
            ...quantityUpdateForm,
            quantity: quantity - 1,
          });
        }
      }
    }
  };
  const loadCartList = async () => {
    try {
      const res = await cartListApi();
      setCartInfoList(res.cartInfoList);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!setCartAddForm) {
      quantityUpdate();
    }
  }, [quantityUpdateForm, cartItemId, setCartInfoList]);
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
  width: 9.2em;
  gap: 2.25em;
  padding: 0.8125em;
  border: 1px solid var(--content-color-light);
  border-radius: 5px;
  ${media.Small`
    width: 8em;
    gap: 2em;
  `}
  button {
    width: 1.25em;
    height: 1.25em;
    &:first-child {
      background: url(${Minus}) no-repeat center center;
    }
    &:last-child {
      background: url(${Plus}) no-repeat center center;
    }
    ${media.Small`
      width: 1em;
      height: 1em;
    `}
  }
  p {
    font-size: 1.125em;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 0.0625em;
      height: 2.55em;
      top: -0.79em;
      left: -1.25em;
      background-color: var(--content-color-light);
    }
    &::after {
      content: "";
      position: absolute;
      width: 0.0625em;
      height: 2.55em;
      top: -0.79em;
      right: -1.25em;
      background-color: var(--content-color-light);
    }
  }
`;
