import React from "react";
import * as S from "./CartHeaderStyle";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cartListAtom,
  cartCheckedItemsAtom,
  cartTotalAtom,
} from "../../atoms/cartAtom";
import { useEffect } from "react";
export default function CartHeader({ className }) {
  const cartList = useRecoilValue(cartListAtom);
  const [checkItems, setCheckItems] = useRecoilState(cartCheckedItemsAtom);
  // const [totalPrice, setTotalPrice] = useRecoilState(cartTotalAtom);
  const handleAllSelect = (checked) => {
    if (checked) {
      const idArr = [];
      cartList.forEach((cartItem) => idArr.push(cartItem.data.product_id));
      setCheckItems(idArr);
      console.log("전체 선택");
    } else {
      setCheckItems([]);
    }
  };

  return (
    <>
      <S.CartTitle>장바구니</S.CartTitle>
      <S.CartTabTitle className={className}>
        <S.CartCheckBox
          type="checkbox"
          onChange={(e) => handleAllSelect(e.target.checked)}
          checked={checkItems.length === cartList.length ? true : false}
        />
        <p>상품정보</p>
        <p>수량</p>
        <p>상품금액</p>
      </S.CartTabTitle>
    </>
  );
}
