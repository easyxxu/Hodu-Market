import { styled } from "styled-components";
import UpArrow from "../../assets/icon-up-arrow.svg";
import DownArrow from "../../assets/icon-down-arrow.svg";
import CheckBoxIcon from "../../assets/icon-check.svg";
import { ReactComponent as CheckIcon } from "../../assets/icon-check-off.svg";
const JoinContainer = styled.div`
  max-width: 550px;
  margin: 50px auto;
  /* border-radius: 10px; */
`;
const JoinTypeBtn = styled.div`
  display: flex;
  button {
    width: 275px;
    font-size: 18px;
    padding: 20px 76px 38px;
  }
`;
const BuyerJoinBtn = styled.button`
  z-index: 2;
  background-color: #fff;
  border-top: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const SellerJoinBtn = styled.button`
  border: 1px solid #c4c4c4;
  background-color: #f2f2f2;
  border-radius: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 34px;
  align-items: center;
`;
const JoinFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 40px 35px 36px;
  z-index: 1;
  position: relative;
  input {
    width: 480px;
    padding: 17px 10px;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    margin-bottom: 12px;
    font-size: 16px;
  }
  label {
    color: #767676;
    font-size: 16px;
    margin-bottom: 10px;
    position: relative;
  }
`;
const IdContainer = styled.div`
  display: flex;
  gap: 12px;
  input {
    width: 346px;
    border: ${(props) =>
      props.valid === "false"
        ? "1px solid var(--price-point-color)"
        : "1px solid #c4c4c4"};
  }
  button {
    width: 122px;
    height: 54px;
    background-color: #21bf48;
    border-radius: 5px;
    color: #fff;
    padding: 17px 31px;
    font-size: 16px;
  }
`;
const CheckIconStyle = styled(CheckIcon)`
  fill: ${(props) => props.fill};
  position: absolute;
  top: 39px;
  right: 10px;
`;
const PhoneContainer = styled.div`
  display: flex;
  gap: 12px;
  position: relative;
  margin-top: 10px;
  input {
    width: 152px;
  }
  ul {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0%, 40%);
    width: 152px;
    height: 150px;
    overflow-y: scroll;
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    text-align: center;
    background-color: #fff;
  }
  li {
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    line-height: normal;
  }
`;
const PhoneFirstBtn = styled.button`
  width: 152px;
  height: 54px;
  font-size: 16px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 17px 73px 17px 50px;
  margin-bottom: 10px;
  background-image: ${(props) =>
    props.state === "active" ? `url(${UpArrow})` : `url(${DownArrow})`};
  background-repeat: no-repeat;
  background-position: 90% 50%;
`;
const AgreeContainer = styled.div`
  width: 480px;
  margin: 0 auto;
  span {
    text-decoration-line: underline;
    font-weight: bold;
    text-underline-offset: 3px;
  }
`;
const AgreeInput = styled.input`
  display: none;
  width: 454px;
  & + label::before {
    content: "";
    margin-right: 10px;
    width: 15px;
    height: 15px;
    border: 1px solid #c4c4c4;
  }
  &:checked + label::before {
    content: "";
    background: url(${CheckBoxIcon}) no-repeat 50% 50%;
    border: 1px solid #21bf48;
  }
`;
const AgreeLabel = styled.label`
  display: flex;
  line-height: 18px;
  color: #767676;
`;
const ErrorMsg = styled.small`
  color: ${(props) =>
    props.valid === "success"
      ? "var(--point-color)"
      : "var(--price-point-color)"};
  font-size: 16px;
  margin-bottom: 12px;
`;
export {
  JoinContainer,
  JoinTypeBtn,
  BuyerJoinBtn,
  SellerJoinBtn,
  Form,
  JoinFormContainer,
  IdContainer,
  PhoneContainer,
  PhoneFirstBtn,
  AgreeContainer,
  AgreeInput,
  AgreeLabel,
  ErrorMsg,
  CheckIconStyle,
};
