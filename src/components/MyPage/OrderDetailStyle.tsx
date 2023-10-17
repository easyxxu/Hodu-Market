import { styled } from "styled-components";
import { media } from "../style/media";

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

const OrderInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  h4 {
    font-size: 2em;
    font-weight: 500;
  }
  p {
    font-size: 1.5em;
    color: var(--content-color-dark);
  }
`;
const ProductListTable = styled.table`
  border-bottom: 3px solid #f2f2f2;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  th {
    font-size: 1.5em;
    padding: 10px;
    background-color: #f2f2f2;
    &:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    &:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    ${media.Small`
      font-size: 1.1em;
    `}
  }
  tr {
    &:not(:last-child) {
      border-bottom: 1px solid var(--content-color-light);
    }
  }
  td {
    vertical-align: middle;
    padding: 10px;
  }
  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border: 1px solid var(--content-color-light);
    border-radius: 10px;
    ${media.Small`
      width:80px;
      height:80px;
    `}
  }
`;
const OrderInfoList = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 3fr;
  border: 2px solid #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  span {
    &:nth-child(odd) {
      font-size: 1.125em;
      font-weight: 500;
    }
  }
`;

export { Container, OrderInfoList, ProductListTable, OrderInfoTitle };
