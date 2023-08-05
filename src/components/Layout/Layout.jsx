import React from "react";
import Footer from "../common/Footer/Footer";
import { Header, SellerHeader } from "../common/Header/Header";
import styled from "styled-components";
export default function Layout({ type, children }) {
  return (
    <Container>
      {/* 쇼핑몰의 헤더 */}
      <Header type={type} />
      <MainContainer>{children}</MainContainer>
      <Footer />
      {/* 판매자의 관리자 페이지 헤더
      <SellerHeader />
      <MainContainer>{children}</MainContainer> */}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
`;
const MainContainer = styled.main`
  max-width: 1280px;
  margin: 0 auto;
`;
