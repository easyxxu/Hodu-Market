import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  cartCheckedItemsAtom,
  cartInfoListAtom,
  cartProductInfoListAtom,
} from "../../atoms/cartAtom";
import { Product } from "../../types/product";
import OrderItem from "./OrderItem";
export default function OrderList() {
  const location = useLocation();
  const data = location.state;
  const { orderList, totalPrice } = data;
  const cartProductInfoList = useRecoilValue(cartProductInfoListAtom);
  const cartIsCheckedList = useRecoilValue(cartCheckedItemsAtom);
  const cartInformation = useRecoilValue(cartInfoListAtom);
  const [checkedOrderList, setCheckedOrderList] = useState<Product[]>([]);
  useEffect(() => {
    const realOrderList = () => {
      const result = cartProductInfoList.filter((item) =>
        cartIsCheckedList.includes(item.data.product_id)
      );
      setCheckedOrderList(result.map((orderItem) => orderItem.data));
    };
    realOrderList();
  }, []);

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
          {orderList ? (
            <OrderItem item={orderList} />
          ) : (
            checkedOrderList.map((item, idx) => {
              return (
                <OrderItem
                  key={item.product_id}
                  item={item}
                  itemQuantity={cartInformation[idx].quantity}
                />
              );
            })
          )}
        </tbody>
      </OrderTable>
      <Total>
        총 주문금액 <strong>{totalPrice.toLocaleString("ko-KR")} 원</strong>
      </Total>
    </>
  );
}
const Title = styled.h2`
  font-size: 2.25em;
  font-weight: 700;
  text-align: center;
  margin-bottom: 52px;
  margin-top: 54px;
`;
const OrderTable = styled.table`
  width: 100%;
  word-break: keep-all;
  thead {
    tr {
      background-color: #f2f2f2;
      font-size: 1.125em;
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
        font-size: 1.125em;
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
    font-size: 1.5em;
    font-weight: 700;
  }
`;
