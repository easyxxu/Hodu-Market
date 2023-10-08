import styled from "styled-components";
import { media } from "../style/media";

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 80px auto;
  ${media.Small`
    font-size: 0.9rem;
    margin-top: 40px;
  `}
`;
const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 140px;
  position: relative;
  ${media.Small`
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
  `}
`;
const ProductImg = styled.img`
  width: 600px;
  height: 600px;
  margin-right: 50px;
  ${media.Medium`
    width: 40%;
    height: 100%;
  `}
  ${media.Small`
    width: 80%;
    height: 100%;
    margin: 0 0 40px;
  `}
`;
const ProductInfoContainer = styled.div``;
const ProductCompany = styled.p`
  margin-bottom: 16px;
  font-size: 1.125em;
  color: var(--content-color-dark);
`;
const ProductName = styled.p`
  margin-bottom: 20px;
  font-size: 2.25em;
  font-weight: 400;
`;
const ProductPrice = styled.p`
  margin-bottom: 138px;
  strong {
    font-size: 2.25em;
    font-weight: 700;
    margin-right: 2px;
  }
  ${media.Small`
    margin-bottom: 20px;
  `}
`;
const Delivery = styled.p`
  color: var(--content-color-dark);
  margin-bottom: 20px;
`;
const CountBtnContainer = styled.div`
  margin: 30px 0;
`;
const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 46px 0 30px;
`;
const Total = styled.p`
  font-weight: 500;
`;
const TotalCntContainer = styled.div`
  /* text-align: center; */
  display: flex;
  gap: 28px;
  align-items: center;
  color: var(--content-color-dark);
  strong {
    color: var(--point-color);
  }
`;
const TotalPrice = styled.p`
  color: var(--point-color);
  position: relative;
  strong {
    font-weight: 700;
    font-size: 2.25em;
    margin-right: 2px;
  }
  &::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 20px;
    top: 8px;
    left: -12px;
    background-color: var(--content-color-light);
  }
`;
const BtnBuyContainer = styled.div`
  display: flex;
  gap: 14px;
  ${media.Medium`
    button{
      width: 100%;
    }
  `}
`;
const DetailTabContainer = styled.div`
  display: flex;
`;
const BtnDetailInfo = styled.button<{ active: string }>`
  width: 320px;
  font-size: 1.125em;
  padding: 19px 0;
  color: ${(props) =>
    props.active === "true"
      ? "var(--point-color)"
      : "var(--content-color-dark)"};
  font-weight: ${(props) => (props.active === "true" ? "700" : "500")};
  border-bottom: 6px solid
    ${(props) => (props.active === "true" ? "var(--point-color)" : "#e0e0e0")};
`;
const DetailInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export {
  Wrapper,
  DetailContainer,
  ProductImg,
  ProductInfoContainer,
  ProductCompany,
  ProductName,
  ProductPrice,
  Delivery,
  CountBtnContainer,
  TotalContainer,
  Total,
  TotalCntContainer,
  TotalPrice,
  BtnBuyContainer,
  DetailTabContainer,
  BtnDetailInfo,
  DetailInfo,
};
