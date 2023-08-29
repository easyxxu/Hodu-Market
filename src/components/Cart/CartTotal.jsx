import React from "react";
import { useRecoilValue } from "recoil";
import { cartTotalAtom } from "../../atoms/cartAtom";
import * as S from "./CartTotalStyle";
export default function CartTotal({ className }) {
  const totalPriceList = useRecoilValue(cartTotalAtom);
  const totalPrice = totalPriceList.total.reduce((a, b) => a + b, 0);
  const totalShippingFee = totalPriceList.shippingFee.reduce(
    (a, b) => a + b,
    0
  );
  console.log(totalPriceList, totalPrice);
  return (
    <S.TotalContainer className={className}>
      <S.TotalBox>
        <p>총 상품금액</p>
        <p>
          <strong>{totalPrice.toLocaleString("ko-KR")}</strong>원
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
          <strong>{totalShippingFee.toLocaleString("ko-KR")}</strong>원
        </p>
      </S.TotalBox>
      <S.TotalBox>
        <S.TotalPrice>결제 예정 금액</S.TotalPrice>
        <p>
          <strong>
            {(totalPrice + totalShippingFee).toLocaleString("ko-KR")}
          </strong>
          원
        </p>
      </S.TotalBox>
    </S.TotalContainer>
  );
}
