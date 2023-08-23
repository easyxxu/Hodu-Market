import React from "react";
import Banner from "../../components/Banner/Banner";
import Product from "../../components/Product/Product";
import { MainLayout } from "../../components/Layout/Layout";

export default function Home() {
  const userType = localStorage.getItem("user_type");
  return (
    <MainLayout type={userType}>
      <Banner />
      <Product />
    </MainLayout>
  );
}
