import React from "react";
import * as S from "./CartHeaderStyle";
export default function CartHeader() {
  return (
    <>
      <S.CartTitle>장바구니</S.CartTitle>
      <S.CartTabTitle>
        <S.CartCheckBox></S.CartCheckBox>
        <p>상품정보</p>
        <p>수량</p>
        <p>상품금액</p>
      </S.CartTabTitle>
    </>
  );
}
