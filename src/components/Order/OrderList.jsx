import React from "react";
import styled from "styled-components";
import ProductImg from "../../assets/product2.svg";
export default function OrderList() {
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
          <tr />
          <tr>
            <td>
              <ProductItem>
                <img src={ProductImg} alt="상품사진" />
                <div>
                  <p>백엔드글로벌</p>
                  <p>딥러닝 개발자 무릎 담요</p>
                  <p>수량 : 1개</p>
                </div>
              </ProductItem>
            </td>
            <td>-</td>
            <td>무료배송</td>
            <td>17500</td>
          </tr>
          <tr />
          <tr>
            <td>
              <ProductItem>
                <img src={ProductImg} alt="상품사진" />
                <div>
                  <p>백엔드글로벌</p>
                  <p>딥러닝 개발자 무릎 담요</p>
                  <p>수량 : 1개</p>
                </div>
              </ProductItem>
            </td>
            <td>-</td>
            <td>무료배송</td>
            <td>17500</td>
          </tr>
        </tbody>
      </OrderTable>
      <Total>
        총 주문금액 <strong>46500원</strong>
      </Total>
    </>
  );
}
const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 52px;
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
const Total = styled.p`
  float: right;
  margin-top: 30px;
  strong {
    color: var(--price-point-color);
    font-size: 24px;
    font-weight: 700;
  }
`;
