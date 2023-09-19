import React from "react";
import Footer from "../common/Footer/Footer";
import { Logo, Header, SellerHeader } from "../common/Header/Header";
import styled from "styled-components";
import { Modals } from "../common/Modal/Modals";
import Banner from "../Banner/Banner";
interface CommonLayoutProps {
  children: React.ReactNode;
}

interface MainLayoutProps extends CommonLayoutProps {
  type: string | null;
  path?: string;
}
interface SellerMainLayoutProps extends CommonLayoutProps {}
interface AuthLayoutProps extends CommonLayoutProps {}

export function MainLayout({ type, path, children }: MainLayoutProps) {
  return (
    <Container>
      <Header type={type} />
      <ModalContainer>
        <Modals />
      </ModalContainer>
      {path === "/" && <Banner />}
      <MainContainer>{children}</MainContainer>
      <Footer />
    </Container>
  );
}

export function SellerMainLayout({ children }: SellerMainLayoutProps) {
  return (
    <Container>
      <SellerHeader />
      <ModalContainer>
        <Modals />
      </ModalContainer>
      <MainContainer>{children}</MainContainer>
    </Container>
  );
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AuthContainer>
      <Logo />
      <MainContainer>{children}</MainContainer>
    </AuthContainer>
  );
}

const Container = styled.div`
  /* width: 100%; */
  position: relative;
`;
const MainContainer = styled.main`
  max-width: 1280px;
  margin: 0 auto;
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;

const AuthContainer = styled.div`
  padding: 80px 0;
  margin: 0 auto;
  h1 {
    text-align: center;
    width: 550px;
    margin: 0 auto;
  }
  img {
    width: 200px;
  }
`;
