import React, { useState } from "react";
import { useEffect } from "react";
import { fetchOrderList } from "../../apis/orderApi";
import { styled } from "styled-components";
import axios from "axios";
import { Order } from "../../types/order";
import { media } from "../style/media";
import { Link } from "react-router-dom";

export default function OrderList() {
  const [orderListData, setOrderListData] = useState([]);
  const formatDateTime = (dateTime: Date) => {
    return new Date(dateTime).toLocaleString("ko-KR");
  };

  useEffect(() => {
    const getOrderList = async () => {
      try {
        const res = await fetchOrderList();
        setOrderListData(res.data.results);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("주문 리스트를 불러오는데 실패", err.response);
        }
      }
    };
    getOrderList();
  }, []);

  return (
    <OrderTableContainer>
      <OrderTable>
        <thead>
          <tr>
            <th>No.</th>
            <th>주문번호</th>
            <th>배송상태</th>
            <th>구매일자</th>
          </tr>
        </thead>
        <tbody>
          {orderListData.map((order: Order, idx) => {
            const formattedDate = formatDateTime(order.created_at);
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <Link to={`/mypage/${order.order_number}`} state={{ order }}>
                    {order.order_number}
                  </Link>
                </td>
                <td>
                  {order.delivery_status === "COMPLETE_PAYMENT"
                    ? "결제완료"
                    : null}
                </td>
                <td>{formattedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </OrderTable>
    </OrderTableContainer>
  );
}
const OrderTableContainer = styled.div`
  height: 100%;
  word-break: keep-all;
`;
const OrderTable = styled.table`
  border-bottom: 3px solid #f2f2f2;
  border-radius: 10px;
  width: 100%;
  background-color: #fff;
  th {
    font-size: 1.5em;
    padding: 15px;
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
      font-size: 1.2em;
    `}
  }
  tr {
    &:hover {
      background-color: #dbdbdb;
    }
    &:not(:last-child) {
      border-bottom: 1px solid var(--content-color-light);
    }
  }
  td {
    text-align: center;
    padding: 15px 0;
  }
`;
