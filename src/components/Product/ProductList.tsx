import React from "react";
import * as S from "./ProductListStyle";
import { Product } from "../../types/product";
interface ProductListData {
  productListData: Product[];
}
export default function ProductList({ productListData }: ProductListData) {
  return (
    <S.ProductUl>
      {productListData.map((product) => (
        <li key={product.product_id}>
          <S.ProductLink to={`/product/detail/${product.product_id}`}>
            <S.ProductImg src={product.image} alt="상품이미지" />
            {product.stock === 0 && <S.SoldOut />}
            <S.ProductCorporation>{product.store_name}</S.ProductCorporation>
            <S.ProductName className="ellipsis">
              {product.product_name}
            </S.ProductName>
            <S.ProductPrice>
              {product.price.toLocaleString("ko-KR")}
              <S.ProductWon>원</S.ProductWon>
            </S.ProductPrice>
          </S.ProductLink>
        </li>
      ))}
    </S.ProductUl>
  );
}
