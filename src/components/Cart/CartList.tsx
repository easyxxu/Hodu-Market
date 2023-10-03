import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { useRecoilValue } from "recoil";
import { cartProductInfoListAtom } from "../../atoms/cartAtom";
export default function CartList() {
  const cartProductInfoList = useRecoilValue(cartProductInfoListAtom);
  return (
    <tbody>
      <CartMargin />
      {cartProductInfoList.map((item) => {
        return <CartItem item={item.data} key={item.data.product_id} />;
      })}
    </tbody>
  );
}

const CartMargin = styled.tr`
  height: 30px;
`;
