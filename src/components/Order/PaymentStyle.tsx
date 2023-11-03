import styled from "styled-components";
import { Button } from "../common/Button/Button";
// import { ButtonStyle } from "../common/Button/Button";
import { media } from "../style/media";

const Title = styled.h3`
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 156px;
`;
const PaymentForm = styled.form`
  margin: 40px 0 70px;
  position: relative;
  word-break: keep-all;
  width: 100%;
  fieldset:first-child {
    margin-bottom: 30px;
    position: relative;
  }
  fieldset:nth-child(2) {
    margin-bottom: 70px;
    position: relative;
  }
  legend {
    width: 100%;
    font-size: 1.125em;
    font-weight: 500;
    border-bottom: 2px solid var(--content-color-light);
    padding-bottom: 8px;
  }
`;
const InfoSaveBtn = styled.div`
  margin-top: 15px;
  /* &:hover {
    background-color: var(--point-color);
  } */
`;
const Label = styled.label`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1em;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    background-color: var(--content-color-light);
  }
`;
const Input = styled.input`
  width: 80%;
  height: 40px;
  margin: 8px 0;
  border: 1px solid var(--content-color-light);
  font-size: 1em;
  &:focus {
    border: 1px solid var(--point-color);
  }
`;
const PhoneInputContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1;
  input {
    position: relative;
    width: calc((100% - 40px) / 3);
  }
`;
const ShippingLabel = styled(Label)`
  &::after {
    top: 168px;
  }
`;
const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  input:first-child {
    width: 30%;
  }
  input:nth-child(2),
  input:nth-child(3) {
    width: 100%;
  }
`;
const ZipCodeContainer = styled.div`
  display: flex;
  gap: 10px;
  button {
    margin: 7px 0;
  }
`;
// const ShippingBtn = styled(ButtonStyle)``;
const ShippingMsgLabel = styled(Label)`
  width: 100%;
`;
const ShippingMsgInput = styled(Input)``;
const PaymentContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 18px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--content-color-light);
  ${media.Small`
  flex-direction: column;`}
`;
const TotalPaymentContainer = styled.div`
  display: flex;
  width: 100%;
  ${media.Medium`
    flex-direction: column;
  `}
`;
const PaymentFieldset = styled.fieldset`
  width: 60%;
  margin-right: 40px;
  input {
    margin-right: 10px;
  }
  ${media.Medium`
    width:100%;
  `}
`;
const FinalWrapper = styled.div`
  width: 40%;
  ${media.Medium`
    width: 100%;
  `}
`;
const FinalPaymentTitle = styled.h4`
  font-size: 1.5em;
  font-weight: 500;
  margin-bottom: 18px;
`;
const FinalPaymentContainer = styled.div`
  border: 2px solid var(--point-color);
  width: 100%;
  padding: 34px 30px;
  border-radius: 10px;
  z-index: 4;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    background-color: #f2f2f2;
    width: 100%;
    height: 182px;
    bottom: 0;
    left: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
const FinalPaymentDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  p {
    font-size: 1em;
  }
  p:last-child {
    color: var(--content-color-dark);
  }
  strong {
    font-weight: 700;
    font-size: 1.125em;
    margin-right: 4px;
    color: black;
  }
`;
const FinalPayment = styled(FinalPaymentDetail)`
  margin: 29px 0 55px;
  align-items: center;
  strong {
    font-size: 1.5em;
    font-style: normal;
    font-weight: 700;
    color: var(--price-point-color);
  }
`;
const FinalAgreementContainer = styled.div`
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  input {
    margin-right: 10px;
  }
  button {
    width: 100%;
    margin-top: 30px;
  }
`;
const DaumPostCodeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export {
  Title,
  PaymentForm,
  InfoSaveBtn,
  Label,
  Input,
  PhoneInputContainer,
  ShippingLabel,
  ShippingInfo,
  ZipCodeContainer,
  // ShippingBtn,
  ShippingMsgLabel,
  ShippingMsgInput,
  PaymentContainer,
  TotalPaymentContainer,
  PaymentFieldset,
  FinalWrapper,
  FinalPaymentTitle,
  FinalPaymentContainer,
  FinalPaymentDetail,
  FinalPayment,
  FinalAgreementContainer,
  DaumPostCodeContainer,
};
