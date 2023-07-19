import React from "react";
import Banner from "../../components/Banner/Banner";
import Header from "../../components/common/Header";
import styled from "styled-components";
import Product from "../../components/Product/Product";

const HomeContainer = styled.div`
  width: 100%;
`;
export default function Home() {
  return (
    <HomeContainer>
      <Header />
      <Banner />
      <Product />
    </HomeContainer>
  );
}
