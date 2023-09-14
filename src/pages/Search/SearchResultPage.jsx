import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { MainLayout } from "../../components/Layout/Layout";
import ProductList from "../../components/Product/ProductList";
import { productSearch } from "../../apis/productApi";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

export default function SearchResultPage() {
  const { searchKeyword } = useParams();
  const userType = localStorage.getItem("user_type");
  const [searchResultData, setSearchResultData] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSearchResult = async () => {
      try {
        const res = await productSearch(page, searchKeyword);
        setSearchResultData(res.data.results);
      } catch (err) {
        console.error("getSearchResult Error: ", err.response.data);
        if (err.response.data.detail === "페이지가 유효하지 않습니다.")
          setIsLoading(false);
      }
    };
    if (page === 0) return;
    if (isLoading) getSearchResult(page);
  }, [page, searchKeyword, isLoading]);

  const targetRef = useIntersectionObserver(() => setPage((prev) => prev + 1), {
    threshold: 1,
  });

  return (
    <MainLayout type={userType}>
      <Title>검색 결과</Title>
      <SearchKeyword>{searchKeyword}</SearchKeyword>
      <ProductList productListData={searchResultData} />
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
`;
