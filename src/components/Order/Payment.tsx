import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { orderCart, orderDirect } from "../../apis/orderApi";
import { cartProductInfoListAtom } from "../../atoms/cartAtom";
import { Button } from "../common/Button/Button";
import PostCode from "./PostCode";
import * as S from "./PaymentStyle";

export default function Payment() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const { orderList, orderKind, quantity, totalPrice } = data;
  const cartProductInfoList = useRecoilValue(cartProductInfoListAtom);
  const allTotal =
    cartProductInfoList.length > 0
      ? cartProductInfoList
          .map((item) => item.data.shipping_fee)
          .reduce((a, b) => a + b)
      : 0;

  const productId = orderList && orderList.product_id;
  const total =
    (orderList && totalPrice + orderList.shipping_fee) ?? totalPrice + allTotal;
  const totalShippingFee = (orderList && orderList.shipping_fee) || allTotal;
  const [orderAgree, setOrderAgree] = useState(false);
  const [orderForm, setOrderForm] = useState({
    product_id: productId || "",
    quantity: quantity,
    order_kind: orderKind,
    total_price: total,
    receiver: "",
    receiver_phone_number: "",
    address: "",
    address_message: " ",
    payment_method: "",
  });
  const [orderPersonName, setOrderPersonName] = useState("");
  const [orderPersonPhoneNum, setOrderPersonPhoneNum] = useState<{
    first: string;
    second: string;
    third: string;
  }>({
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
  const [postCodeModal, setPostCodeModal] = useState(false);
  const handleSubmitOrderForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let res;
      if (
        orderForm.order_kind === "direct_order" ||
        orderForm.order_kind === "cart_one_order"
      ) {
        res = await orderDirect(orderForm);
      } else if (orderForm.order_kind === "cart_order") {
        const { product_id, quantity, ...rest } = orderForm;
        res = await orderCart(rest);
      }
      alert("주문이 완료되었습니다.");
      navigate("/mypage");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("주문 실패", err.response?.data);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderForm({ ...orderForm, [name]: value });
  };

  const validCheckPhoneNumber = (inputElement: HTMLInputElement) => {
    const isAllDigits = /^\d+$/.test(inputElement.value);
    if (!isAllDigits) {
      inputElement.setCustomValidity("숫자로만 입력하세요.");
      inputElement.reportValidity();
      inputElement.focus();
    } else {
      inputElement.setCustomValidity("");
    }
  };

  // 주문자 이름 저장
  const handleOrderPersonName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderPersonName(e.target.value);
    setOrderPersonNameValid(true);
  };

  // 주문자 휴대폰 번호 저장
  const handleOrderPhoneNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validCheckPhoneNumber(e.target);
    setOrderPersonPhoneNum({ ...orderPersonPhoneNum, [name]: value });
    if (
      orderPersonPhoneNum.first &&
      orderPersonPhoneNum.second &&
      orderPersonPhoneNum.third
    ) {
      setOrderPersonPhoneNumValid(true);
    }
  };

  // 주문자 이메일 저장
  const handleOrderEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderPersonEmail(e.target.value);
    setOrderPersonEmailValid(true);
  };

  // 배송지 수령인 전화번호
  const handleReceiverPhoneNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validCheckPhoneNumber(e.target);
    setReceiverPhoneNum({ ...receiverPhoneNum, [name]: value });
    updateReceiverPhoneNum();
  };

  // 배송지주소
  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  // 주문자 정보와 배송받는사람 정보가 같은 경우 버튼 handler
  const handleSaveInfoBtn = () => {
    // console.log(typeof orderPersonPhoneNum);
    if (typeof orderPersonPhoneNum === "object") {
      setOrderForm({
        ...orderForm,
        receiver: orderPersonName,
      });
    }

    // 주문자 정보를 배송지 정보에 반영
    setReceiverPhoneNum({
      first: orderPersonPhoneNum.first,
      second: orderPersonPhoneNum.second,
      third: orderPersonPhoneNum.third,
    });
  };

  const handleZipCode = () => {
    setPostCodeModal(true);
  };

  const handleOrderAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // useEffect(() => {
  //   updateOrderPhoneNum();
  // }, [orderPersonPhoneNum]);

  useEffect(() => {
    if (orderForm.payment_method.length > 0) {
      setPaymentMethodValid(true);
    } else if (orderForm.receiver.length > 0) {
      setReceiverValid(true);
    }
  }, [orderForm.payment_method, orderForm.receiver]);
  // console.log("orderForm:", orderForm);
  return (
    <>
      <S.Title>배송정보</S.Title>
      <hr />
      <S.PaymentForm autoComplete="off" onSubmit={handleSubmitOrderForm}>
        <fieldset>
          <legend>주문자 정보</legend>
          <S.Label>
            이름
            <S.Input
              type="text"
              name="receiver"
              onChange={handleOrderPersonName}
            />
          </S.Label>
          <S.Label>
            휴대폰
            <S.PhoneInputContainer>
              <S.Input
                type="tel"
                name="first"
                maxLength={3}
                onChange={handleOrderPhoneNum}
              />
              -
              <S.Input
                type="tel"
                name="second"
                maxLength={4}
                onChange={handleOrderPhoneNum}
              />
              -
              <S.Input
                type="tel"
                name="third"
                maxLength={4}
                onChange={handleOrderPhoneNum}
              />
            </S.PhoneInputContainer>
          </S.Label>
          <S.Label>
            이메일
            <S.Input type="email" name="email" onChange={handleOrderEmail} />
          </S.Label>
          <S.InfoSaveBtn>
            <Button
              type="button"
              size="medium_small"
              color="white"
              children="주문자 정보와 동일"
              onClick={handleSaveInfoBtn}
            />
          </S.InfoSaveBtn>
        </fieldset>
        <fieldset>
          <legend>배송지 정보</legend>
          <S.Label>
            수령인
            <S.Input
              type="text"
              name="receiver"
              value={orderForm.receiver}
              onChange={handleInputChange}
            />
          </S.Label>
          <S.Label>
            휴대폰
            <S.PhoneInputContainer>
              <S.Input
                type="tel"
                name="first"
                maxLength={3}
                value={receiverPhoneNum.first}
                onChange={handleReceiverPhoneNum}
              />
              -
              <S.Input
                type="tel"
                name="second"
                maxLength={4}
                value={receiverPhoneNum.second}
                onChange={handleReceiverPhoneNum}
              />
              -
              <S.Input
                type="tel"
                name="third"
                maxLength={4}
                value={receiverPhoneNum.third}
                onChange={handleReceiverPhoneNum}
              />
            </S.PhoneInputContainer>
          </S.Label>
          <S.ShippingLabel>
            배송주소
            <S.ShippingInfo>
              <S.ZipCodeContainer>
                <S.Input
                  type="text"
                  name="우편번호"
                  value={address.우편번호}
                  readOnly={true}
                />
                <Button
                  type="button"
                  size="small"
                  color="point"
                  $customStyle={{ width: "154px" }}
                  children="우편번호 조회"
                  onClick={handleZipCode}
                />
                {postCodeModal && (
                  <S.DaumPostCodeContainer>
                    <PostCode
                      address={address}
                      setAddress={setAddress}
                      setPostCodeModal={setPostCodeModal}
                    />
                  </S.DaumPostCodeContainer>
                )}
              </S.ZipCodeContainer>
              <S.Input
                type="text"
                name="기본주소"
                value={address.기본주소}
                readOnly={true}
              />
              <S.Input type="text" name="상세주소" onChange={handleAddress} />
            </S.ShippingInfo>
          </S.ShippingLabel>
          <S.ShippingMsgLabel>
            배송 메시지
            <S.ShippingMsgInput
              type="text"
              name="address_message"
              onChange={handleInputChange}
            />
          </S.ShippingMsgLabel>
        </fieldset>
        <S.TotalPaymentContainer>
          <S.PaymentFieldset>
            <legend>결제수단</legend>
            <S.PaymentContainer>
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
            </S.PaymentContainer>
          </S.PaymentFieldset>
          <S.FinalWrapper>
            <S.FinalPaymentTitle>최종결제 정보</S.FinalPaymentTitle>
            <S.FinalPaymentContainer>
              <S.FinalPaymentDetail>
                <p>- 상품금액</p>
                <p>
                  <strong>{totalPrice.toLocaleString("ko-KR")}</strong>원
                </p>
              </S.FinalPaymentDetail>
              <S.FinalPaymentDetail>
                <p>- 할인금액</p>
                <p>
                  <strong>0</strong>원
                </p>
              </S.FinalPaymentDetail>
              <S.FinalPaymentDetail>
                <p>- 배송비</p>
                <p>
                  <strong>{totalShippingFee.toLocaleString("ko-KR")}</strong>원
                </p>
              </S.FinalPaymentDetail>
              <hr />
              <S.FinalPayment>
                <p>- 결제금액</p>
                <strong>{total.toLocaleString("ko-KR")} 원</strong>
              </S.FinalPayment>
              <S.FinalAgreementContainer>
                <label>
                  <input
                    type="checkbox"
                    name="orderCheck"
                    onChange={handleOrderAgree}
                  />
                  주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
                </label>
                <Button
                  type="submit"
                  size="large"
                  color="point"
                  $customStyle={{ width: "418px" }}
                  children="결제하기"
                  disabled={!handleSubmitBtn() ? true : false}
                />
              </S.FinalAgreementContainer>
            </S.FinalPaymentContainer>
          </S.FinalWrapper>
        </S.TotalPaymentContainer>
      </S.PaymentForm>
    </>
  );
}
