import styled from "styled-components";
const Wrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 80px auto;
`;
const DetailContainer = styled.div`
  display: flex;
  margin-bottom: 140px;
`;
const ProductImg = styled.img`
  width: 600px;
  height: 600px;
  margin-right: 50px;
`;
const ProductCompany = styled.p`
  margin-bottom: 16px;
  font-size: 18px;
  color: var(--content-color-dark);
`;
const ProductName = styled.p`
  margin-bottom: 20px;
  font-size: 36px;
  font-weight: 400;
`;
const ProductPrice = styled.p`
  margin-bottom: 138px;
  strong {
    font-size: 36px;
    font-weight: 700;
    margin-right: 2px;
  }
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
    font-size: 36px;
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
`;
const DetailTabContainer = styled.div``;
const BtnDetailInfoActive = styled.button`
  width: 320px;
  color: var(--point-color);
  font-size: 18px;
  font-weight: 700;
  border-bottom: 6px solid var(--point-color);
  padding: 19px 0;
`;
const BtnDetailInfoUnActive = styled.button`
  width: 320px;
  color: var(--content-color-dark);
  font-size: 18px;
  border-bottom: 6px solid #e0e0e0;
  padding: 19px 0;
`;
const DetailInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`;
export {
  Wrapper,
  DetailContainer,
  ProductImg,
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
  BtnDetailInfoActive,
  BtnDetailInfoUnActive,
  DetailInfo,
};
