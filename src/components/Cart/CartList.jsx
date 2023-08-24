import React from "react";
import CartItem from "./CartItem";
import { useRecoilValue } from "recoil";
import { cartItemAtom } from "../../atoms/cartAtom";
export default function CartList() {
  const cartItemList = useRecoilValue(cartItemAtom);
  return (
    <ul>
      {cartItemList.map((item) => {
        return <CartItem item={item} />;
      })}
    </ul>
  );
}
