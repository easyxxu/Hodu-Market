import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import OrderItem from "./OrderItem";
export default function OrderList() {
  const location = useLocation();
  const productData = location.state;
  return (
    <>
      <Title>주문/결제하기</Title>
      <OrderTable>
        <thead>
          <tr>
            <th>상품정보</th>
            <th>할인</th>
            <th>배송비</th>
            <th>주문금액</th>
          </tr>
        </thead>
        <tbody>
          <OrderItem />
        </tbody>
      </OrderTable>
      <Total>
        총 주문금액{" "}
        <strong>{productData.totalPrice.toLocaleString("ko-KR")} 원</strong>
      </Total>
    </>
  );
}
const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 52px;
  margin-top: 54px;
`;
const OrderTable = styled.table`
  width: 1280px;
  thead {
    tr {
      background-color: #f2f2f2;
      font-size: 18px;
    }
    th {
      padding: 19px 0;
      &:first-child {
        border-radius: 10px 0 0 10px;
      }
      &:last-child {
        border-radius: 0 10px 10px 0;
      }
    }
  }
  tbody {
    tr {
      &:not(:nth-child(odd)) {
        border-bottom: 1px solid var(--content-color-light);
      }
      &:nth-child(odd) {
        height: 16px;
      }
    }
    td {
      /* border: 1px solid black; */
      &:not(:first-child) {
        font-size: 18px;
        text-align: center;
        vertical-align: middle;
      }
      &:nth-child(3) {
        color: var(--content-color-dark);
      }
      &:nth-child(4) {
        font-weight: 700;
      }
    }
  }
`;

const Total = styled.p`
  float: right;
  margin-top: 30px;
  strong {
    color: var(--price-point-color);
    font-size: 24px;
    font-weight: 700;
  }
`;
