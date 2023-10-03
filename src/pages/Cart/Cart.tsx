import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { cartListApi, deleteAllCartApi } from "../../apis/cartApi";
import {
  cartProductInfoListAtom,
  cartInfoListAtom,
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
  const navigate = useNavigate();
  const [cartProductInfoList, setCartProductInfoList] = useRecoilState(
    cartProductInfoListAtom
  );
  const [cartInfoList, setCartInfoList] = useRecoilState(cartInfoListAtom);
  const totalPriceList = useRecoilValue(cartTotalAtom);
  const totalPrice = totalPriceList.total.reduce((a, b) => a + b, 0);

  const handleDeleteAll = async () => {
    try {
      await deleteAllCartApi();
      setCartProductInfoList([]);
    } catch (err) {
      if (axios.isAxiosError(err)) console.error(err.response?.data);
    }
  };

  // 체크된 상품 주문하기
  const handleIsCheckedOrder = () => {
    navigate("/order", {
      state: {
        orderKind: "cart_order",
        totalPrice: totalPrice,
      },
    });
  };

  useEffect(() => {
    if (token && userType === "BUYER") {
      // 장바구니 리스트 로드 API
      const loadCartList = async () => {
        try {
          const { cartInfoList, cartProuductInfoList } = await cartListApi();
          setCartInfoList(cartInfoList);
          setCartProductInfoList(cartProuductInfoList);
          // console.log("장바구니 리스트 API 결과: ", cartProudctInfoList);
        } catch (err) {
          console.error("loadCartList Error: ", err);
        }
      };
      loadCartList();
    } else if (!token || userType === "SELLER") {
      setCartProductInfoList([]);
    }
  }, []);

  const cartContent = () => {
    if (!token) {
      return <CartNoLogin />;
    } else if (token && userType === "SELLER") {
      return <CartLoginSeller />;
    } else if (
      token &&
      userType === "BUYER" &&
      cartProductInfoList.length === 0
    ) {
      return <CartNoItemBuyer />;
    } else if (
      token &&
      userType === "BUYER" &&
      cartProductInfoList.length !== 0
    ) {
      return (
        <>
          <CartList />
        </>
      );
    }
  };
  // console.log("!!", cartInfoList);
  return (
    <MainLayout type={userType}>
      <CartTitle>장바구니</CartTitle>
      <CartContentContainer>
        <CartHeader />
        {cartContent()}
      </CartContentContainer>
      {userType === "BUYER" && cartProductInfoList.length !== 0 && (
        <>
          <AllDeleteBtn>
            <Button
              content="전체삭제"
              type="button"
              width="MS"
              fontSize="M"
              color="white"
              bgcolor="disabled"
              onClick={handleDeleteAll}
            />
          </AllDeleteBtn>
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
              onClick={handleIsCheckedOrder}
            />
          </ButtonStyle>
        </>
      )}
    </MainLayout>
  );
}
const CartTitle = styled.h2`
  font-size: 2.25em;
  font-weight: 700;
  text-align: center;
  margin: 54px 0 52px;
`;
const CartTotalStyle = styled(CartTotal)`
  margin: 36px 0 40px;
`;
const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 150px;
`;

const AllDeleteBtn = styled(ButtonStyle)`
  margin: 36px 0 0;
`;
const CartContentContainer = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
`;
