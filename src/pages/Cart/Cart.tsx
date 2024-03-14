import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { cartListApi, deleteAllCartApi } from "../../apis/cartApi";
import {
  cartProductInfoListAtom,
  cartInfoListAtom,
  cartTotalAtom,
} from "../../atoms/cartAtom";
import { CartContent } from "../../components/Cart/CartContent";
import CartHeader from "../../components/Cart/CartHeader";
import CartList from "../../components/Cart/CartList";
import CartTotal from "../../components/Cart/CartTotal";
import { Button } from "../../components/common/Button/Button";

export const CART_STATE = {
  NOT_LOGGED_IN: "NOT_LOGGED_IN", // 로그인 안함
  EMPTY_CART: "EMPTY_CART", // BUYER, 카트 비어있음
  NO_EMPTY_CART: "NO_EMPTY_CART", // BUYER, 카트 비어있지 않음
  SELLER_LOGGED_IN: "SELLER_LOGGED_IN", // SELLER
};

function determineCartState(userType: string | null, cartItemLength: number) {
  if (!userType) return CART_STATE.NOT_LOGGED_IN;
  if (userType === "SELLER") return CART_STATE.SELLER_LOGGED_IN;
  return cartItemLength === 0
    ? CART_STATE.EMPTY_CART
    : CART_STATE.NO_EMPTY_CART;
}

export default function Cart() {
  const userType = localStorage.getItem("user_type");
  const navigate = useNavigate();
  const [cartProductInfoList, setCartProductInfoList] = useRecoilState(
    cartProductInfoListAtom
  );
  const cartState = determineCartState(userType, cartProductInfoList.length);
  const setCartInfoList = useSetRecoilState(cartInfoListAtom);
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
    if (userType === "BUYER") {
      const loadCartList = async () => {
        try {
          const { cartInfoList, cartProuductInfoList } = await cartListApi();
          setCartInfoList(cartInfoList);
          setCartProductInfoList(cartProuductInfoList);
        } catch (err) {
          console.error("loadCartList Error: ", err);
        }
      };
      loadCartList();
    } else if (
      cartState === CART_STATE.NOT_LOGGED_IN ||
      cartState === CART_STATE.SELLER_LOGGED_IN
    ) {
      setCartProductInfoList([]);
    }
  }, []);

  return (
    <>
      <CartTitle>장바구니</CartTitle>
      <div>
        <CartTable>
          <CartHeader />
          {cartState === CART_STATE.NO_EMPTY_CART && <CartList />}
        </CartTable>
        {cartState !== CART_STATE.NO_EMPTY_CART && (
          <CartContent cartState={cartState} />
        )}
      </div>
      {cartState === CART_STATE.NO_EMPTY_CART && (
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
const CartTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
`;
