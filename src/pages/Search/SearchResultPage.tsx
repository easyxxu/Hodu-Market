import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { MainLayout } from "../../components/Layout/Layout";
import ProductList from "../../components/Product/ProductList";
import { productSearch } from "../../apis/productApi";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import axios from "axios";
import { Product } from "../../types/product";

export default function SearchResultPage() {
  const { searchKeyword } = useParams() as { searchKeyword: string };
  const userType = localStorage.getItem("user_type");
  const [searchResultData, setSearchResultData] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pageEnd, setPageEnd] = useState(false);

  useEffect(() => {
    const getSearchResult = async () => {
      setIsLoading(true);
      try {
        const res = await productSearch(page, searchKeyword);
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
  }, [page, searchKeyword]);

  useEffect(() => {
    setPage(1);
  }, [searchKeyword]);

  const targetRef = useIntersectionObserver({
    onIntersect: () => {
      setPage((prev) => prev + 1);
    },
    options: { threshold: 1 },
    pageEnd,
  });

  return (
    <MainLayout type={userType}>
      <Title>검색 결과</Title>
      <SearchKeyword>{searchKeyword}</SearchKeyword>
      <ProductList
        data={searchResultData}
        isLoading={isLoading}
        pageEnd={pageEnd}
      />
      <div ref={targetRef} />
    </MainLayout>
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
