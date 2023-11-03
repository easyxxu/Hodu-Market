import React, { useEffect, useState } from "react";
import LogoIcon from "../../../assets/svg/Logo-hodu.svg";
import ShoppingCart from "../../../assets/svg/icon-shopping-cart.svg";
import ShoppingCartActive from "../../../assets/svg/icon-shopping-cart-2.svg";
import MyPage from "../../../assets/svg/icon-user.svg";
import MyPageActive from "../../../assets/svg/icon-user-2.svg";
// import ShoppingBag from "../../../assets/svg/icon-shopping-bag.svg";
import { Button } from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as S from "./HeaderStyle";
import Icon from "../../Icon/Icon";

export function Logo() {
  return (
    <h1>
      <Link to="/">
        <S.LogoImg src={LogoIcon} alt="호두 로고" />
      </Link>
    </h1>
  );
}
interface HeaderProps {
  type: string | null;
}
export function Header({ type }: HeaderProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${searchKeyword}`);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
function HeaderType(type: string | null) {
  const TOKEN = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";
  const isMyPage = location.pathname === "/mypage";
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 639);
  const navItemClassName = isMobile ? "a11y-hidden" : undefined;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 639);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // BUYER로 로그인한 상태
  if (type === "BUYER" && TOKEN) {
    return (
      <S.Nav>
        <S.ShoppingCartLink to="/cart" active={isCartPage ? "true" : "false"}>
          <img
            src={isCartPage ? ShoppingCartActive : ShoppingCart}
            alt="shopping-cart"
          />
          <p className={navItemClassName}>장바구니</p>
        </S.ShoppingCartLink>
        <S.HeaderLink to="/mypage" active={isMyPage ? "true" : "false"}>
          <img src={isMyPage ? MyPageActive : MyPage} alt="my-page" />
          <p className={navItemClassName}>마이페이지</p>
        </S.HeaderLink>
      </S.Nav>
    );
  } else if (type === "SELLER" && TOKEN) {
    // SELLER로 로그인한 상태
    return (
      <S.Nav>
        <S.HeaderLink to="/mypage" active={isMyPage ? "true" : "false"}>
          <img src={isMyPage ? MyPageActive : MyPage} alt="my-page" />
          <p className={navItemClassName}>마이페이지</p>
        </S.HeaderLink>
        {/* <Button
          type="button"
          width={isMobile ? "100%" : "MS"}
          color="white"
          img={ShoppingBag}
          content={isMobile ? "" : "판매자센터"}
          onClick={() => navigate("/sellercenter")}
        /> */}
        <Button
          type="button"
          size="medium_small"
          color="point"
          $customStyle={isMobile ? { width: "100%" } : undefined}
          onClick={() => navigate("/sellercenter")}
        >
          <Icon icon="shoppingbag" />
          {isMobile ? "" : "판매자센터"}
        </Button>
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
          <p className={navItemClassName}>장바구니</p>
        </S.ShoppingCartLink>
        <S.HeaderLink to="/login">
          <img src={MyPage} alt="my-page" />
          <p className={navItemClassName}>로그인</p>
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
        <Logo />
        <h2>
          <Link to="/sellercenter">판매자센터</Link>
        </h2>
      </S.SellerHeaderDiv>
    </S.HeaderDiv>
  );
}
