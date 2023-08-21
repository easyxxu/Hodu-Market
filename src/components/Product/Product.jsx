import React from "react";
import {
  ProductList,
  ProductImg,
  ProductLink,
  ProductCorporation,
  ProductName,
  ProductPrice,
  ProductWon,
} from "./ProductStyle";
import { useState } from "react";
import { loadAllProduct } from "../../apis/productApi";
import { useEffect } from "react";

export default function ProductItem() {
  const [productList, setProductList] = useState([]);
  const getProductList = async () => {
    try {
      const res = await loadAllProduct();
      setProductList(res.results);
    } catch (err) {
      console.error("getProductList Error: ", err);
    }
  };
  useEffect(() => {
    getProductList();
  }, []);
  return (
    <ProductList>
      {productList.map((product) => (
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
    </ProductList>
  );
}
