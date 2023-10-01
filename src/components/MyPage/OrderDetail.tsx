import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { styled } from "styled-components";
import { loadProductDetail } from "../../apis/productApi";
import { Button } from "../common/Button/Button";
import axios from "axios";
import { Order } from "../../types/order";
import { Product } from "../../types/product";
import { media } from "../style/media";
interface OrderDetailProps {
  order: Order;
  onClose: any;
}
export default function OrderDetail({ order, onClose }: OrderDetailProps) {
  const orderProductsId = order.order_items;
  const [orderProductsDetail, setOrderProductsDetail] = useState<
    Product[] | []
  >([]);
  const orderPaymentMethod = () => {
    switch (order.payment_method) {
      case "CARD":
        return "신용 / 체크카드";
      case "DEPOSIT":
        return "무통장 입금";
      case "PHONE_PAYMENT":
        return "휴대폰 결제";
      case "NAVERPAY":
        return "네이버페이";
      case "KAKAOPAY":
        return "카카오페이";
      default:
        return "기타";
    }
  };
  useEffect(() => {
    const getOrderProductsDetail = async (productId: number) => {
      try {
        const res = await loadProductDetail(productId);
        console.log(res.data);
        return res.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("상세정보 오류:", err.response);
        }
      }
    };
    setOrderProductsDetail([]);
    orderProductsId.map(async (productId: number) => {
      const data = await getOrderProductsDetail(productId);
      setOrderProductsDetail((prev) => [...prev, data]);
    });
  }, []);
  console.log(orderProductsDetail);
  return (
    <Container>
      <OrderInfoTitle>
        <h4>주문번호: {order.order_number}</h4>
        <p>
          배송상태 :{" "}
          {order.delivery_status === "COMPLETE_PAYMENT" ? "결제완료" : null}
        </p>
      </OrderInfoTitle>
      <ProductListTable>
        <thead>
          <tr>
            <th>No.</th>
            <th></th>
            <th>상품이름</th>
            <th>가격</th>
            <th>수량</th>
            <th>배송비</th>
          </tr>
        </thead>
        <tbody>
          {orderProductsDetail.map((product, idx) => {
            return (
              <tr key={product.product_id}>
                <td>{idx + 1}</td>
                <td>
                  <img src={product.image} alt="상품이미지" />
                </td>
                <td>{product.product_name}</td>
                <td>{product.price}</td>
                <td>{order.order_quantity[idx]}</td>
                <td>{product.shipping_fee}</td>
              </tr>
            );
          })}
        </tbody>
      </ProductListTable>
      <OrderInfoList>
        <span>구매자</span>
        <span>{order.buyer}</span>
        <span>받는 사람</span>
        <span>{order.receiver}</span>
        <span>전화번호</span>
        <span>{order.receiver_phone_number}</span>
        <span>주소</span>
        <span>{order.address}</span>
        <span>배송메시지</span>
        <span>{order.address_message}</span>
        <span>결제 방식</span>
        <span>{orderPaymentMethod()}</span>
        <span>총 금액</span>
        <span>{order.total_price}</span>
      </OrderInfoList>
      <Button
        type="button"
        content="뒤로가기"
        onClick={onClose}
        color="white"
        fontSize="M"
        bgcolor="disabled"
      />
    </Container>
  );
}
const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

const OrderInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  h4 {
    font-size: 2em;
    font-weight: 500;
  }
  p {
    font-size: 1.5em;
    color: var(--content-color-dark);
  }
`;
const ProductListTable = styled.table`
  border-bottom: 3px solid #f2f2f2;
  border-radius: 10px;
  border-collapse: seperate;
  width: 100%;
  text-align: center;
  th {
    font-size: 1.5em;
    padding: 10px;
    background-color: #f2f2f2;
    &:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    &:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    ${media.Small`
      font-size: 1.1em;
    `}
  }
  tr {
    &:not(:last-child) {
      border-bottom: 1px solid var(--content-color-light);
    }
  }
  td {
    vertical-align: middle;
    padding: 10px;
  }
  img {
    width: 120px;
    height: 120px;
    object-fit: contain;
    border: 1px solid var(--content-color-light);
    border-radius: 10px;
    ${media.Small`
      width:80px;
      height:80px;
    `}
  }
`;
const OrderInfoList = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 3fr;
  border: 2px solid #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  span {
    &:nth-child(odd) {
      font-size: 1.125em;
      font-weight: 500;
    }
  }
`;
