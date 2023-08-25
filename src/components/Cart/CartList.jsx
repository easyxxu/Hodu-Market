import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { useRecoilValue } from "recoil";
import { cartItemAtom } from "../../atoms/cartAtom";
export default function CartList() {
  const cartItemList = useRecoilValue(cartItemAtom);
  const CartList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;
  return (
    <CartList>
      {cartItemList.map((item) => {
        return <CartItem item={item} key={item.data.product_id} />;
      })}
    </CartList>
  );
}
