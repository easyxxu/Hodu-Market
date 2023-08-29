import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { useRecoilState } from "recoil";
import { cartListAtom } from "../../atoms/cartAtom";
export default function CartList() {
  const [cartList, setCartList] = useRecoilState(cartListAtom);
  return (
    <CartListStyle>
      {cartList.map((item) => {
        return <CartItem item={item} key={item.data.product_id} />;
      })}
    </CartListStyle>
  );
}

const CartListStyle = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
