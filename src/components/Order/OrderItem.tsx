import React from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { media } from "../style/media";

interface OrderItemProps {
  item: {
    image: string;
    store_name: string;
    product_name: string;
    shipping_fee: number;
    price: number;
  };
  itemQuantity?: number;
}
export default function OrderItem({ item, itemQuantity }: OrderItemProps) {
  const location = useLocation();
  const data = location.state;
  const quantity = data.quantity;
  const shippingFee =
    item.shipping_fee === 0 ? "무료배송" : `${item.shipping_fee}`;
  return (
    <>
      <tr />
      <tr>
        <td>
          <ProductItem>
            <img src={item.image} alt="상품사진" />
            <div>
              <p>{item.store_name}</p>
              <p>{item.product_name}</p>
              <p>수량 : {quantity || itemQuantity}개</p>
            </div>
          </ProductItem>
        </td>
        <td>-</td>
        <td>
          {typeof shippingFee === "string"
            ? shippingFee
            : parseInt(shippingFee).toLocaleString("ko-KR")}
        </td>
        <td>
          {itemQuantity
            ? (itemQuantity * item.price).toLocaleString("ko-KR")
            : (quantity * item.price).toLocaleString("ko-KR")}
        </td>
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
  ${media.Small`
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
  `}
`;
