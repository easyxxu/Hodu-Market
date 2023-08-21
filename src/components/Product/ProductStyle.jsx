import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 70px;
  max-width: 1200px;
  width: 100%;
  margin: 70px auto 130px;
`;
const ProductImg = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 10px;
  border: 1px solid #c4c4c4;
  margin-bottom: 6px;
`;
const ProductLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ProductCorporation = styled.p`
  font-size: 16px;
  color: #767676;
`;
const ProductName = styled.p`
  font-size: 18px;
`;
const ProductPrice = styled.p`
  font-size: 24px;
  font-weight: 700;
`;
const ProductWon = styled.span`
  font-size: 16px;
  font-weight: 400;
`;
export {
  ProductList,
  ProductImg,
  ProductLink,
  ProductCorporation,
  ProductName,
  ProductPrice,
  ProductWon,
};
