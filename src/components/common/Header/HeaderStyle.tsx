import styled from "styled-components";
import SearchIcon from "../../../assets/svg/search.svg";
import { Link } from "react-router-dom";
import { media } from "../../style/media";

const HeaderDiv = styled.div`
  box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.1);
  position: relative;
`;
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 26px 30px;
  z-index: 10;
  position: relative;
  gap: 10px;
  ${media.Small`
    padding: 26px 15px;
  `}
`;
const LogoImg = styled.img`
  ${media.Small`
    width: 74px;
  `}
`;
const SearchContainer = styled.form`
  position: relative;
  width: 400px;
  min-width: 190px;
  height: 45px;
  ${media.Small`
    width:200px;
  `}
`;

const SearchInput = styled.input`
  width: 100%;
  border: 2px solid rgba(33, 191, 72, 1);
  border-radius: 50px;
  padding: 13px 44px 13px 22px;
  &::placeholder {
    color: #767676;
  }
  &:focus {
    box-shadow: 1px 1px 5px rgba(33, 191, 72, 1);
  }
  ${media.Small`
    padding: 10px 37px 10px 22px;
  `}
`;

const SearchBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 4%;
  background: url(${SearchIcon}) no-repeat;
  width: 28px;
  height: 28px;
  ${media.Small`
    top: 5px;
  `}
`;

const Nav = styled.nav`
  display: flex;
  gap: 26px;
  align-items: center;
  ${media.Small`
    gap: 10px;
  `}
`;
const LogoutBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #767676;
  gap: 5px;
  margin-top: 8px;
  ${media.Small`
  margin-top: 0;
    img{
      width: 26px;
      height: 26px
    }
  `}
`;
const ShoppingCartLink = styled(Link)<{ active: string }>`
  text-align: center;
  color: #767676;
  font-size: 12px;
  p {
    color: ${(props) =>
      props.active === "true" ? "var(--point-color)" : "inherit"};
    &:hover {
      color: var(--point-color);
    }
  }
  img {
    width: 32px;
    height: 32px;
    ${media.Small`
      width: 26px;
      height: 26px;
    `}
  }
`;

const HeaderLink = styled(Link)<{ active: string }>`
  text-align: center;
  color: #767676;
  font-size: 12px;
  img {
    width: 32px;
    aspect-ratio: 1;
    ${media.Small`
      width: 26px;
      height: 26px;
    `}
  }
  p {
    color: ${(props) =>
      props.active === "true" ? "var(--point-color)" : "inherit"};
  }
`;
// 판매자센터 헤더
const SellerHeaderDiv = styled.header`
  padding: 26px 10px;
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
const MyPageBtn = styled.button<{ $active: boolean }>`
  position: relative;
  color: #767676;
  p {
    color: ${(props) => (props.$active ? "var(--point-color)" : "inherit")};
  }
  &:hover {
    color: var(--point-color);
  }
`;
const DropDownBox = styled.div<{ isMobile: boolean }>`
  position: absolute;
  bottom: 0;
  right: ${(props) => (props.isMobile ? "5px" : "0px")};
  width: 130px;
  height: 108px;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  box-shadow: 0px 0px 20px 2px rgb(0 0 0 / 10%);
  transform: ${(props) =>
    props.isMobile ? "translate(0px, 90px)" : "translate(5px, 90px)"};
  color: #767676;
  a {
    width: 110px;
    height: 40px;
    line-height: 40px;
    font-size: 13.3px;
    font-weight: 500;
    text-align: center;
    &:hover {
      color: var(--point-color);
    }
  }
  button {
    width: 110px;
    height: 40px;
    &:hover {
      color: var(--point-color);
    }
  }
`;
export {
  HeaderDiv,
  HeaderContainer,
  LogoImg,
  SearchContainer,
  SearchInput,
  SearchBtn,
  Nav,
  LogoutBtn,
  ShoppingCartLink,
  HeaderLink,
  SellerHeaderDiv,
  MyPageBtn,
  DropDownBox,
};
