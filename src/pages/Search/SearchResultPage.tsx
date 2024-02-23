import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import ProductList from "../../components/Product/ProductList";
import { productSearch } from "../../apis/productApi";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import axios from "axios";
import { Product } from "../../types/product";

export default function SearchResultPage() {
  const { searchKeyword } = useParams() as { searchKeyword: string };
  const [searchResultData, setSearchResultData] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pageEnd, setPageEnd] = useState(false);
  const [noResult, setNoResult] = useState(false);

  const targetRef = useIntersectionObserver({
    onIntersect: () => {
      setPage((prev) => prev + 1);
    },
    options: { threshold: 1 },
    pageEnd,
  });

  useEffect(() => {
    setPage(1);
    setPageEnd(false);
    setSearchResultData([]);
  }, [searchKeyword]);

  useEffect(() => {
    const getSearchResult = async () => {
      setIsLoading(true);
      try {
        const res = await productSearch(page, searchKeyword);
        if (res.data.count === 0) {
          setNoResult(true);
          return;
        }

        setSearchResultData((prev) => [...prev, ...res.data.results]);
        setIsLoading(false);
        if (res.data.next === null) {
          setPageEnd(true);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data.detail === "페이지가 유효하지 않습니다.") {
            console.error(err);
          }
        }
      }
    };
    getSearchResult();
  }, [page]);

  return (
    <>
      <Title>검색 결과</Title>
      <SearchKeyword>{searchKeyword}</SearchKeyword>
      {noResult ? (
        <NoResult>검색결과가 없어요 😢</NoResult>
      ) : (
        <ProductList
          data={searchResultData}
          isLoading={isLoading}
          pageEnd={pageEnd}
        />
      )}
      <div ref={targetRef} />
    </>
  );
}

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin: 54px 0 30px;
`;
const SearchKeyword = styled.p`
  font-size: 28px;
  color: var(--content-color-dark);
  text-align: center;
  font-weight: 500;
  margin-bottom: 54px;
`;
const NoResult = styled.p`
  font-size: 24px;
  text-align: center;
  height: 20vh;
`;
