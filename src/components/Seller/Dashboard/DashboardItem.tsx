import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { productDeleteApi } from "../../../apis/productApi";
import { Button } from "../../common/Button/Button";
import { media } from "../../style/media";
interface DashboardItemProps {
  image: string;
  productName: string;
  productId: number;
  stock: number;
  price: number;
  setProductList: React.Dispatch<React.SetStateAction<any[]>>;
}
export default function DashboardItem({
  image,
  productName,
  productId,
  stock,
  price,
  setProductList,
}: DashboardItemProps) {
  const navigate = useNavigate();
  const productPrice = price.toLocaleString("ko-KR");
  const handleProductModify = () => {
    navigate(`/sellercenter/addproduct`, {
      state: { productId, type: "modify" },
    });
  };
  const handleProductDelete = async () => {
    try {
      const res = await productDeleteApi(productId);
      setProductList((prevProductList) =>
        prevProductList.filter((product) => product.product_id !== productId)
      );
      // console.log("상품 삭제 완료: ", res);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("상품 삭제 실패: ", err.response);
      }
    }
  };
  return (
    <tr>
      <td>
        <ProductInfo>
          <img src={image} alt="상품이미지" />
          <div>
            <p>{productName}</p>
            <p>재고: {stock}개</p>
          </div>
        </ProductInfo>
      </td>
      <td>{productPrice}원</td>
      <td>
        <Button
          type="button"
          size="small"
          color="point"
          children="수정"
          $customStyle={{ width: "80px" }}
          onClick={handleProductModify}
        />
      </td>
      <td>
        <Button
          type="button"
          size="small"
          color="white"
          children="삭제"
          $customStyle={{ width: "80px" }}
          onClick={handleProductDelete}
        />
      </td>
    </tr>
  );
}
const ProductInfo = styled.div`
  padding: 16px 30px;
  display: flex;
  align-items: center;
  gap: 30px;
  div {
    p:first-child {
      margin-bottom: 10px;
    }
    p:last-child {
      color: var(--content-color-dark);
    }
  }
  ${media.Small`
    flex-direction: column;
    padding: 10px 15px;
    gap: 10px;
  `}
`;
