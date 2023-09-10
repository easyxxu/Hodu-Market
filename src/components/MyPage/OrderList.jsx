import React, { useState } from "react";
import { useEffect } from "react";
import { fetchOrderList } from "../../apis/orderApi";
import { styled } from "styled-components";

export default function OrderList() {
  const [orderListData, setOrderListData] = useState([]);
  // 날짜 형식 변경 함수
  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString("ko-KR");
  };
  const onClickOrderDetail = () => {};
  useEffect(() => {
    const getOrderList = async () => {
      try {
        const res = await fetchOrderList();
        setOrderListData(res.data.results);
      } catch (err) {
        console.error("주문 리스트를 불러오는데 실패", err.response);
      }
    };
    getOrderList();
  }, []);
  console.log(orderListData);
  return (
    <OrderTableContainer>
      <OrderTable>
        <thead>
          <tr>
            <th>No.</th>
            <th>주문번호</th>
            <th>주문상품</th>
            <th>배송상태</th>
            <th>구매일자</th>
          </tr>
        </thead>
        <tbody>
          {orderListData.map((order, idx) => {
            const formattedDate = formatDateTime(order.created_at);
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{order.order_number}</td>
                <td>{order.order_items}</td>
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
  background-color: var(--content-color-light);
  height: 100%;
`;
const OrderTable = styled.table`
  border: 1px solid var(--content-color-dark);
  width: 100%;
  background-color: #fff;
  th {
    font-size: 18px;
    padding: 10px;
  }
  tr {
    border: 1px solid var(--content-color-light);
  }
  td {
    text-align: center;
    padding: 10px 0;
  }
`;
