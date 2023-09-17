import React from "react";
import { styled } from "styled-components";

export default function Welcome() {
  return (
    <Container>
      <p>안녕하세요.</p>
      <p>
        저희 호두마켓은 자신만의 마켓을 만들어 상품을 판매할 수 있고 <br />
        또한, 구매자로서 상품을 구매 할 수 있는 오픈마켓 서비스입니다.
      </p>
    </Container>
  );
}
const Container = styled.div`
  p {
    &:first-child {
      font-size: 32px;
      font-weight: 700;
    }
    &:last-child {
      font-size: 28px;
      margin-top: 20px;
      line-height: 1.5;
    }
  }
`;
