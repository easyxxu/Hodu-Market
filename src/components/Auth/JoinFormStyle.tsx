import { styled, css } from "styled-components";
import UpArrow from "../../assets/icon-up-arrow.svg";
import DownArrow from "../../assets/icon-down-arrow.svg";
import CheckBoxIcon from "../../assets/icon-check.svg";
import { ReactComponent as CheckIcon } from "../../assets/icon-check-off.svg";
import { media } from "../style/media";
const JoinContainer = styled.div`
  width: 550px;
  margin: 50px auto;
  ${media.Small`
    width: 350px;
    font-size: 0.9rem; 
  `}
`;
const JoinTypeBtn = styled.div`
  display: flex;
  button {
    width: 50%;
    font-size: 1.125em;
    padding: 20px 76px 38px;
  }
  ${media.Small`
    button{
      padding: 10px 20px 30px;
    }
  `}
`;
const BuyerJoinBtn = styled.button<{ active: string }>`
  ${(props) =>
    props.active === "active"
      ? css`
          z-index: 2;
          background-color: #fff;
          border-top: 1px solid #c4c4c4;
          border-left: 1px solid #c4c4c4;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        `
      : css`
          background-color: #f2f2f2;
          border: 1px solid #c4c4c4;
          border-radius: 10px;
        `}
`;
const SellerJoinBtn = styled.button<{ active: string }>`
  ${(props) =>
    props.active === "active"
      ? css`
          z-index: 2;
          background-color: #fff;
          border-top: 1px solid #c4c4c4;
          border-right: 1px solid #c4c4c4;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        `
      : css`
          background-color: #f2f2f2;
          border: 1px solid #c4c4c4;
          border-radius: 10px;
        `}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 34px;
  align-items: center;
  transform: translateY(-20px);
`;
const JoinFormContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 550px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 40px 35px 36px;
  z-index: 1;
  position: relative;
  label {
    color: #767676;
    font-size: 1em;
    margin-bottom: 10px;
    position: relative;
  }
  ${media.Small`
    width: 350px;
  `}
`;
const Input = styled.input<{ valid?: string }>`
  width: 100%;
  padding: 17px 40px 17px 10px;
  border: ${(props) =>
    props.valid === "false"
      ? "1px solid var(--price-point-color)"
      : "1px solid #c4c4c4"};
  border-radius: 5px;
  margin-bottom: 12px;
  font-size: 1em;
`;
const IdContainer = styled.div`
  display: flex;
  gap: 12px;
  button {
    width: 25%;
    height: 54px;
    background-color: #21bf48;
    border-radius: 5px;
    color: #fff;
    padding: 17px 27px;
    font-size: 1em;
  }
  ${media.Small`
    button{
      padding: 0;
    }
  `}
`;
const SmInput = styled(Input)<{ valid: string }>`
  width: 75%;
  border: ${(props) =>
    props.valid === "false"
      ? "1px solid var(--price-point-color)"
      : "1px solid #c4c4c4"};
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
  margin: 10px 0 50px;
  z-index: 2;
  input {
    width: calc((100% - 24px) / 3);
  }
  ul {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0%, 40%);
    width: calc((100% - 24px) / 3);
    height: 150px;
    overflow-y: scroll;
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    text-align: center;
    background-color: #fff;
  }
  li {
    cursor: pointer;
    font-size: 1em;
    line-height: normal;
    button {
      padding: 10px;
      width: 100%;
    }
  }
  input {
    margin-bottom: 0px;
  }
`;
const PhoneInput = styled(Input)`
  width: calc((100% - 24px) / 3);
`;
const PhoneFirstBtn = styled.button<{ state: string }>`
  width: calc((100% - 24px) / 3);
  /* height: 54px; */
  font-size: 1em;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 17px 73px 17px 50px;
  background-image: ${(props) =>
    props.state === "active" ? `url(${UpArrow})` : `url(${DownArrow})`};
  background-repeat: no-repeat;
  background-position: 90% 50%;
  ${media.Small`
    padding: 0;
  `}
`;
const AgreeContainer = styled.div`
  width: 100%;
  /* margin: 0 auto; */
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
    ${media.Small`
      width: 15px;
      height: 10px;
    `}
  }
  &:checked + label::before {
    content: "";
    background: url(${CheckBoxIcon}) no-repeat 50% 50%;
    border: 1px solid #21bf48;
    transform: translate(0, 5px);
  }
`;
const AgreeLabel = styled.label`
  display: flex;
  line-height: 18px;
  color: #767676;
  ${media.Small`
    line-height: 22px;
  `}
`;
const ErrorMsg = styled.small<{ valid?: string }>`
  color: ${(props) =>
    props.valid === "success"
      ? "var(--point-color)"
      : "var(--price-point-color)"};
  font-size: 1em;
  margin-bottom: 12px;
`;
const SellerContainer = styled.div`
  display: flex;
  gap: 12px;
  input {
    width: 75%;
  }
  button {
    width: 25%;
    height: 54px;
    background-color: #21bf48;
    border-radius: 5px;
    color: #fff;
    padding: 17px 31px;
    font-size: 1em;
  }
  ${media.Small`
    button{
      padding: 0;
    }
  `}
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
  SellerContainer,
  Input,
  SmInput,
  PhoneInput,
};
