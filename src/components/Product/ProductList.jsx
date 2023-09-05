import React from "react";
import {
  ProductUl,
  ProductImg,
  ProductLink,
  ProductCorporation,
  ProductName,
  ProductPrice,
  ProductWon,
} from "./ProductListStyle";
import { useState } from "react";
import { loadAllProduct } from "../../apis/productApi";
import { useEffect } from "react";

export default function ProductList() {
  const [productListData, setProductListData] = useState([]);
  const getProductList = async () => {
    try {
      const res = await loadAllProduct();
      setProductListData(res.results);
    } catch (err) {
      console.error("getProductList Error: ", err);
    }
  };
  useEffect(() => {
    getProductList();
  }, []);
  return (
    <ProductUl>
      {productListData.map((product) => (
        <li key={product.product_id}>
          <ProductLink to={`/product/detail/${product.product_id}`}>
            <ProductImg src={product.image} alt="상품이미지" />
            <ProductCorporation>{product.store_name}</ProductCorporation>
            <ProductName>{product.product_name}</ProductName>
            <ProductPrice>
              {product.price.toLocaleString("ko-KR")}
              <ProductWon>원</ProductWon>
            </ProductPrice>
          </ProductLink>
        </li>
      ))}
    </ProductUl>
  );
}
