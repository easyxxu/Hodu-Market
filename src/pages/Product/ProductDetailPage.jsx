import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadProductDetail } from "../../apis/productApi";
import { MainLayout } from "../../components/Layout/Layout";
import ProductDetail from "../../components/Product/ProductDetail";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState({});
  const userType = localStorage.getItem("user_type");

  useEffect(() => {
    const getProductDetail = async (productId) => {
      try {
        const res = await loadProductDetail(productId);
        setProductInfo(res.data);
      } catch (err) {
        console.error("상품 상세정보 Error: ", err.response.data);
      }
    };
    getProductDetail(productId);
  }, [productId]);

  return (
    <MainLayout type={userType}>
      <ProductDetail productInfo={productInfo} />
    </MainLayout>
  );
}
