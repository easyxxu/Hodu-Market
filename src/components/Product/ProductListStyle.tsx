import { Link } from "react-router-dom";
import styled from "styled-components";
import SoldOutIcon from "../../assets/svg/sold-out.svg";
import { media } from "../style/media";
const ProductUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 70px;
  width: 100%;
  margin: 70px auto 130px;
  justify-content: center;
  ${media.Small`
    gap: 30px;
    padding: 0 10px;
  `}
  li {
    position: relative;
    width: 350px;
    ${media.Medium`
      width: 250px;
    `}
    ${media.Small`
      width: 90px;
      font-size: 0.7rem;
    `}
  }
`;
const ProductImg = styled.img`
  width: 100%;
  height: 350px;
  border-radius: 10px;
  border: 1px solid #c4c4c4;
  margin-bottom: 6px;
  object-fit: cover;
  ${media.Medium`
    height: 250px;
  `}
  ${media.Small`
    height: 90px;
  `}
`;
const SoldOut = styled.div`
  position: absolute;
  width: 106px;
  height: 106px;
  top: -6px;
  left: -6px;
  background: url(${SoldOutIcon}) no-repeat center center;
  ${media.Small`
    top: -25px;
    left: -25px;
    background-size: 60%; 
  `}
`;
const ProductLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ProductCorporation = styled.p`
  font-size: 1em;
  color: #767676;
`;
const ProductName = styled.p`
  font-size: 1.125em;
`;
const ProductPrice = styled.p`
  font-size: 1.5em;
  font-weight: 700;
`;
const ProductWon = styled.span`
  font-size: 1em;
  font-weight: 400;
`;

export {
  ProductUl,
  ProductImg,
  ProductLink,
  ProductCorporation,
  ProductName,
  ProductPrice,
  ProductWon,
  SoldOut,
};
