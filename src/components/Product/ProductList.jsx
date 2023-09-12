import React, { useRef } from "react";
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
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

export default function ProductList() {
  const [productListData, setProductListData] = useState([]);
  const [page, setPage] = useState(0);
  const getProductList = async (page) => {
    try {
      const res = await loadAllProduct(page);
      setProductListData((prev) => [...prev, ...res.data.results]);
    } catch (err) {
      console.error("getProductList Error: ", err);
    }
  };

  const targetRef = useIntersectionObserver(
    () => {
      setPage((prev) => prev + 1);
    },
    { threshold: 1 }
  );

  useEffect(() => {
    if (page === 0) return;
    getProductList(page);
  }, [page]);

  return (
    <ProductUl>
      {productListData.map((product) => (
        <li key={product.product_id}>
          <ProductLink to={`/product/detail/${product.product_id}`}>
            <ProductImg src={product.image} alt="상품이미지" />
            <ProductCorporation>{product.store_name}</ProductCorporation>
            <ProductName>{product.product_name}</ProductName>
            <ProductPrice>
              {product.price}
              <ProductWon>원</ProductWon>
            </ProductPrice>
          </ProductLink>
        </li>
      ))}
      <div ref={targetRef} />
    </ProductUl>
  );
}
