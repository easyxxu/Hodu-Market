import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { addCart } from "../../apis/cartApi";
import { productAddFormAtom, productIdAtom } from "../../atoms/productAtom";
import useModal from "../../hooks/useModal";
import { Button, CountButton } from "../common/Button/Button";
import { modalsList } from "../common/Modal/Modals";
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
  const productId = useRecoilValue(productIdAtom);
  const [productCnt, setProductCnt] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productAddForm, setProductAddForm] =
    useRecoilState(productAddFormAtom);
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    setTotalPrice(productPrice);
  }, [productPrice]);

  // 상품 수량 handler
  const handleBtnMinus = () => {
    if (productCnt > 1) {
      setProductCnt(productCnt - 1);
      setTotalPrice(totalPrice - productPrice);
    }
  };
  const handleBtnPlus = () => {
    setProductCnt(productCnt + 1);
    setTotalPrice(totalPrice + productPrice);
  };
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

  const handleAddCart = async () => {
    try {
      const res = await addCart(productAddForm);
      console.log("장바구니 담기 성공: ", res);
      // navigate("/cart");
    } catch (err) {
      console.error("장바구니 담기 에러: ", err);
    }
  };
  useEffect(() => {
    setProductAddForm({ ...productAddForm, quantity: productCnt });
  }, [productCnt]);

  useEffect(() => {
    setProductAddForm({ ...productAddForm, product_id: productId });
  }, [productId]);
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
              onClick1={handleBtnMinus}
              onClick2={handleBtnPlus}
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
