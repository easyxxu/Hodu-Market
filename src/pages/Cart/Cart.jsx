import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { cartListApi } from "../../apis/cartApi";
import {
  cartCheckedItemsAtom,
  cartInfoAtom,
  cartListAtom,
  cartTotalAtom,
} from "../../atoms/cartAtom";
import {
  CartLoginSeller,
  CartNoItemBuyer,
  CartNoLogin,
} from "../../components/Cart/CartContent";
import CartHeader from "../../components/Cart/CartHeader";
import CartList from "../../components/Cart/CartList";
import CartTotal from "../../components/Cart/CartTotal";
import { Button } from "../../components/common/Button/Button";
import { MainLayout } from "../../components/Layout/Layout";

export default function Cart() {
  const userType = localStorage.getItem("user_type");
  const token = localStorage.getItem("token");
  const [cartList, setCartList] = useRecoilState(cartListAtom);
  const [cartInfo, setCartInfo] = useRecoilState(cartInfoAtom);

  // 장바구니 리스트 로드 API
  const loadCartList = async () => {
    try {
      const { cart, cartProudctInfoList } = await cartListApi();
      setCartList(cartProudctInfoList);
      setCartInfo(cart);
      // console.log("장바구니 리스트 API 결과: ", cartProudctInfoList);
    } catch (err) {
      console.error("loadCartList Error: ", err);
    }
  };

  useEffect(() => {
    if (token && userType === "BUYER") {
      loadCartList();
    } else if (!token || userType === "SELLER") {
      setCartList([]);
    }
  }, []);

  return (
    <MainLayout type={userType}>
      <CartHeaderStyle />
      {!token ? (
        <CartNoLogin />
      ) : token && userType === "SELLER" ? (
        <CartLoginSeller />
      ) : token && userType === "BUYER" && cartList.length === 0 ? (
        <CartNoItemBuyer />
      ) : null}
      <CartList />
      <CartTotalStyle />
      <ButtonStyle>
        <Button
          type="button"
          content="주문하기"
          width="L"
          size="L"
          color="white"
          fontSize="L"
          fontWeight="bold"
        />
      </ButtonStyle>
    </MainLayout>
  );
}
const CartHeaderStyle = styled(CartHeader)`
  margin-bottom: 36px;
`;
const CartTotalStyle = styled(CartTotal)`
  margin: 36px 0 40px;
`;
const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 150px;
`;
