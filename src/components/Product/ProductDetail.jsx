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
import { cartListAtom } from "../../atoms/cartAtom";
import useStockCheck from "../../hooks/useStockCheck";
export default function ProductDetail({ productInfo }) {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("user_type");
  const {
    store_name,
    product_name,
    image,
    price,
    shipping_method,
    shipping_fee,
    product_info,
  } = productInfo;
  const productId = useRecoilValue(productIdAtom);
  const [cartAddForm, setCartAddForm] = useRecoilState(cartAddFormAtom);
  const [quantity, setQuantity] = useRecoilState(quantityAtom);
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { getStock, stockCheck } = useStockCheck();
  const totalPrice =
    price && (price * cartAddForm.quantity).toLocaleString("ko-KR");
  const cartItemList = useRecoilValue(cartListAtom);
  const inCart = cartItemList.filter(
    (item) => item.data.product_id === parseInt(productId)
  ).length;

  // 주문하기 모달 오픈
  const handleOrderModalOpen = async () => {
    const stock = await getStock(productId);
    const stockCheckResult = stockCheck(stock, cartAddForm.quantity);
    if (!stockCheckResult) {
      alert(`해당 상품의 최대 주문 수량은 ${stock}개입니다.`);
      return;
    }
    if (stockCheckResult && token && userType === "BUYER") {
      navigate("/order", {
        state: {
          orderKind: "direct_order",
          orderList: productInfo,
          quantity: cartAddForm.quantity,
          totalPrice: price * cartAddForm.quantity,
        },
      });
    } else if (!token || userType === "SELLER") {
      // 로그인 안한 경우 또는 SELLER의 경우
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
    //  else {
    //   openModal(modalsList.goLogin, {
    //     onCancel: () => {
    //       closeModal(modalsList.goLogin);
    //     },
    //     onGoLogin: () => {
    //       navigate("/login");
    //       closeModal(modalsList.goLogin);
    //     },
    //   });
    // }
  };
  // 장바구니 담기 모달 오픈
  const handleCartModalOpen = async () => {
    if (token && inCart === 0 && userType === "BUYER") {
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
    } else if (token && inCart > 0 && userType === "BUYER") {
      openModal(modalsList.alreadyCart, {
        onCancel: () => {
          closeModal(modalsList.alreadyCart);
        },
        onGoCart: () => {
          navigate("/cart");
          closeModal(modalsList.alreadyCart);
        },
      });
    } else if (!token || userType === "SELLER") {
      // 로그인 안한 경우 또는 SELLER의 경우
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
  // useEffect(() => {
  //   setCartAddForm({ ...cartAddForm, quantity: quantity });
  // }, [quantity]);

  // 홈페이지에서 상품 디테일로 가는 경우 productId가 달라짐에 따라 CartAddForm에 저장함
  useEffect(() => {
    setCartAddForm({ ...cartAddForm, product_id: productId });
  }, [productId]);

  console.log("cartAddForm: ", cartAddForm);
  return (
    <S.Wrapper>
      <S.DetailContainer>
        <S.ProductImg src={image} alt="상품이미지" />
        <div>
          <S.ProductCompany>{store_name}</S.ProductCompany>
          <S.ProductName>{product_name}</S.ProductName>
          <S.ProductPrice>
            <strong>{price && price.toLocaleString("ko-KR")}</strong>원
          </S.ProductPrice>
          <S.Delivery>
            {shipping_method === "DELIVERY" ? "택배배송" : "직접배송"} / &nbsp;
            {shipping_fee && shipping_fee.toLocaleString("ko-KR")}
            &nbsp; 원
          </S.Delivery>
          <hr />
          <S.CountBtnContainer>
            <QuantityButton
              cartAddForm={cartAddForm}
              setCartAddForm={setCartAddForm}
            />
          </S.CountBtnContainer>
          <hr />
          <S.TotalContainer>
            <S.Total>총 상품 금액</S.Total>
            <S.TotalCntContainer>
              <p>
                총 수량 <strong>{cartAddForm.quantity}</strong>개
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
              onClick={handleOrderModalOpen}
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
              onClick={handleCartModalOpen}
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
      <S.DetailInfo>{product_info}</S.DetailInfo>
    </S.Wrapper>
  );
}
