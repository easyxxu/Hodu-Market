import React, { useState } from "react";
import * as S from "./CartItemStyle";
import TestProduct from "../../assets/product2.svg";
import { Button, CountButton } from "../common/Button/Button";

export default function CartItem() {
  const [productCnt, setProductCnt] = useState(1);
  const handlerBtnMinus = () => {
    if (productCnt > 1) {
      setProductCnt(productCnt - 1);
      // setTotalPrice(totalPrice - productPrice);
    }
  };
  const handlerBtnPlus = () => {
    setProductCnt(productCnt + 1);
    // setTotalPrice(totalPrice + productPrice);
  };
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
      <CountButton
        onClick1={handlerBtnMinus}
        onClick2={handlerBtnPlus}
        productCnt={productCnt}
      />
      <S.ProductPriceContainer>
        <p>17500원</p>
        <Button width="130px" size="M" content="주문하기" />
      </S.ProductPriceContainer>
      <S.BtnClose />
    </S.CartItemContainer>
  );
}
