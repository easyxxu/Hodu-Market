import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { addCart } from "../../apis/cartApi";
import { productIdAtom } from "../../atoms/productAtom";
import { cartAddFormAtom } from "../../atoms/cartAddFormAtom";
import useModal from "../../hooks/useModal";
import { Button } from "../common/Button/Button";
import QuantityButton from "../common/Button/QuantityButton";
import { modalsList } from "../common/Modal/Modals";
import * as S from "./ProductDetailStyle";
import { quantityAtom } from "../../atoms/quantityAtom";
export default function ProductDetail({
  storeName,
  productName,
  productImg,
  productPrice,
  productShippingMethod,
  productShippingFee,
  productDescription,
}) {
  const productId = useRecoilValue(productIdAtom);
  const [cartAddForm, setCartAddForm] = useRecoilState(cartAddFormAtom);
  const [quantity, setQuantity] = useRecoilState(quantityAtom);
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const totalPrice =
    productPrice && (productPrice * quantity).toLocaleString("ko-KR");

  // 장바구니 담기 모달 오픈
  const handleModalOpen = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      // 로그인한 경우
      try {
        await handleAddCart();
        openModal(modalsList.addCart, {
          onKeepShopping: () => {
            closeModal(modalsList.addCart);
          },
          onGoCart: () => {
            navigate("/cart");
            closeModal(modalsList.addCart);
          },
        });
      } catch (err) {
        console.error("장바구니 담기 에러: ", err);
      }
    } else {
      // 로그인 안한 경우
      openModal(modalsList.goLogin, {
        onCancel: () => {
          closeModal(modalsList.goLogin);
        },
        onGoLogin: () => {
          navigate("/login");
          closeModal(modalsList.goLogin);
        },
      });
    }
  };
  // 장바구니 담기 API
  const handleAddCart = async () => {
    try {
      const res = await addCart(cartAddForm);
      console.log("장바구니 담기 성공: ", res);
    } catch (err) {
      console.error("장바구니 담기 에러: ", err);
    }
  };
  // 수량 변경됨에 따라 CartAddForm에 저장함
  useEffect(() => {
    setCartAddForm({ ...cartAddForm, quantity: quantity });
  }, [quantity]);

  // 홈페이지에서 상품 디테일로 가는 경우 productId가 달라짐에 따라 CartAddForm에 저장함
  useEffect(() => {
    setCartAddForm({ ...cartAddForm, product_id: productId });
  }, [productId]);

  console.log("cartAddForm: ", cartAddForm);
  return (
    <S.Wrapper>
      <S.DetailContainer>
        <S.ProductImg src={productImg} alt="상품이미지" />
        <div>
          <S.ProductCompany>{storeName}</S.ProductCompany>
          <S.ProductName>{productName}</S.ProductName>
          <S.ProductPrice>
            <strong>
              {productPrice && productPrice.toLocaleString("ko-KR")}
            </strong>
            원
          </S.ProductPrice>
          <S.Delivery>
            {productShippingMethod === "DELIVERY" ? "택배배송" : "직접배송"} /
            &nbsp;
            {productShippingFee && productShippingFee.toLocaleString("ko-KR")}
            &nbsp; 원
          </S.Delivery>
          <hr />
          <S.CountBtnContainer>
            <QuantityButton />
          </S.CountBtnContainer>
          <hr />
          <S.TotalContainer>
            <S.Total>총 상품 금액</S.Total>
            <S.TotalCntContainer>
              <p>
                총 수량 <strong>{quantity}</strong>개
              </p>
              <S.TotalPrice>
                <strong>{totalPrice}</strong>원
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
              onClick={handleModalOpen}
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
