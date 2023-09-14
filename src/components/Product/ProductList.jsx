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

export default function ProductList({ productListData }) {
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
    </ProductUl>
  );
}
