import React from "react";
import styled from "styled-components";
import { Logo, Header, SellerHeader } from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import Banner from "../Banner/Banner";
import { media } from "../style/media";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}
export function Layout({ children }: Props) {
  const userType = localStorage.getItem("user_type");
  const location = useLocation();
  const currentPath = location.pathname;
  const isSellerCenter = currentPath.startsWith("/sellercenter");
  const isHome = currentPath === "/";
  const authPath = currentPath === "/login" || currentPath === "/join";
  // console.log(authPath);
  return (
    <Container>
      {authPath ? (
        <AuthContainer>
          <Logo />
          <MainContainer>{children}</MainContainer>
        </AuthContainer>
      ) : (
        <>
          {!isSellerCenter ? <Header userType={userType} /> : <SellerHeader />}
          {isHome && <Banner />}
          <MainContainer>{children}</MainContainer>
          {!isSellerCenter && <Footer />}
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  min-width: 390px;
  ${media.Small`
    font-size: 0.9rem;
  `}
`;
const MainContainer = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 10px;
`;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 0;
  h1 {
    text-align: center;
    width: 100%;
  }
  img {
    width: 200px;
  }
  ${media.Small`
    font-size: 0.9rem;
  `}
`;
