import React from "react";
import ProductList from "../../components/Product/ProductList";
import { MainLayout } from "../../components/Layout/Layout";
import { useLocation } from "react-router-dom";

export default function Home() {
  const userType = localStorage.getItem("user_type");
  const location = useLocation();
  const path = location.pathname;
  return (
    <MainLayout type={userType} path={path}>
      <ProductList />
    </MainLayout>
  );
}
