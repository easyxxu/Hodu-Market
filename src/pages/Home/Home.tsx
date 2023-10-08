import ProductList from "../../components/Product/ProductList";
import { MainLayout } from "../../components/Layout/Layout";
import { useLocation } from "react-router-dom";
import { loadAllProduct } from "../../apis/productApi";
import React, { useState, useEffect } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { Product } from "../../types/product";
import axios from "axios";

export default function Home() {
  const userType = localStorage.getItem("user_type");
  const location = useLocation();
  const path = location.pathname;
  const [productListData, setProductListData] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getProductList = async (page: number) => {
    try {
      const res = await loadAllProduct(page);
      setProductListData((prev) => [...prev, ...res.data.results]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("getProductList Error: ", err);
        if (err.response?.data?.detail === "페이지가 유효하지 않습니다.") {
          setIsLoading(false);
        }
      }
    }
  };
  const targetRef = useIntersectionObserver({
    onIntersect: () => {
      setPage((prev) => prev + 1);
    },
    options: { threshold: 1 },
    isLoading,
  });

  useEffect(() => {
    if (page === 0) return;
    getProductList(page);
  }, [page]);

  return (
    <MainLayout type={userType} path={path}>
      <ProductList productListData={productListData} />
      <div ref={targetRef} />
    </MainLayout>
  );
}
