import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Button } from "../common/Button/Button";

const useGoLoginJoin = () => {
  const navigate = useNavigate();

  const goLoginJoin = () => {
    navigate("/login");
  };

  return goLoginJoin;
};
export function CartNoLogin() {
  const goLoginJoin = useGoLoginJoin();
  return (
    <Container>
      <p>로그인을 해야 장바구니에 담을 수 있어요!</p>
      {/* <Button
        content="로그인 / 회원가입 하러가기"
        type="button"
        width="L"
        color="white"
        onClick={goLoginJoin}
      /> */}
      <Button
        type="button"
        size="medium"
        color="point"
        $customStyle={{ padding: "10px 0", fontSize: "16px" }}
        children="로그인 / 회원가입 하러가기"
        onClick={goLoginJoin}
      />
    </Container>
  );
}

export function CartNoItemBuyer() {
  return (
    <Container>
      <p>장바구니에 담긴 상품이 없습니다.</p>
      <p>원하는 상품을 담아보세요.</p>
    </Container>
  );
}

export function CartLoginSeller() {
  const goLoginJoin = useGoLoginJoin();
  return (
    <Container>
      <p>구매회원으로 로그인해주세요.</p>
      {/* <Button
        content="로그인 / 회원가입 하러가기"
        type="button"
        width="L"
        color="white"
        onClick={goLoginJoin}
      /> */}
      <Button
        type="button"
        size="medium"
        color="point"
        $customStyle={{ padding: "10px 0", fontSize: "16px" }}
        children="로그인 / 회원가입 하러가기"
        onClick={goLoginJoin}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 200px 0;
  p {
    font-size: 18px;
    text-align: center;
    &:last-child {
      color: var(--content-color-dark);
    }
  }
`;
