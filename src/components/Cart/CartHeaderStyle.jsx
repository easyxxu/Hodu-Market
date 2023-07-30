import styled from "styled-components";
import ToggleUnCheck from "../../assets/toggle-uncheck.svg";
const CartTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin: 54px 0 52px;
`;
const CartTabTitle = styled.div`
  max-width: 1280px;
  border-radius: 10px;
  background: #f2f2f2;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 19px 100px 19px 30px;
  font-size: 18px;
  p:nth-child(2) {
    width: 614px;
    text-align: center;
    margin-right: 48px;
  }
  p:nth-child(3) {
    width: 150px;
    text-align: center;
    margin-right: 148px;
  }
  p:last-child {
    width: 130px;
    text-align: center;
  }
`;
const CartCheckBox = styled.button`
  background: url(${ToggleUnCheck}) no-repeat;
  width: 20px;
  height: 20px;
  margin-right: 40px;
`;
export { CartTitle, CartTabTitle, CartCheckBox };
