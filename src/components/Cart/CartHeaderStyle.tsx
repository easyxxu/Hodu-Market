import styled from "styled-components";
import ToggleUnCheck from "../../assets/toggle-uncheck.svg";
import ToggleCheck from "../../assets/toggle-check.svg";
import { media } from "../style/media";

const CartHeader = styled.thead`
  border-radius: 10px;
  background: #f2f2f2;
  font-size: 1.125em;
  th {
    padding: 19px;
    vertical-align: middle;
    &:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    &:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
  ${media.Small`
    font-size: 0.9em;
    th{
      padding: 5px 10px;
    }
  `}
`;
const CartCheckBox = styled.input`
  background: url(${ToggleUnCheck}) no-repeat;
  width: 20px;
  height: 20px;
  appearance: none;
  cursor: pointer;
  &:checked {
    background: url(${ToggleCheck}) no-repeat;
  }
`;
export { CartHeader, CartCheckBox };
