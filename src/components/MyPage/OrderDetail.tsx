import { useState, useEffect } from "react";
import { loadProductDetail } from "../../apis/productApi";
import axios from "axios";
import { Product } from "../../types/product";
import { useLocation } from "react-router-dom";
import * as S from "./OrderDetailStyle";

export default function OrderDetail() {
  const location = useLocation();
  const { state } = location;
  const order = state.order;
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

  return (
    <S.Container>
      <S.OrderInfoTitle>
        <h4>주문번호: {order.order_number}</h4>
        <p>
          배송상태 :{" "}
          {order.delivery_status === "COMPLETE_PAYMENT" ? "결제완료" : null}
        </p>
      </S.OrderInfoTitle>
      <S.ProductListTable>
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
                <td>{product.price.toLocaleString("ko-KR")}</td>
                <td>{order.order_quantity[idx]}</td>
                <td>{product.shipping_fee.toLocaleString("ko-KR")}</td>
              </tr>
            );
          })}
        </tbody>
      </S.ProductListTable>
      <S.OrderInfoList>
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
        <span>{order.total_price.toLocaleString("ko-KR")}</span>
      </S.OrderInfoList>
    </S.Container>
  );
}
