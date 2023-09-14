import styled from "styled-components";
import SearchIcon from "../../../assets/search.svg";
import { Link } from "react-router-dom";
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

const SearchContainer = styled.form`
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
  p {
    color: ${(props) =>
      props.active === "true" ? "var(--point-color)" : "inherit"};
  }
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
export {
  HeaderDiv,
  HeaderContainer,
  SearchContainer,
  SearchInput,
  SearchBtn,
  Nav,
  ShoppingCartLink,
  HeaderLink,
  SellerHeaderDiv,
};
