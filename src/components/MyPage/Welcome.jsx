import React from "react";
import { styled } from "styled-components";

export default function Welcome({ name }) {
  return (
    <Container>
      <p>
        <strong>{name}님</strong> 안녕하세요.
      </p>
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
      /* color: var(--content-color-dark); */
      strong {
        box-shadow: inset 0px -11px 0 var(--point-color);
      }
    }
    &:last-child {
      font-size: 28px;
      margin-top: 20px;
    }
  }
`;
