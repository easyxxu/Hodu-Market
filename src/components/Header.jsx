import React from "react";
import styled from "styled-components";
import Logo from "../assets/Logo-hodu.svg";
import ShoppingCart from "../assets/icon-shopping-cart.svg";
import MyPage from "../assets/icon-user.svg";
import SearchIcon from "../assets/search.svg";

export default function Header() {
  return (
    <HeaderContainer>
      <h1>
        <a href="/">
          <img src={Logo} alt="호두 로고" />
        </a>
      </h1>
      <SearchContainer>
        <SearchInput type="text" placeholder="상품을 검색해보세요!" />
        <SearchBtn></SearchBtn>
      </SearchContainer>
      <Nav>
        <ShoppingCartLink href="/">
          <img src={ShoppingCart} alt="shopping-cart" />
          <p>장바구니</p>
        </ShoppingCartLink>
        <LoginLink href="/">
          <img src={MyPage} alt="my-page" />
          <p>로그인</p>
        </LoginLink>
      </Nav>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 26px 30px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 400px;
  min-width: 190px;
  /* margin-left: 30px; */
`;

const SearchInput = styled.input`
  width: 100%;
  border: 2px solid rgba(33, 191, 72, 1);
  border-radius: 50px;
  padding: 13px 0 13px 22px;
  ::placeholder {
    color: #767676;
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 13px;
  background: url(${SearchIcon}) no-repeat;
  width: 28px;
  height: 28px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 26px;
`;

const ShoppingCartLink = styled.a`
  text-align: center;
  color: #767676;
  font-size: 12px;
`;

const LoginLink = styled.a`
  text-align: center;
  color: #767676;
  font-size: 12px;
`;
