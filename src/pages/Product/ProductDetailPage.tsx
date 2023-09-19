import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadProductDetail } from "../../apis/productApi";
import { MainLayout } from "../../components/Layout/Layout";
import ProductDetail from "../../components/Product/ProductDetail";
import { Product } from "../../types/product";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const userType = localStorage.getItem("user_type");

  useEffect(() => {
    const getProductDetail = async (productId: string | undefined) => {
      try {
        const res = await loadProductDetail(productId);
        setProductInfo(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("상품 상세정보 Error: ", err.response?.data);
        }
      }
    };
    getProductDetail(productId);
  }, [productId]);

  return (
    <MainLayout type={userType}>
      {productInfo === null && <div>Loading...</div>}
      {productInfo !== null && <ProductDetail productInfo={productInfo} />}
    </MainLayout>
  );
}
