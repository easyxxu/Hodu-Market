import ProductList from "../../components/Product/ProductList";
import { MainLayout } from "../../components/Layout/Layout";
import { useLocation } from "react-router-dom";
import { loadAllProduct } from "../../apis/productApi";
import { useState, useEffect } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { Product } from "../../types/product";
import axios from "axios";

export default function Home() {
  const userType = localStorage.getItem("user_type");
  const location = useLocation();
  const path = location.pathname;
  const [productListData, setProductListData] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pageEnd, setPageEnd] = useState(false);

  const getProductList = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await loadAllProduct(page);
      setProductListData((prev) => [...prev, ...res.data.results]);
      setIsLoading(false);
      if (res.data.next === null) {
        setPageEnd(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.detail === "페이지가 유효하지 않습니다.") {
          console.error(err);
        }
      }
    }
  };
  const targetRef = useIntersectionObserver({
    onIntersect: () => {
      setPage((prev) => prev + 1);
    },
    options: { threshold: 1 },
    pageEnd,
  });

  useEffect(() => {
    getProductList(page);
  }, [page]);

  return (
    <MainLayout type={userType} path={path}>
      <ProductList
        data={productListData}
        isLoading={isLoading}
        pageEnd={pageEnd}
      />
      <div ref={targetRef} />
    </MainLayout>
  );
}
