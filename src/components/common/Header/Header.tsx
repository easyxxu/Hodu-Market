import React, { useEffect, useRef, useState } from "react";
import LogoIcon from "../../../assets/svg/Logo-hodu.svg";
import ShoppingCart from "../../../assets/svg/icon-shopping-cart.svg";
import ShoppingCartActive from "../../../assets/svg/icon-shopping-cart-2.svg";
import MyPage from "../../../assets/svg/icon-user.svg";
import MyPageActive from "../../../assets/svg/icon-user-2.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/svg/icon-logout.svg";
import { Button } from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as S from "./HeaderStyle";
import Icon from "../../Icon/Icon";
import { logoutApi } from "../../../apis/authApi";

export function Logo() {
  return (
    <h1>
      <Link to="/" title="호두마켓 메인 바로가기">
        <S.LogoImg src={LogoIcon} alt="호두마켓" width={124} height={38} />
      </Link>
    </h1>
  );
}
interface HeaderProps {
  userType: string | null;
}
export function Header({ userType }: HeaderProps) {
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
          <S.SearchBtn aria-label="검색" />
        </S.SearchContainer>
        {HeaderType(userType)}
      </S.HeaderContainer>
    </S.HeaderDiv>
  );
}
function HeaderType(type: string | null) {
  const TOKEN = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";
  const isMyPage = location.pathname.startsWith("/mypage");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 639);
  const navItemClassName = isMobile ? "a11y-hidden" : undefined;
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const dropDownRef = useRef<any>(null);
  // logout
  const handleLogout = async () => {
    try {
      await logoutApi();
      localStorage.removeItem("token");
      localStorage.removeItem("user_type");
      localStorage.removeItem("recoil-persist");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  const ShoppingCartLink = () => {
    return (
      <S.ShoppingCartLink
        to="/cart"
        active={isCartPage ? "true" : "false"}
        title="장바구니 바로가기"
      >
        <img src={isCartPage ? ShoppingCartActive : ShoppingCart} alt="" />
        <p className={navItemClassName}>장바구니</p>
      </S.ShoppingCartLink>
    );
  };

  const MyPageLink = () => {
    return (
      <S.MyPageBtn
        type="button"
        onClick={() => setIsOpenDropDown(!isOpenDropDown)}
        $active={isMyPage}
      >
        <img src={isMyPage ? MyPageActive : MyPage} alt="" />
        <p className={navItemClassName}>마이페이지</p>
      </S.MyPageBtn>
    );
  };
  const handleFocusDropDown = (e: React.KeyboardEvent) => {
    if (!e.shiftKey && e.keyCode === 9) {
      e.preventDefault();
      dropDownRef.current.querySelector("a").focus();
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 639);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropDown(false);
      }
    };

    const escDropDownClose = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        setIsOpenDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", escDropDownClose);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", escDropDownClose);
    };
  }, [isOpenDropDown, setIsOpenDropDown]);

  useEffect(() => {
    if (isOpenDropDown) {
      dropDownRef.current.querySelector("a").focus();
    }
  }, [isOpenDropDown]);

  // BUYER로 로그인한 상태
  if (type === "BUYER" && TOKEN) {
    return (
      <S.Nav>
        <ShoppingCartLink />
        <MyPageLink />
        {isOpenDropDown && (
          <S.DropDownBox
            isMobile={isMobile}
            onClick={() => setIsOpenDropDown(false)}
            ref={dropDownRef}
          >
            <Link to="/mypage">마이페이지</Link>
            <button
              type="button"
              onClick={handleLogout}
              onKeyDown={handleFocusDropDown}
            >
              로그아웃
            </button>
          </S.DropDownBox>
        )}
      </S.Nav>
    );
  } else if (type === "SELLER" && TOKEN) {
    // SELLER로 로그인한 상태
    return (
      <S.Nav>
        <S.LogoutBtn type="button" onClick={handleLogout}>
          <LogoutIcon />
          <span className={navItemClassName}>로그아웃</span>
        </S.LogoutBtn>
        <Button
          type="button"
          size="medium_small"
          color="point"
          $customStyle={
            isMobile ? { width: "100%", padding: "10px 0" } : undefined
          }
          onClick={() => navigate("/sellercenter")}
          ariaLabel={isMobile ? "판매자센터 바로가기" : ""}
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
        <ShoppingCartLink />
        <S.HeaderLink to="/login" title="로그인 바로가기">
          <img src={MyPage} alt="" />
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
          <Link to="/sellercenter" title="판매자센터 바로가기">
            판매자센터
          </Link>
        </h2>
      </S.SellerHeaderDiv>
    </S.HeaderDiv>
  );
}
