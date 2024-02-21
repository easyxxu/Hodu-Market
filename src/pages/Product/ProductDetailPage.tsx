import axios from "axios";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadProductDetail } from "../../apis/productApi";
import { MainLayout } from "../../components/Layout/Layout";
import ProductDetail from "../../components/Product/ProductDetail";
import { Product } from "../../types/product";
import { FadeLoader } from "react-spinners";
export default function ProductDetailPage() {
  const { productId } = useParams() as { productId: string };
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const userType = localStorage.getItem("user_type");

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const res = await loadProductDetail(parseInt(productId));
        setProductInfo(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("상품 상세정보 Error: ", err.response?.data);
        }
      }
    };
    getProductDetail();
  }, [productId]);

  return (
    <MainLayout type={userType}>
      {productInfo == null && (
        <FadeLoaderBox>
          <FadeLoader color="var(--point-color)" />
        </FadeLoaderBox>
      )}
      {productInfo !== null && <ProductDetail productInfo={productInfo} />}
    </MainLayout>
  );
}
const FadeLoaderBox = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
