import axios from "axios";
import { useEffect } from "react";
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
    }
  };
  // console.log("!!", cartInfoList);
  return (
    <>
      <CartTitle>장바구니</CartTitle>
      <CartContentContainer>
        <CartTable>
          <CartHeader />
          {token && userType === "BUYER" && cartInfoList.length !== 0 && (
            <CartList />
          )}
        </CartTable>
        {cartContent()}
      </CartContentContainer>
      {userType === "BUYER" && cartProductInfoList.length !== 0 && (
        <>
          <AllDeleteBtn>
            <Button
              type="button"
              size="medium_small"
              color="light"
              children="전체삭제"
              onClick={handleDeleteAll}
            />
          </AllDeleteBtn>
          <CartTotalStyle />
          <ButtonStyle>
            <Button
              type="button"
              size="medium"
              color="point"
              children="주문하기"
              onClick={handleIsCheckedOrder}
            />
          </ButtonStyle>
        </>
      )}
    </>
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
const CartContentContainer = styled.div``;
const CartTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
`;
