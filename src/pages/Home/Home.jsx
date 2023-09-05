import React from "react";
import Banner from "../../components/Banner/Banner";
import ProductList from "../../components/Product/ProductList";
import { MainLayout } from "../../components/Layout/Layout";

export default function Home() {
  const userType = localStorage.getItem("user_type");
  return (
    <MainLayout type={userType}>
      <Banner />
      <ProductList />
    </MainLayout>
  );
}
