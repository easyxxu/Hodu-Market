import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadProductDetail } from "../../apis/productApi";
import MainLayout from "../../components/Layout/Layout";
import ProductDetail from "../../components/Product/ProductDetail";

export default function ProductDetailPage() {
  const product = useParams();
  const [productInfo, setProductInfo] = useState({});
  const getProductDetail = async (productId) => {
    try {
      const res = await loadProductDetail(productId);
      setProductInfo(res.data);
    } catch (err) {
      console.error("getProductDetail Error: ", err);
    }
  };
  useEffect(() => {
    getProductDetail(product.id);
  }, []);
  return (
    <MainLayout type="BUYER">
      <ProductDetail
        storeName={productInfo.store_name}
        productName={productInfo.product_name}
        productImg={productInfo.image}
        productPrice={productInfo.price}
        productShippingMethod={productInfo.shipping_method}
        productShippingFee={productInfo.shipping_fee}
        productDescription={productInfo.product_info}
      />
    </MainLayout>
  );
}
