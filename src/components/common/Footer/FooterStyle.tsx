import styled from "styled-components";
import { media } from "../../style/media";

const FooterContainer = styled.footer`
  background-color: #f2f2f2;
  width: 100%;
`;

const FooterStyleContainer = styled.div`
  max-width: 1280px;
  padding: 54px 0;
  margin: 0 auto;
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c4c4c4;
  ${media.Medium`
    padding: 0 50px;
  `}
  ${media.Small`
    flex-direction: column;
    align-items: stretch;
    padding: 0 30px;
    font-size: 0.9rem;
  `}
`;

const FooterLink = styled.ul`
  display: flex;
  gap: 32px;
  margin-bottom: 30px;
  li {
    position: relative;
    &:not(:last-child) {
      &::after {
        content: "|";
        position: absolute;
        top: 50%;
        right: -14px;
        transform: translate(50%, -50%);
      }
    }
  }
  ${media.Small`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    li{
      &:not(:last-child){
        &::after{
          content:'';
          }
      }
    }
  `}
`;

const FooterSns = styled.ul`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
`;

const FooterInfo = styled.address`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #767676;
  line-height: 24px;
  word-break: keep-all;
  strong {
    font-weight: 700;
  }
  ${media.Medium`
    padding: 0 50px;
  `}
  ${media.Small`
    padding: 0 30px;
    font-size: 0.9rem;
  `}
`;

export {
  FooterContainer,
  FooterStyleContainer,
  ListContainer,
  FooterLink,
  FooterSns,
  FooterInfo,
};
