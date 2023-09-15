import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { useRecoilValue } from "recoil";
import { cartProductInfoListAtom } from "../../atoms/cartAtom";
export default function CartList() {
  const cartProductInfoList = useRecoilValue(cartProductInfoListAtom);
  return (
    <CartListStyle>
      {cartProductInfoList.map((item) => {
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
