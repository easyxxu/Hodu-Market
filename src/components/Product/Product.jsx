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
import productList from "../../dummy/product-list.json";

export default function ProductItem() {
  return (
    <ProductList>
      {productList.products.map((product) => (
        <li key={product.id}>
          <ProductLink href="/">
            <ProductImg />
            <ProductCorporation>{product.corporation}</ProductCorporation>
            <ProductName>{product.name}</ProductName>
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
