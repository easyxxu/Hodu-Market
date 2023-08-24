import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { cartList } from "../../apis/cartApi";
import { cartItemAtom } from "../../atoms/cartAtom";
import CartHeader from "../../components/Cart/CartHeader";
import CartList from "../../components/Cart/CartList";
import CartTotal from "../../components/Cart/CartTotal";
import { Button } from "../../components/common/Button/Button";
import { MainLayout } from "../../components/Layout/Layout";

export default function Cart() {
  const userType = localStorage.getItem("user_type");
  const [cartItemList, setCartItemList] = useRecoilState(cartItemAtom);
  const loadCartList = async () => {
    try {
      const cartProudctInfoList = await cartList();
      console.log(cartProudctInfoList);
      setCartItemList(cartProudctInfoList);
    } catch (err) {
      console.error("loadCartList Error: ", err);
    }
  };
  console.log("장바구니 리스트:", cartItemList);

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
