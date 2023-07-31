import React from "react";
import * as S from "./CartTotalStyle";
export default function CartTotal() {
  return (
    <S.TotalContainer>
      <S.TotalBox>
        <p>총 상품금액</p>
        <p>
          <strong>46500</strong>원
        </p>
      </S.TotalBox>
      <S.TotalBox>
        <p>상품 할인</p>
        <p>
          <strong>0</strong>원
        </p>
      </S.TotalBox>
      <S.TotalBox>
        <p>배송비</p>
        <p>
          <strong>0</strong>원
        </p>
      </S.TotalBox>
      <S.TotalBox>
        <S.TotalPrice>결제 예정 금액</S.TotalPrice>
        <p>
          <strong>46500</strong>원
        </p>
      </S.TotalBox>
    </S.TotalContainer>
  );
}
