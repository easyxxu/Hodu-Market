import * as S from "./ProductListStyle";
import { Product } from "../../types/product";
import SkeletonProduct from "../../components/Product/SkeletonProduct";

interface Props {
  data: Product[];
  isLoading: boolean;
  pageEnd: boolean;
}
export default function ProductList({ data, isLoading, pageEnd }: Props) {
  return (
    <>
      <S.ProductUl>
        {isLoading && <SkeletonProduct count={3} />}
        {data.map((product) => (
          <li key={product.product_id}>
            <S.ProductLink to={`/detail/${product.product_id}`}>
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
        {isLoading && !pageEnd && <SkeletonProduct count={3} />}
      </S.ProductUl>
    </>
  );
}
