import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loadProductDetail } from "../../apis/productApi";
import { productIdAtom } from "../../atoms/productAtom";
import { MainLayout } from "../../components/Layout/Layout";
import ProductDetail from "../../components/Product/ProductDetail";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [productId, setProductId] = useRecoilState(productIdAtom);
  const [productInfo, setProductInfo] = useState({});
  const userType = localStorage.getItem("user_type");

  // productId 업데이트 시 useEffect를 통해 getProductDetail 호출
  useEffect(() => {
    setProductId(id);
  }, [id]);

  const getProductDetail = async (productId) => {
    try {
      const res = await loadProductDetail(productId);
      setProductInfo(res.data);
    } catch (err) {
      console.error("getProductDetail Error: ", err);
    }
  };

  useEffect(() => {
    getProductDetail(productId);
  }, [productId]);
  return (
    <MainLayout type={userType}>
      <ProductDetail
        productInfo={productInfo}
        // storeName={productInfo.store_name}
        // productName={productInfo.product_name}
        // productImg={productInfo.image}
        // productPrice={productInfo.price}
        // productShippingMethod={productInfo.shipping_method}
        // productShippingFee={productInfo.shipping_fee}
        // productDescription={productInfo.product_info}
      />
    </MainLayout>
  );
}
