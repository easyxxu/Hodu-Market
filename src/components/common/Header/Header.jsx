import React from "react";
import styled from "styled-components";
import Logo from "../../../assets/Logo-hodu.svg";
import ShoppingCart from "../../../assets/icon-shopping-cart.svg";
import MyPage from "../../../assets/icon-user.svg";
import SearchIcon from "../../../assets/search.svg";
import ShoppingBag from "../../../assets/icon-shopping-bag.svg";
import { Button } from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";

export function Header({ type }) {
  return (
    <HeaderDiv>
      <HeaderContainer>
        <h1>
          <Link to="/">
            <img src={Logo} alt="호두 로고" />
          </Link>
        </h1>
        <SearchContainer>
          <SearchInput type="text" placeholder="상품을 검색해보세요!" />
          <SearchBtn aria-label="검색하기 버튼" />
        </SearchContainer>
        {HeaderType(type)}
      </HeaderContainer>
    </HeaderDiv>
  );
}
export function HeaderType(type) {
  const TOKEN = localStorage.getItem("token");
  const navigate = useNavigate();
  // BUYER로 로그인한 상태
  if (type === "BUYER" && TOKEN) {
    return (
      <Nav>
        <ShoppingCartLink to="/cart">
          <img src={ShoppingCart} alt="shopping-cart" />
          <p>장바구니</p>
        </ShoppingCartLink>
        <HeaderLink to="/">
          <img src={MyPage} alt="my-page" />
          <p>마이페이지</p>
        </HeaderLink>
      </Nav>
    );
  } else if (type === "SELLER" && TOKEN) {
    // SELLER로 로그인한 상태
    return (
      <Nav>
        <HeaderLink to="/">
          <img src={MyPage} alt="my-page" />
          <p>마이페이지</p>
        </HeaderLink>
        <Button
          width="MS"
          color="white"
          img={ShoppingBag}
          content="판매자센터"
          onClick={() => navigate("/sellercenter")}
        />
      </Nav>
    );
  } else {
    // 로그인 안한 경우
    return (
      <Nav>
        <ShoppingCartLink to="/cart">
          <img src={ShoppingCart} alt="shopping-cart" />
          <p>장바구니</p>
        </ShoppingCartLink>
        <HeaderLink to="/login">
          <img src={MyPage} alt="my-page" />
          <p>로그인</p>
        </HeaderLink>
      </Nav>
    );
  }
}
// 판매자 센터 헤더
export function SellerHeader() {
  return (
    <HeaderDiv>
      <SellerHeaderDiv>
        <h1>
          <Link to="/">
            <img src={Logo} alt="호두 로고" />
          </Link>
        </h1>
        <h2>판매자센터</h2>
      </SellerHeaderDiv>
    </HeaderDiv>
  );
}
const HeaderDiv = styled.div`
  box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.1);
  position: relative;
`;
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 26px 30px;
  z-index: 10;
  position: relative;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 400px;
  min-width: 190px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: 2px solid rgba(33, 191, 72, 1);
  border-radius: 50px;
  padding: 13px 0 13px 22px;
  &::placeholder {
    color: #767676;
  }
  &:focus {
    box-shadow: 1px 1px 5px rgba(33, 191, 72, 1);
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
  align-items: center;
`;

const ShoppingCartLink = styled(Link)`
  text-align: center;
  color: #767676;
  font-size: 12px;
`;

const HeaderLink = styled(Link)`
  text-align: center;
  color: #767676;
  font-size: 12px;
`;
// 판매자센터 헤더
const SellerHeaderDiv = styled.header`
  padding: 26px 0;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  gap: 16px;
  h2 {
    font-size: 30px;
    font-weight: 500;
  }
  img {
    width: 80px;
    height: 24px;
  }
`;
