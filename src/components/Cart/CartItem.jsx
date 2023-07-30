import React from "react";
import * as S from "./CartItemStyle";
import TestProduct from "../../assets/product2.svg";

export default function CartItem() {
  return (
    <S.CartItemContainer>
      <S.ToggleCheckBtn />
      <S.ProductInfo>
        <S.ProductImg src={TestProduct} alt="상품이미지" />
        <S.ProductInfoWrapper>
          <p>백엔드글로벌</p>
          <p>딥러닝 개발자 무릎 담요</p>
          <p>17500원</p>
          <p>택배배송 / 무료배송</p>
        </S.ProductInfoWrapper>
      </S.ProductInfo>
      <S.BtnContainer>
        <S.BtnMinus></S.BtnMinus>
        <p>1</p>
        <S.BtnPlus></S.BtnPlus>
      </S.BtnContainer>
      <S.ProductPriceContainer>
        <p>17500원</p>
        <button>주문하기</button>
      </S.ProductPriceContainer>
      <S.BtnClose />
    </S.CartItemContainer>
  );
}
