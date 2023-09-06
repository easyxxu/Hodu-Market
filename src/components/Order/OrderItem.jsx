import React from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

export default function OrderItem() {
  const location = useLocation();
  const productData = location.state;
  const shippingFee =
    productData.productShippingFee === 0
      ? "무료배송"
      : `${productData.productShippingFee.toLocaleString("ko-KR")}`;
  return (
    <>
      <tr />
      <tr>
        <td>
          <ProductItem>
            <img src={productData.productImg} alt="상품사진" />
            <div>
              <p>{productData.storeName}</p>
              <p>{productData.productName}</p>
              <p>수량 : {productData.quantity}개</p>
            </div>
          </ProductItem>
        </td>
        <td>-</td>
        <td>{shippingFee}</td>
        <td>{productData.totalPrice.toLocaleString("ko-KR")}</td>
      </tr>
    </>
  );
}
const ProductItem = styled.div`
  display: flex;
  gap: 36px;
  padding: 8px 8px 12px;
  img {
    width: 104px;
    height: 104px;
    border-radius: 10px;
  }
  div {
    padding: 12px 0;
    p:nth-child(1) {
      margin-bottom: 6px;
      color: var(--content-color-dark);
    }
    p:nth-child(2) {
      margin-bottom: 10px;
    }
    p:nth-child(3) {
      color: var(--content-color-dark);
    }
  }
`;
