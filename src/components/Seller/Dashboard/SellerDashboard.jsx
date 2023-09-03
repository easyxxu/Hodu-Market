import React from "react";
import PlusIcon from "../../../assets/icon-plus.svg";
import { Button, TabMenuButton } from "../../common/Button/Button";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadSellerProduct } from "../../../apis/productApi";
import { useState } from "react";
import DashboardItem from "./DashboardItem";
export default function SellerDashboard() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const loadSellerProductList = async () => {
      try {
        const res = await loadSellerProduct();
        setProductList(res.data.results);
        console.log(res);
      } catch (err) {
        console.error("load error", err);
      }
    };
    loadSellerProductList();
  }, []);
  console.log(productList);
  return (
    <div>
      <DashBoardTop>
        <h3>
          대시보드 <strong>{productList && productList[0].store_name}</strong>
        </h3>
        <Button
          type="button"
          size="MS"
          width="MS"
          color="white"
          img={PlusIcon}
          content="상품업로드"
          onClick={() => {
            navigate("/sellercenter/addproduct");
          }}
        />
      </DashBoardTop>
      <DashBoardMain>
        <TabMenuBar>
          <ul>
            <li>
              <TabMenuButton
                type="on"
                content={`판매중인 상품 (${productList.length})`}
              />
            </li>
            <li>
              <TabMenuButton content="주문/배송" cnt="2" />
            </li>
            <li>
              <TabMenuButton content="문의/리뷰" cnt="1" />
            </li>
            <li>
              <TabMenuButton content="통계" />
            </li>
            <li>
              <TabMenuButton content="스토어 설정" />
            </li>
          </ul>
        </TabMenuBar>
        <ProductListBackground>
          <ProductList>
            <table>
              <thead>
                <tr>
                  <th>상품정보</th>
                  <th>판매가격</th>
                  <th>수정</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => {
                  return (
                    <DashboardItem
                      key={product.product_id}
                      productId={product.product_id}
                      image={product.image}
                      productName={product.product_name}
                      stock={product.stock}
                      price={product.price}
                    />
                  );
                })}
              </tbody>
            </table>
          </ProductList>
        </ProductListBackground>
      </DashBoardMain>
    </div>
  );
}
const DashBoardTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 44px;
  margin-bottom: 42px;
  h3 {
    font-size: 36px;
    font-weight: 700;
  }
  strong {
    color: var(--point-color);
    font-weight: 500;
  }
`;
const DashBoardMain = styled.div`
  display: flex;
  gap: 30px;
`;
const TabMenuBar = styled.div`
  button {
    margin-bottom: 10px;
  }
`;
const ProductListBackground = styled.div`
  width: 1000px;
  height: 800px;
  border: 1px solid var(--content-colr-light);
  background-color: #f2f2f2;
  margin-bottom: 80px;
`;
const ProductList = styled.div`
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  table {
    max-width: 1440px;
    width: 1000px;
    /* width: 100%; */
    background-color: #fff;
    border: 1px solid var(--content-color-light);
  }
  thead {
    th {
      border-bottom: 1px solid var(--content-color-light);
      padding: 18px 0;
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid var(--content-color-light);
    }
    td:not(:first-child) {
      text-align: center;
      vertical-align: middle;
      button {
        margin: 0 auto;
      }
    }
  }
`;
