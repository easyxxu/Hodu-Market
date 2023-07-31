import React from "react";
import TestProduct from "../../assets/product2.svg";
import { Button } from "../common/Button/Button";
import * as S from "./ProductDetailStyle";
export default function ProductDetail() {
  return (
    <S.Wrapper>
      <S.DetailContainer>
        <S.ProductImg src={TestProduct} alt="상품이미지" />
        <div>
          <S.ProductCompany>백엔드글로벌</S.ProductCompany>
          <S.ProductName>딥러닝 개발자 무릎 담요</S.ProductName>
          <S.ProductPrice>
            <strong>17500</strong>원
          </S.ProductPrice>
          <S.Delivery>택배배송 / 무료배송</S.Delivery>
          <hr />
          <S.BtnContainer>
            <S.BtnMinus></S.BtnMinus>
            <p>1</p>
            <S.BtnPlus></S.BtnPlus>
          </S.BtnContainer>
          <hr />
          <S.TotalContainer>
            <S.Total>총 상품 금액</S.Total>
            <S.TotalCntContainer>
              <p>
                총 수량 <strong>1</strong>개
              </p>
              <S.TotalPrice>
                <strong>17500</strong>원
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
              bgColor="dark"
              fontSize="M"
              fontWeight="bold"
              content="장바구니"
            ></Button>
          </S.BtnBuyContainer>
        </div>
      </S.DetailContainer>
      <S.DetailInfoContainer>
        <S.BtnDetailInfoActive>상세정보</S.BtnDetailInfoActive>
        <S.BtnDetailInfoUnActive>리뷰</S.BtnDetailInfoUnActive>
        <S.BtnDetailInfoUnActive>Q&A</S.BtnDetailInfoUnActive>
        <S.BtnDetailInfoUnActive>반품/교환정보</S.BtnDetailInfoUnActive>
      </S.DetailInfoContainer>
    </S.Wrapper>
  );
}
