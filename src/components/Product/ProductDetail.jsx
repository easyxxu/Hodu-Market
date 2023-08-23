import React, { useState } from "react";
import { useEffect } from "react";
import { Button, CountButton } from "../common/Button/Button";
import * as S from "./ProductDetailStyle";
export default function ProductDetail({
  storeName,
  productName,
  productImg,
  productPrice,
  productShippingMethod,
  productShippingFee,
  productDescription,
}) {
  const [productCnt, setProductCnt] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(productPrice);
  }, [productPrice]);

  // 상품 수량 handler
  const handlerBtnMinus = () => {
    if (productCnt > 1) {
      setProductCnt(productCnt - 1);
      setTotalPrice(totalPrice - productPrice);
    }
  };
  const handlerBtnPlus = () => {
    setProductCnt(productCnt + 1);
    setTotalPrice(totalPrice + productPrice);
  };
  console.log(productPrice);
  return (
    <S.Wrapper>
      <S.DetailContainer>
        <S.ProductImg src={productImg} alt="상품이미지" />
        <div>
          <S.ProductCompany>{storeName}</S.ProductCompany>
          <S.ProductName>{productName}</S.ProductName>
          <S.ProductPrice>
            <strong>
              {productPrice
                ? productPrice.toLocaleString("ko-KR")
                : productPrice}
            </strong>
            원
          </S.ProductPrice>
          <S.Delivery>
            {productShippingMethod === "DELIVERY" ? "택배배송" : "직접배송"} /
            &nbsp;
            {productShippingFee
              ? productShippingFee.toLocaleString("ko-Kr")
              : productShippingFee}
            &nbsp; 원
          </S.Delivery>
          <hr />
          <S.CountBtnContainer>
            <CountButton
              onClick1={handlerBtnMinus}
              onClick2={handlerBtnPlus}
              productCnt={productCnt}
            />
          </S.CountBtnContainer>
          <hr />
          <S.TotalContainer>
            <S.Total>총 상품 금액</S.Total>
            <S.TotalCntContainer>
              <p>
                총 수량 <strong>{productCnt}</strong>개
              </p>
              <S.TotalPrice>
                <strong>
                  {totalPrice ? totalPrice.toLocaleString("ko-KR") : totalPrice}
                </strong>
                원
              </S.TotalPrice>
            </S.TotalCntContainer>
          </S.TotalContainer>
          <S.BtnBuyContainer>
            <Button
              type="button"
              size="M"
              width="416px"
              color="white"
              fontSize="M"
              fontWeight="bold"
              content="바로구매"
            ></Button>
            <Button
              type="button"
              size="M"
              width="200px"
              color="white"
              bgcolor="dark"
              fontSize="M"
              fontWeight="bold"
              content="장바구니"
            ></Button>
          </S.BtnBuyContainer>
        </div>
      </S.DetailContainer>
      <S.DetailTabContainer>
        <S.BtnDetailInfoActive>상세정보</S.BtnDetailInfoActive>
        <S.BtnDetailInfoUnActive>리뷰</S.BtnDetailInfoUnActive>
        <S.BtnDetailInfoUnActive>Q&A</S.BtnDetailInfoUnActive>
        <S.BtnDetailInfoUnActive>반품/교환정보</S.BtnDetailInfoUnActive>
      </S.DetailTabContainer>
      <S.DetailInfo>{productDescription}</S.DetailInfo>
    </S.Wrapper>
  );
}
