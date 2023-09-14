import React, { useState } from "react";
import LogoIcon from "../../../assets/Logo-hodu.svg";
import ShoppingCart from "../../../assets/icon-shopping-cart.svg";
import ShoppingCartActive from "../../../assets/icon-shopping-cart-2.svg";
import MyPage from "../../../assets/icon-user.svg";
import ShoppingBag from "../../../assets/icon-shopping-bag.svg";
import { Button } from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as S from "./HeaderStyle";

export function Logo() {
  return (
    <h1>
      <Link to="/">
        <img src={LogoIcon} alt="호두 로고" />
      </Link>
    </h1>
  );
}

export function Header({ type }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    navigate(`/search/${searchKeyword}`);
  };
  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <S.HeaderDiv>
      <S.HeaderContainer>
        <Logo />
        <S.SearchContainer onSubmit={handleSubmitSearch}>
          <label htmlFor="searchInput" />
          <S.SearchInput
            id="searchInput"
            name="searchInput"
            type="text"
            placeholder="상품을 검색해보세요!"
            onChange={handleInputChange}
          />
          <S.SearchBtn aria-label="검색하기" />
        </S.SearchContainer>
        {HeaderType(type)}
      </S.HeaderContainer>
    </S.HeaderDiv>
  );
}

export function HeaderType(type) {
  const TOKEN = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  // BUYER로 로그인한 상태
  if (type === "BUYER" && TOKEN) {
    return (
      <S.Nav>
        <S.ShoppingCartLink to="/cart" active={isCartPage ? "true" : "false"}>
          <img
            src={isCartPage ? ShoppingCartActive : ShoppingCart}
            alt="shopping-cart"
          />
          <p>장바구니</p>
        </S.ShoppingCartLink>
        <S.HeaderLink to="/mypage">
          <img src={MyPage} alt="my-page" />
          <p>마이페이지</p>
        </S.HeaderLink>
      </S.Nav>
    );
  } else if (type === "SELLER" && TOKEN) {
    // SELLER로 로그인한 상태
    return (
      <S.Nav>
        <S.HeaderLink to="/mypage">
          <img src={MyPage} alt="my-page" />
          <p>마이페이지</p>
        </S.HeaderLink>
        <Button
          width="MS"
          color="white"
          img={ShoppingBag}
          content="판매자센터"
          onClick={() => navigate("/sellercenter")}
        />
      </S.Nav>
    );
  } else {
    // 로그인 안한 경우
    return (
      <S.Nav>
        <S.ShoppingCartLink to="/cart" active={isCartPage ? "true" : "false"}>
          <img
            src={isCartPage ? ShoppingCartActive : ShoppingCart}
            alt="shopping-cart"
          />
          <p>장바구니</p>
        </S.ShoppingCartLink>
        <S.HeaderLink to="/login">
          <img src={MyPage} alt="my-page" />
          <p>로그인</p>
        </S.HeaderLink>
      </S.Nav>
    );
  }
}

// 판매자 센터 헤더
export function SellerHeader() {
  return (
    <S.HeaderDiv>
      <S.SellerHeaderDiv>
        <h1>
          <Link to="/">
            <img src={Logo} alt="호두 로고" />
          </Link>
        </h1>
        <h2>
          <Link to="/sellercenter">판매자센터</Link>
        </h2>
      </S.SellerHeaderDiv>
    </S.HeaderDiv>
  );
}
