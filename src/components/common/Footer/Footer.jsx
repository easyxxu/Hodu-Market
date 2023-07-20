import React from "react";
import styled from "styled-components";
import InstaIcon from "../../../assets/icon-insta.svg";
import FacebookIcon from "../../../assets/icon-fb.svg";
import YoutubeIcon from "../../../assets/icon-yt.svg";
export default function Footer() {
  return (
    <FooterContainer>
      <FooterStyleContainer>
        <ListContainer>
          <FooterLink>
            <li>
              <a href="/">호두샵 소개</a>
            </li>
            <li>
              <a href="/">이용약관</a>
            </li>
            <li>
              <a href="/">개인정보처리방침</a>
            </li>
            <li>
              <a href="/">전자금융거래약관</a>
            </li>
            <li>
              <a href="/">청소년보호정책</a>
            </li>
            <li>
              <a href="/">제휴문의</a>
            </li>
          </FooterLink>
          <FooterSns>
            <li>
              <a href="/">
                <img src={InstaIcon} alt="인스타그램 바로가기" />
              </a>
            </li>
            <li>
              <a href="/">
                <img src={FacebookIcon} alt="페이스북 바로가기" />
              </a>
            </li>
            <li>
              <a href="/">
                <img src={YoutubeIcon} alt="유튜브 바로가기" />
              </a>
            </li>
          </FooterSns>
        </ListContainer>
        <FooterInfo>
          <strong>(주)HODU SHOP</strong>
          제주특별자치도 제주시 동광고 137 제주코딩베이스캠프
          <br />
          사업자 번호 : 000-0000-0000 | 통신판매업
          <br />
          대표 : 김호두
        </FooterInfo>
      </FooterStyleContainer>
    </FooterContainer>
  );
}
const FooterContainer = styled.footer`
  background-color: #f2f2f2;
  width: 100%;
`;
const FooterStyleContainer = styled.div`
  max-width: 1200px;
  padding: 54px 0;
  margin: 0 auto;
`;
const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c4c4c4;
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
  strong {
    font-weight: 700;
  }
`;
