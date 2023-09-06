import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { orderDirect } from "../../apis/orderApi";
import { Button, ButtonStyle } from "../common/Button/Button";
export default function Payment() {
  const location = useLocation();
  const productData = location.state;
  const total = productData.totalPrice + productData.productShippingFee;
  const [orderAgree, setOrderAgree] = useState(false);
  const [orderForm, setOrderForm] = useState({
    product_id: parseInt(productData.productId),
    quantity: productData.quantity,
    order_kind: productData.orderKind,
    total_price: total,
    receiver: "",
    receiver_phone_number: "",
    address: "",
    address_message: " ",
    payment_method: "",
  });
  const [orderPersonName, setOrderPersonName] = useState("");
  const [orderPersonPhoneNum, setOrderPersonPhoneNum] = useState({
    first: "",
    second: "",
    third: "",
  });
  const [receiverPhoneNum, setReceiverPhoneNum] = useState({
    first: "",
    second: "",
    third: "",
  });
  const [address, setAddress] = useState({
    우편번호: "",
    기본주소: "",
    상세주소: "",
  });
  const [orderPersonEmail, setOrderPersonEmail] = useState("");
  // 유효성 검사
  const [orderPersonNameValid, setOrderPersonNameValid] = useState(false);
  const [orderPersonPhoneNumValid, setOrderPersonPhoneNumValid] =
    useState(false);
  const [orderPersonEmailValid, setOrderPersonEmailValid] = useState(false);
  const [receiverValid, setReceiverValid] = useState(false);
  const [receiverPhoneNumberValid, setReceiverPhoneNumberValid] =
    useState(false);
  const [addressValid, setAddressValid] = useState(false);
  const [paymentMethodValid, setPaymentMethodValid] = useState(false);

  const handleSubmitOrderForm = async (e) => {
    e.preventDefault();
    try {
      const res = await orderDirect(orderForm);
      console.log("주문 성공: ", res.data);
    } catch (err) {
      console.error("주문 실패", err);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm({ ...orderForm, [name]: value });
  };

  // 주문자 이름 저장
  const handleOrderPersonName = (e) => {
    setOrderPersonName(e.target.value);
    setOrderPersonNameValid(true);
  };
  // 주문자 휴대폰 번호 저장
  const handleOrderPhoneNum = (e) => {
    const { name, value } = e.target;
    setOrderPersonPhoneNum({ ...orderPersonPhoneNum, [name]: value });
  };
  const updateOrderPhoneNum = () => {
    if (
      orderPersonPhoneNum.first &&
      orderPersonPhoneNum.second &&
      orderPersonPhoneNum.third
    ) {
      setOrderPersonPhoneNum(
        `${orderPersonPhoneNum.first}${orderPersonPhoneNum.second}${orderPersonPhoneNum.third}`
      );
      setOrderPersonPhoneNumValid(true);
    }
  };
  // 주문자 이메일 저장
  const handleOrderEmail = (e) => {
    setOrderPersonEmail(e.target.value);
    setOrderPersonEmailValid(true);
  };

  // 배송지 수령인 전화번호
  const handleReceiverPhoneNum = (e) => {
    const { name, value } = e.target;
    setReceiverPhoneNum({ ...receiverPhoneNum, [name]: value });
    updateReceiverPhoneNum();
  };

  // 배송지주소
  const handleAddress = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    updateAddress();
  };
  const updateReceiverPhoneNum = () => {
    if (
      receiverPhoneNum.first &&
      receiverPhoneNum.second &&
      receiverPhoneNum.third
    ) {
      setOrderForm({
        ...orderForm,
        receiver_phone_number: `${receiverPhoneNum.first}${receiverPhoneNum.second}${receiverPhoneNum.third}`,
      });
      setReceiverPhoneNumberValid(true);
    }
  };
  const updateAddress = () => {
    if (address.기본주소 && address.상세주소 && address.우편번호) {
      setOrderForm({
        ...orderForm,
        address: `${address.우편번호} ${address.기본주소} ${address.상세주소}`,
      });
      setAddressValid(true);
    }
  };
  // 주문자 정보와 배송받는사람 정보가 같은 경우 버튼 클릭
  const handleSaveInfoBtn = () => {
    setOrderForm({
      ...orderForm,
      receiver: orderPersonName,
      receiver_phone_number: `${orderPersonPhoneNum.first}${orderPersonPhoneNum.second}${orderPersonPhoneNum.third}`,
    });
  };

  const handleOrderAgree = (e) => {
    setOrderAgree(e.target.checked);
  };
  // 모든 input값 유효하다면 버튼 활성화
  const handleSubmitBtn = () => {
    return (
      orderPersonNameValid &&
      orderPersonPhoneNumValid &&
      orderPersonEmailValid &&
      receiverValid &&
      receiverPhoneNumberValid &&
      addressValid &&
      paymentMethodValid &&
      orderAgree
    );
  };
  useEffect(() => {
    updateReceiverPhoneNum();
  }, [receiverPhoneNum]);

  useEffect(() => {
    updateAddress();
  }, [address]);

  useEffect(() => {
    updateOrderPhoneNum();
  }, [orderPersonPhoneNum]);

  useEffect(() => {
    if (orderForm.payment_method.length > 0) {
      setPaymentMethodValid(true);
    } else if (orderForm.receiver.length > 0) {
      setReceiverValid(true);
    }
  }, [orderForm.payment_method, orderForm.receiver]);
  console.log(orderForm);
  return (
    <>
      <Title>배송정보</Title>
      <hr />
      <PaymentForm autoComplete="off" onSubmit={handleSubmitOrderForm}>
        <fieldset>
          <legend>주문자 정보</legend>
          <Label>
            이름
            <Input
              type="text"
              name="receiver"
              onChange={handleOrderPersonName}
            />
          </Label>
          <Label>
            휴대폰
            <PhoneInputContainer>
              <Input
                type="text"
                name="first"
                maxLength="3"
                onBlur={handleOrderPhoneNum}
              />
              <Input
                type="text"
                name="second"
                maxLength="4"
                onBlur={handleOrderPhoneNum}
              />
              <Input
                type="text"
                name="third"
                maxLength="4"
                onBlur={handleOrderPhoneNum}
              />
            </PhoneInputContainer>
          </Label>
          <Label>
            이메일
            <Input type="email" name="email" onChange={handleOrderEmail} />
          </Label>
          <InfoSaveBtn
            bgcolor="disabled"
            color="white"
            width="MS"
            type="button"
            onClick={handleSaveInfoBtn}
          >
            주문자 정보와 동일
          </InfoSaveBtn>
        </fieldset>
        <fieldset>
          <legend>배송지 정보</legend>
          <Label>
            수령인
            <Input type="text" name="receiver" onChange={handleInputChange} />
          </Label>
          <Label>
            휴대폰
            <PhoneInputContainer>
              <Input
                type="text"
                name="first"
                maxLength="3"
                onChange={handleReceiverPhoneNum}
              />
              <Input
                type="text"
                name="second"
                maxLength="4"
                onChange={handleReceiverPhoneNum}
              />
              <Input
                type="text"
                name="third"
                maxLength="4"
                onChange={handleReceiverPhoneNum}
              />
            </PhoneInputContainer>
          </Label>
          <ShippingLabel>
            배송주소
            <ShippingInfo>
              <Input type="text" name="우편번호" onChange={handleAddress} />
              <Input type="text" name="기본주소" onChange={handleAddress} />
              <Input type="text" name="상세주소" onChange={handleAddress} />
            </ShippingInfo>
          </ShippingLabel>
          <ShippingMsgLabel>
            배송 메시지
            <ShippingMsgInput
              type="text"
              name="address_message"
              onChange={handleInputChange}
            />
          </ShippingMsgLabel>
          <ShippingBtn width="154px" color="white" type="button">
            우편번호 조회
          </ShippingBtn>
        </fieldset>
        <TotalPaymentContainer>
          <PaymentFieldset>
            <legend>결제수단</legend>
            <PaymentContainer>
              <label>
                <input
                  type="radio"
                  name="payment_method"
                  value="CARD"
                  onChange={handleInputChange}
                />
                신용 / 체크카드
              </label>
              <label>
                <input
                  type="radio"
                  name="payment_method"
                  value="DEPOSIT"
                  onChange={handleInputChange}
                />
                무통장 입금
              </label>
              <label>
                <input
                  type="radio"
                  name="payment_method"
                  value="PHONE_PAYMENT"
                  onChange={handleInputChange}
                />
                휴대폰 결제
              </label>
              <label>
                <input
                  type="radio"
                  name="payment_method"
                  value="NAVERPAY"
                  onChange={handleInputChange}
                />
                네이버페이
              </label>
              <label>
                <input
                  type="radio"
                  name="payment_method"
                  value="KAKAOPAY"
                  onChange={handleInputChange}
                />
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
                  <strong>{productData.productPrice}</strong>원
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
                  <strong>{productData.productShippingFee}</strong>원
                </p>
              </FinalPaymentDetail>
              <hr />
              <FinalPayment>
                <p>- 결제금액</p>
                <strong>{total} 원</strong>
              </FinalPayment>
              <FinalAgreementContainer>
                <label>
                  <input
                    type="checkbox"
                    name="orderCheck"
                    value={orderAgree}
                    onChange={handleOrderAgree}
                  />
                  주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
                </label>
                <Button
                  width="L"
                  size="L"
                  bgcolor={!handleSubmitBtn() ? "disabled" : null}
                  color="white"
                  content="결제하기"
                  disabled={!handleSubmitBtn()}
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
const InfoSaveBtn = styled(ButtonStyle)`
  margin-top: 15px;
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
