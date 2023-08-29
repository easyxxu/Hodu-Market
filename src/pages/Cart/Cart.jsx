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
import CartHeader from "../../components/Cart/CartHeader";
import CartList from "../../components/Cart/CartList";
import CartTotal from "../../components/Cart/CartTotal";
import { Button } from "../../components/common/Button/Button";
import { MainLayout } from "../../components/Layout/Layout";

export default function Cart() {
  const userType = localStorage.getItem("user_type");
  const [cartList, setCartList] = useRecoilState(cartListAtom);
  const [checkItems, setCheckItems] = useRecoilState(cartCheckedItemsAtom);
  const [totalPrice, setTotalPrice] = useRecoilState(cartTotalAtom);
  const [cartInfo, setCartInfo] = useRecoilState(cartInfoAtom);

  // 장바구니 리스트 로드 API
  const loadCartList = async () => {
    try {
      const { cart, cartProudctInfoList } = await cartListApi();
      setCartList(cartProudctInfoList);
      setCartInfo(cart);
      console.log("장바구니 리스트 API 결과: ", cartProudctInfoList);
    } catch (err) {
      console.error("loadCartList Error: ", err);
    }
  };
  console.log("장바구니 리스트:", checkItems);

  useEffect(() => {
    loadCartList();
  }, []);

  return (
    <MainLayout type={userType}>
      <CartHeaderStyle />
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
