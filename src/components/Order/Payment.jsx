import React from "react";
import styled from "styled-components";
import { Button, ButtonStyle } from "../common/Button/Button";
export default function Payment() {
  return (
    <>
      <Title>배송정보</Title>
      <hr />
      <PaymentForm>
        <fieldset>
          <legend>주문자 정보</legend>
          <Label>
            이름
            <Input type="text" />
          </Label>
          <Label>
            휴대폰
            <PhoneInputContainer>
              <Input type="text" />
              <Input type="text" />
              <Input type="text" />
            </PhoneInputContainer>
          </Label>
          <Label>
            이메일
            <Input type="email" />
          </Label>
        </fieldset>
        <fieldset>
          <legend>배송지 정보</legend>
          <Label>
            수령인
            <Input type="text" />
          </Label>
          <Label>
            휴대폰
            <PhoneInputContainer>
              <Input type="text" />
              <Input type="text" />
              <Input type="text" />
            </PhoneInputContainer>
          </Label>
          <ShippingLabel>
            배송주소
            <ShippingInfo>
              <Input type="text" />
              <Input type="text" />
              <Input type="text" />
            </ShippingInfo>
          </ShippingLabel>
          <ShippingMsgLabel>
            배송 메시지
            <ShippingMsgInput type="text" />
          </ShippingMsgLabel>
          <ShippingBtn width="154px" color="white">
            우편번호 조회
          </ShippingBtn>
        </fieldset>
        <TotalPaymentContainer>
          <PaymentFieldset>
            <legend>결제수단</legend>
            <PaymentContainer>
              <label>
                <input type="radio" name="결제수단" />
                신용 / 체크카드
              </label>
              <label>
                <input type="radio" name="결제수단" />
                무통장 입금
              </label>
              <label>
                <input type="radio" name="결제수단" />
                휴대폰 결제
              </label>
              <label>
                <input type="radio" name="결제수단" />
                네이버페이
              </label>
              <label>
                <input type="radio" name="결제수단" />
                카카오페이
              </label>
            </PaymentContainer>
          </PaymentFieldset>
          <div>
            <FinalPaymentTitle>최종결제 정보</FinalPaymentTitle>
            <FinalPaymentContainer>
              <FinalPaymentDetail>
                <p>- 상품금액</p>
                <p>
                  <strong>46500</strong>원
                </p>
              </FinalPaymentDetail>
              <FinalPaymentDetail>
                <p>- 할인금액</p>
                <p>
                  <strong>0</strong>원
                </p>
              </FinalPaymentDetail>
              <FinalPaymentDetail>
                <p>- 배송비</p>
                <p>
                  <strong>0</strong>원
                </p>
              </FinalPaymentDetail>
              <hr />
              <FinalPayment>
                <p>- 결제금액</p>
                <strong>46500원</strong>
              </FinalPayment>
              <FinalAgreementContainer>
                <label>
                  <input type="checkbox" />
                  주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
                </label>
                <Button
                  width="L"
                  size="L"
                  bgcolor="disabled"
                  color="white"
                  content="결제하기"
                />
              </FinalAgreementContainer>
            </FinalPaymentContainer>
          </div>
        </TotalPaymentContainer>
      </PaymentForm>
    </>
  );
}

const Title = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin-top: 156px;
`;
const PaymentForm = styled.form`
  margin: 40px 0 70px;
  position: relative;
  fieldset:first-child {
    margin-bottom: 30px;
    position: relative;
  }
  fieldset:nth-child(2) {
    margin-bottom: 70px;
    position: relative;
  }
  legend {
    width: 1280px;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 2px solid var(--content-color-light);
    padding-bottom: 8px;
  }
`;
const Label = styled.label`
  width: 504px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  &::after {
    content: "";
    position: absolute;
    width: 1280px;
    height: 1px;
    bottom: 0;
    background-color: var(--content-color-light);
  }
`;
const Input = styled.input`
  width: 334px;
  height: 40px;
  margin: 8px 0;
  border: 1px solid var(--content-color-light);
  font-size: 16px;
`;
const PhoneInputContainer = styled.div`
  display: flex;
  gap: 27px;
  z-index: 1;
  input {
    position: relative;
    &:first-child {
      width: 80px;
    }
    &:not(:first-child) {
      width: 100px;
    }
  }
  &::before {
    z-index: 2;
    content: "-";
    position: absolute;
    top: 25%;
    left: 51%;
    transform: translate(50%, 50%);
    font-size: 16px;
  }
  &::after {
    z-index: 2;
    content: "-";
    position: absolute;
    top: 25%;
    right: 22.5%;
    transform: translate(50%, 50%);
    font-size: 16px;
  }
`;
const ShippingLabel = styled(Label)`
  width: 970px;
  &::after {
    top: 168px;
  }
`;
const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  input:first-child {
    width: 170px;
  }
  input:nth-child(2),
  input:nth-child(3) {
    width: 800px;
  }
`;
const ShippingBtn = styled(ButtonStyle)`
  position: absolute;
  top: 35.7%;
  left: 27%;
`;
const ShippingMsgLabel = styled(Label)`
  width: 970px;
`;
const ShippingMsgInput = styled(Input)`
  width: 800px;
`;
const PaymentContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 18px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--content-color-light);
`;
const TotalPaymentContainer = styled.div`
  display: flex;
`;
const PaymentFieldset = styled.fieldset`
  width: 760px;
  margin-right: 40px;
  legend {
    width: 760px;
  }
  input {
    margin-right: 10px;
  }
`;
const FinalPaymentTitle = styled.h4`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 18px;
`;
const FinalPaymentContainer = styled.div`
  border: 2px solid var(--point-color);
  width: 480px;
  padding: 34px 30px;
  border-radius: 10px;
  z-index: 4;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    background-color: #f2f2f2;
    width: 476px;
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
    font-size: 16px;
  }
  p:last-child {
    color: var(--content-color-dark);
  }
  strong {
    font-weight: 700;
    font-size: 18px;
    margin-right: 4px;
    color: black;
  }
`;
const FinalPayment = styled(FinalPaymentDetail)`
  margin: 29px 0 55px;
  align-items: center;
  strong {
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    color: var(--price-point-color);
  }
`;
const FinalAgreementContainer = styled.div`
  z-index: 2;
  position: relative;
  input {
    margin-right: 10px;
  }
  button {
    margin-top: 30px;
    margin-left: 92px;
  }
`;
