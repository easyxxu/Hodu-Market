import * as S from "./ProductListStyle";
import { Product } from "../../types/product";
import SkeletonProduct from "../../components/Product/SkeletonProduct";
import { useLocation } from "react-router-dom";
import TopButton from "../common/Button/TopButton";
import ProductImg from "./ProductImg";

interface Props {
  data: Product[];
  isLoading: boolean;
  pageEnd: boolean;
}

export default function ProductList({ data, isLoading, pageEnd }: Props) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {isHome ? (
        <h2 className="a11y-hidden">상품 리스트</h2>
      ) : (
        <h3 className="a11y-hidden">상품 리스트</h3>
      )}
      <S.ProductUl>
        {isLoading && <SkeletonProduct count={3} />}
        {data.map((product) => (
          <li key={product.product_id}>
            <S.ProductLink to={`/detail/${product.product_id}`}>
              <ProductImg
                imgSrc={product.image}
                alt={`${product.product_name} 이미지`}
              />
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
        {isLoading && !pageEnd && <SkeletonProduct count={3} />}
        <TopButton />
      </S.ProductUl>
    </>
  );
}
