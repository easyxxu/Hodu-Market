import React from "react";
import styled from "styled-components";
import CartHeader from "../../components/Cart/CartHeader";
import CartItem from "../../components/Cart/CartItem";
import CartTotal from "../../components/Cart/CartTotal";
import { Button } from "../../components/common/Button/Button";

const CartHeaderStyle = styled(CartHeader)`
  margin-bottom: 36px;
`;
const CartTotalStyle = styled(CartTotal)`
  margin: 36px 0 40px;
`;
const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
`;
export default function Cart() {
  return (
    <>
      <CartHeaderStyle />
      <CartItem />
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
    </>
  );
}